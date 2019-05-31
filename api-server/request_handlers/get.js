const mysql = require('mysql');

const sql_utils = require('../utils/sql_utils');
const response_utils = require('../utils/response_utils');
const check_utils = require('../utils/check_utils');

var handleIncidentsRequest = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, response) {
        response.setHeader("Content-Type", "application/json");
        dbConn.query(
            "select * from incidents",
            function (err, result) {
                if (err) throw err;
                var jsonResponse = JSON.stringify(result);
                response.write(jsonResponse);
                response.end();
            }
        );
    };
};

/**
 * Respond to a request for a filtered list of incidents.
 * @param {*} dbConn The database to transfer the request to.
 * @param {*} attrName The incident attribute to filter.
 * @param {*} attrValue The attribute's expected value.
 * @param {*} exactMatch Whether an exact match or a substring is wanted.
 */
var handleFilteredIncidentsRequest = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (request, response) {
        response.setHeader("Content-Type", "application/json");
        console.log(request.query);
        var exactMatch = (request.query.exactMatch == "true");
        var query = "SELECT * FROM incidents WHERE " + request.query.attrName + " ";
        if (exactMatch) {
            query += "= " + request.query.attrValue;
        } else {
            query += "LIKE " + mysql.escape("%" + request.query.attrValue + "%");
        }
        console.log(query);
        dbConn.query(
            query,
            function (err, sqlResponse) {
                if (err) throw err;
                console.log(sqlResponse);
                var jsonResponse = JSON.stringify(sqlResponse);
                response.write(jsonResponse);
                response.end();
            }
        );
    };
};

const handleIncidentTypesRequest = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, res) {
        sql_utils.selectFields(dbConn,
            "incidentTypes",
            { "typeId": "typeId", "typeName": "typeName" },
            response_utils.sendStringifiedCallback(res));

    };

};

const handleLocationsRequest = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, res) {

        sql_utils.selectFields(dbConn,
            "locations",
            { "locationId": "locationId", "locationName": "locationName", "locationPictureUrl":"locationPictureUrl"},
            response_utils.sendStringifiedCallback(res)
        );

    };

};

var handleUsersRequest = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, res) {

        sql_utils.selectFields(dbConn,
            "users",
            {"userName": "userName", "userPictureUrl": "userPictureUrl", "userId": "userId"},
            response_utils.sendStringifiedCallback(res)
        );
    }
};

/**
 * Sends {"userId" : <userId> } if the user is connected,
 * otherwise sends a 401 error.
 */
const handleId = function(req, res) {
    console.log("in");
    if(req.session.userId){
        return res.status(200).send({"userId": req.session.userId});
    }
    res.status(401).send("Unauthorized");
};


const handleDeclaredIncidents = function(dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, response) {
        if (!("userId" in req.query) || !("rowNumber" in req.query)){
            return response.status(400).end();
        }

        response.setHeader("Content-Type", "application/json");
        var queryString =
            "SELECT * FROM incidents I"
            + " WHERE I.reporterId = "
            + mysql.escape(req.query.userId)
            + buildStatusCondition(req)
            + " ORDER BY I.incidentDate DESC, I.incidentHour DESC "
            + "LIMIT "
            + req.query.rowNumber;

        dbConn.query(queryString,
            function (err, result) {
                if (err){
                    console.log(err);
                    return response.status(500).end();

                }

                response.status(200).send(JSON.stringify(result)).end();
            }
        );
    };

};

const handleAssignedIncidents = function(dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, response) {
        if (!("userId" in req.query)  || !("rowNumber" in req.query)){
            return res.status(400).end();
        }

        response.setHeader("Content-Type", "application/json");
        var queryString =   "SELECT * FROM incidents I "
            + "WHERE I.reporterId  = 1 or I.incidentId IN "
            + "(SELECT incidentId from assignations A WHERE A.userId = "
            + mysql.escape(req.query.userId)
            + ") "
            + buildStatusCondition(req)
            + " ORDER BY I.incidentDate DESC, I.incidentHour DESC "
            + "LIMIT "
            + req.query.rowNumber;

        dbConn.query(queryString,
            function (err, result) {
                if (err)
                    return response.status(500).end();

                response.status(200).send(JSON.stringify(result)).end();
            }
        );
    };

};

const handleCommentsRequest = function(dbConn){
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, response) {

        if (!("incidentId" in req.query)){
            return response.status(400).end();
        }

        let queryString =
            "SELECT * FROM commentaries "
            + "WHERE incidentId = "
            + mysql.escape(req.query.incidentId)
            + " ORDER BY date DESC, hour DESC ";

        dbConn.query(queryString,
            function (err, result) {
                if (err)
                    return response.status(500).end();

                response.status(200).json(result);
            }
        );
    }

};

const buildStatusCondition = function(req){

    if("statusMask" in req.query && !isNaN(req.query.statusMask))
        return "AND I.status != " + req.query.statusMask + " ";

    return ""

};

module.exports.handleIncidentsRequest = handleIncidentsRequest;
module.exports.handleCommentsRequest = handleCommentsRequest;
module.exports.handleFilteredIncidentsRequest = handleFilteredIncidentsRequest;
module.exports.handleDeclaredIncidents = handleDeclaredIncidents;
module.exports.handleAssignedIncidents = handleAssignedIncidents;
module.exports.handleIncidentTypesRequest = handleIncidentTypesRequest;
module.exports.handleLocationsRequest = handleLocationsRequest;
module.exports.handleUsersRequest = handleUsersRequest;
module.exports.handleId = handleId;
