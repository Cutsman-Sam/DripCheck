const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';

/**
 * 
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
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users", "filter": { "email": "' + emailAddress + '" }}'
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
export async function deleteUser(email) {

    //endpoint url
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/deleteOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
       
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users",' + 
                ' "filter": {"email": "' + email + '" }}' 
    };

    let response = await fetch(url, options);
    let data = await response.json();
    return data.deletedCount;
}
export async function addNewOutfit(email, outfitName, description, imageString) {

    var date = getCurrentDate();
    globalThis.accountDate = date;
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

    const opt = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits",' + 
        ' "document": {' + 
        '"userEmail" : "' + email + '",' + 
        '"outfitName" : "' + outfitName + '",' + 
        '"dateCreated" : "' + date + '",' + 
        '"imageString" : "' + imageString + '",' + 
        '"description" : "' + description + '"  }}'
     };

     let response = await fetch(url, opt)
     let data = await response.json();

     //handle return 
     if(data.document == null) {
        return -1;
     }

     //else return outfitID
     return data;
}

export async function getAllOutfits(emailAddress) {

    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/getOutfits';

    const opt = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "outfits", "filter": { "email": "' + emailAddress + '" }}'
    };

    let response = await fetch(url, options)
    let data = await response.json();

    //handle return 
    if(data.document == null) {
        return -1;
    }

    //return document passed
    return data.document;
}

export function getCurrentDate() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return date;
}