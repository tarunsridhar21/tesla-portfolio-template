import { ImageResponse } from "next/og";
import { IDENTITY } from "@/content/profile";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#171A20",
          borderRadius: 6,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: IDENTITY.accentHex,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          fontFamily: "sans-serif",
        }}
      >
        {IDENTITY.monogram}
      </div>
    ),
    { ...size }
  );
}
