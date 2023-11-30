import styles from './modalcard.module.scss'
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';

export default function Modal ({children}) {

  // if(!open) return null

  const router = useRouter()
  const overlay = useRef()
  const close = useRef()

const onDismiss = useCallback(() => {
  router.back()
}, [router])

  const onClose = (e) => {
   if (e.target === overlay.current || close.current) onDismiss()
    console.log('overlay click')
  }

  return (
    <>
    <div className={styles.modal}>
        <div className={styles.overlay} ref={overlay} onClick={onClose}>
          <div className={styles.modalBox}  
          /* evitar fechar ao clicar no box */
            onClick={(e) => {
              e.stopPropagation()
            }}
            >
              {/* <div className={styles[`${params.type1}`]}></div> */}
              <div className={styles.modalBg}></div>
              <div className={styles.imageBg}></div>
              {children}
            {/* <Link href={'/'} className={styles.close} onClick={close}>X</Link> */}
            <div className={styles.close} ref={close} onClick={onClose}>X</div>
          </div>
        </div>
    </div>
    </>
  )
}

      