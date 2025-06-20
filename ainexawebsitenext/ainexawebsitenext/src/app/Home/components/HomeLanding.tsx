'use client';

import React, { useState, useEffect } from 'react';
import Text from '@/componets/Text';
import styles from '../css/HomeLanding.module.css';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import GlobalColors from '@/utils/Colors';

const phrases = [
  'we understand it,',
  'we compare it,',
  'we unlock its true value.',
];

const HomeLanding = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const colors = GlobalColors();

  useEffect(() => {
    const phrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < phrase.length) {
        setDisplayedText(phrase.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(phrase.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTimeout(() => {
          setIsDeleting(!isDeleting);
          if (!isDeleting) {
            setTimeout(() => setIsDeleting(true), 1000);
          } else {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }, 400);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex]);

  const features = [
    {
      src: '/Images/dataBase.png',
      title: 'Collecting the Data',
      desc: 'Gather raw data from diverse sources, both on-premise and cloud.',
    },
    {
      src: '/Images/analysis.png',
      title: 'Analyze by NexaBot',
      desc: 'Use AI-powered NexaBot to process and examine metadata.',
    },
    {
      src: '/Images/bestFeature.png',
      title: 'Find the Best Features',
      desc: 'Identify the most relevant patterns and features in the data.',
    },
    {
      src: '/Images/graphImage.png',
      title: 'Graphical Insights',
      desc: 'Visualize trends and insights with detailed, dynamic graphs.',
    },
    {
      src: '/Images/report.png',
      title: 'Generate Final Report',
      desc: 'Deliver concise, actionable reports with key takeaways.',
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
        <source src="/videos/Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.homeContent}>
        <div className={styles.homeText}>
          <Text text="NexaBot" tag="h1" fontSize={35} />
          <Text text="At Ainexa, we don’t just analyze data — " fontSize={25} />
          <Text text={displayedText} fontSize={25} />
          <button>
            <Text text="Explore NexaBot" fontSize={22} />
          </button>
          <FaChevronDown
            style={{
              color: colors?.TEXT.primary,
              fontSize: 40,
              paddingLeft: '45%',
              paddingTop: '15%',
            }}
          />
        </div>
      </div>

      <div className={styles.dataOperationWrapper}>
        <Text text="How We Do Data" tag="h1" fontSize={40} />
        <div className={styles.dataOperations}>
          {features.map((item, i) => (
            <div className={styles.operationStep} key={i}>
              <Image src={item.src} alt={item.title} width={80} height={80} />
              <Text tag="h3" text={item.title} fontSize={20} fontWeight="600" />
              <Text tag="p" text={item.desc} fontSize={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLanding;
