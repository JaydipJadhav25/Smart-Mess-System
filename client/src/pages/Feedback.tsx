import FeedbackForm from "@/components/feedback/FeedbackForm"
import Loading from "@/components/flashPages/Loading"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"

function Feedback() {
  return (
     <div className="min-h-screen flex flex-col">
      <Loading/>
      <Navbar/>
      <main className="flex-1">
       <FeedbackForm/>
      </main>
      <Footer/>
    </div>
  )
}

export default Feedback