const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';

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
        return data;
    }
}


/**
 * Function to insert a new user into the database
 * @param {*} email email address of user from goggole
 * @param {*} displayName displayName of user
 * @returns _id of user in database
 */
export async function insertNewUser(email, displayName) {

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
                '"email" : "' + email +
                '", "displayName" : "' + displayName +
                '", "dateCreated" : "' + date + '"  }}'
    };

    let response = await fetch(url, options);
    let data = await response.json();
    if(data.document == null) {
        return -1;
    }
    //else return userID
    return data.document._id;
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
 * deletes an outfit from the database
 * @param {*} id id of outfit to delete
 * @returns return 1 if success, -1 on failure
 */
 export async function deleteOutfit(outfitID) {

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
            '"collection": "outfits",' +
            '"filter": {' +
                '"_id" : {' + 
                    '"$oid": "' + outfitID + '"' +
                '}' +
            '}' +
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
 * Adds an new outfit to the database
 * @param {*} email email of user adding outfit
 * @param {*} outfitName name of outfit
 * @param {*} description outfit description
 * @param {*} imageString Base64 URI image string
 * @returns _id of inserted outfit or -1 on failure
 */
export async function addNewOutfit(email, outfitName, description, imageString) {

    var date = getCurrentDate();
    globalThis.accountDate = date;
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits",' + 
        ' "document": {' + 
        '"email" : "' + email + '",' + 
        '"outfitName" : "' + outfitName + '",' + 
        '"dateCreated" : "' + date + '",' + 
        '"imageString" : "' + imageString + '",' + 
        '"description" : "' + description + '"  }}'
     };

     let response = await fetch(url, options)
     let data = await response.json();

     //handle return 
     if(data.document == null) {
        return -1;
     }

     //else return outfitID
     return data.document._id;
}

/**
 * method to delete ALL outfits of a user from database given user's email.
 * DO NOT REMOVE USER BEFORE REMOVING OUTFITS
 * @param {*} emailAddress email of user
 * @returns number of outfits removed from database
 */
export async function removeAllOutfits(emailAddress) {

    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteAllUserOutfits';

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
 * Method to get all outfits in database from a specific user given the user's email
 * @param {*} emailAddress email address of user 
 * @returns array of outfit objects in database from that user
 */
export async function getAllOutfits(emailAddress) {

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

    let response = await fetch(url, options)
    let data = await response.json();

    var outfitArray = data.findResult;

    //return array of outfits
    return outfitArray;

}


/**
 * 
 * @param {*} emailAddress 
 * @param {*} outfitName 
 * @param {*} description 
 * @param {*} imageString 
 */
export async function updateOutfit(outfitID, email, outfitName, description, imageString) {
    
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
                    '"dateCreated" : "' + date + '",' + 
                    '"imageString" : "' + imageString + '",' + 
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
 * 
 * @param {*} emailAddress 
 * @param {*} displayName 
 * @param {*} dateCreated 
 */
export async function updateUser(userID, displayName, dateCreated) {
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
                    '"_id" : {' + 
                        '"$oid": "' + userID + '"' +
                '},' +
                '"update": {' + 
                    '"email" : "' + email + '",' + 
                    '"displayName" : "' + outfitName + '",' + 
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