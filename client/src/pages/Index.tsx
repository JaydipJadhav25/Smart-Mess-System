import SplashScreen from "@/components/flashPages/Splash"
import Hero from "@/components/home/Hero"
import Reviews from "@/components/home/Reviews"
import Updates from "@/components/home/Updates"
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
             <Reviews/>
             <Updates/>
            </main>
            <Footer/>
         </div>
        </>
  )
}

export default Index