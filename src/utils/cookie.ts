import { serialize, SerializeOptions } from 'cookie';


export function createCookie(name: string, value: string, path: string | undefined, maxAge: number | undefined): string {
    const cookieOptions: SerializeOptions = {
      httpOnly: true, // Chỉ có thể được truy cập qua HTTP(S) và không thông qua JavaScript
      secure: true,
      //process.env.ODE_ENV === 'production',  Chỉ sử dụng trên kết nối an toàn (HTTPS) trong môi trường production
      sameSite: `strict` , // Ngăn chặn việc gửi cookie từ trang web của một tên miền đến trang web của một tên miền khác
      maxAge: maxAge ? maxAge * 1000: undefined , // Tuỳ chọn: thời gian sống của cookie trong giây
      path: path, // Tuỳ chọn: đường dẫn của cookie
    };
    return serialize(name, value, cookieOptions);
  }