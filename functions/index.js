const functions = require('firebase-functions');
const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;

exports.helloWorld = functions.https.onCall((data, context) => {
    // Message text passed from the client.
    const text = data.text;
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    return { text: `Hello ${name}. Hey! I got: ${data.text}` };
});

exports.getplates = functions.https.onCall(async (input, context) => {
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }
    else if(context.auth.uid !== 'jqshkSITDhRSXyxSvx8RpinZvgu2') {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('permission-denied', `Unauthorized user: ${context.auth.token.email}`);
    }

    let table = {};

    let client = await MongoClient.connect(config.mongodb_url);
    let db = client.db(config.dbName);
    let data = await db.collection(config.platesCol).find({}).sort({epoch_start: -1}).toArray();

    table.header = Object.keys(data[0]);
    table.data = data.map(function (obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    });

    client.close();
    return table;
});