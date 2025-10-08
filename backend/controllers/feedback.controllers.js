import { FeedbackModel } from "../model/feedback.model.js";
import { generateAnalytics } from "../service/ai.service.js";



const findeFeedbackBydate = async(req , res)=>{
try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide both a startDate and an endDate.' });
    }

    // --- The Change is Here ---
    // The query now looks for a field named "Date" to match your data.
    const query = {
      Date: { // Changed from "mealDate" to "Date"
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    // Find the documents and sort by the "Date" field.
    const feedbackResults = await FeedbackModel.find(query).sort({ Date: 1 }); // Also changed here

    res.status(200).json(feedbackResults);

  } catch (error) {

    console.error('Error fetching feedback by date:', error);
    res.status(500).json({ message: 'Server error while fetching feedback.' });

  }
}



const feedbackAnalytics = async(req , res)=>{
      try {
        const feedbacks = req.body;
          //cehck
          if(!feedbacks){
            return res
            .status(401)
            .json({
                message : "feedback are required!"
            })
          }
        //call ai 
        const response = await generateAnalytics(feedbacks);

        return res
        .status(200)
        .json(response);

      } catch (error) {
         console.error('Error analying feedback by date:', error);
    res.status(500).json({ message: 'Server error while analying feedback.' });
        
      }
}


export {
    findeFeedbackBydate ,
    feedbackAnalytics
}