const functions = require('firebase-functions');

const config = {
    mongodb_url: `mongodb+srv://${functions.config().mongodb.user}:${functions.config().mongodb.pass}@cluster0-vute7.gcp.mongodb.net`,
    dbName: 'openalpr',
    rawDataCol: 'raw',
    platesCol: 'plates_vehicles',
    
    prowlApiUrl: 'https://api.prowlapp.com/publicapi/add'
};

module.exports = config;