import { Router } from "express";
const router = Router();
import {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
  updateUser,
} from "../data/users.js";
import { ObjectId } from "mongodb";

router.route("/").get(async (req, res) => {
  try {
    //req.session.user.role
    const currUserData = await getUserByUsername(
      `${req.session.user.username}`
    );
    res.render("profilePage", {
      title: "Tracklete | Profile",
      firstName: currUserData.firstName,
      lastName: currUserData.lastName,
      username: currUserData.username,
      height: currUserData.height,
      weight: currUserData.weight,
      weightUnit: currUserData.weightUnit,
      sports: currUserData.sports,
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
