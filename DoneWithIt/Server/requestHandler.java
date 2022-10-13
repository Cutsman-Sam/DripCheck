package DoneWithIt.Server;
import java.util.ArrayList;

public class requestHandler {
    public String handleRequest(String clientMessage) { 
        String response = null;
        //split using agreed upon regex
        String[] messageSplit = clientMessage.split("~|`");
        int requestNum = 0;
        //check if we received a valid request num
        try{
            requestNum = Integer.parseInt(messageSplit[0]);
        } catch(NumberFormatException e) {
            return null;
        }
        switch (requestNum) {
            /* 
             * Check User Exists:
             * Format: 1~|`email
            */
            case 1: 

                break;
            /*
             * Add new User
             * Format: 2~|`email~|`displayName~|`
            */
            case 2: 

                break;
            /*
             * Get existing user data
             * Format: 3~|`email
             */
            case 3: 

                break;
            /*
             * Update display name
             * Format: 4~|`userID~|`displayName
             */
            case 4: 

                break;
            /*
             * Update profile pic
             * Format: 5~|`userID~|`{need to figure out what to do with pics for the moment}
             */
            case 5: 

                break;
            /*
             * Remove all user data 
             * Format: 6~|`userID
             */
            case 6: 

                break;
            /*
             * Add new outfit to database under user
             * Format: 7~|`userID~|`{outfit image idk what to do so far}~|`outfitName~|`outfitDescription
             */
            case 7: 

                break;
            /*
             * Delete outfit from database
             * Format: 8~|`userID~|`outfitID
             */
            case 8: 

                break;
            /*
             * Edit outfit information in database
             * Format: 9~|`userID~|`outfitID~|`{outfit Image}~|`outfitName~|`outfitDescription
            */
            case 9: 

                break;
            /*
             * Give/receive notification token
             * Format: 10~|`userID~|`token/NULL
             */
            case 10: 

                break;
            default:
                //request number is invalid
                System.out.println("MessageHandler: no request to match offered number");
                return null;
        } 
        return response;
    }
}
