import { Router } from "express";
const router = Router();
import { createUser, getUser, deleteUser, updateUser } from "../data/users.js";

router.route("/").get(async (req, res) => {
  res.render("profilePage");
});

/* router.route("/profile").get(async (req, res) => {
  res.render("profilePage");
}); */

export default router;
