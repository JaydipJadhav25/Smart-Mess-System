
import { FocusCards } from "../ui/focus-cards";

function Reviews() {

const feedbacks = [
  // {
  //   title:
  //     "The Smart Mess System has completely transformed our hostel experience — tracking attendance and meals is now effortless.",
  //   name: "Jaydip Jadhav",
  //   batch: "Batch 2023",
  //   avatar : "JJ"
  // },
  {
    title:
      "Auto attendance and centralized meal details make our daily routine so much smoother. Highly recommend this system!",
    name: "Aditya Mulik",
    batch: "Batch 2023",
    avatar : "AM"

  },
  {
    title:
      "The feedback feature is amazing. Students can share honest opinions, and the mess team actually listens and improves.",
    name: "Vivek Vikar",
    batch: "Batch 2023",
    avatar : "VV"

  },
  {
    title:
      "I love how the Smart Mess System keeps everything organized and transparent — it saves time for both students and admins.",
    name: "Aditya Tiangre",
    batch: "Batch 2025",
    avatar : "AT"

  },
];


  return (
    <>
          {/* FeedBack Section */}
    <div className="text-center max-w-3xl mx-auto mb-12">
  <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
    Feedback
  </span>
   <h2 className="text-4xl font-bold mt-4 mb-2 tracking-tight text-primary">
      What Students Say
    </h2>
  <p className="">
    Hear from our students about how the Smart Mess System has improved their daily hostel and mess experience, 
    making attendance, meals, and feedback management simpler and more transparent.
  </p>
</div>

      <div className="p-1.5">
         <FocusCards cards={feedbacks} />
      </div>

   </>
  )
}

export default Reviews