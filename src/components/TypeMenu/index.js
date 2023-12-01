"use client"

import { useEffect, useState, useContext, useCallback } from 'react';
import styles from '../TypeMenu/typemenu.module.scss'
import { Context } from '../../app/page'

export default function TypeMenu () {
  const [
    pokeDetails, setPokeDetails, typeDetails, setTypeDetails, offset, setOffset,
    cardState, setCardState, loadMoreState, setLoadMoreState, errorMsg, setErrorMsg,
  ] = useContext(Context);

  const [typeId, SetTypeId] = useState()
  const [typeList, SetTypeList] = useState([])
  const [isActive, setIsActive] = useState(null);

  //get types list map
  useEffect(() => { 
    async function getTypelist() {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json();
      SetTypeList(data.results)
    }
    getTypelist()
  },[])

  //API types
  useEffect(() => { 
    async function getTypeDetails() {
      setPokeDetails([])
      setTypeDetails([])
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
      const data = await response.json();
      //fectch list urls from main array
      data.pokemon.forEach(async (item) => {
      const urlTypeDetails = item.pokemon.url
      const response = await fetch(`${urlTypeDetails}`)
      const dataTypeDetails = await response.json()
        
      const { name, id, types, weight, sprites, abilities, base_experience, moves, stats} = dataTypeDetails 
      const cardInfo = {
        name: name,
        id: id,
        type1: types[0].type.name,
        type2: types[1]?.type.name,
        weight: weight,
        img1: sprites.other.dream_world.front_default,
        img2: sprites.other.home.front_default,
        ability1: abilities[0].ability.name,
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
        setErrorMsg()
      })
    }
    if (typeId > 0) getTypeDetails() 
    
  },[typeId])

  //Pokemon names first letter
  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //Pokemon type get by click
  const handleClickType = event => {
  setPokeDetails([])
  SetTypeId(event.target.id)
  setLoadMoreState(false)
  }

  //allTypes icon click
  const allTypesClick = () => {
    setPokeDetails([])
    setOffset(offset == 0);
    setIsActive(0)
    setLoadMoreState(true);
  }

  return (
  <>
    <div className={styles.navbar}>
        <h3>POKEMONS</h3>
      <div className={styles.typeList}>
        <div className={`${styles.typeAll} ${styles[`${isActive == 0 && 'active'}`]}`} id={0}  onClick={allTypesClick}>
          <div className={styles.allIcon}></div>
          <p>All</p>
        </div>

        {typeList.filter(item => item.name !== 'unknown' && item.name !== 'shadow').map((item, index) => (
        <ul key={item.name}>
          <li id={index + 1} onClick={(e) => {setIsActive(item); handleClickType(e)}} className={styles[`${isActive == item && 'active'}`]}>
            <div className={styles.iconType}>
              <div className={`${styles[`${item.name}`]} ${styles[`${isActive == item && 'active'}`]}`}></div>
            </div>
            <p id={index + 1} onClick={(e) => {handleClickType(e)}}>{capitalizeFirst(item.name)}</p>
          </li>
        </ul>
        ))}
      </div>
    </div>
  </>
  )
}