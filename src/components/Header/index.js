"use client"
import React, { useContext, useState } from 'react';
import { ContextHeaderHeight } from '../../app/page';
import styles from '../Header/header.module.scss'
import SearchBar from '../SearchBar'
import pokeApiLogo from '../../assets/pokeApiLogo.png'
import Image from 'next/image';
import TypeMenu from '../TypeMenu';

export const ContextSearchResponsive = React.createContext();

export default function Header () {
  const [headerHeight, setHeaderHeight] = useContext(ContextHeaderHeight);
  const [searchResponsive, setSearchResponsive] = useState(false);
  const [menuChange, setMenuChange] = useState(false);

  //logo click home page
  const handleClick = () => {
   window.location.href = '/';
  }

  return (
    <>
    <div className={styles[`${headerHeight}`]}>
      <div className={styles.borderBall}></div>
      <div  className={styles.container} >
        <div className={styles[menuChange ? 'overlay' : 'none']} onClick={() => setMenuChange(!menuChange)}></div>
        <div className={styles[menuChange ? 'smallMenuOpened' : 'smallMenuClosed']} onClick={() => setMenuChange(!menuChange)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div> 
        {
        menuChange && (
          <TypeMenu/>
          )
        }
        <Image
          src={pokeApiLogo}
          width={257}
          height={103}
          alt="pokemon logo"
          onClick={handleClick}
        />
        <div className={styles.search}>
          <ContextSearchResponsive.Provider value={[searchResponsive, setSearchResponsive]}>
              <SearchBar/>
          </ContextSearchResponsive.Provider>
        </div>
      </div>
    </div>
    <div className={styles[!searchResponsive ? 'searchResponsiveNone' : 'searchResponsive']}>
    </div>
    </>
  )
}