const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest( async (request, response) => {
 response.send("Hello Hello");
});

