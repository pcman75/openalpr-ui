const functions = require('firebase-functions');
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    response.send("Hello Hello");
});

exports.getplates = functions.https.onRequest(async (request, response) => {
    let client;
    let data = {};
    try {
        client = await MongoClient.connect(config.mongodb_url);
        let db = client.db(config.dbName);
        data = await db.collection(config.platesCol).find({}).toArray();
        response.status(200).send(data);
    }
    catch (err) {
        console.error(err);
        response.status(500).send(data);
    }
    finally {
        if (client)
            await client.close();
    }
});