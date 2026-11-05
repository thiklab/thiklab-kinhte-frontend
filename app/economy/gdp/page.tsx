import type { Metadata } from "next";
import Link from "next/link";
import { GdpGrowthChart } from "@/components/economy/GdpGrowthChart";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = buildMetadata({
  title: "Tăng trưởng GDP: Việt Nam so với Trung Quốc và Mỹ (1986–2025)",
  description:
    "Biểu đồ so sánh tốc độ tăng GDP thực hằng năm của Việt Nam, Trung Quốc và Mỹ từ năm 1986 đến nay.",
  path: "/economy/gdp",
});

export default function GdpPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Trang chủ", path: "/" },
          { name: "Kinh tế Việt Nam & Thế giới", path: "/economy" },
          { name: "Tăng trưởng GDP", path: "/economy/gdp" },
        ])}
      />
      <div className="eco">
        <div className="in eco-chart-page">
          <Link href="/economy" className="eco-back">← Quay lại trang kinh tế</Link>
        </div>
        <GdpGrowthChart />
      </div>
    </>
  );
}
