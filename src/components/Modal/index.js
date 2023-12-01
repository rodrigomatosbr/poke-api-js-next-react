import styles from './modalcard.module.scss'
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

export default function Modal ({children}) {

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
          /* click box */
            onClick={(e) => {
              e.stopPropagation()
            }}
            >
              <div className={styles.modalBg}></div>
              <div className={styles.imageBg}></div>
              {children}
            <div className={styles.close} ref={close} onClick={onClose}>X</div>
          </div>
        </div>
    </div>
    </>
  )
}

      