import { sendEmail } from "./sendEmail"

//
export async function requestData(emailAddress) {
    //TODO: Gather all of user's data from database
    formattedData = "Sample User Data: qwoijciwqojrowiqejiowqjfoiqwejfiojwqeiofjwqfiowjfoiwjfewqofvoiqnifnqwifojfqweiotjwqiyeqrjiofksdamcioqwemoiw"
    sendEmail(emailAddress, "Dripcheck: User Data Requested", formattedData)
}