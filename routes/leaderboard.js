import { Router } from "express";
const router = Router();

import { getUser } from "../data/users.js";

router.route("/").get(async (req, res) => {
  res.render("leaderboardPage", { content: "Content here" });
});

export default router;
