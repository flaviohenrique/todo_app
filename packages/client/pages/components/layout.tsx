import Footer from './footer'
import Header from './header'
import NabBar from './navbar'

type props = {
  children: React.ReactNode
}

export default function Layout({ children }: props) {
  return (
    <>
      <Header />
      <NabBar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
