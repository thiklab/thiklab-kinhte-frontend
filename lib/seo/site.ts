export const SITE_NAME = "Nhịp Kinh Tế";

export const SITE_DESCRIPTION =
  "Đối chiếu kinh tế Việt Nam với thế giới theo từng mốc năm từ Đổi Mới 1986 đến nay, kèm tư liệu tham khảo từ Wikipedia tiếng Việt.";

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (productionHost ? `https://${productionHost}` : "https://kinhte.thich.in")
).replace(/\/+$/, "");

// Ngày biên soạn nội dung tĩnh gần nhất; cập nhật khi sửa dữ liệu dòng thời gian
export const CONTENT_LAST_MODIFIED = "2026-11-05";

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
