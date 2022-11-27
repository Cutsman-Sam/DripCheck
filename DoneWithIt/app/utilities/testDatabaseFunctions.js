
import * as Database from 'requestDatabase.js';
import { addNewDay, getCurrentDate } from './requestData';


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
    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }
    console.log("\t-> succeeded.");

    //test if user exists
    console.log("Testing userExists:");

    try {
        functionReturn = await Database.userExists(userEmail);
        if(functionReturn == false) {
            console.error("\t-> failed.\n" + false);
        } else {
            console.log("\t-> succeeded.")
        }
    } catch (error) {
        console.error("\t-> failed.");
    }

    //testing updateUser
    console.log("Testing updateUser:");
    try {
        functionReturn = await Database.updateUser(userEmail,"newUsername", Database.getCurrentDate,0,null,0 );
        if(functionReturn == 1) {
            console.log("\t-> succeeded.");
        } else {
            console.error("\t-> failed.\n" + functionReturn);
        }
    } catch(error) {
        console.error("\t-> failed.\n" + error);
    }

    //Testing DeleteUser function
    console.log("Testing deleteUser:");
    try {
        functionReturn = await Database.deleteUser(userEmail);
        if(functionReturn == 1) {
            console.log("\t-> succeeded.");
        } else {
            console.error("\t-> failed.\n" + functionReturn);
        }
    } catch(error) {
        console.error("\t-> failed.\n" + error);
    }


    //Test Outfit Functions

    //add outfit
    console.log("Testing addNewOutfit:");
    try {
        //functionReturn = await Database.addNewOutfit(userEmail,"testOutfit","desc",null,null);
    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    //update outfit
    console.log("Testing updateOutfit:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    //get all otufits
    console.log("Testing getAllOutfits:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    //delete single outfit
    console.log("Testing deleteOutfitDB");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    //remove all outfits
    console.log("Testing removeAllOutfits:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    //Testing Day functions
    console.log("Testing addNewDay:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing getDaysUser:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing updateDay:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing deleteDay:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing deleteAllDays:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }



    //Testing Post Functions
    console.log("Testing addNewPost:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing updatePost:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing getAllPosts:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing getUserPosts:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing getFollowingPosts");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing deletePost:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }

    console.log("Testing deleteAllPosts:");
    try {

    } catch (error) {
        console.error("\t-> failed.\n" + error);
    }
}