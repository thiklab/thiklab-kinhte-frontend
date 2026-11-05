import React from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Kinh tế Việt Nam qua các mốc năm",
    description:
      "Theo dõi các mốc phát triển kinh tế Việt Nam và so sánh với thế giới, kèm tư liệu tham khảo từ Wikipedia tiếng Việt.",
    path: "/",
  }),
  title: { absolute: "Kinh Tế Niên Biểu — Kinh tế Việt Nam so sánh với thế giới" },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-14 sm:py-20 lg:py-28 px-4 sm:px-6 text-center border-b border-paper-300/40 bg-gradient-to-b from-paper-100/50 via-paper-50 to-paper-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/10 border border-crimson/20 text-crimson text-xs font-sans tracking-wide">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            <span>Khai phá Dữ liệu Mở Wikipedia theo Chuẩn Mới</span>
          </div>

          <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-serif text-paper-900 tracking-tight leading-[1.15]">
            Đối chiếu kinh tế <br />
            <span className="italic text-crimson font-normal">Việt Nam & Thế giới</span>
          </h1>

          <p className="text-base sm:text-xl font-serif text-paper-800/80 max-w-2xl mx-auto leading-relaxed">
            Theo dõi các chỉ số và sự kiện kinh tế Việt Nam, đồng thời đối chiếu với bối cảnh thế giới.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link prefetch={false}
              href="/economy"
              className="px-6 py-3.5 rounded-full bg-paper-900 text-paper-50 font-serif text-sm hover:bg-crimson transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Khám phá dữ liệu kinh tế</span>
              <Icon name="chevron-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto" aria-labelledby="gioi-thieu">
        <h2 id="gioi-thieu" className="text-2xl font-serif text-paper-900 mb-4">
          Kinh Tế Niên Biểu dùng để làm gì?
        </h2>
        <p className="font-serif text-paper-800/90 leading-relaxed">
          Kinh Tế Niên Biểu giúp theo dõi các mốc phát triển kinh tế Việt Nam và so sánh với thế giới từ năm 1986 đến nay.
          Khám phá dữ liệu kinh tế qua <Link prefetch={false} className="text-crimson underline" href="/economy">trang đối chiếu kinh tế</Link>.
        </p>
      </section>
    </main>
  );
}
