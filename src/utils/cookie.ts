import { serialize, SerializeOptions } from 'cookie';

export function createCookie(
  name: string,
  value: string,
  path?: string,
  maxAge?: number
): string {
  const domain = process.env.FRONTEND_DOMAIN;
  const cookieOptions: SerializeOptions = {
    httpOnly: true,                        // chỉ truy cập qua HTTP(S)
    secure: true,                          // cookie chỉ gửi qua HTTPS
    sameSite: "none",                     // hoặc 'none' nếu cross-site
    maxAge: maxAge ? maxAge : undefined,
    path: path || "/",                      // mặc định path = "/"
    ...(domain ? { domain: domain.startsWith(".") ? domain : `.${domain}` } : {}),
  };

  return serialize(name, value, cookieOptions);
}
