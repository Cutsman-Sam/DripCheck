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