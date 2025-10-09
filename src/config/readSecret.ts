import * as fs from 'fs';
import * as path from 'path';

/**
 * Đọc secret từ /run/secrets nếu có, nếu không thì trả về fallback từ process.env
 */
export function readSecret(secretName: string, fallback?: string): string | undefined {
  const secretPath = path.join('/run/secrets', secretName);

  try {
    if (fs.existsSync(secretPath)) {
      const value = fs.readFileSync(secretPath, 'utf8').trim();
      if (value) return value;
    }
  } catch {
    // ignore errors (e.g., permission denied, file not found)
  }

  return fallback;
}
