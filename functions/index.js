const functions = require('firebase-functions');
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

exports.helloWorld = functions.https.onRequest(async (request, response) => {
    response.send("Hello Hello");
});

exports.getplates = functions.https.onRequest(async (request, response) => {
    let client;
    let table = {};
    try {
        client = await MongoClient.connect(config.mongodb_url);
        let db = client.db(config.dbName);
        let data = await db.collection(config.platesCol).find({}).toArray();

        table.header = Object.keys(data[0]);
        table.data = data.map(function (obj) {
            return Object.keys(obj).map(function (key) {
                return obj[key];
            });
        });
        response.status(200).send(table);
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