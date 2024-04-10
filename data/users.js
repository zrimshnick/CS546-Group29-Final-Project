//Location of all the user data functions 
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.js';
import { checkString, checkArray, checkValidEmail, checkValidPassword, checkGender } from '../helpers.js'

const createUser = async (
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
) => {
    // Error Checking Perfromance on Input Values
    checkString(username, 'username');
    checkString(firstName, 'firstName');
    checkString(lastName, 'lastName');
    checkString(email, 'email');
    checkString(password, 'password');
    checkString(gender, 'gender');
    checkString(height, 'height');
    checkString(heightUnit, 'heightUnit');
    checkString(weight, 'weight');
    checkString(weightUnit, 'weightUnit');

    checkArray(sports, 'sports');

    username = username.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    gender = gender.trim();
    height = height.trim();
    heightUnit = heightUnit.trim();
    weight = weight.trim();
    weightUnit = weightUnit.trim();

    checkGender(gender, 'gender')

    checkValidEmail(email, 'email');
    checkValidPassword(password, 'password');

    sports.forEach((sport) => {
        checkString(sport, 'sport');
    });

    sports = sports.map(sport => sport.trim());

    let newProd = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        sports: sports,
        height: height,
        heightUnit: heightUnit,
        weight: weight,
        weightUnit: weightUnit,
        workouts: [],
        posts: [],
        likedPosts: []
    }

    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newProd);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw 'Could not add prod';
  
    const user = await userCollection.findOne({ _id: insertInfo.insertedId})
    user._id = user._id.toString().trim();
    return user;
}

const getUser = async (id) => {
    checkString(id, 'id');
    
    id = id.trim();
    
    if (!ObjectId.isValid(id)){ 
        throw 'Invalid object ID.';
    }

    const userCollection = await users();
    const user = await userCollection.findOne({_id: new ObjectId(id)});
  
    if (user === null) {
      throw 'No user with that id.';
    }
  
    user._id = user._id.toString();
    return user;
}

const deleteUser = async (id) => {
    checkString(id, 'id');
    
    id = id.trim();
    
    if (!ObjectId.isValid(id)){ 
        throw 'invalid object ID';
    }

    const userCollection = await users();
    const user = await userCollection.findOneAndDelete({_id: new ObjectId(id)});
  
    if (user === null) {
      throw 'No user with that id.';
    }
    
    //Implement deletion of the workouts and posts and liked posts
    return `Successfully deleted user with id ${id}`;
}

const updateUser = async (id, obj) => {
    console.log(id)
    checkString(id, 'id');
    
    id = id.trim();
    
    if (!ObjectId.isValid(id)){ 
        throw 'invalid object ID';
    }

    const keys = Object.keys(obj);
  
    if (keys.length === 0){
      throw 'need to implement a field to change for a patch request'
    }

    keys.forEach((key) => {
        if (key === 'username' || key === 'firstName' || key === 'lastname'){
            checkString(obj[key], `updated${key}`);
            obj[key] = obj[key].trim()
        }
        if (key === 'email'){
            checkString(obj[key], "updatedEmail");
            checkValidEmail(obj[key], "updatedEmail")
        }
        if (key === 'password'){
            checkString(obj[key], "updatedPassword");
            checkValidPassword(obj[key], "updatedPassword")
        }
        if (key === 'gender'){
            checkString(obj[key], "updatedGender");
            checkGender(obj[key], "updatedGender")
        }
        if (key === 'height'){
            checkString(obj[key], "updatedGender");
        }
        if (key === 'heightUnit'){
            checkString(obj[key], "updatedGender");
        }
        if (key === 'weight'){
            checkString(obj[key], "updatedGender");
        }
        if (key === 'weightUnit'){
            checkString(obj[key], "updatedGender");
        }
        if (key === 'sports'){
            obj[key].forEach((sport) => {
                checkString(sport, 'sport');
            });
        
            obj[key] = obj[key].map(sport => sport.trim());
        }
    })

    //not sure if you will update workouts, posts, and liked posts here

    const userCollection = await users();
    const user = await userCollection.findOneAndUpdate({_id: new ObjectId(id)},
                                                       {$set: obj},
                                                       {returnDocument: 'after'});
  
    if (user === null) {
      throw 'No user with that id.';
    }
    
    user._id = user._id.toString();
    return user
}

export default { createUser, getUser, deleteUser, updateUser }