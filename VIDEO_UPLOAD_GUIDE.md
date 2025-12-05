# Video Upload Guide

## Best Practices for Video Upload in Next.js

### 1. **Storage Options**

#### Option A: Supabase Storage (Recommended - Already Configured)
- ✅ Already set up in your codebase
- ✅ CDN included
- ✅ Built-in access control
- ✅ Free tier: 1GB storage

**Setup:**
1. Create a `videos` bucket in Supabase Dashboard
2. Set bucket to public (or configure RLS policies)
3. Use the provided `video-utils.ts` functions

#### Option B: AWS S3 + CloudFront
- Better for large-scale production
- More expensive but more control
- Requires AWS setup

#### Option C: Cloudflare Stream / Mux
- Best for video streaming/transcoding
- Automatic optimization
- Higher cost but better performance

### 2. **Implementation Approaches**

#### Direct Client Upload (Current Implementation)
```tsx
import { VideoUpload } from '@/components/forms/VideoUpload';

<VideoUpload
  onUploadComplete={(result) => {
    console.log('Video URL:', result.url);
  }}
  maxSize={500 * 1024 * 1024} // 500MB
/>
```

**Pros:**
- Simple to implement
- No server costs
- Direct to storage

**Cons:**
- Limited progress tracking
- No server-side validation
- File size limited by browser

#### Server-Side Upload (Recommended for Production)
Create an API route: `src/app/api/upload-video/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { uploadVideo } from '@/lib/video-utils';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('video') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const result = await uploadVideo(file);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

### 3. **Video Optimization**

#### Pre-Upload Optimization
- Compress videos before upload (use FFmpeg or HandBrake)
- Target bitrate: 5-8 Mbps for 1080p
- Use H.264 codec (best compatibility)
- Remove audio if not needed

#### Post-Upload Optimization
Consider using:
- **Cloudflare Stream** - Automatic transcoding
- **Mux** - Video API with optimization
- **AWS MediaConvert** - Enterprise solution

### 4. **File Size Limits**

| Use Case | Recommended Max Size |
|----------|---------------------|
| Demo/Preview | 50MB |
| Standard Upload | 500MB |
| Large Files | 2GB+ (use chunked upload) |

### 5. **Security Considerations**

1. **File Type Validation** ✅ (Already implemented)
2. **File Size Limits** ✅ (Already implemented)
3. **Rate Limiting** - Add to API routes
4. **Authentication** - Require auth for uploads
5. **Virus Scanning** - Consider ClamAV or similar

### 6. **Progress Tracking**

For better progress tracking with large files:

```typescript
// Use chunked upload for files > 50MB
import { uploadVideoChunked } from '@/lib/video-utils';

const result = await uploadVideoChunked(file, 5 * 1024 * 1024, {
  onProgress: (progress) => {
    console.log(`Upload: ${progress}%`);
  },
});
```

### 7. **Usage Examples**

#### Basic Upload Form
```tsx
'use client';

import { VideoUpload } from '@/components/forms/VideoUpload';
import { useState } from 'react';

export default function UploadPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <VideoUpload
        label="Upload Your Video"
        maxSize={500 * 1024 * 1024}
        onUploadComplete={(result) => {
          setVideoUrl(result.url);
        }}
        onUploadError={(error) => {
          console.error('Upload error:', error);
        }}
      />
      
      {videoUrl && (
        <div className="mt-8">
          <h3>Uploaded Video:</h3>
          <video src={videoUrl} controls className="w-full mt-4" />
        </div>
      )}
    </div>
  );
}
```

#### With Form Integration
```tsx
import { useFormContext } from 'react-hook-form';
import { VideoUpload } from '@/components/forms/VideoUpload';

function VideoUploadField() {
  const { setValue, watch } = useFormContext();
  const videoUrl = watch('videoUrl');

  return (
    <VideoUpload
      onUploadComplete={(result) => {
        setValue('videoUrl', result.url, { shouldValidate: true });
      }}
      required
    />
  );
}
```

### 8. **Next Steps**

1. **Create Supabase Bucket:**
   ```bash
   # In Supabase Dashboard:
   # Storage > Create Bucket > Name: "videos" > Public: Yes
   ```

2. **Add to Your Page:**
   ```tsx
   // For the homepage video comparison section
   import { VideoUpload } from '@/components/forms/VideoUpload';
   ```

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 9. **Troubleshooting**

**Issue: Upload fails with "Bucket not found"**
- Create the `videos` bucket in Supabase Dashboard

**Issue: CORS errors**
- Check Supabase bucket CORS settings
- Ensure bucket is public or RLS policies allow uploads

**Issue: Large file uploads timeout**
- Use chunked upload for files > 50MB
- Increase timeout in Next.js config

**Issue: Video doesn't play**
- Check video codec (H.264 recommended)
- Verify file format (MP4 best compatibility)
- Check CORS headers on video URL

### 10. **Performance Tips**

1. **Lazy Load Videos:**
   ```tsx
   <video loading="lazy" src={videoUrl} />
   ```

2. **Use Poster Images:**
   ```tsx
   <video poster="/video-poster.jpg" src={videoUrl} />
   ```

3. **Multiple Quality Versions:**
   - Upload 1080p, 720p, 480p versions
   - Use `<source>` tags for responsive video

4. **CDN Delivery:**
   - Supabase Storage includes CDN
   - Consider Cloudflare for additional caching

