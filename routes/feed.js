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
        const postsAndComments = [];
        for (const post of posts){
            const comments = await getAllComments(post._id.toString());
            const postWithComments = {
                userId: post.userId,
                title: post.title,
                body: post.body,
                username: post.username,
                tags: post.tags,
                likes: post.likes,
                comments: comments
            };
            postsAndComments.push(postWithComments);
        }
        res.render("feedPage", {
            title: "Tracklete | Feed",
            posts: postsAndComments
        });
    }catch(e){
        console.log('Error getting post: ', e);
    }

})
.post(async (req, res) => {
    const addPostData = req.body;
    console.log("post data: ", addPostData);
    let currUserData = undefined;
    try {
        currUserData = await getUserByUsername(
          `${req.session.user.username}`
        );
    }catch(e){
        console.log(e);
    }
    let title = xss(addPostData.title);
    let body = xss(addPostData.body);
    let tags = xss(addPostData.tags);
    let username = xss(addPostData.username);
    tags = tags.split(",").map(tag => tag.trim());
    //error checking
    try{
        title = checkString(title, 'title');
    }catch(e){
        console.log(e);
    }
    try{
        body = checkString(body, 'body');
    }catch(e){
        console.log(e);
    }
    try{
        tags = checkArray(tags, 'tags');
        for(let i = 0; i < tags.length; i++){
            tags[i] = checkString(tags[i]);
        }
    }catch(e){
        console.log(e);
    }
    try{
        username = checkString(username, 'username');
    }catch(e){
        console.log(e);
    }

    try{
        const newPost = await createPost(currUserData._id.toString(), username, title, body, tags);
        res.redirect('/profile');
    }catch(e){
        console.log(e);
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