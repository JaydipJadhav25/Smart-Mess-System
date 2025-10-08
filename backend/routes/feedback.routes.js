import { Router } from "express";
import { feedbackAnalytics, findeFeedbackBydate } from "../controllers/feedback.controllers.js";
import { FeedbackModel } from "../model/feedback.model.js";


const router = Router();

router.get("/" ,async(req, res)=>{

    return res.json({
        message : "this is feedback route" 
    })
});


router.get("/by-date" ,findeFeedbackBydate );
router.post("/feedback-analytics" ,feedbackAnalytics);


export default router;