import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import slugify from "slugify";

/**
 * Generate R2 key for a face image under a character and category.
 * Example: naraka-faces/characters/kurumi/categories/cute/3bc0face-4a6e.jpg
 */
export function generateFaceStorageKey(
  originalname: string,
  characterSlug: string,
  qrSlug: string
): string {
  const ext = path.extname(originalname); // .jpg, .png, ...
  const filename = `${uuidv4()}${ext}`;
  return `img/characters/${characterSlug}/qr-code/${filename}`;
}

export function createGlobalFaceLock(
  originalname: string,
  characterSlug: string,
  qrSlug: string
): string {
  const ext = path.extname(originalname); // .jpg, .png, ...
  const filename = `${uuidv4()}${ext}`;
  return `img/characters/${characterSlug}/qr-code/${qrSlug}/globals/${filename}`;
}

export function createCNFaceLock(
  originalname: string,
  characterSlug: string,
  qrSlug: string
): string {
  const ext = path.extname(originalname); // .jpg, .png, ...
  const filename = `${uuidv4()}${ext}`;
  return `img/characters/${characterSlug}/qr-code/${qrSlug}/CN/${filename}`;
}

export function createImageReviewLock(
  originalname: string,
  characterSlug: string,
  qrSlug: string
): string {
  const ext = path.extname(originalname); // .jpg, .png, ...
  const filename = `${uuidv4()}${ext}`;
  return `img/characters/${characterSlug}/qr-code/${qrSlug}/${filename}`;
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
  const base = slugify(path.basename(originalname, ext));
  const timestamp = Date.now();
  return `img/characters/${characterSlug}/avatar-${base}-${timestamp}${ext}`;
}

export function generateCategoryKet(
  categoryName: string,
  originalname: string,
): string {
  const ext = path.extname(originalname);
  const base = slugify(path.basename(originalname, ext));
  const timestamp = Date.now();
  return `img/category/${categoryName}/cover-photo-${base}-${timestamp}${ext}`;
}