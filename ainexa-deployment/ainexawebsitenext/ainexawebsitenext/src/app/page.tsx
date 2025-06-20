'use client';

import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import i18n from "@/utils/maintrsulater";
import HomeLanding from "./Home/components/HomeLanding";

export default function Home() {

  const selectedLanguage = useSelector((state : RootState) => state.language.language);

  useEffect(() =>{
    i18n.changeLanguage(selectedLanguage);
  },[selectedLanguage])

  return ( <HomeLanding />);
}
