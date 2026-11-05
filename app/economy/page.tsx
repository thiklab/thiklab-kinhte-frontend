import type { Metadata } from "next";
import { EconomyTimeline } from "@/components/economy/EconomyTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata({
  title: "Kinh tế Việt Nam & Thế giới 1986–2026: đối chiếu theo mốc thời gian",
  description:
    "Đối chiếu giai đoạn và sự kiện kinh tế Việt Nam với kinh tế thế giới từ Đổi Mới 1986 đến 2026 trên cùng một thước thời gian.",
  path: "/economy",
});

export default function EconomyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Trang chủ", path: "/" },
          { name: "Kinh tế Việt Nam & Thế giới", path: "/economy" },
        ])}
      />
      <EconomyTimeline />
    </>
  );
}
