import Link from "next/link";
import styles from '../styles/notfound.module.scss'
import Image from "next/image";
import notFoundIcon from '../assets/not-found-icon.png'

export default function NotFound() {
  return (
    <>
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftArea}>
          <h1>Desculpe!</h1>
          <h2>Esta página não foi encontrada</h2>
          <h3>Possíveis motivos</h3>
          <p>O link pode ter sido digitado incorretamente ou estar desatualizado</p>
          <Link className={styles.btnHome} href='/'>Página inicial</Link>
        </div>
        
        <Image
        src={notFoundIcon}
        width={300}
        height={340}
        alt="img not found"
      />
      </div>
    </section>
    </>
  )
}

