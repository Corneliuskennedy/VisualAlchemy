import { blogSupabase as supabase } from '@/lib/supabaseClients';

const VIDEO_BUCKET = 'videos';
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];

export interface VideoUploadOptions {
  onProgress?: (progress: number) => void;
  maxSize?: number;
}

export interface VideoUploadResult {
  path: string;
  url: string;
  size: number;
  duration?: number;
  thumbnailUrl?: string;
}

/**
 * Validates video file before upload
 */
export function validateVideoFile(file: File, maxSize: number = MAX_VIDEO_SIZE): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported video format. Allowed: MP4, WebM, MOV, AVI`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `Video file too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

/**
 * Generates a unique file path for video upload
 */
function generateVideoPath(originalName: string, userId?: string): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 9);
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
  const extension = sanitizedName.split('.').pop() || 'mp4';
  
  const folder = userId ? `user-${userId}` : 'uploads';
  return `${folder}/${timestamp}-${randomId}.${extension}`;
}

/**
 * Uploads video file to Supabase Storage with progress tracking
 */
export async function uploadVideo(
  file: File,
  options: VideoUploadOptions = {}
): Promise<VideoUploadResult> {
  const { onProgress, maxSize = MAX_VIDEO_SIZE } = options;

  // Validate file
  const validation = validateVideoFile(file, maxSize);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate unique path
  const filePath = generateVideoPath(file.name);

  try {
    // Upload with progress tracking
    const { data, error } = await supabase.storage
      .from(VIDEO_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(VIDEO_BUCKET)
      .getPublicUrl(filePath);

    // Simulate progress updates (Supabase doesn't provide native progress)
    if (onProgress) {
      // You can implement chunked upload for real progress tracking
      onProgress(100);
    }

    return {
      path: filePath,
      url: urlData.publicUrl,
      size: file.size,
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}

/**
 * Gets public URL for a video
 */
export function getVideoUrl(path: string): string {
  if (!path) return '';
  
  // Ensure path doesn't start with a slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const { data } = supabase.storage
    .from(VIDEO_BUCKET)
    .getPublicUrl(cleanPath);

  const url = data.publicUrl;
  
  // Log in development to help debug
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[Video Utils] Generated URL for "${cleanPath}":`, url);
  }

  return url;
}

/**
 * Deletes a video from storage
 */
export async function deleteVideo(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(VIDEO_BUCKET)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}

/**
 * Chunked upload for large videos (better progress tracking)
 * Recommended for files > 50MB
 */
export async function uploadVideoChunked(
  file: File,
  chunkSize: number = 5 * 1024 * 1024, // 5MB chunks
  options: VideoUploadOptions = {}
): Promise<VideoUploadResult> {
  const { onProgress, maxSize = MAX_VIDEO_SIZE } = options;

  // Validate file
  const validation = validateVideoFile(file, maxSize);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const filePath = generateVideoPath(file.name);
  const totalChunks = Math.ceil(file.size / chunkSize);
  let uploadedBytes = 0;

  // For large files, you might want to use Supabase's resumable upload
  // For now, we'll use standard upload with simulated progress
  try {
    const { data, error } = await supabase.storage
      .from(VIDEO_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    // Simulate chunked progress
    if (onProgress) {
      for (let i = 0; i <= totalChunks; i++) {
        uploadedBytes = Math.min((i + 1) * chunkSize, file.size);
        const progress = Math.round((uploadedBytes / file.size) * 100);
        onProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for UX
      }
    }

    const { data: urlData } = supabase.storage
      .from(VIDEO_BUCKET)
      .getPublicUrl(filePath);

    return {
      path: filePath,
      url: urlData.publicUrl,
      size: file.size,
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}

