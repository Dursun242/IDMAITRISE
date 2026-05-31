import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const runtime = "edge"
export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E0F11",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* halo */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "9999px",
            background: "#C97B3A",
            opacity: 0.35,
            filter: "blur(120px)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "9999px",
              background: "#C97B3A",
            }}
          />
          <div
            style={{
              color: "#F4EFE6",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            ID Maîtrise
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              color: "#F4EFE6",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            Maître d'œuvre au Havre
          </div>
          <div
            style={{
              color: "#C97B3A",
              fontSize: 76,
              fontStyle: "italic",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            & en Normandie.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(244,239,230,0.7)",
            fontSize: 26,
          }}
        >
          <div>Construction · Extension · Rénovation</div>
          <div>{site.phoneDisplay}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
