
import * as Database from './requestData';


export async function testDatabaseFunctions() {

    //testing Var's
    const userEmail = "testEmail1@gmail.com";
    const userName1 = "testUser";
    var functionReturn;
    var userID;


    //Test User Functions

    //Test adding user
    console.log("Testing insertNewUser:");

    try {
        functionReturn = await Database.insertNewUser(userEmail,userName1, 0, 0);
        userID = functionReturn;
        if(functionReturn != -1){
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tinsertNewUser -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tinsertNewUser -> failed.\n\t\t" + error);
    }

    //test if user exists
    console.log("Testing userExists:");

    try {
        functionReturn = await Database.userExists(userEmail);
        if(functionReturn == false) {
            console.error("\tuserExists -> failed.\n\t\t" + false);
        } else {
            console.log("\t\t-> succeeded.");
        }
    } catch (error) {
        console.error("\tuserExists -> failed.");
    }

    //testing updateUser
    console.log("Testing updateUser:");
    try {
        functionReturn = await Database.updateUser(userEmail,"newUsername", Database.getCurrentDate(),0,"00-00-0000",0);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tupdateUser -> failed.\n\t\t" + functionReturn);
        }
    } catch(error) {
        console.error("\tupdateUser -> failed.\n\t\t" + error);
    }

    //Testing DeleteUser function
    console.log("Testing deleteUser:");
    try {
            functionReturn = await Database.deleteUser(userEmail);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeleteUser -> failed.\n\t\t" + functionReturn);
        }
    } catch(error) {
        console.error("\tdeleteUser -> failed.\n\t\t" + error);
    }


    //Test Outfit Functions

    //add new user with Zero outfits
    var functionReturn2;
    const outfitUser = "testUser2@gmail.com"
    const userName = "testUser2"
    var outfitID;
    Database.insertNewUser(outfitUser,userName,0,0);

    //add outfit
    console.log("Testing addNewOutfit:");
    try {
        outfitID = await Database.addNewOutfit(outfitUser,"testOutfit","desc",null,null);
        functionReturn2 = await Database.addNewOutfit(userEmail,"testOutfitFail","desc",null,null);
        if(outfitID != -1 && functionReturn2 == -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\taddNewOutfit -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\taddNewOutfit -> failed.\n\t\t" + error);
    }

    //update outfit
    console.log("Testing updateOutfit:");
    try {
        functionReturn = await Database.updateOutfit(outfitID,outfitUser, Database.getCurrentDate(),"updatedName","desc",null,null);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tupdateOutfit -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tupdateOutfit -> failed.\n\t\t" + error);
    }

    //get all otufits
    console.log("Testing getAllOutfits:");
    try {
        functionReturn = await Database.getAllOutfits(outfitUser);
        if(functionReturn != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tgetAllOutfits -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tgetAllOutfits -> failed.\n\t\t" + error);
    }

    //delete single outfit
    console.log("Testing deleteOutfitDB");
    try {
        functionReturn = await Database.deleteOutfitDB(outfitID);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeleteOutfitDB -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tdeleteOutfitDB-> failed.\n\t\t" + error);
    }

    outfitID = await Database.addNewOutfit(outfitUser,"testOutfit","desc","__","__");
    
    //remove all outfits
    console.log("Testing removeAllOutfits:");
    try {
        functionReturn = await Database.removeAllOutfits(outfitUser);
        if(!isNaN(functionReturn)) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tremoveAllOutfits -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tremoveAllOutfits -> failed.\n\t\t" + error);
    }


    outfitID = await Database.addNewOutfit(outfitUser,"testOutfit","desc","__","__");
    var dayID;
    
    var date = {
        dateString: Database.getCurrentDate(),
        month : Database.getCurrentDate().substring(0,2),
        day : Database.getCurrentDate().substring(3,5),
        year : Database.getCurrentDate().substring(6,10),
        timestamp : "12:00:00"
    }
    
    //Testing Day functions
    console.log("Testing addNewDay:");
    try {
         dayID = await Database.addNewDay(outfitUser,outfitID,"testText",date);
         if(dayID != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\taddNewDay -> failed.\n\t\t" + dayID);
        }
    } catch (error) {
        console.error("\taddNewDay -> failed.\n\t\t" + error);
    }

    console.log("Testing getDaysUser:");
    try {
        functionReturn = await Database.getDaysUser(outfitUser);
        if(functionReturn != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tgetDaysUser -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tgetDaysUser -> failed.\n\t\t" + error);
    }

    console.log("Testing updateDay:");
    try {
        functionReturn = await Database.updateDay(outfitUser,dayID,"newText",date,outfitID);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tupdateDay -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tupdateDay -> failed.\n\t\t" + error);
    }

    console.log("Testing deleteDay:");
    try {
        functionReturn = await Database.deleteDay(dayID);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeleteDay -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tdeleteDay -> failed.\n\t\t" + error);
    }

   
    dayID = await Database.addNewDay(outfitUser,outfitID,"testText",date);

    console.log("Testing deleteAllDays:");
    try {
        functionReturn = await Database.deleteAllDays(outfitUser);
        if(functionReturn != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeleteAllDays -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tdeleteAllDays -> failed.\n\t\t" + error);
    }


    var postID;

    //Testing Post Functions
    console.log("Testing addNewPost:");
    try {
        postID = await Database.addNewPost(outfitUser,outfitID);

        if(postID != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\taddNewPost -> failed.\n\t\t" + postID);
        }
    } catch (error) {
        console.error("\taddNewPost -> failed.\n\t\t" + error);
    }

    console.log("Testing updatePost:");
    try {
        functionReturn = await Database.updatePost(postID,outfitUser,outfitID,date.dateString);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tupdatePost -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tupdatePost -> failed.\n\t\t" + error);
    }

    console.log("Testing getAllPosts:");
    try {
        const posts = await Database.getAllPosts();
        console.log("\t\t-> succeeded.");
    } catch (error) {
        console.error("\tgetAllPosts -> failed.\n\t\t" + error);
    }

    console.log("Testing getUserPosts:");
    try {
        functionReturn = await Database.getUserPosts(outfitUser);
        if(functionReturn != -1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tgetUserPosts -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tgetUserPosts -> failed.\n\t\t" + error);
    }

    /*console.log("Testing getFollowingPosts:");
    try {
        const followingUsers = ["testUser1","testUser2","testUser3"];
        await Database.insertNewUser("testUser1","testUser1",0,0);
        await Database.insertNewUser("testUser2","testUser1",0,0);
        await Database.insertNewUser("testUser3","testUser1",0,0);
        const outfit1 = await Database.addNewOutfit("testUser1","outfit","desc","","");
        const outfit2 = await Database.addNewOutfit("testUser2","outfit","desc","","");
        const outfit3 = await Database.addNewOutfit("testUser3","outfit","desc","","");
        const post1 = await Database.addNewPost("testUser1",outfit1);
        const post2 = await Database.addNewPost("testUser2",outfit2);
        const post3 = await Database.addNewPost("testUser3",outfit3);

        functionReturn = await Database.getFollowingPosts(followingUsers);
        console.log(JSON.stringify(functionReturn));

        Database.deletePost(post1);
        Database.deletePost(post2);
        Database.deletePost(post3);
        Database.deleteOutfitDB(outfit1);
        Database.deleteOutfitDB(outfit2);
        Database.deleteOutfitDB(outfit3);


    } catch (error) {
        console.error("\tgetFollowingPosts -> failed.\n\t\t" + error);
    }*/

    console.log("Testing deletePost:");
    try {
        functionReturn = await Database.deletePost(postID);
        if(functionReturn == 1) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeletePost -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tdeletePost -> failed.\n\t\t" + error);
    }

    console.log("Testing deleteAllPosts:");
    try {
        functionReturn = await Database.deleteAllPosts();
        if(functionReturn >= 0) {
            console.log("\t\t-> succeeded.");
        } else {
            console.error("\tdeletePost -> failed.\n\t\t" + functionReturn);
        }
    } catch (error) {
        console.error("\tdeleteAllPosts -> failed.\n\t\t" + error);
    }

    Database.deleteAllPosts(outfitUser);
    Database.removeAllOutfits(userEmail);
    Database.removeAllOutfits(outfitUser);
    Database.deleteUser(outfitUser);
    Database.deleteUser("testUser1");
    Database.deleteUser("testUser2");
    Database.deleteUser("testUser3");
}