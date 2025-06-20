'use client';

import React ,{useEffect} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './css/navBar.module.css';
import Text from '../componets/Text';
import NavButtons from '../componets/navButtons';
import ThemeToggle from '../componets/ThemeToggle';
import GlobalColors from '@/utils/Colors';

import Logo from './assets/images/websiteLogo.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import i18n from '@/utils/maintrsulater';

const Navbar = () => {
  const colors = GlobalColors();
  const router = useRouter();
  const selectedLanguage = useSelector((state : RootState) => state.language.language);

    useEffect(() =>{
        i18n.changeLanguage(selectedLanguage);
    },[selectedLanguage])

  const tabs = [
    {
      path: '/',
      label: 'HOME',
      inLinks: [],
      subFeild: 'HOMECONTENT'
    },
    {
      path: '/services',
      label: 'SOLUTIONBYINDUSTRY',
      inLinks: ['IT', 'Finance', 'Manufacturing', 'Education', 'Retail', 'HRTech', 'HEALTHCARE'],
      subFeild: 'SERVICESCONTENT'
    },
    {
      path: '/Casestudy',
      label: 'CASESTUDY',
      inLinks: [],
      subFeild: ''
    },
    {
      path: '/blogs',
      label: 'BLOGS',
      inLinks: [],
      subFeild: ''
    },
    {
      path: '/Contact',
      label: 'CONTACT',
      inLinks: [],
      subFeild: ''
    },
  ];

  return (
    <div className={styles.NavContainer} style={{ boxShadow: colors?.SHADOWS.light }}>
      <div className={styles.NavContainerWrapper}>
        <div className={styles.LogoSection}>
          <div className={styles.LogoIcon}>
            <Image src={Logo} alt="Logo" width={40} height={40} className={styles.LogoImage} />
          </div>
          <Text text="AINEXA" fontWeight="800" />
        </div>

        <div className={styles.NavButtons}>
          {tabs.map((tab, index) => (
            <NavButtons
              key={index}
              onclick={() => router.push(tab.path)}
              text={tab.label}
              inlinks={tab.inLinks}
              subFeild={tab.subFeild}
              index={index}
            />
          ))}
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
