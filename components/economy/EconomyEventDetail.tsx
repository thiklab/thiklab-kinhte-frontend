import Link from "next/link";
import { ECO_E, ECO_N, ECO_NAMES, ECO_R, type EconomyEvent, type EconomyLane } from "@/lib/constants/economy-data";
import type { WikiArticle } from "@/types/history";
import { economyEventHref } from "@/lib/seo/economy";

const formatUtcDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
};

function phaseAt(lane: EconomyLane, year: number) {
  const phases = ECO_R[lane];
  let index = 0;
  phases.forEach((phase, i) => {
    if (phase[0] <= year) index = i;
  });
  return { phase: phases[index], end: phases[index + 1]?.[0] ?? null };
}

export function EconomyEventDetail({ event, article }: { event: EconomyEvent; article: WikiArticle | null }) {
  const [lane, year, title] = event;
  const { phase, end } = phaseAt(lane, year);
  const relatedEvents = ECO_E.filter((item) => item[1] === year && item !== event);
  const comparison = ECO_N[year];

  return (
    <main className="eco-detail">
      <header className="eco-detail-header">
        <div className="eco-detail-header-inner">
          <Link className="eco-detail-back" href={`/economy#y${year}`}>
            <span aria-hidden="true">←</span>
            <span>Quay lại đối chiếu kinh tế</span>
          </Link>
          <div className="eco-detail-kicker">
            {ECO_NAMES[lane]} · {year}
          </div>
          <h1>{article?.displayTitle ?? title}</h1>
          <p className="eco-detail-lead">
            {article?.summary?.description ??
              `Mốc kinh tế ${ECO_NAMES[lane]} năm ${year}, trong giai đoạn ${phase[1]}.`}
          </p>
        </div>
      </header>

      <div className="eco-detail-content">
        <article className="eco-detail-article">
          {article ? (
            <>
              {article.summary?.extract && (
                <div className="eco-detail-summary">{article.summary.extract}</div>
              )}
              <div
                className="prose-editorial eco-detail-prose"
                dangerouslySetInnerHTML={{ __html: article.cleanHtml }}
              />
              <footer className="eco-detail-source">
                Nội dung được trích từ{" "}
                <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                  “{article.displayTitle}” trên Wikipedia tiếng Việt
                </a>
                , theo giấy phép{" "}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.vi" target="_blank" rel="noopener noreferrer">
                  CC BY-SA 4.0
                </a>
                .
                {article.summary?.timestamp && (
                  <>
                    {" "}Cập nhật lần cuối:{" "}
                    <time dateTime={article.summary.timestamp}>
                      {formatUtcDate(article.summary.timestamp)}
                    </time>
                    .
                  </>
                )}
              </footer>
            </>
          ) : (
            <div className="eco-detail-unavailable" role="status">
              <h2>Chưa tải được nội dung đầy đủ</h2>
              <p>
                Hiện chưa tìm thấy bài viết tương ứng trên Wikipedia tiếng Việt. Thử tìm theo tên sự kiện để xem
                nội dung và nguồn liên quan.
              </p>
              <a
                href={`https://vi.wikipedia.org/w/index.php?search=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tìm “{title}” trên Wikipedia tiếng Việt
              </a>
            </div>
          )}
        </article>

        <aside className="eco-detail-aside" aria-label="Thông tin sự kiện">
          <h2>Thông tin mốc năm</h2>
          <dl>
            <dt>Năm</dt>
            <dd>{year}</dd>
            <dt>Phạm vi</dt>
            <dd>{ECO_NAMES[lane]}</dd>
            <dt>Giai đoạn</dt>
            <dd>{phase[1]}</dd>
            <dt>Thời gian</dt>
            <dd>
              {phase[0]}–{end ?? "nay"}
            </dd>
          </dl>
          {comparison && (
            <div className="eco-detail-related">
              <h3>Đối chiếu cùng năm</h3>
              <p>{comparison}</p>
            </div>
          )}
          {article && article.toc.length > 0 && (
            <nav className="eco-detail-related" aria-label="Mục lục bài viết">
              <h3>Mục lục bài viết</h3>
              {article.toc.map((item) => (
                <a className="eco-detail-toc-link" key={item.id} href={`#${item.id}`}>
                  {item.text}
                </a>
              ))}
            </nav>
          )}
          {relatedEvents.length > 0 && (
            <div className="eco-detail-related">
              <h3>Cùng năm</h3>
              {relatedEvents.map((item) => (
                <Link key={`${item[0]}-${item[1]}-${item[2]}`} href={economyEventHref(item)}>
                  {ECO_NAMES[item[0]]}: {item[2]}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
