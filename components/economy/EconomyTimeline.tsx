"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./economy.css";
import {
  ECO_E,
  ECO_KEYS,
  ECO_LANES,
  ECO_MAX,
  ECO_MIN,
  ECO_N,
  ECO_NAMES,
  ECO_R,
  ECO_TAGS,
  type EconomyLane,
} from "@/lib/constants/economy-data";
import { economyEventHref } from "@/lib/seo/economy";

const WINDOWS = [1, 3, 5, 10];
const STEPS: [number, string][] = [[-5, "−5"], [-1, "−1"], [1, "+1"], [5, "+5"]];
const DECADES = [1990, 2000, 2010, 2020];

const clamp = (y: number) => Math.max(ECO_MIN, Math.min(ECO_MAX, Math.round(y)));
const pos = (y: number) => (y - ECO_MIN) / (ECO_MAX - ECO_MIN);

function phaseAt(lane: EconomyLane, y: number) {
  const a = ECO_R[lane];
  let k = 0;
  a.forEach((r, i) => {
    if (r[0] <= y) k = i;
  });
  return { phase: a[k], end: a[k + 1] ? a[k + 1][0] : null };
}

function yearFromHash(): number | null {
  const m = /^#y(\d{4})$/.exec(window.location.hash);
  return m ? clamp(+m[1]) : null;
}

export function EconomyTimeline() {
  const [year, setYear] = useState(2008);
  const [win, setWin] = useState(3);
  const ruler = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const set = useCallback((y: number) => {
    const v = clamp(y);
    setYear(v);
    try {
      window.history.replaceState(null, "", `#y${v}`);
    } catch {}
  }, []);

  useEffect(() => {
    const apply = () => {
      const y = yearFromHash();
      if (y !== null) setYear(y);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const fromPointer = (e: React.PointerEvent) => {
    const r = ruler.current!.getBoundingClientRect();
    set(ECO_MIN + Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * (ECO_MAX - ECO_MIN));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const m = ({ ArrowLeft: -1, ArrowRight: 1, PageDown: -5, PageUp: 5 } as Record<string, number>)[e.key];
    if (m) {
      e.preventDefault();
      set(year + m);
    }
  };

  const noteKey = Object.keys(ECO_N)
    .map(Number)
    .filter((k) => Math.abs(k - year) <= Math.max(win, 1))
    .sort((a, b) => Math.abs(a - year) - Math.abs(b - year))[0];

  return (
    <div className="eco">
      <header className="eco-hd">
        <h1>Kinh tế Việt Nam &amp; Thế giới, 1986–2026</h1>
        <p>Chọn một năm để xem hai bên đang ở giai đoạn nào và điều gì xảy ra quanh mốc đó.</p>
      </header>

      <section className="stage" aria-label="Thanh thời gian">
        <div className="in">
          <div className="row">
            <div className="year">{year}</div>
            <div className="steps">
              {STEPS.map(([d, t]) => (
                <button key={d} type="button" onClick={() => set(year + d)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={ruler}
            className="ruler"
            tabIndex={0}
            role="slider"
            aria-label="Năm"
            aria-valuemin={ECO_MIN}
            aria-valuemax={ECO_MAX}
            aria-valuenow={year}
            onKeyDown={onKey}
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              fromPointer(e);
            }}
            onPointerMove={(e) => dragging.current && fromPointer(e)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <div className="dec">
              {DECADES.map((d) => (
                <span key={d} style={{ left: `${pos(d) * 100}%` }}>
                  {d}
                </span>
              ))}
            </div>
            {ECO_LANES.map((l) => (
              <div key={l} className={`lane ${l}`}>
                <span className="tag">{ECO_TAGS[l]}</span>
                {ECO_R[l].map((r, i, a) => {
                  const n = a[i + 1] ? a[i + 1][0] : ECO_MAX;
                  return (
                    <i
                      key={r[0]}
                      style={{ left: `${pos(r[0]) * 100}%`, width: `${(pos(n) - pos(r[0])) * 100}%` }}
                      title={`${r[1]} (${r[0]} – ${a[i + 1] ? n : "nay"})`}
                    >
                      {r[1]}
                    </i>
                  );
                })}
              </div>
            ))}
            <div className="ph" style={{ left: `calc(${pos(year) * 100}% - 1px)` }} />
          </div>
          <div className="ctl">
            <span>Biên độ:</span>
            {WINDOWS.map((w) => (
              <button key={w} type="button" className={`chip${w === win ? " on" : ""}`} onClick={() => setWin(w)}>
                ±{w}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="eco-main">
        <div className="grid">
          {ECO_LANES.map((l) => {
            const { phase, end } = phaseAt(l, year);
            let ev = ECO_E.filter((e) => e[0] === l && Math.abs(e[1] - year) <= win).sort((a, b) => a[1] - b[1]);
            let near = false;
            if (!ev.length) {
              const all = ECO_E.filter((e) => e[0] === l).sort((a, b) => Math.abs(a[1] - year) - Math.abs(b[1] - year));
              if (all[0]) {
                ev = [all[0]];
                near = true;
              }
            }
            return (
              <div key={l} className={`card ${l}`}>
                <div className="lab">{ECO_NAMES[l]}</div>
                <div className="reg">{phase[1]}</div>
                <div className="rng">
                  {phase[0]} – {end ?? "nay"}
                </div>
                {near && <div className="none">Không có sự kiện trong ±{win} năm. Gần nhất:</div>}
                {ev.map((e) => {
                  const d = e[1] - year;
                  const o = d === 0 ? "đúng năm này" : `${d > 0 ? "sau " : "trước "}${Math.abs(d)} năm`;
                  return (
                    <Link
                      key={`${e[1]}-${e[2]}`}
                      href={economyEventHref(e)}
                      className={`ev${d === 0 ? " now" : ""}`}
                    >
                      <b>{e[2]}</b>
                      <em>
                        {e[1]} · {o}
                      </em>
                    </Link>
                  );
                })}
              </div>
            );
          })}
          <div className="note">
            {noteKey ? (
              <>
                <b>Đọc đối chiếu · {noteKey}</b>
                {ECO_N[noteKey]}
              </>
            ) : (
              <>
                <b>Đọc đối chiếu</b>
                Chọn một mốc bản lề bên dưới để xem nhận định ngắn về mối liên hệ giữa hai bên.
              </>
            )}
          </div>
        </div>
        <div className="key">
          <h2>Mốc bản lề — bấm để đối chiếu</h2>
          <div className="keys">
            {ECO_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                className="chip"
                onClick={() => {
                  set(k);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="in eco-gdp-link">
        <Link href="/economy/gdp">Xem biểu đồ tăng trưởng GDP: Việt Nam so với Trung Quốc, Mỹ và Thái Lan →</Link>
      </div>

      <footer className="eco-ft">
        Số liệu 2025–2026 là số sơ bộ (Cục Thống kê, Trading Economics); cần đối chiếu nguồn chính thức trước khi trích
        dẫn. Phần “Đọc đối chiếu” là nhận định tóm lược, không phải số liệu thống kê.
      </footer>
    </div>
  );
}
