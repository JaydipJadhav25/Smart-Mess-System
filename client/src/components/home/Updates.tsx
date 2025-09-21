import { Card  } from "@/components/ui/card";

function Updates() {

 const updates  =   [
  {
    "id": 1,
    "title": "New Menu Added",
    "description": "We have updated the weekly menu. Check the latest breakfast, lunch, and dinner options in your dashboard."
  },
  {
    "id": 2,
    "title": "Auto Attendance Activated",
    "description": "From today, auto attendance will be recorded for all students. Make sure to check your login and meals daily."
  },
  {
    "id": 3,
    "title": "Maintenance Notice",
    "description": "The mess will be closed for 2 hours on Friday for cleaning and maintenance. Please plan your meals accordingly."
  },
  {
    "id": 4,
    "title": "Feedback Reminder",
    "description": "Students are encouraged to submit feedback for last week's meals. Your feedback helps us improve food quality."
  }
]


  return (
    <>

        <div className="max-w-5xl mx-auto px-4 mt-24 mb-3">
  <div className="text-center mb-10">
    <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-4 py-1 rounded-full">
      📢 Important Updates
    </span>

 <h2 className="text-4xl font-bold mt-4 mb-2 tracking-tight text-primary">
       Stay In The Loop
    </h2>

  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {updates?.map((announcement) => (
      <Card key={announcement.id} className="hover:shadow-xl transition-shadow border bg-background hover:bg-background/10 p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              📣
            </div>
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
          </div>
          {/* {announcement.tag && (
            <Badge
              variant="outline"
              className={`text-xs px-2 py-0.5 rounded-full ${
                announcement.tag.toLowerCase() === "important"
                  ? "bg-red-100 text-red-600"
                  : "bg-secondary"
              }`}
            >
              {announcement.tag}
            </Badge>
          )} */}
        </div>

        <p className="text-muted-foreground mb-3">{announcement.description}</p>

        {/* <p className="text-xs text-muted-foreground mt-auto">
          {new Date(announcement.date).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p> */}
      </Card>
    ))}
  </div>



    </div>
   

    </>
  )
}

export default Updates