import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
    res.render("progressPage", {Title: "Tracklete | Progress Page"});
  });
  
  export default router;