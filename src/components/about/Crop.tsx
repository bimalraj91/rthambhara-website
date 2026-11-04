import Image from "next/image";
import type { CSSProperties } from "react";

type Box = {
  left?: string;
  top?: string;
  width?: string;
  height?: string;
};

type CropProps = {
  src: string;
  alt?: string;
  sizes?: string;
  // Percent box the picture is stretched to inside its clipping parent,
  // taken straight from the Figma crop. Omit to fill the parent.
  box?: Box;
  cover?: boolean;
  unoptimized?: boolean;
  priority?: boolean;
  className?: string;
};

// A picture that fills (or is cropped inside) a positioned, overflow-hidden parent.
export default function Crop({
  src,
  alt = "",
  sizes = "50vw",
  box,
  cover = false,
  unoptimized,
  priority,
  className,
}: CropProps) {
  if (box) {
    // Stretched to the Figma crop box; the intrinsic size is only a hint.
    const style: CSSProperties = {
      position: "absolute",
      maxWidth: "none",
      objectFit: "fill",
      left: box.left ?? 0,
      top: box.top ?? 0,
      width: box.width ?? "100%",
      height: box.height ?? "100%",
    };

    return (
      <Image
        src={src}
        alt={alt}
        width={1000}
        height={1000}
        sizes={sizes}
        unoptimized={unoptimized}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={unoptimized}
      priority={priority}
      className={className}
      style={{ maxWidth: "none", objectFit: cover ? "cover" : "fill" }}
    />
  );
}
