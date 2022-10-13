package DoneWithIt;

public class serverResponseHandler {
    public void handleResponse(String serverResponse) {

        //split using agreed upon regex
        String[] messageSplit = serverResponse.split("~|`");
        int requestNum = 0;

        //check for fail
        if(messageSplit[0].equals("fail")) {
            System.out.printf("Response Handler: server reported request %d failed\n", Integer.parseInt(messageSplit[1]));
            return;
        }
        //check if we received a valid request num
        try{
            requestNum = Integer.parseInt(messageSplit[messageSplit.length - 1]);
        } catch(NumberFormatException e) {
            System.out.println("");
            return;
        }

        //handle each response
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
             * Get existing user data
             * {"success" || "fail"}~|`userID~|`{profilePic still dont know about pic stuff}~|`{outfit 1 info}~|`{outfit 2 info}Format: {"success" || "fail"}~|`3
             */
            case 3: 

                break;
            /*
             * Update display name
             * Format: {"success" || "fail"}~|`4
             */
            case 4: 

                break;
            /*
             * Update profile pic
             * Format: {"success" || "fail"}~|`5
             */
            case 5: 

                break;
            /*
             * Remove all user data 
             * Format: {"success" || "fail"}~|`6
             */
            case 6: 

                break;
            /*
             * Add new outfit to database under user
             * Format: {"success" || "fail"}~|`outfitID~|`7
             */
            case 7: 

                break;
            /*
             * Delete outfit from database
             * Format: {"success" || "fail"}~|`8
             */
            case 8: 

                break;
            /*
             * Edit outfit information in database
             * Format: {"success" || "fail"}~|`outfitID~|`9
             */
            case 9: 

                break;
            /*
             * Give/receive notification token
             * Format: {"success" || "fail"}~|`token~|`10
             */
            case 10: 

                break;
            /*
             * only calls this if the request is invalid so < 1 or > 10
             */
            default:
                //request number is invalid
                System.out.println("ServerResponseHandler: request number invalid, not a valid requst number");
                return;
        } 
    }
}
