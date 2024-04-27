import { Router } from "express";
const router = Router();

import { getUser } from "../data/users.js";

router.route("/").get(async (req, res) => {
  if (req.session.user === undefined) {
    res.render("leaderboardPage", {
      title: "Tracklete | Leaderboard",
      content: "Content here",
      navbarLogHREF: "login",
      navbarLogDisplay: "Login",
    });
  } else {
    res.render("leaderboardPage", {
      title: "Tracklete | Leaderboard",
      content: "Content here",
    });
  }
});

export default router;
