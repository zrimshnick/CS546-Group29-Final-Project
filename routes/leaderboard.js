import { Router } from "express";
const router = Router();

import { getTop20 } from "../data/leaderboard.js";

router.route("/").get(async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.render("leaderboardPage", {
  //     title: "Tracklete | Leaderboard",
  //     content: "Content here",
  //     navbarLogHREF: "login",
  //     navbarLogDisplay: "Login",
  //   });
  // } else {
  //   res.render("leaderboardPage", {
  //     title: "Tracklete | Leaderboard",
  //     content: "Content here",
  //   });
  // }

  try{
    const leaderboardArray = await getTop20();
    res.render("leaderboardPage", {leaderboardArray: leaderboardArray});
  } catch (e){
    console.log(e);
  }
});

export default router;
