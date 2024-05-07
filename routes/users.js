import { Router } from "express";
const router = Router();
import xss from "xss";
import {
  createUser,
  getUser,
  getUserByUsername,
  deleteUser,
  updateUser,
} from "../data/users.js";
import {
  checkString,
  checkArray,
  checkValidEmail,
  checkValidPassword,
  checkGender,
  checkValidAge,
  checkValidName,
  checkValidUsername,
} from "../helpers.js";
import { ObjectId } from "mongodb";
import { deletePost, getAllPosts, getPost } from "../data/posts.js";
import { getAllComments } from "../data/comments.js";

router.route("/").get(async (req, res) => {
  try {
    //req.session.user.role
    const currUserData = await getUserByUsername(
      `${req.session.user.username}`
    );
    const userPostsIds = currUserData.posts;
    const userPosts = [];
    for (const postId of userPostsIds) {
      const post = await getPost(postId);
      userPosts.push(post);
    }
    const postsAndComments = [];
    for (const post of userPosts) {
      const comments = await getAllComments(post._id.toString());
      postsAndComments.push({
        id: post._id.toString(),
        title: post.title,
        body: post.body,
        username: post.username,
        tags: post.tags,
        likes: post.likes,
        comments: comments,
      });
    }

    res.render("profilePage", {
      title: "Tracklete | Profile",
      firstName: currUserData.firstName,
      lastName: currUserData.lastName,
      username: currUserData.username,
      height: currUserData.height,
      weight: currUserData.weight,
      weightUnit: currUserData.weightUnit,
      sports: currUserData.sports,
      posts: postsAndComments,
      healthInformation: currUserData.healthInformation
    });
  } catch (e) {
    console.log(e);
  }
});

router.route("/:postId").delete(async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletedPost = await deletePost(postId);
    return res.redirect("/profile");
  } catch (e) {
    res.status(500).render("500");
  }
});

router
  .route("/edit")
  .get(async (req, res) => {
    const currUserData = await getUserByUsername(
      `${req.session.user.username}`
    );
    let heightparts = currUserData.height.toString().split("'");
    let inches = heightparts[1].split('"');
    let sportsOptions = ["Archery", "Badminton", "Baseball", "Basketball", "Bobsleigh", "Boxing", "Bouldering", "Canoeing/Kayaking", "Climbing", "Cricket", "Curling", "Cycling", "Equestrian Sports", "Field Hockey", "Field Lacrosse", "Fencing", "Football", "Golf", "Gymnastics", "Handball", "Ice Hockey", "Judo", "Lacrosse", "Martial Arts", "Polo", "Roller Skating/Inline Skating", "Rowing", "Rugby", "Rugby Sevens", "Sailing", "Shooting", "Skiing", "Skateboarding", "Snowboarding", "Softball", "Squash", "Surfing", "Swimming", "Table Tennis", "Tennis", "Track and Field", "Trampoline", "Triathlon", "Ultimate Frisbee", "Volleyball", "Water Polo", "Weightlifting", "Wrestling"]
    let preSelect = sportsOptions.map(a => {
      return {
          name: a,
          selected: currUserData.sports.includes(a)
      };
  });
    try {
      res.render("edit", {
        title: "Tracklete | Edit Profile",
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        username: currUserData.username,
        email: currUserData.email,
        heightFt: heightparts[0],
        heightIn: inches[0],
        weight: currUserData.weight,
        gender: currUserData.gender,
        sportsOptions: preSelect,
      });
    } catch (e) {
      console.log(e);
    }
  })
  .patch(async (req, res) => {
    const editFormData = req.body;
    console.log('req body', req.body);
    let firstName = xss(editFormData.firstName);
    firstName = firstName.trim();
    let lastName = xss(editFormData.lastName);
    lastName = lastName.trim();
    let username = xss(editFormData.username);
    username = username.trim().toLowerCase();
    let email = xss(editFormData.email);
    email = email.trim().toLowerCase();
    let password = xss(editFormData.password);
    let confirmPassword = xss(editFormData.confirmPassword);
    let gender = xss(editFormData.gender);
    let sports;
    if (!Array.isArray(editFormData.sports)) {
      sports = [editFormData.sports];
    } else {
      sports = editFormData.sports;
    }
    let heightFt = xss(editFormData.heightFt);
    let heightIn = xss(editFormData.heightIn);
    let height = `${heightFt}'${heightIn}"`;
    let heightUnit = "standard";
    let weight = xss(editFormData.weightNum);
    let weightUnit = editFormData.weightUnit;
    try {
      if (username!=='') checkString(username, "username");
      if (firstName!=='')checkString(firstName, "firstName");
      if (lastName!=='')checkString(lastName, "lastName");
      if (email!=='')checkString(email, "email");
      if (password!=='')checkString(password, "password");
      if (confirmPassword!=='')checkString(confirmPassword, "confirmPassword");
      if (gender!=='')checkString(gender, "gender");
      if (height!=='')checkString(height, "height");
      if (heightUnit!=='')checkString(heightUnit, "heightUnit");
      if (weight!=='')checkString(weight, "weight");
      if (gender!=='') checkGender(gender, "gender");
      if (firstName!=='')checkValidName(firstName, "firstName");
      if (lastName!=='')checkValidName(lastName, "lastName");
      if (username!=='')checkValidUsername(username);
      if (email!=='')checkValidEmail(email, "email");
      if (password!=='')checkValidPassword(password, "password");
    } catch (e) {
      const currUserData = await getUserByUsername(
        `${req.session.user.username}`
      );
      let heightparts = currUserData.height.toString().split("'");
      let inches = heightparts[1].split('"');
      return res.status(400).render("edit", {
        errorMessage: e,
        title: "Tracklete | Edit Profile",
        firstName: currUserData.firstName,
        lastName: currUserData.lastName,
        username: currUserData.username,
        email: currUserData.email,
        heightFt: heightparts[0],
        heightIn: inches[0],
        weight: currUserData.weight,
        gender: currUserData.gender,
      });
    }

    try {
      const currUserData = await getUserByUsername(
        `${req.session.user.username}`
      );
      let updateObj = {};
      if (firstName!=='') updateObj.firstName = firstName;
      if (lastName!=='') updateObj.lastName = lastName;
      if (username!=='') updateObj.username = username;
      if (email!=='') updateObj.email = email;
      if (password!=='') updateObj.password = password;
      if (gender!=='') updateObj.gender = gender;
      if (sports!=='') updateObj.sports = sports;
      if (height!=='') updateObj.height = height;
      if (heightUnit!=='') updateObj.heightUnit = heightUnit;
      if (weight!=='') updateObj.weight = weight;
      if (weightUnit!=='') updateObj.weightUnit = weightUnit;
      console.log(updateObj);
      const updatedUser = await updateUser(
        currUserData._id.toString(),
        updateObj
      );

      if (updatedUser) {
        req.session.user.username = updatedUser.username;
        return res.redirect("/profile");
      } else {
        return res.status(500).render("profile", {
          errorMessage: "Internal Server Error",
          navbarLogHREF: "login",
          navbarLogDisplay: "Login",
        });
      }
    } catch (e) {
      return res.status(404).render("edit", {
        errorMessage: e,
        title: "Tracklete | Edit Profile",
        navbarLogHREF: "login",
        navbarLogDisplay: "Login",
      });
    }
  });

export default router;
