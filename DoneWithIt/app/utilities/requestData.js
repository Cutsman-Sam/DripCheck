import { sendEmail } from "./sendEmail"
const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';
//
export async function requestData(emailAddress) {
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/findOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users", "filter": { "email": "' + emailAddress + '" }}'
    };
    let response = await fetch(url, options)
    let data = await response.json();
    return data;
}

export async function insertNewUser(email, displayName) {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
     const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/insertOne';

     const options = {
         method: 'POST',
         headers: {
             'content-type': 'application/json',
             'api-key': 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA',
         },
         body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users", "document": {"email": "' + email + '", "displayName": "' + displayName + '", "dateCreated": "' + date + '"}}'
     };
     let response = await fetch(url, options)
     let data = await response.json();
     return data;
}

export async function getOutfits(emailAddress) {
    //TODO: Make db function to gather all outfits belonging to a specific user
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/getOutfits';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users", "filter": { "email": "' + emailAddress + '" }}'
    };
    let response = await fetch(url, options)
    let data = await response.json();
    return data;
}