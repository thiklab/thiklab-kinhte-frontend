import { OG_SIZE, renderOg } from "@/lib/seo/og";

export const runtime = "nodejs";
export const alt = "Kinh Tế Niên Biểu — Kinh tế Việt Nam so sánh với thế giới";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Kinh tế Việt Nam & Thế giới",
    subtitle: "Đối chiếu Việt Nam – Trung Quốc – Thế giới theo từng mốc năm",
  });
}
