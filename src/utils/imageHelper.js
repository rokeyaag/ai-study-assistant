/**
 * Image helper utility to process and optimize user-uploaded avatars
 * Resizes images on the client side via canvas to keep localStorage light & fast
 */
export const processImageFile = (file, maxWidth = 360, maxHeight = 360, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected"));
    }

    if (!file.type.startsWith('image/')) {
      return reject(new Error("Please select a valid image file (JPG, PNG, WEBP)"));
    }

    if (file.size > 15 * 1024 * 1024) {
      return reject(new Error("Image size exceeds 15MB. Please choose a smaller image."));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Error reading image file"));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not decode image"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return resolve(event.target.result);
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};
