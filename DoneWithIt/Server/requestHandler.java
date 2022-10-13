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
             * Format: {"success" || "fail"}~|`1
            */
            case 1: 

                break;
            /*
             * Add new User
             * Format: {"success" || "fail"}~|`userID~|`2
            */
            case 2: 

                break;
            /*
             * 
             */
            case 3: 

                break;
            /*
             * 
             */
            case 4: 

                break;
            /*
             * 
             */
            case 5: 

                break;
            /*
             * 
             */
            case 6: 

                break;
            /*
             * 
             */
            case 7: 

                break;
            case 8: 

                break;
            case 9: 

                break;
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
