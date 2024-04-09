import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import users from '../data/users.js';

const db = await dbConnection();
await db.dropDatabase();

const user1 = await users.createUser('tlapinta', 'Thomas', 'LaPinta', 
                                'tlapinta@stevens.edu', 'Abc1234#',
                                'm', ['baseball'], "6'2\"",  'standard', '175', 'lbs');
console.log(user1);


const user2 = await users.createUser('philliam', 'Patrick', 'Hill', 
                                'phill@stevens.edu', 'Pword@!111',
                                'm', ['football','soccer'], "5'10\"",  'standard', '160', 'lbs');

console.log(user2)



const user3 = await users.createUser('jRand586', 'Jules', 'Random', 
                                'jrandom@gmail.com', '123Rand!#**',
                                'f', ['tennis'], "5'17\"",  'standard', '120', 'lbs');

console.log(user3);

// Use to test other user data functions besides createUser
// try {
//     const getUser3 = await users.getUser(user3._id.toString());
//     console.log(getUser3);
// } catch (e){
//     console.log(e);
// }

// console.log(await users.deleteUser(user3._id.toString()));

// try{ 
//     console.log(await users.updateUser(user1._id.toString(), {username: 'tlapinta42', lastName: 'LaPinta-Caracciolo'}))
// } catch (e){
//     console.log(e);
// }

console.log('Done seeding database');

await closeConnection();
