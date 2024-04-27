import { Router } from "express";
import { createUser, loginUser } from "../data/users.js";

const router = Router();

router.route("/").get(async (req, res) => {
  ///// THIS SHOULD NEVER FIRE BC OF MIDDLEWARE
  return res.render("error", { error: "YOU SHOULD NOT BE HERE" });
});

router
  .route("/register")
  .get(async (req, res) => {
    res.render("register", {
      title: "Tracklete | Register",
      navbarLogHREF: "login",
      navbarLogDisplay: "Login",
    });
  })
  .post(async (req, res) => {
    const registerFormData = req.body;
    console.log(registerFormData);
    let firstName = registerFormData.firstName;
    let lastName = registerFormData.lastName;
    let username = registerFormData.username;
    username.trim().toLowerCase();
    let email = registerFormData.email;
    email.trim().toLowerCase();
    let password = registerFormData.password;
    let confirmPassword = registerFormData.confirmPassword;
    let age = registerFormData.age;
    let gender = registerFormData.gender;
    let sports;
    if (!Array.isArray(registerFormData.sports)) {
      sports = [registerFormData.sports];
    } else {
      sports = registerFormData.sports;
    }
    let heightFt = registerFormData.heightFt;
    let heightIn = registerFormData.heightIn;
    let height = `${heightFt}'${heightIn}"`;
    let heightUnit = "standard";
    let weight = registerFormData.weightNum;
    let weightUnit = registerFormData.weightUnit;

    let badFieldsArr = [];
    ///// do error checking here /////

    //////////////////////////////////
    ///// do error messages here /////

    //////////////////////////////////
    try {
      console.log("TRYING TO CREATE USER");
      let registration = await createUser(
        username,
        firstName,
        lastName,
        email,
        password,
        gender,
        sports,
        height,
        heightUnit,
        weight,
        weightUnit,
        age
      );
      console.log(`USER CREATED: ${registration.username}`);

      if (registration && registration.signupCompleted === true) {
        return res.redirect("/login");
      } else {
        return res
          .status(500)
          .render("register", {
            errorMessage: "Internal Server Error",
            navbarLogHREF: "login",
            navbarLogDisplay: "Login",
          });
      }
    } catch (e) {
      return res.status(404).render("register", {
        errorMessage: e,
        title: "Tracklete | Register",
        navbarLogHREF: "login",
        navbarLogDisplay: "Login",
      });
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    res.render("login", {
      title: "Tracklete | Login",
      navbarLogHREF: "login",
      navbarLogDisplay: "Login",
    });
  })
  .post(async (req, res) => {
    const loginFormData = req.body;
    console.log(loginFormData);
    let username = loginFormData.username;
    username.trim().toLowerCase();
    let password = loginFormData.password;

    let badFieldsArr = [];
    ///// error checking /////

    //////////////////////////
    if (badFieldsArr.length !== 0) {
      return res.status(400).render("login", {
        errorMessage: "Invalid username or password",
        title: "Tracklete | Login",
        navbarLogHREF: "login",
        navbarLogDisplay: "Login",
      });
    }
    try {
      let login = await loginUser(username.trim().toLowerCase(), password);

      if (login && login.firstName !== undefined) {
        req.session.user = {
          firstName: login.firstName,
          lastName: login.lastName,
          username: login.username,
          email: login.email,
          gender: login.gender,
          sports: login.sports,
          height: login.height,
          weight: login.weight,
          weightUnit: login.weightUnit,
          age: login.age,
          workouts: login.workouts,
          posts: login.posts,
          likedPosts: login.likedPosts,
        };

        /* Can put user specific "role" stuff here */

        /////////////////////////////////////////////
        console.log("LOGGED IN");
        return res.redirect("/home");
      } else {
        return res.status(500).render("login", {
          errorMessage: "Internal Server Error",
          title: "Tracklete | Login",
          navbarLogHREF: "login",
          navbarLogDisplay: "Login",
        });
      }
    } catch (e) {
      return res.status(404).render("login", {
        errorMessage: e,
        errorClass: "loginError",
        title: "Tracklete | Login",
        navbarLogHREF: "login",
        navbarLogDisplay: "Login",
      });
    }
  });

router.route("/logout").get(async (req, res) => {
  req.session.destroy();
  res.render("logout", {
    title: "Logged Out",
    navbarLogHREF: "login",
    navbarLogDisplay: "Login",
  });
});

export default router;
