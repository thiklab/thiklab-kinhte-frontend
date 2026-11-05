import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { EconomyEventDetail } from "@/components/economy/EconomyEventDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { ECO_E } from "@/lib/constants/economy-data";
import { articleLd, breadcrumbLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/meta";
import { economyEventHref, economyEventSlug } from "@/lib/seo/economy";
import { fetchWikiArticle } from "@/lib/wikipedia/client";
import { CONTENT_LAST_MODIFIED } from "@/lib/seo/site";

type EventPageProps = {
  params: Promise<{ year: string; slug: string }>;
};

export const dynamic = "force-dynamic";

function findEvent(yearParam: string, slug: string) {
  const year = Number(yearParam);
  if (!Number.isInteger(year)) return null;
  return ECO_E.find((event) => event[1] === year && economyEventSlug(event) === slug) ?? null;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { year, slug } = await params;
  const event = findEvent(year, slug);
  if (!event) return { title: "Không tìm thấy sự kiện", robots: { index: false } };

  return buildMetadata({
    title: `${event[2]} (${event[1]})`,
    description: `Thông tin sự kiện kinh tế ${event[2]} năm ${event[1]}.`,
    path: economyEventHref(event),
    type: "article",
  });
}

export default async function EconomyEventPage({ params }: EventPageProps) {
  const { year, slug } = await params;
  const event = findEvent(year, slug);
  if (!event) notFound();

  const canonical = economyEventHref(event);
  if (`/economy/${year}/${slug}` !== canonical) permanentRedirect(canonical);
  const article = await fetchWikiArticle(event[2]);

  return (
    <>
      <JsonLd
        data={[
          ...(article
            ? [
                articleLd({
                  headline: article.displayTitle,
                  description: article.summary?.extract || event[2],
                  path: canonical,
                  basedOn: article.originalUrl,
                  dateModified: article.summary?.timestamp ?? CONTENT_LAST_MODIFIED,
                  image: article.summary?.thumbnail?.source,
                }),
              ]
            : []),
          breadcrumbLd([
            { name: "Trang chủ", path: "/" },
            { name: "Kinh tế Việt Nam & Thế giới", path: "/economy" },
            { name: `${event[2]} (${event[1]})`, path: canonical },
          ]),
        ]}
      />
      <EconomyEventDetail event={event} article={article} />
    </>
  );
}
