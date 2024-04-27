import { Router } from "express";
const router = Router();
import xss from "xss";
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

      res.render("workoutsPage", {
        title: "Tracklete | Workouts",
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        username: currUserData.username,
        workouts: workoutsDataArray.reverse(),
      });
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res) => {
    const addWorkoutFormData = req.body;
    console.log(addWorkoutFormData);
    let workoutType = addWorkoutFormData.workoutType;
    workoutType = xss(workoutType.trim());
    let date = addWorkoutFormData.date;
    date = xss(date);
    let timeElapsedH = addWorkoutFormData.timeElapsedH;
    timeElapsedH = xss(timeElapsedH);
    let timeElapsedM = addWorkoutFormData.timeElapsedM;
    timeElapsedM = xss(timeElapsedM);
    let timeElapsedS = addWorkoutFormData.timeElapsedS;
    timeElapsedS = xss(timeElapsedS);
    let timeElapsed;
    let caloriesBurned = addWorkoutFormData.caloriesBurned;
    caloriesBurned = xss(caloriesBurned);
    let comments = addWorkoutFormData.comments;
    comments = xss(comments);

    ////////

    try {
      const currUserData = await getUserByUsername(
        `${req.session.user.username}`
      );

      ///// error checking
      /// calories
      if (typeof caloriesBurned !== "string") {
        throw "Calories must be a string";
      }
      caloriesBurned.trim();
      if (parseInt(caloriesBurned) < 0) {
        throw "Calories must be greater than 0";
      }
      if (isNaN(caloriesBurned)) {
        throw "Calories must be a number";
      }

      /// date
      let dateArr = date.split("-");
      date = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;

      /// time elapsed
      if (timeElapsedH === "") {
        timeElapsedH = "00";
      }
      if (
        timeElapsedH === "0" ||
        timeElapsedH === "1" ||
        timeElapsedH === "2" ||
        timeElapsedH === "3" ||
        timeElapsedH === "4" ||
        timeElapsedH === "5" ||
        timeElapsedH === "6" ||
        timeElapsedH === "7" ||
        timeElapsedH === "8" ||
        timeElapsedH === "9"
      ) {
        timeElapsedH = `0${timeElapsedH}`;
      }
      if (timeElapsedM === "") {
        timeElapsedM = "00";
      }
      if (
        timeElapsedM === "0" ||
        timeElapsedM === "1" ||
        timeElapsedM === "2" ||
        timeElapsedM === "3" ||
        timeElapsedM === "4" ||
        timeElapsedM === "5" ||
        timeElapsedM === "6" ||
        timeElapsedM === "7" ||
        timeElapsedM === "8" ||
        timeElapsedM === "9"
      ) {
        timeElapsedM = `0${timeElapsedM}`;
      }
      if (timeElapsedS === "") {
        timeElapsedS = "00";
      }
      if (
        timeElapsedS === "0" ||
        timeElapsedS === "1" ||
        timeElapsedS === "2" ||
        timeElapsedS === "3" ||
        timeElapsedS === "4" ||
        timeElapsedS === "5" ||
        timeElapsedS === "6" ||
        timeElapsedS === "7" ||
        timeElapsedS === "8" ||
        timeElapsedS === "9"
      ) {
        timeElapsedS = `0${timeElapsedS}`;
      }

      if (isNaN(timeElapsedH)) throw "Hours must be a number";
      if (isNaN(timeElapsedM)) throw "Minutes must be a number";
      if (isNaN(timeElapsedS)) throw "Seconds must be a number";

      if (parseInt(timeElapsedH) < 0 || parseInt(timeElapsedH) > 99)
        throw "Hours must be between 0 and 99";
      if (parseInt(timeElapsedM) < 0 || parseInt(timeElapsedM) > 60)
        throw "Minutes must be between 0 and 60";
      if (parseInt(timeElapsedS) < 0 || parseInt(timeElapsedS) > 60)
        throw "Seconds must be between 0 and 60";

      timeElapsed = `${timeElapsedH}:${timeElapsedM}:${timeElapsedS}`;

      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      let formattedDate =
        (month < 10 ? "0" + month : month) +
        "/" +
        (day < 10 ? "0" + day : day) +
        year;

      /// comments
      if (typeof comments !== "string") {
        throw "Comments must be a string";
      }
      comments.trim();

      /////////////////////////
      let newWorkout = await createWorkout(
        currUserData._id.toString(),
        date,
        timeElapsed,
        workoutType,
        parseInt(caloriesBurned),
        comments
      );
      console.log("redirecting");
      return res.redirect("/workouts");
    } catch (e) {
      console.log(`CREATE WORKOUT DIDNT WORK ${e}`);
    }
  });

export default router;
