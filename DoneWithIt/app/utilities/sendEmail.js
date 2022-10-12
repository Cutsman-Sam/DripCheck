import qs from 'qs';
import { Linking } from 'react-native';
import email from 'react-native-email';
//
export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    email(to, {
        // Optional additional arguments
        cc: cc, // string or array of email addresses
        bcc: bcc, // string or array of email addresses
        subject: subject,
        body: body,
        checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error)
}