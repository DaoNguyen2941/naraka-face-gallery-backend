import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

/**
 * Generate R2 key for a face image under a character and category.
 * Example: naraka-faces/characters/kurumi/categories/cute/3bc0face-4a6e.jpg
 */
export function generateFaceStorageKey(
  originalname: string,
  characterSlug: string,
  categorySlug: string,
): string {
  const ext = path.extname(originalname); // .jpg, .png, ...
  const filename = `${uuidv4()}${ext}`;
  return `img/characters/${characterSlug}/categories/${categorySlug}/${filename}`;
}

/**
 * Generate R2 key for a character avatar image.
 * Example: naraka-faces/characters/kurumi/avatar.jpg
 */
export function generateCharacterAvatarKey(
  characterSlug: string,
  originalname: string,
): string {
  const ext = path.extname(originalname);
  return `img/characters/${characterSlug}/avatar${ext}`;
}
