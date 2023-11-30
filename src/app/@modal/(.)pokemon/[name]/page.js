'use client'
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
// import styles from '@/components/Modal/modalcard.module.scss'
import styles from '@/app/@modal/(.)pokemon/[name]/pagemodal.module.scss'
import brokenImg from '../../../../assets/gears.png'

import { notFound } from "next/navigation"
// import { useRouter } from "next/navigation"
import Modal from "@/components/Modal"


export default async function PokemonPage ({params}) {
  let cardInfo;
    try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
    const data = await response.json();

    const { name, id, types, weight, sprites, abilities, base_experience, moves, stats} = data
      const info = {
        name: name,
        id: id,
        type1: types[0]?.type.name,
        type2: types[1]?.type.name,
        weight: weight,
        // img1: sprites.other.dream_world.front_default,
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
      cardInfo = info
    } catch (error) {
      notFound();
    }

//Pokemon names first letter
const capitalize = str => {
  if (str != null)
  return str.toUpperCase()
}
//Pokemon id prefix
const prefixId = id => {
  return (id < 10) ? `#00${id}` : (id <= 100) ? `#0${id}`: `#${id}`
}

// let router = useRouter()
// const overlay = useRef()
// const close = useRef()

// const onDismiss = useCallback(() => {
// router.back()
// })

// const onClose = (e) => {
//  if (e.target === overlay.current || close.current) onDismiss()
//   console.log('overlay click')
// }

// useEffect(() => {
//   // We wrap it inside setTimeout in order to prevent the eventListener to be attached before the modal is open.
//   setTimeout(() => {
//       window.addEventListener('click', backDropHandler);
//   })
// }, [])

// useEffect(() => {
//   // remove the event listener when the modal is closed
//   return () => window.removeEventListener('click', backDropHandler);
// }, []);

// const handleCloseClick = (e) => {
//   e.preventDefault();
//   onClose();
// };

return (
  <>
  <Modal>
  <div className={styles[`${cardInfo.type1}`]}></div>
  <div className={styles.container}>
    <div className={styles.leftArea}>
      <h2>{cardInfo.name}</h2>
      <p>{prefixId(cardInfo.id)}</p>
      <div className={styles.imageArea}>
        <Image
        src={cardInfo.img2 ? cardInfo.img2 : brokenImg} alt='pokemon image 2'
        width={400}
        height={400}
        />
      </div>
      <div className={styles.imageReflection}>
        <Image
        src={cardInfo.img2 ? cardInfo.img2 : brokenImg} alt='pokemon image 2 reflection'
        width={400}
        height={400}
        />
      </div>
    </div>

    <div className={styles.description}>
      <div className={styles.info}>
        <p>Weight: {cardInfo.weight} kg</p>
        <p>Base experience: {cardInfo.baseExperience}</p>
      </div>

      <div className={styles.types}>

        <div className={styles.type1}>
          <p>{cardInfo.type1}</p>
          <div className={styles.iconType1}>
            <div className={styles[`${cardInfo.type1}`]}></div>
          </div>
        </div>
        
        <div className={styles.type2}>
          <p>{cardInfo.type2}</p>
          <div className={styles.iconType2}>
            <div className={styles[`${cardInfo.type2}`]}></div>
          </div>
        </div>
        
      </div>
      
    </div>
    <div className={styles.allStats}>
        <div className={styles.abilities}>
          <h4>Abilities:</h4>
          <p>{cardInfo.ability1}</p>
          <p>{cardInfo.ability2}</p>
        </div>
        <div className={styles.moves}>
          <h4>Moves:</h4>
          <p>{cardInfo.move1}</p>
          <p>{cardInfo.move2}</p>
          <p>{cardInfo.move3}</p>
        </div>
        <div className={styles.stats}>
          <h4>Stats:</h4>
          <p>HP: {cardInfo.hp}</p>
          <p>Attack: {cardInfo.attack}</p>
          <p>Defense: {cardInfo.defense}</p>
          <p>Special Attack: {cardInfo.specialAtt}</p>
          <p>Special Defense: {cardInfo.specialDef}</p>
          <p>Speed: {cardInfo.speed}</p>
        </div>
    </div>
  </div>

  </Modal>
  </>
)
}