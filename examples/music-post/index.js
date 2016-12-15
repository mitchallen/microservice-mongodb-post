"use strict";

let demand = require('@mitchallen/demand'),
    dbCore = require('@mitchallen/microservice-mongodb-post'),
    prefix = process.env.MUSIC_POST_API_VERSION || '/v1';

var service = {

    name: require("./package").name,
    version: require("./package").version,
    verbose: true,
    prefix: prefix,
    port: process.env.MUSIC_POST_PORT || 8004,
    mongodb: {
        uri: process.env.TEST_MONGO_URI || 'mongodb://localhost/test',
    },
    collectionName: "music",
};

dbCore.Service(service, function(err,obj) {
    if( err ) {
        console.log(err);
        throw new Error( err.message );
    }
});