import { Router } from "express";
const router = Router();
import { createUser, getUser, deleteUser, updateUser } from "../data/users.js";

const zackUserID = "661af4c95ad5e01f0ba853f1";

router.route("/").get(async (req, res) => {
  try{
    const currUserData = await getUser(zackUserID);
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
  } catch (e){
    console.log(e);
  }
});

export default router;
