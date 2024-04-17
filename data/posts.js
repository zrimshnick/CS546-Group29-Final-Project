import { ObjectId } from "mongodb";
import { posts } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import { workouts } from "../config/mongoCollections.js";
import {
    checkString,
    checkArray,
    checkID,
} from "../helpers.js";

export const createPost = async (userId, workoutId, tags) => {
    if (workoutId === undefined || tags === undefined || userId === undefined) {
        throw `All fields must be supplied`;
    }
    checkArray(tags, "tags");
    for (let i = 0; i < tags.length; i++) {
        if (typeof tags[i] != 'string') {
            throw `tag must be a string`;
        }
        tags[i] = tags[i].trim();
    }
    workoutId = checkID(workoutId, 'workoutId');
    userId = checkID(userId, 'userId');
    const userCollection = await users();
    let user = userCollection.findOne({_id: new ObjectId(userId)});
    if(!user){
        throw `no user found with that id`;
    }

    const workoutCollection = await workouts();
    const workout = workoutCollection.findOne({_id: new ObjectId(workoutId)});
    if(!workout){
        throw `no workout found with that id`;
    };
    const postCollection = await posts();
    let post = {
        userId: userId,
        workoutId: workoutId,
        tags: tags,
        likes: 0,
        comments: []
    };
    const insertInfo = await postCollection.insertOne(post);
    post._id = insertInfo.insertedId.toString();
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw `Error: could not add post`;
    }

    user = await userCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $push: { posts: post._id } },
        { returnDocument: "after" }
    );
    if (user === null) {
        throw "No user with that id.";
    }

    return post;
};

export const getPost = async (id) => {
    if (id === undefined) {
        throw `postId not provided`;
    }
    checkString(id, 'postId');
    id = id.trim();
    checkID(id, 'postId');
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: new ObjectId(id) });
    if (post === null) {
        throw `no post found with that id`;
    }
    post._id = post._id.toString();
    return post;
};

export const deletePost = async (id) => {
    if (id === null) {
        throw `id not provided`;
    }
    checkString(id, 'postId');
    id = id.trim();
    checkID(id, 'postId');
    const postCollection = await posts();
    const deleteInfo = await postCollection.findOneAndDelete({
        _id: new ObjectId(id),
    });

    if (!deleteInfo) {
        throw `Could not delete post with id of ${id}`;
    }
    return `Successfully deleted post with id ${id}`;
};

export const updatePost = async (id, updateObject) => {
    if (id === undefined) {
        throw `postId not provided`;
    }
    checkString(id, 'postId');
    id = id.trim();
    checkID(id, 'postId');

    const postCollection = await posts();
    let post = await postCollection.findOne({ _id: new ObjectId(id) });
    if (post === null) {
        throw `no post with that id`;
    }
    if (updateObject.workoutId) {
        updateObject.workoutId = checkID(updateObject.workoutId, 'workoutId');
        post.workoutId = updateObject.workoutId;
    }
    if (updateObject.tags) {
        checkArray(updateObject.tags);
        for (let i = 0; i < updateObject.tags.length; i++) {
            checkString(updateObject.tags[i]);
            updateObject.tags[i] = updateObject.tags[i].trim();
        }
        post.tags = updateObject.tags;
    }


    await postCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: post },
        { returnDocument: "after" }
    );
    if (post === null) {
        throw `No post with that id`;
    }
    post._id = post._id.toString();
    return post;
};

export const likePost = async (postId, userId) => {
    if (postId === undefined || userId === undefined) {
        throw `postId and userId must be provided`;
    }
    postId = checkID(postId, 'postId');
    userId = checkID(userId, 'userId');

    const userCollection = await users();
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) {
        throw `post not found with that id`;
    }
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        throw `user not found with that id`;
    }

    const alreadyLiked = user.likedPosts.includes(postId); //checks to see if the user has already liked the post
    if (alreadyLiked) {
        //removes a like from the post
        user.likedPosts = user.likedPosts.filter((likedPostId) => likedPostId !== postId);
        post.likes -= 1;
    }
    else {
        //adds a like to the post
        user.likedPosts.push(postId);
        post.likes += 1;
    }

    await userCollection.updateOne(
        { _id: user._id },
        { $set: { likedPosts: user.likedPosts } }
    );
    await postCollection.updateOne(
        { _id: post._id },
        { $set: { likes: post.likes } }
    );
};