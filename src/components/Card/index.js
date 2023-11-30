"use client"
import styles from '../Card/pokecards.module.scss'
import Image from "next/image";
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import IconLoader from '../../assets/pokemon-loading-1.gif'
import brokenImg from '../../assets/gears.png'
import { Context } from '../../app/page'

export default function Card () {
    const [
      pokeDetails, setPokeDetails, typeDetails, setTypeDetails, offset, setOffset,
      cardState, setCardState, loadMoreState, setLoadMoreState, errorMsg, setErrorMsg,
    ] = useContext(Context);

  const [isLoader, setIsLoader] = useState(true);

//main page API
  useEffect(() => { 
    //fectch api main array
    async function getDetails() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`);
      const data = await response.json();
        //fectch list urls from main array
        data.results.forEach(async (item) => {
        const urlApiDetails = item.url
        const response2 = await fetch(`${urlApiDetails}`)
        const dataDetails = await response2.json()
            
        const { name, id, types, weight, sprites, abilities, base_experience, moves, stats} = dataDetails
        const cardInfo = {
          name: name,
          id: id,
          type1: types[0]?.type.name,
          type2: types[1]?.type.name,
          weight: weight,
          img1: sprites.other.dream_world.front_default,
          img2: sprites.other.home.front_default,
          ability1: abilities[0]?.ability.name,
          ability2: abilities[1]?.ability.name,
          baseExperience: base_experience,
          move1: moves[0]?.move.name,
          move2: moves[1]?.move.name,
          move3: moves[2]?.move.name,
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          specialAtt: stats[3].base_stat,
          specialDef: stats[4].base_stat,
          speed: stats[5].base_stat,
        }
        setPokeDetails((prev) => [...prev, cardInfo])
        setIsLoader(false)
        setLoadMoreState(true)
        setErrorMsg()
      })
    }
    getDetails()
  },[offset]);
  

 // order array of objects by id
  pokeDetails.sort(function (a, b) {
    if (a.id < b.id) 
    {
     return -1
    } 
    if (a.id > b.id) 
    {
     return 1
    } 
    return 0
  })

  //Load more pokemons button
  const loadMore = () => {
   setOffset(offset + 24);
  }

  //Pokemon names first letter
  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //Pokemon id prefix
  const prefixId = id => {
    return (id < 10) ? `#00${id}` : (id <= 100) ? `#0${id}`: `#${id}`
  }

  //on click get pokemon data
  const handleClick = (e, data) => {
    setCardState(data)
  }

  return (
    <>
  <section className={styles.main}>
    {
      errorMsg && (
        <div className={styles.errorMsg}>
          <p>{errorMsg}</p>
        </div>
      )
    }
    {
    isLoader && (
    <div className={styles.loader}>
      <Image src={IconLoader} alt=""/>
    </div>
    )
    }
       
    <div className={styles.cardsArea}>
    {/* filter - skip null items " pokeDetails.filter(item => item.img1 !== null).map " */}
    {pokeDetails && pokeDetails.filter(item => item.img1 !== null).map((item, index) => (
        <Link className={styles.btnCard} key={item.id} 
        onClick={(e) => {handleClick(e, item)}}
        href='/pokemon' as={`/pokemon/${item.name}`}
        scroll={false} //fix auto scroll open modal
        >
        <div className={styles[`${item.type1}`]}></div>
          <div className={styles.image}>
          <Image
            src={item.img1 ? item.img1 : brokenImg} alt='pokemon image 1'
            width={200}
            height={200}
            />
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.infoText}>
              <h3>{capitalizeFirst(item.name)}</h3>
              <p>{prefixId(item.id)}</p>
            </div>
            <div className={styles.typeIcons}>
              <div className={styles[`${item.type1}`]}></div>
              <div className={styles[`${item.type2}`]}></div>
            </div>
          </div>
        </Link>
    ))}
    </div>
    {          
    ((loadMoreState == true)) && <button className={styles.btnLoadMore} onClick={loadMore}>Carregar mais</button>
    }
  </section>
  </>
  )
}

      