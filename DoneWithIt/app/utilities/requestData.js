import { sendEmail } from "./sendEmail"

//
export async function requestData(emailAddress) {
    //TODO: Gather all of user's data from database
    const url = 'https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/v1/action/findOne';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'api-key': 'API-KEY-HERE',
        },
        body: '{"dataSource": "<cluster name>", "database": "learn-data-api", "collection": "people", "filter": { "name": "John Sample" }}'
    };
    const stat = (await fetch(url, options)).status
    formattedData = "Sample User Data: qwoijciwqojrowiqejiowqjfoiqwejfiojwqeiofjwqfiowjfoiwjfewqofvoiqnifnqwifojfqweiotjwqiyeqrjiofksdamcioqwemoiw"
    sendEmail(emailAddress, "Dripcheck: User Data Requested", formattedData)
}