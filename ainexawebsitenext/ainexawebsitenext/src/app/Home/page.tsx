'use client';

import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import i18n from "@/utils/maintrsulater";
import HomeLanding from "./components/HomeLanding";

const Home = () =>{
    const selectedLanguage = useSelector((state : RootState) => state.language.language);

    useEffect(() =>{
        i18n.changeLanguage(selectedLanguage);
    },[selectedLanguage])
    return(
        <HomeLanding />
    )
}

export default Home;