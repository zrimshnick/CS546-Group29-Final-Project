import express from "express";
import session from "express-session";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";

//// from lab 8 code
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

////
app.use("/public", express.static("public"));
app.use(express.json());
///// session /////
app.use(
  session({
    name: "AuthenticationState",
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
/////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//////// MIDDLEWARE FUNCTIONS /////////////////////////
///// middleware 1 - forces user to login before doing anything
app.use(async (req, res, next) => {
  const excludedRoutes = [
    "/register",
    "/login",
    "/logout",
    "/home",
    "/feed",
    "/leaderboard",
    "/workouts",
    "/progress",
    "/profile",
  ];
  const currentRoute = req.originalUrl;

  let currentTimestamp = new Date().toUTCString();
  let requestMethod = req.method;
  let requestRoute = req.originalUrl;
  let authMessage = "(Non-Authenticated User)";

  if (excludedRoutes.includes(currentRoute)) {
    if (req.session.user) {
      authMessage = "(Authenticated User)";
    }
    console.log(
      `[${currentTimestamp}]: ${requestMethod} ${requestRoute} - ${authMessage}`
    );
    return next();
  }

  if (req.session.user) {
    authMessage = "(Authenticated User)";
    return res.redirect("/home");
  } else {
    console.log(
      `[${currentTimestamp}]: ${requestMethod} ${requestRoute} - ${authMessage}`
    );
    return res.redirect("/login");
  }

  next();
});

/* more middlewares needed to block certain routes DONT BLOCK HOME */

///////////////////////////////////////////////////////
configRoutes(app);

app.listen(3000, () => {
  console.log("We've got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
