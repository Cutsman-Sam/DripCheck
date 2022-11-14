const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';

/**
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 * USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER USER 
 */

/**
 * Function to check if a user exists in the database or not
 * @param {*} emailAddress email address of registering user
 * @returns false if user doesnt exist. User JSON object if user exists
 */
export async function userExists(emailAddress) {
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
                '"email": "' + emailAddress +
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
export async function insertNewUser(email, displayName, streak, outfitCount) {

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
                '"dateCreated" : "' + date + '"  }}'
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
 * @param {*} streak integer number of current streak
 * @param {*} outfitCount total number of outfits the user has.
 * @param {*} lastStreakDay last date user's streak went up
 * @param {*} dateCreated account creation date, this should never change
 * @returns 1 if user updated correctly, -1 on fail
 */
 export async function updateUser(email, displayName, dateCreated, streak, lastStreakDay, outfitCount) {
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
                    '"dateCreated" : "' + dateCreated + '"' +
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
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT 
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT 
 * OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT OUTFIT
 */


/**
 * Method to get all outfits in database from a specific user given the user's email
 * @param {*} emailAddress email address of user 
 * @returns array of outfit objects in database from that user
 */
 export async function getAllOutfits(emailAddress) {

    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/getOutfits';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits", "document": { "email": "' + emailAddress + '" }}'
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
 * @returns _id of inserted outfit or -1 on failure
 */
 export async function addNewOutfit(email, outfitName, description, imageString, tagString) {

    var date = getCurrentDate();

    globalThis.accountDate = date;
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
                '"description" : "' + description + '"' +
            '}' +
        '}'
     };

     let response = await fetch(url, options)
     let data = await response.json();

     //handle return 
     if(data.document == null) {
        return -1;
     }

     //else return outfitID
     return data;
}

/**
 * method to delete ALL outfits of a user from database given user's email.
 * DO NOT REMOVE USER BEFORE REMOVING OUTFITS
 * @param {*} emailAddress email of user
 * @returns number of outfits removed from database
 */
export async function removeAllOutfits(emailAddress) {

    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/deleteAllUserOutfits';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits", "document": { "email": "' + emailAddress + '" }}'
    };

    let response = await fetch(url, options);
    let data = await response.json();
    console.log(data);

    //handle return 
    if(data.deleteResult == null) {
        return -1;
    }

    //return document passed
    return data.deleteResult.deletedCount;
}

/**
 * updates an outfits information in the database,
 * MUST PASS ALL VALUES, EVEN ONES THAT ARENT CHANGING
 * @param {*} outfitID _id field of the outfit
 * @param {*} emailAddress email of the user 
 * @param {*} outfitName name of outfit
 * @param {*} description just pass "" or null for now
 * @param {*} imageString the base64 URI of the image
 * @param {*} tagString the string containing tag info
 */
export async function updateOutfit(outfitID, email, outfitName, description, imageString, tagString) {
    
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
                    '"imageString" : "' + imageString + '",' + 
                    '"tags" : "' + tagString + '",' + 
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
                    '"outfitID" : "' + outfitID + '",' +
                    '"text" : "' + text + '",' +
                    '"date" : "' + date + '"' +
                '}' +
            '}'
    };

    let response = await fetch(url,options);
    let data = await response.json();    

    //checks if JSON document is null, meaning user doesn't exist
    if(data.document == null) {
        return -1;
    } else {
        //returns user document if true
        return data.document._id;
    }
}

/**
 * function to get all days pertaining to a user from database
 * @param {*} email email of the user
 * @returns array of days from that user
 */
export async function getDaysUser(email) {
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

    //checks if JSON document is null, meaning user doesn't exist
    return data.documents;
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
    if(data.deleteResult.deletedCount == 1) {
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
    
    //handle return 
    if(data.deleteResult == null) {
        return -1;
    }

    return data.deleteResult.deletedCount;
}

/**
 * 
 * @param {*} email email of user day belongs to
 * @param {*} dayID ID of the day
 * @param {*} text notes attached to day
 * @param {*} date date of day
 * @param {*} outfitID outfit ID attached to day
 * @returns 
 */
export async function updateDay(email,dayID,text,date,outfitID) {
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