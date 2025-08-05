import Loading from "@/components/flashPages/Loading"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"


function Today() {
  return (
      <div className="min-h-screen flex flex-col">
      <Loading/>
      <Navbar/>
      <main className="flex-1">
       <h1>coming soon..</h1>
      </main>
      <Footer/>
    </div>
  )
}

export default Today