'use client';

import React, { forwardRef, useState } from "react";
import Text from "./Text";
import styles from "./css/navButton.module.css";
import { useTranslation } from "react-i18next";
import GlobalColors from "@/utils/Colors";

interface NavButtonsProps {
  onclick: () => void;
  text: string;
  inlinks?: string[];
  subFeild: string;
  index: number;
}

const NavButtons = forwardRef<HTMLDivElement, NavButtonsProps>(
  ({ onclick, text, inlinks = [], subFeild, index }, ref) => {
    const { t } = useTranslation();
    const colors = GlobalColors();
    const [highlighter, setHighlighter] = useState(false);

    return (
      <div
        ref={ref}
        className={styles.NavWrapper}
        data-aos="fade-up"
        data-aos-delay={`${100 * index}`}
        style={{
          backgroundColor: highlighter ? colors?.BACKGROUND.highleter : "transparent",
        }}
        onMouseEnter={() => setHighlighter(true)}
        onMouseLeave={() => setHighlighter(false)}
      >
        <button onClick={onclick} className={styles.NavButton}>
          <Text text={t(`navbar:${text}`)} />
          {inlinks.length > 0 && (
            <span className={styles.icon} style={{ color: colors?.TEXT.primary, fontSize: 10 }}>
              ▼
            </span>
          )}
        </button>

        {inlinks.length > 0 && (
          <div className={styles.dropDown} style={{ backgroundColor: colors?.BACKGROUND.highleter }}>
            {inlinks.map((link, i) => (
              <Text key={i} text={t(`navbar:${subFeild}.${link}`)} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavButtons.displayName = "NavButtons";

export default NavButtons;
