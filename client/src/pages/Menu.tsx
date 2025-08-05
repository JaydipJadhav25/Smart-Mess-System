import Loading from "@/components/flashPages/Loading"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import WeakMenu from "@/components/Menu/WeakMenu"


function Menu() {
  return (
      <div className="min-h-screen flex flex-col">
      <Loading/>
      <Navbar/>
      <main className="flex-1">
       <WeakMenu/>
      </main>
      <Footer/>
    </div>
  )
}

export default Menu