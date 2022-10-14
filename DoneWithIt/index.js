const { MongoClient, ServerApiVersion } = require('mongodb');

//connection string
const uri = "mongodb+srv://admin307:chamberdrip@dripcheckapp.pqkwnvc.mongodb.net/?retryWrites=true&w=majority";

//client init
const client = new MongoClient(uri);

//query functions
async function run() {
    try {
        //database
        const database = client.db('DripBase');
        const users = database.collection('user');

    } finally {
        //after connection
        
    }

}
run().catch(console.dir);
