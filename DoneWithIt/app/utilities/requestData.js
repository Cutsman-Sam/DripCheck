const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';

/**
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 */

/**
 * Function to check if a user exists in the database or not
 * @param {*} email email address of registering user
 * @returns false if user doesnt exist. User JSON object if user exists
 */
export async function userExists(email) {
    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/findOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{' + 
            '"dataSource": "DripCheckApp",' + 
            '"database": "test",' + 
            '"collection": "users",' +
            '"filter": {' +
                '"email": "' + email +
            '" }' +
        '}'
    };

    let response = await fetch(url,options);
    let data = await response.json();    

    //checks if JSON document is null, meaning user doesn't exist
    if(data.document == null) {
        return false;
    } else {
        //returns user document if true
        return data.document;
    }
}


/**
 * Function to insert a new user into the database
 * @param {*} email email address of user from goggole
 * @param {*} displayName displayName of user
 * @param {*} streak streak data for user in format 
 * @param {*} outfitCount displayName of user
 * @returns _id of user in database
 */
export async function insertNewUser(email, displayName, streak, outfitCount, profilePic, settingsString) {

    //get current date
    var date = getCurrentDate();

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
       
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users",' + 
                ' "document": {' + 
                '"email" : "' + email + '",' +
                '"streak" : "' + streak + '",' +
                '"lastStreakDate" : "00-00-0000",' +
                '"outfitCount" : "' + outfitCount + '",' +
                '"displayName" : "' + displayName + '",' +
                '"dateCreated" : "' + date + '",' +
                '"profilePic" : "' + profilePic + '",' +
                '"settingsString" : "' + settingsString + '"' +
                '}}'
    };

    let response = await fetch(url, options);
    let data = await response.json();
    if(data.insertedId != null) {
        return data.insertedId;
    }
    return -1;
}

/**
 * deletes a user from the database
 * @param {*} email email of user to delete
 * @returns return 1 if success, -1 on failure
 */
export async function deleteUser(email) {

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{' + 
            '"dataSource": "DripCheckApp",' + 
            '"database": "test",' + 
            '"collection": "users",' +
            '"filter": {' +
                '"email": "' + email +
            '" }' +
        '}'
    };

    let response = await fetch(url, options);
    let data = await response.json();

    if(data.deletedCount == 1) {
        return 1;
    }
    return -1;
}


/**
 * updates a user in the database, MUST PASS ALL USER DATA, NOT JUST UPDATED VALUES
 * @param {*} email email address of user
 * @param {*} displayName user's display name
 * @param {*} date account creation date, this should never change
 * @param {*} streak integer number of current streak
 * @param {*} lastStreakDay last date user's streak went up
 * @param {*} outfitCount total number of outfits the user has.
 * @param {*} profilePic profile picture of this user
 * @param {*} settingsString settings string containing settings details for user.
 * @returns 1 if user updated correctly, -1 on fail
 */
 export async function updateUser(email, displayName, date, streak, lastStreakDay, outfitCount, profilePic, settingsString) {

    
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/updateOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "users",' + 
                '"filter": {' +
                    '"email" : "' + email + '"' +
                '},' +
                '"update": {' + 
                    '"email" : "' + email + '",' + 
                    '"streak" : "' + streak + '",' +
                    '"lastStreakDate" : "' + lastStreakDay + '",' +
                    '"outfitCount" : "' + outfitCount + '",' +
                    '"displayName" : "' + displayName + '",' + 
                    '"dateCreated" : "' + date + '",' +
                    '"profilePic" : "' + profilePic + '",' +
                    '"settingsString" : "' + settingsString + '"' +
                '}' +
            '}'
     };

    let response = await fetch(url, options);
    let data = await response.json();
    //return 1 on success, -1 on failure
    if(data.matchedCount == 1 && data.modifiedCount == 1) {
        return 1;
    } else {
        return -1;
    }
}

/**
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT 
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT 
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT
 */

/**
 * checks if an outfit exists in database
 * @param {*} outfitID _id field of outfit to add
 * @returns false if outfit doesnt exist, outfitID if outfit exists
 */
export async function outfitExists(outfitID) {
     //endpoint url
     const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/findOne';

     const options = {
         method: 'POST',
         headers: {
             'content-type': 'application/json',
             'api-key': KEY,
         },
         body: '{' + 
            '"dataSource": "DripCheckApp",' + 
            '"database": "test",' + 
            '"collection": "outfits",' +
            '"filter": {' +
                '"_id" : {' + 
                    '"$oid": "' + outfitID + '"' +
                '}' +
            '}' +
        '}'
     };
 
     let response = await fetch(url,options);
     let data = await response.json();

     //checks if JSON document is null, meaning user doesn't exist
     if(data.document == null) {
         return false;
     } else {
         //returns user document if true
         return data.document;
     }
}

/**
 * Method to get all outfits in database from a specific user given the user's email
 * @param {*} email email address of user 
 * @returns array of outfit objects in database from that user
 */
 export async function getAllOutfits(email) {


    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }
    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/getOutfits';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits", "document": { "email": "' + email + '" }}'
    };

    let response = await fetch(url, options)
    let data = await response.json();

    var outfitArray = data.findResult;

    //return array of outfits
    return outfitArray;

}

/**
 * Adds an new outfit to the database
 * @param {*} email email of user adding outfit
 * @param {*} outfitName name of outfit
 * @param {*} description outfit description
 * @param {*} imageString Base64 URI image string
 * @param {*} tagString tag string passed from UI
 * @param {*} lastWorn last date an outfit was worn
 * @returns _id of inserted outfit or -1 on failure
 */
 export async function addNewOutfit(email, outfitName, description, imageString, tagString) {


    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }

    var date = getCurrentDate();

    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: 
            '{"dataSource": "DripCheckApp",'+
            ' "database": "test", '+
            ' "collection": "outfits",' + 
            ' "document": {' + 
                '"email" : "' + email + '",' + 
                '"outfitName" : "' + outfitName + '",' + 
                '"dateCreated" : "' + date + '",' + 
                '"imageString" : "' + imageString + '",' + 
                '"tags" : "' + tagString + '",' + 
                '"lastWorn" : "' + '0000-00-00' + '",' +
                '"description" : "' + description + '"' +
            '}' +
        '}'
     };

     let response = await fetch(url, options);
     let data = await response.json();
     var temp = global.outfitArray;
     let outfit = {
        id: data.insertedId,
        description: description,
        name: outfitName,
        date: date,
        image: imageString,
        tags: tagString
      };
    temp.push(outfit);
    global.outfitArray = temp;

     try {
        //else return outfitID
         return data.insertedId;
     } catch (error) {
        console.error(error);
        return -1;
     }
}   

/**
 * method to delete ALL outfits of a user from database given user's email.
 * DO NOT REMOVE USER BEFORE REMOVING OUTFITS
 * @param {*} email email of user
 * @returns number of outfits removed from database
 */
export async function removeAllOutfits(email) {

     //make sure the user trying to add an outfit exists in the database.
     const checkUser = await userExists(email);
     if(checkUser == false) {
         return -1;
     }

    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteMany';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "outfits",' + 
                '"filter":  {' +
                   '"email" : "' + email + '"' +
                '}' +
            '}'
        };

    let response = await fetch(url, options);
    let data = await response.json();

    //handle return 
    try{
        return data.deletedCount;
    } catch(error) {
        console.error("Return from Mongo Failed:\n" + JSON.stringify(data));
    }
    return -1;
}

/**
 * function to delete a specific outfit from the database
 * @param {*} outfitID ID of day to delete
 * @returns 1 on success, -1 on failure
 */
 export async function deleteOutfitDB(outfitID) {
    
    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "outfits",' + 
                '"filter":  {' +
                   '"_id" : {' + 
                       '"$oid": "' + outfitID + '"' +
                   '}' +
                '}' +
            '}'
    };
 
    let response = await fetch(url,options);
    let data = await response.json();    
    
    //handle return 
    if(data.deletedCount == 1) {
        return 1;
    }
    return -1;
}

/**
 * updates an outfits information in the database,
 * MUST PASS ALL VALUES, EVEN ONES THAT ARENT CHANGING
 * @param {*} outfitID _id field of the outfit
 * @param {*} email email of the user 
 * @param {*} outfitName name of outfit
 * @param {*} dateCreated dateCreated
 * @param {*} description just pass "" or null for now
 * @param {*} imageString the base64 URI of the image
 * @param {*} tagString the string containing tag info
 * @param {*} lastWorn tlast Date an outfit was worn
 * @returns 1 on success, -1 on failure
 */
export async function updateOutfit(outfitID, email, outfitName, dateCreated, description, imageString, tagString, lastWorn) {
     
    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }

    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/updateOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "outfits",' + 
                '"filter": {' +
                    '"_id" : {' + 
                        '"$oid": "' + outfitID + '"' +
                    '}' +
                '},' +
                '"update": {' + 
                    '"email" : "' + email + '",' + 
                    '"outfitName" : "' + outfitName + '",' + 
                    '"dateCreated" : "' + dateCreated + '",' + 
                    '"imageString" : "' + imageString + '",' + 
                    '"tags" : "' + tagString + '",' + 
                    '"lastWorn" : "' + lastWorn + '",' + 
                    '"description" : "' + description + '"' +
                '}' +
            '}'
     };

    let response = await fetch(url, options)
    let data = await response.json();

    //return 1 on success, -1 on failure
    if(data.matchedCount == 1 && data.modifiedCount == 1) {
        return 1;
    } else {
        return -1;
    }
}

/**
 * DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY 
 * DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY 
 * DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY DAY 
 */


/**
 * function to add a day to the database
 * @param {*} email 
 * @param {*} outfitID 
 * @param {*} text 
 * @param {*} date 
 * @returns -1 on fail, new day ID on success
 */
export async function addNewDay(email,outfitID,text,date) {

    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        console.error("Can't add a day to a user that doesn't exist.");
        return -1;
    }

    const checkOutfit = await outfitExists(outfitID);
    if(checkOutfit == false) {
        console.error("Can't add an outfit that doesn't exist to a day.");
        return -1;
    }
    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "days",' + 
                '"document": {' + 
                    '"email" : "' + email + '",' + 
                    '"outfitID" : {' + 
                        '"$oid": "' + outfitID + '"' +
                    '},' + 
                    '"text" : "' + text + '",' +
                    '"date" : {' +
                        '"dateString" : "' + date.dateString + '",' +
                        '"day" : "' + date.day + '",' +
                        '"month" : "' + date.month + '",' +
                        '"timestamp" : "' + date.timestamp + '",' +
                        '"year" : "' + date.year + '"' +
                    '}' +
                '}' +
            '}'
    };

    let response = await fetch(url,options);
    let data = await response.json();    
    /*var temp = global.dayArray

    let day = {
      id: data.insertedId,
      outfitId : outfitID,
      text: text,
      email: email,
      date: date
    };
    temp.push(day);

    global.dayArray = temp*/

    if(data.insertedId == null) {
        return -1;
    } else {
        //returns user document if true
        return data.insertedId;
    }
}

/**
 * function to get all days pertaining to a user from database
 * @param {*} email email of the user
 * @returns array of days from that user
 */
export async function getDaysUser(email) {

    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }


    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/find';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "days",' + 
                '"filter": {' + 
                    '"email" : "' + email + '"' +
                '}' +
            '}'
    };

    let response = await fetch(url,options);
    let data = await response.json();    


    return data.documents;
}

/**
 * function to delete a specific day from the database
 * @param {*} dayID ID of day to delete
 * @returns 1 on success, -1 on failure
 */
export async function deleteDay(dayID) {
    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "days",' + 
                '"filter":  {' +
                   '"_id" : {' + 
                       '"$oid": "' + dayID + '"' +
                   '}' +
                '}' +
            '}'
    };
 
    let response = await fetch(url,options);
    let data = await response.json();    
    //handle return 
    if(data.deletedCount == 1) {
        return 1;
    }
    return -1;
}

/**
 * function to delete all days of a specific user
 * @param {*} email email of user to delete days from
 * @returns number of days deleted
 */
export async function deleteAllDays(email) {

    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }


    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteMany';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "days",' + 
                '"filter":  {' +
                   '"email" : "' + email + '"' +
                '}' +
            '}'
    };
 
    let response = await fetch(url,options);
    let data = await response.json();    

    return data.deletedCount;
}

/**
 * 
 * @param {*} email email of user day belongs to
 * @param {*} dayID ID of the day, used as filter to select day to update
 * @param {*} text notes attached to day
 * @param {*} date date of day
 * @param {*} outfitID outfit ID attached to day
 * @returns 
 */
export async function updateDay(email,dayID,text,date,outfitID) {
    //make sure the user trying to add an outfit exists in the database.
    const checkUser = await userExists(email);
    if(checkUser == false) {
        return -1;
    }

    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/updateOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "days",' + 
                '"filter": {' +
                    '"_id" : {' + 
                        '"$oid": "' + dayID + '"' +
                    '}' +
                '},' +
                '"update": {' + 
                    '"email" : "' + email + '",' + 
                    '"date" : "' + date + '",' + 
                    '"outfitID" : {' + 
                        '"$oid": "' + outfitID + '"' +
                    '},' + 
                    '"text" : "' + text + '"' + 
                '}' +
            '}'
     };

    let response = await fetch(url, options)
    let data = await response.json();

    //return 1 on success, -1 on failure
    if(data.matchedCount == 1 && data.modifiedCount == 1) {
        return 1;
    } else {
        return -1;
    }
}

/**
 * POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST 
 * POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST
 * POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST
 */

/**
 * function to insert a new post into the database
 * @param {*} userName userName of post creator, current user
 * @param {*} saves number of initial saves a post has
 * @param {*} postTime time post was created, stored as string
 * @param {*} postImg Base64 URI image from outfit post was created with
 * @param {*} post post text associated with post
 * @param {*} dateCreated date post was created
 * @param {*} profilePic base64 URI image for profile pic of posting user
 * @returns id value of post that is created, or -1 on fail
 */
export async function addNewPost(userName, saves, postTime, postImg, post, dateCreated, profilePic) {

    //get current date
    var date = getCurrentDate();

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
       
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "posts",' + 
                ' "document": {' + 
                '"userName" : "' + userName + '",' +
                '"saves" : "' + saves + '",' +
                '"postTime" : "' + postTime + '",' +
                '"postImg" : "' + postImg + '",' +
                '"post" : "' + post + '",' +
                '"profilePic" : "' + profilePic + '",' +
                '"dateCreated" : "' + dateCreated + '"' +
            '}}'
    };

    let response = await fetch(url, options);
    let data = await response.json();
    try {
        return data.insertedId;
    } catch (error) {
        return -1;
    }
}

/**
 * deletes a post given the postID
 * @param {*} postID _id of post to delete
 * @returns 1 on success, -1 on failure
 */
export async function deletePost(postID) {

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "posts",' + 
                '"filter":  {' +
                   '"_id" : {' + 
                       '"$oid": "' + postID + '"' +
                   '}' +
                '}' +
            '}'
    };
 
    let response = await fetch(url,options);
    let data = await response.json();    
    
    //handle return 
    if(data.deletedCount == 1) {
        return 1;
    }
    return -1;
}

/**
 * deletes a post given the user's username
 * @param {*} userName username of user to delete all posts of
 * @returns number of deletedPosts
 */
 export async function deleteAllPosts(userName) {

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteMany';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "posts",' + 
                '"filter":  {' +
                   '"userName" : "' + userName + '"' +
                   '}' +
                '}' +
            '}'
    };
 
    let response = await fetch(url,options);
    let data = await response.json();    
    
    return data.deletedCount;
}

/**
 * function to update a new post into the database
 * @param {*} postID id of post to be updated
 * @param {*} userName userName of post creator, current user
 * @param {*} saves number of initial saves a post has
 * @param {*} postTime time post was created, stored as string
 * @param {*} postImg Base64 URI image from outfit post was created with
 * @param {*} post post text associated with post
 * @param {*} dateCreated date post was created
 * @returns id value of post that is created, or -1 on fail
 */
export async function updatePost(postID, userName, saves, postTime, postImg, post, dateCreated, profilePic) {

    
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/updateOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{'+
                '"dataSource": "DripCheckApp",'+ 
                '"database": "test",'+
                '"collection": "posts",' + 
                '"filter": {' +
                    '"_id" : {' + 
                        '"$oid": "' + postID + '"' +
                    '}' +
                '},' +
                ' "update": {' + 
                    '"userName" : "' + userName + '",' +
                    '"saves" : "' + saves + '",' +
                    '"postTime" : "' + postTime + '",' +
                    '"postImg" : "' + postImg + '",' +
                    '"post" : "' + post + '",' +
                    '"profilePic" : "' + profilePic + '",' +
                    '"dateCreated" : "' + dateCreated + '"' +
                '}}'
     };

    let response = await fetch(url, options)
    let data = await response.json();
    
    //return 1 on success, -1 on failure
    if(data.matchedCount == 1 && data.modifiedCount == 1) {
        return 1;
    } else {
        return -1;
    }
}

/**
 * Function to get all posts and outfits from the database
 * @returns JSON file, first half of array is posts, second half is each posts' corresponding outfit
 */
export async function getAllPosts() {

     //endpoint url
     const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/find';

     const options = {
         method: 'POST',
         headers: {
             'content-type': 'application/json',
             'api-key': KEY,
         },
         body: '{'+
                 '"dataSource": "DripCheckApp",'+ 
                 '"database": "test",'+
                 '"collection": "posts"' +
             '}'
     };
 
     let response = await fetch(url,options);
     let data = await response.json();    
     return data.documents;
}

export async function getUserPosts(userName) {

     //endpoint url
     const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/find';

     const options = {
         method: 'POST',
         headers: {
             'content-type': 'application/json',
             'api-key': KEY,
         },
         body: '{'+
                 '"dataSource": "DripCheckApp",'+ 
                 '"database": "test",'+
                 '"collection": "posts",' + 
                 '"filter": {' + 
                     '"userName" : "' + userName + '"' +
                 '}' +
             '}'
     };
 
     let response = await fetch(url,options);
     let data = await response.json();    
     
     return data.documents;
}


/**
 * function to get all posts from following users. 
 * @param {*} followingUsernameArr an array of usernames the current user follows.
 * @returns list of posts from each user.
 */
export async function getFollowingPosts(followingUsernameArr) {
    var followingPosts = { 
        "posts" : []
    }
    for(let i = 0; i < followingUsernameArr.length; i++) { 
        var doc = await getUserPosts(followingUsernameArr[i]);//supposedly this works
        for(let i = 0; i < doc.length; i++) {
            followingPosts.posts.push(doc[i]);
        }
    }

    //return all docs as one massive json
    return followingPosts.posts;
}

/**
 * Helper method to get current date
 * @returns current date in MM-DD-YYYY format
 */
export function getCurrentDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '-' + dd + '-' + yyyy;
    return date;
}