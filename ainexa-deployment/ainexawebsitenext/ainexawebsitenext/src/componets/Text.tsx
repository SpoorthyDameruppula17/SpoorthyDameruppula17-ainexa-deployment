import React, { useEffect, useState } from "react";
import GlobalColors from "@/utils/Colors";
import { ThemeColors } from "@/utils/Types";

interface TextProps {
  text: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  colorType?: keyof ThemeColors["TEXT"];
  tag?: keyof HTMLElementTagNameMap;
}

const BASE_SCREEN_WIDTH = 1440;

const MIN_FONT_SIZES: Partial<Record<keyof HTMLElementTagNameMap, number>>= {
  h1: 28,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 18,
  h6: 18,
  p: 18,
  span: 18,
  div: 14,
  label: 12,
  strong: 13,
  em: 13,
  small: 10,
} as const;

const Text: React.FC<TextProps> = ({
  text,
  color,
  fontFamily = "open sans",
  fontSize = 16,
  fontWeight,
  style = {},
  onClick,
  colorType = "primary",
  tag = "span",
}) => {
  const globalColors = GlobalColors();
  const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize);

  useEffect(() => {
    const updateFontSize = () => {
      const currentWidth = window.innerWidth;
      const scale = currentWidth / BASE_SCREEN_WIDTH;
      const minFontSize = MIN_FONT_SIZES[tag] || 12;
      const newFontSize = Math.max(minFontSize, Math.round(fontSize * scale));
      setResponsiveFontSize(newFontSize);
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, [fontSize, tag]);

  const combinedStyle: React.CSSProperties = {
    color: color || globalColors?.TEXT[colorType] || "red",
    fontFamily,
    fontSize: responsiveFontSize,
    fontWeight,
    cursor: onClick ? "pointer" : "inherit",
    ...style,
  };

  const Component = tag as keyof HTMLElementTagNameMap;
  return (
    <Component style={combinedStyle} onClick={onClick}>
      {text}
    </Component>
  );
};

export default Text;
