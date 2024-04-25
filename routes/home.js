import { Router } from "express";
const router = Router();

router.route("/home").get(async (req, res) => {
  res.render("home", { title: "Tracklete | Home page" });
});

export default router;
