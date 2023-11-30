import { Gabarito} from 'next/font/google'
import '../styles/_globals.scss'
import Favicon from '../../public/favicon.png'

const font = Gabarito ({ weight: ['400'], subsets: ['latin'] })

export const metadata = {
  title: 'PokeApi',
  description: 'Projeto consumo de API, desenvolvimento com Next.js, React.js, Javascrit e SASS',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout( props ) {
  return (
    <html lang="en">
      <body className={font.className}>{props.children} {props.modal} </body>
    </html>
  )
}