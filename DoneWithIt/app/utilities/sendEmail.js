//
export async function sendEmail(to, subject, body) {
    const url = 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'c1eb99b731mshca880d4da5c8547p1e1f70jsn1f6eb7211649',
    'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
  },
  body: '{"personalizations":[{"to":[{"email":' + '"' + to + '"' + '}],"subject":' + '"' + subject + '"' + '}],"from":{"email":"dripcheck307@gmail.com"},"content":[{"type":"text/plain","value":' + '"' + body + '"' + '}]}'
};
const stat = (await fetch(url, options)).status
}