import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import homeen from './languages/home/en';
import homehi from './languages/home/hi';
import abouthi from './languages/about/hi';
import abouten from './languages/about/en';
import navbarEnglishText from './languages/navbar/en';
import navbarHindiText from './languages/navbar/hi';


const resources = {
  en:{
    home :  homeen,
    about : abouten,
    navbar : navbarEnglishText
  },
  hi:{
    home : homehi,
    about : abouthi,
    navbar : navbarHindiText
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'hi',
    debug: false,
    resources, 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
