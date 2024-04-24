import { Router } from "express";
const router = Router();
import {
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../data/workouts.js";
import { getUserByUsername, getUser } from "../data/users.js";

router
  .route("/")
  .get(async (req, res) => {
    try {
      const currUserData = await getUserByUsername(
        `${req.session.user.username}`
      );
      console.log(currUserData);
      let workoutsDataArray = [];
      const promises = currUserData.workouts.map(async (workoutID) => {
        return await getWorkout(workoutID);
      });

      await Promise.all(promises).then((workoutsData) => {
        workoutsDataArray = workoutsData;
      });

      console.log(workoutsDataArray.reverse());

      res.render("workoutsPage", {
        title: "Tracklete | Workouts",
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        username: currUserData.username,
        workouts: workoutsDataArray,
      });
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res) => {
    const addWorkoutFormData = req.body;
    let workoutType = addWorkoutFormData.workoutType;
    let date = addWorkoutFormData.date;
    let timeElapsed = addWorkoutFormData.timeElapsed;
    let caloriesBurned = addWorkoutFormData.caloriesBurned;

    try {
      const currUserData = await getUserByUsername(
        `${req.session.user.username}`
      );

      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      let formattedDate =
        (month < 10 ? "0" + month : month) +
        "/" +
        (day < 10 ? "0" + day : day) +
        year;

      let newWorkout = await createWorkout(
        currUserData._id.toString(),
        date,
        timeElapsed,
        workoutType,
        parseInt(caloriesBurned)
      );
      console.log("redirecting");
      return res.redirect("/workouts");
    } catch (e) {
      console.log(`CREATE WORKOUT DIDNT WORK ${e}`);
    }
  });

/* router.route("/workouts").get(async (req, res) => {
  res.render("workoutsPage");
}); */

export default router;
