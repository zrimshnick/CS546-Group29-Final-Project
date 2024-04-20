import { Router } from "express";
const router = Router();

router.route("/").get(async (req, res) => {
  res.render("home", { title: "Tracklete | Home page" });
});

export default router;
