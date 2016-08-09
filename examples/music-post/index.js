"use strict";

let demand = require('@mitchallen/demand');
let prefix = process.env.MUSIC_POST_API_VERSION || '/v1';
let tableName = "music";
let path = "/" + tableName;
let sLocation = prefix + path;

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

// TODO - replace with package when published
require('../../index')(service, function(err,obj) {
// require('@mitchallen/microservice-mongodb-post')(service, function(err,obj) {
    if( err ) {
        console.log(err);
        throw new Error( err.message );
    }
});