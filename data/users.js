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

}

export default { createUser }