import { sendEmail } from "./sendEmail"
const KEY = 'nsGQLXniFr1RwE6idSX7fNOWIw5dZOWm3xV0TyyGTfbx5FOtQTbcyV8VDKyfYXsA';
//
export async function requestData(emailAddress) {
    //TODO: Gather all of user's data from database
    const url = 'https://data.mongodb-api.com/app/data-ndazo/endpoint/data/v1/action/findOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': KEY,
        },
        body: '{"dataSource": "DripCheckApp", "database": "test", "collection": "users", "filter": { "email": "jdawgs009@gmail.com" }}'
    };
    let response = await fetch(url, options)
    let data = await response.json();
    console.log(data);
}

export async function insertNewUser(email, displayName) {
     //TODO: Gather all of user's data from database
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
     console.log(data);
}
