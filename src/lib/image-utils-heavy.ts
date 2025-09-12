// Heavy image processing utilities - lazy loaded only when needed

/**
 * Heavy image compression using Canvas API
 */
export const compressImageHeavy = async (
  file: File,
  quality: number = 0.8,
  maxWidth: number = 1920
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Heavy image resizing using Canvas API
 */
export const resizeImageHeavy = async (
  src: string,
  width: number,
  height: number,
  quality: number = 0.9
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);
      
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(dataUrl);
    };

    img.onerror = () => reject(new Error('Failed to load image for resizing'));
    img.src = src;
  });
};

/**
 * Heavy WebP conversion using Canvas API
 */
export const convertToWebPHeavy = async (
  src: string,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx?.drawImage(img, 0, 0);
      
      // Try to convert to WebP
      try {
        const webpDataUrl = canvas.toDataURL('image/webp', quality);
        
        // Check if WebP is actually supported
        if (webpDataUrl.startsWith('data:image/webp')) {
          resolve(webpDataUrl);
        } else {
          // Fallback to JPEG
          resolve(canvas.toDataURL('image/jpeg', quality));
        }
      } catch (error) {
        // Fallback to JPEG if WebP fails
        resolve(canvas.toDataURL('image/jpeg', quality));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image for WebP conversion'));
    img.src = src;
  });
};

/**
 * Heavy image optimization with multiple format support
 */
export const optimizeImageHeavy = async (
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): Promise<string> => {
  const {
    width,
    height,
    quality = 0.8,
    format = 'webp'
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate dimensions
      let newWidth = width || img.width;
      let newHeight = height || img.height;

      // Maintain aspect ratio if only one dimension is provided
      if (width && !height) {
        newHeight = (img.height * width) / img.width;
      } else if (height && !width) {
        newWidth = (img.width * height) / img.height;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Use high-quality image smoothing
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
      }

      // Convert to desired format
      const mimeType = `image/${format}`;
      
      try {
        const dataUrl = canvas.toDataURL(mimeType, quality);
        
        // Verify the format was actually supported
        if (dataUrl.startsWith(`data:${mimeType}`)) {
          resolve(dataUrl);
        } else {
          // Fallback to JPEG
          resolve(canvas.toDataURL('image/jpeg', quality));
        }
      } catch (error) {
        // Fallback to JPEG if the format fails
        resolve(canvas.toDataURL('image/jpeg', quality));
      }
    };

    img.onerror = () => reject(new Error('Failed to load image for optimization'));
    img.src = src;
  });
}; 