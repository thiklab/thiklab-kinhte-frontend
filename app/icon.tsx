import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9B1C1C",
          color: "#FAF7F2",
          borderRadius: 14,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 36 36">
          <rect x="4" y="21" width="7" height="11" rx="1.5" fill="#FAF7F2" fillOpacity="0.6" />
          <rect x="14.5" y="15" width="7" height="17" rx="1.5" fill="#FAF7F2" fillOpacity="0.8" />
          <rect x="25" y="8" width="7" height="24" rx="1.5" fill="#FAF7F2" />
          <path d="M5 13l9-6 6 4 11-8" fill="none" stroke="#FAF7F2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size
  );
}
