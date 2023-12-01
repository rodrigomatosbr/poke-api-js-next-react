"use client"

import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../SearchBar/searchbar.module.scss'
import { ContextSearchResponsive } from '../Header';
import { Context } from '@/app/page';

export default function SearchBar() {
  const searchRef = useRef();
  const searchIconRef = useRef();
  
  const [
    pokeDetails, setPokeDetails, typeDetails, setTypeDetails, offset, setOffset,
    cardState, setCardState, loadMoreState, setLoadMoreState, errorMsg, setErrorMsg,
  ] = useContext(Context);
  const [searchResponsive, setSearchResponsive] = useContext(ContextSearchResponsive);

  const [searched, setSearched] = useState(null)
  const [nameList, SetNameList] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHide, setSearchHide] = useState(false)
  

  //API suggestions
  useEffect(() => { 
    setPokeDetails()
    setTypeDetails()
    async function getSearchSuggestions() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0');
      const data = await response.json();
        SetNameList(data.results)
    }
    getSearchSuggestions()
  },[]);

  //API to search bar
  useEffect(() => { 
    setPokeDetails([])
    async function getSearchDetails() {
      try {
        const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${searched}`);
        const data3 = await response3.json();
        const { name, id, types, weight, sprites, abilities, base_experience, moves, stats} = data3
        const cardInfo2 = {
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
        setErrorMsg()
        setPokeDetails([cardInfo2])
        setLoadMoreState(false)
      } catch (error) {
        setTypeDetails([])
        setPokeDetails([])
        setLoadMoreState(false)
        setErrorMsg('Não foi possível encontrar sua pesquisa')
      }
    }
    if (searched !=null) getSearchDetails()
  },[searched]);

  const onChangeHandler = (text) => {
    let matches = []
      matches = nameList.filter((user) => {
      const regex = new RegExp(`${text}`, "gi");
      return user.name.match(regex)
    }).slice(0,10)
    setSuggestions(matches)
    setText(text)
  }

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  //close click outside component SearchBar
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  })

  const handleOutsideClick = (e) => {
    if (!searchRef.current.contains(e.target) && !searchIconRef.current.contains(e.target)) {
      setSearchHide(false)
      setSearchResponsive(false)
    }
  }

return (
  <>
  <div className={styles.searchArea}>
  <span className={styles.searchIcon}  
    ref={searchIconRef}
    onClick={() => {setSearchHide(!searchHide); setSearchResponsive(!searchResponsive)}}></span> 
    <div className={styles[searchHide ? 'searchBar' : 'none']} ref={searchRef}>
      <input type='text'
      onChange={(e)=> onChangeHandler(e.target.value)}
      value={text}
      onBlur={() => { //close click out
        setTimeout(() => {
          setSuggestions([])
        }, 100); //delay click
        
      }}
      />
      <button onClick={(e)=> {setSearched(text.toLowerCase()); setText('')}}></button>
      <div className={styles.dropdown}>
        {suggestions && suggestions.map((suggestions,i) =>
        <div key={suggestions.name} className={styles.dropdownRow} onClick={() =>onSuggestHandler(suggestions.name)}>
          {suggestions.name}
        </div>)}
      </div>
    </div>
  </div>
  </>
)
}

