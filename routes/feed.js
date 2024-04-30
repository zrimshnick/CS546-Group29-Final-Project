import { Router } from "express";
const router = Router();
import xss from 'xss';
import{
    createPost,
    getPost,
    deletePost,
    updatePost,
    likePost,
    getAllPosts
} from "../data/posts.js";
import {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment
} from "../data/comments.js";
import {getUserByUsername, getUser} from "../data/users.js";
import { getWorkout } from "../data/workouts.js";
import { checkString, checkArray, checkNumber, checkID } from "../helpers.js";

router
.route("/")
.get(async(req, res) => {
    try{
        const posts = await getAllPosts();
        const comments = await getAllComments();
        res.render("feedPage", {
            title: "Tracklete | Feed",
            posts: posts,
            username: posts.username,
            comments: comments
        });
    }catch(e){
        console.log(e);
    }

})
.post(async (req, res) => {
    const postData = req.body;
    //error checking
    try{
        postData.workoutId = checkID(postData.workoutId, 'workoutId');
    }catch(e){
        console.log(e);
    }
    try{
        postData.usertId = checkID(postData.userId, 'userId');
    }catch(e){
        console.log(e);
    }
    try{
        postData.title = checkString(postData.title, 'title');
    }catch(e){
        console.log(e);
    }
    try{
        postData.body = checkString(postData.body, 'body');
    }catch(e){
        console.log(e);
    }
    try{
        postData.tags = checkArray(postData.tags, 'tags');
        for(let i = 0; i < postData.tags.length; i++){
            postData.tags[i] = checkString(postData.tags[i]);
        }
    }catch(e){
        console.log(e);
    }
    try{
        checkNumber(postData.likes, 'likes');
    }catch(e){
        console.log(e);
    }
    try{
        postData.username = checkString(postData.username, 'username');
    }catch(e){
        console.log(e);
    }

    try{
        const {userId, username, workoutId, title, body, tags} = postData;
        const newPost = await postData.createPost(userId, username, workoutId, title, body, tags);
        res.redirect('/feed')
    }catch(e){
        res.status(500).json({ e: "Internal Server Error" });
    }

});

router.route("/:postId").delete(async (req, res) => {
    const postId = req.params.postId;
    try{
        const deletedPost = await deletePost(postId);
        console.log(`DELETED ${deletedPost}`);
        return res.redirect("/feed");
    }catch(e){
        console.log(`ERROR DELETING POST WITH ID: ${postId}`);
        res.status(500).json({e: "Internal Server Error"});
    }
});

export default router;