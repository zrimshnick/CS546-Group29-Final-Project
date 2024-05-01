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
import { getAllPosts, getPost } from "../data/posts.js";
import { getAllComments } from "../data/comments.js";

router.route("/").get(async (req, res) => {
  try {
    //req.session.user.role
    const currUserData = await getUserByUsername(
      `${req.session.user.username}`
    );
    const userPostsIds = currUserData.posts;
    const userPosts = await Promise.all(userPostsIds.map(async (postId) => {
      return await getPost(postId);
    }))
    const postsAndComments = await Promise.all(userPosts.map(async (post) => {
        const comments = await getAllComments(post._id.toString());
        return {
            title: post.title,
            body: post.body,
            username: post.username,
            tags: post.tags,
            likes: post.likes,
            comments: comments
        };
    }));
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

export default router;
