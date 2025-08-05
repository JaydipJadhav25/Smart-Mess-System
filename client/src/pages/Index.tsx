import SplashScreen from "@/components/flashPages/Splash"
import Hero from "@/components/home/Hero"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"

function Index() {
  return (
        <>
         <div className="min-h-screen flex flex-col">
           <SplashScreen/>
            <Navbar/>
            <main>
             <Hero/>
            </main>
            <Footer/>
         </div>
        </>
  )
}

export default Index