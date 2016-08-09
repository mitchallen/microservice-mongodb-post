/**
    Module: @mitchallen/microservice-mongodb-post
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

module.exports = function (spec, modCallback) {

    let demand = require('@mitchallen/demand');

    demand.notNull(spec,'ERROR: service parameters not defined.');

    let name = spec.name;
    let version = spec.version;
    let verbose = spec.verbose || false;
    let prefix = spec.prefix || "";
    let collectionName = spec.collectionName;
    let port = spec.port;
    let mongodb = spec.mongodb;

    demand.notNull(name,'ERROR: service name not defined.');
    demand.notNull(version,'ERROR: service version not defined.');
    demand.notNull(collectionName,'ERROR: service collection name not defined.');
    demand.notNull(port,'ERROR: service port not defined.');
    demand.notNull(mongodb,'ERROR: service mongodb configuration not defined.');
    demand.notNull(mongodb.uri,'ERROR: service mongodb.uri not defined.');

    let path = "/" + collectionName;
    let sLocation = prefix + path;

    var service = {

        name: name,
        version: version,
        verbose: verbose,
        apiVersion: prefix,
        port: port,
        mongodb: mongodb,

        method: function(info) {
            var router = info.router,
                   db  = info.connection.mongodb.db;
            demand.notNull(db);
            router.post( path, function (req, res) {
                var collection = db.collection(collectionName);
                // Insert some documents 
                // In the mongo shell, verify with: db.<collectionName>.find()
                collection.insert(
                    req.body, 
                    function(err, result) {
                        if( err ) {
                            console.error(err);
                            res
                                .status(500)
                                .send(err);
                        } else {
                            let docId = result.insertedIds[0];
                            let location = prefix + path + "/" + docId;
                            res
                                .location(location)
                                .status(201)
                                .json(result);
                        }
                });
            
            });
            return router;
        }
    };

    var callback = modCallback || function(err,obj) {
        if( err ) {
            console.log(err);
            throw new Error( err.message );
        }
    };

    require('@mitchallen/microservice-mongodb')(service, callback);
};