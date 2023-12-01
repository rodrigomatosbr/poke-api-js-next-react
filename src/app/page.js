"use client"
import styles from '../styles/home.module.scss'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from "react";
import FaArrowCircleUp  from '../assets/fa-arrow-circle-up.png';

//// components ////
import Card from "../components/Card";
import TypeMenu from "../components/TypeMenu";
import Header from '../components/Header'
import Footer from "../components/Footer";

//// states/contexts ////
export const Context = React.createContext();

export const ContextHeaderHeight = React.createContext();

export default function home () {
  const divRef = useRef(null);
  const [pokeDetails, setPokeDetails] = useState([]);
  const [typeDetails, setTypeDetails] = useState([]);
  const [cardState, setCardState] = useState();
  const [loadMoreState, setLoadMoreState] = useState(false);
  const [offset, setOffset] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState('headerMax');

  // reset scroll on refresh
  useEffect(() => {
  // run on first load
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });
  },[]);

  //btn reset scroll rightContainer, window top
  const sectionTop = () => {
    divRef.current.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

    const headerFunc = () => {
      if (divRef.current.scrollTop < 200) {
        setHeaderHeight('headerMax');
      } else {
        setHeaderHeight('headerMin');
      }
    }

  return (
  <>
  <Context.Provider value={[
    pokeDetails, setPokeDetails, typeDetails, setTypeDetails, offset, setOffset,
    cardState, setCardState, loadMoreState, setLoadMoreState, errorMsg, setErrorMsg,
    ]}>
    <ContextHeaderHeight.Provider value={[headerHeight, setHeaderHeight]}>
      <Header/>
    </ContextHeaderHeight.Provider>
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <TypeMenu/>
      </div>
      <div className={styles.rightContainer} ref={divRef} onScroll={headerFunc}>
        <Card/>
      </div>
    </div>
    <button className={styles[`${isVisible ? 'btnScrollTop':'none'}`]} onClick={sectionTop}>
    <Image className={styles.icon}
    src={FaArrowCircleUp}
    width={75}
    height={75}
    alt="arrow up icon"
    />
    <p>Voltar ao início</p>
    </button>
      <Footer/>
  </Context.Provider>
  </>
  )

}



