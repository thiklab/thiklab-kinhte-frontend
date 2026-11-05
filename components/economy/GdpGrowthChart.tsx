"use client";

import { useEffect, useRef } from "react";
import {
  CategoryScale,
  Chart,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import "./economy.css";
import { GDP_SERIES, GDP_START } from "@/lib/constants/gdp-growth";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const END = GDP_START + GDP_SERIES[0].data.length - 1;
const LABELS = GDP_SERIES[0].data.map((_, i) => String(GDP_START + i));
const fmt = (v: number) => v.toFixed(1).replace(".", ",");

export function GdpGrowthChart() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const chart = new Chart(canvas.current, {
      type: "line",
      data: {
        labels: LABELS,
        datasets: GDP_SERIES.map((s) => ({
          label: s.label,
          data: [...s.data],
          borderColor: s.color,
          backgroundColor: s.color,
          borderWidth: s.key === "vn" ? 3 : 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.25,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { position: "top", labels: { usePointStyle: true, boxWidth: 8 } },
          tooltip: {
            callbacks: { label: (c) => `${c.dataset.label}: ${fmt(c.parsed.y ?? 0)}%` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { maxTicksLimit: 9, maxRotation: 0 } },
          y: {
            min: -4,
            max: 16,
            ticks: { stepSize: 4, callback: (v) => `${v}%` },
            grid: { color: "#e3dccf" },
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section className="eco-chart in" aria-labelledby="gdp-chart-title">
      <h1 id="gdp-chart-title">Tăng trưởng GDP: Việt Nam so với Trung Quốc và Mỹ</h1>
      <p className="eco-chart-sub">
        Tốc độ tăng GDP thực hằng năm, {GDP_START}–{END} (%). Nhấn vào tên nước để ẩn/hiện đường.
      </p>
      <div className="eco-chart-box">
        <canvas
          ref={canvas}
          role="img"
          aria-label="Biểu đồ đường tăng trưởng GDP của Việt Nam, Trung Quốc và Mỹ"
        />
      </div>
      <p className="eco-chart-note">
        Nguồn: World Bank, Tổng cục Thống kê Việt Nam, Cục Phân tích Kinh tế Mỹ (BEA); số liệu làm tròn, năm gần nhất là ước tính.
      </p>
    </section>
  );
}
