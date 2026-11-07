import Image from "next/image";
import type { HouseKey } from "@/lib/site";
import { C54Logo } from "./c54-logo";

// Company logo tiles from Nav / Dropdown (lg, 168×146.72) and
// Nav / Mobile menu (sm, 64×55.893). Measurements are from Figma.
// Brand tiles keep fixed colours in both themes.

type Size = "lg" | "sm";

const box: Record<Size, string> = {
  lg: "h-[146.72px] w-[168px] rounded-[8.96px]",
  sm: "h-[55.893px] w-16 rounded-[5.12px]",
};

export function HouseTile({ house, size }: { house: HouseKey; size: Size }) {
  const lg = size === "lg";
  const base = `relative shrink-0 overflow-clip ${box[size]}`;

  if (house === "c54") {
    return (
      <div className={`${base} bg-c54-blue`}>
        <C54Logo
          className="inset-x-0 top-1/2 h-[92.8%] -translate-y-1/2"
          sizes={lg ? "168px" : "64px"}
        />
      </div>
    );
  }

  if (house === "f1") {
    return (
      <div className={`${base} bg-neutral-950`}>
        <Image
          src="/images/site/logo-f1-digital.webp"
          alt="F1 Digital"
          width={320}
          height={133}
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover ${
            lg
              ? "left-[calc(50%-6.16px)] h-[62.892px] w-[151.76px]"
              : "left-[calc(50%-2.35px)] h-[23.959px] w-[57.813px]"
          }`}
        />
      </div>
    );
  }

  if (house === "foanl") {
    return (
      <div className={`${base} bg-white`}>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            lg
              ? "-mt-[2.24px] ml-[0.56px] h-[128.151px] w-[155.68px]"
              : "-mt-[0.85px] ml-[0.21px] h-[48.82px] w-[59.307px]"
          }`}
        >
          <Image
            src="/images/site/logo-foanl.webp"
            alt="FOANL"
            width={320}
            height={139}
            className="absolute top-[27.04%] left-[3.05%] h-[48.77%] w-[92.38%] max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG */}
        <img
          src={
            lg
              ? "/images/site/foanl-ellipse.svg"
              : "/images/site/mm-foanl-ellipse.svg"
          }
          alt=""
          className={`absolute max-w-none ${lg ? "top-[-78.4px] left-[111.72px] size-[123.2px]" : "top-[-29.87px] left-[42.56px] size-[46.933px]"}`}
        />
      </div>
    );
  }

  if (house === "afrixx") {
    return (
      <div className={`${base} bg-black`}>
        <Image
          src="/images/site/logo-afrixxstreams.webp"
          alt="AfrixxStreams"
          width={320}
          height={110}
          className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover ${
            lg
              ? "left-[calc(50%-6.16px)] h-[51.384px] w-[149.52px]"
              : "left-[calc(50%-2.35px)] h-[19.575px] w-[56.96px]"
          }`}
        />
      </div>
    );
  }

  // Future One Studios
  return (
    <div
      className={base}
      style={{
        backgroundImage:
          "linear-gradient(138.87deg, #3b0b8c 14.286%, #c026d3 85.714%)",
      }}
    >
      <div
        className={`absolute top-0 overflow-hidden ${lg ? "left-[-5.88px] h-[146.72px] w-[179.76px]" : "left-[-2.24px] h-[55.893px] w-[68.48px]"}`}
      >
        <Image
          src="/images/site/logo-future-one-studios.webp"
          alt="Future One Studios"
          width={600}
          height={600}
          className="absolute top-[-45.04%] left-[-37%] h-[198.73%] w-[162.2%] max-w-none"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG */}
      <img
        src={
          lg
            ? "/images/site/future-grid.svg"
            : "/images/site/mm-future-grid.svg"
        }
        alt=""
        className={`absolute top-0 left-0 max-w-none ${lg ? "h-[146.72px] w-[179.76px]" : "h-[55.893px] w-[68.48px]"}`}
      />
    </div>
  );
}
