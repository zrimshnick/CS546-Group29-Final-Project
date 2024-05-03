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
    };
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
        comments: comments
      });
    };

    res.render("profilePage", {
      title: "Tracklete | Profile",
      firstName: currUserData.firstName,
      lastName: currUserData.lastName,
      username: currUserData.username,
      height: currUserData.height,
      weight: currUserData.weight,
      weightUnit: currUserData.weightUnit,
      sports: currUserData.sports,
      posts: postsAndComments
    });
  } catch (e) {
    console.log(e);
  }
});

router.route("/:postId").delete(async (req, res) => {
  const postId = req.params.postId;
  try{
      const deletedPost = await deletePost(postId);
      console.log(`DELETED ${deletedPost}`);
      return res.redirect("/profile");
  }catch(e){
      console.log(`ERROR DELETING POST WITH ID: ${postId}`);
      res.status(500).json({e: "Internal Server Error"});
  }
});

export default router;
