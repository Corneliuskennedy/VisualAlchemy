'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Video, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadVideo, validateVideoFile, type VideoUploadResult } from '@/lib/video-utils';
import { cn } from '@/lib/utils';

interface VideoUploadProps {
  onUploadComplete?: (result: VideoUploadResult) => void;
  onUploadError?: (error: Error) => void;
  maxSize?: number; // in bytes
  accept?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onUploadComplete,
  onUploadError,
  maxSize = 500 * 1024 * 1024, // 500MB default
  accept = 'video/mp4,video/webm,video/quicktime,video/x-msvideo',
  className = '',
  label = 'Upload Video',
  required = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<VideoUploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    // Reset state
    setError(null);
    setUploadProgress(0);
    setIsUploading(true);

    // Validate file
    const validation = validateVideoFile(file, maxSize);
    if (!validation.valid) {
      setError(validation.error || 'Invalid video file');
      setIsUploading(false);
      onUploadError?.(new Error(validation.error || 'Invalid video file'));
      return;
    }

    try {
      const result = await uploadVideo(file, {
        maxSize,
        onProgress: (progress) => {
          setUploadProgress(progress);
        },
      });

      setUploadedVideo(result);
      setIsUploading(false);
      setUploadProgress(100);
      onUploadComplete?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload video';
      setError(errorMessage);
      setIsUploading(false);
      setUploadProgress(0);
      onUploadError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [maxSize, onUploadComplete, onUploadError]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setUploadedVideo(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {uploadedVideo ? (
        <div className="relative p-4 border border-green-500/30 bg-green-500/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-foreground">Video uploaded successfully</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(uploadedVideo.size)}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <video
            src={uploadedVideo.url}
            controls
            className="mt-4 w-full rounded-lg max-h-64"
          />
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 transition-colors',
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50',
            error && 'border-red-500 bg-red-500/10',
            isUploading && 'border-primary bg-primary/5'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
            required={required}
          />

          <div className="flex flex-col items-center justify-center text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-sm font-medium text-foreground mb-2">Uploading video...</p>
                <div className="w-full max-w-xs bg-muted rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
              </>
            ) : error ? (
              <>
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                  Upload failed
                </p>
                <p className="text-xs text-muted-foreground mb-4">{error}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null);
                    fileInputRef.current?.click();
                  }}
                >
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm font-medium text-foreground mb-2">
                  Drop video here or click to upload
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  MP4, WebM, MOV, or AVI (max {formatFileSize(maxSize)})
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Select Video
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;

