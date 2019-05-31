const mysql = require('mysql');
const crypto = require('crypto');

const sql_utils = require("../utils/sql_utils");
const check_utils = require("../utils/check_utils");

const declaration_request_keys = [
    "incidentDate", "incidentHour", "locationID",
    "importance", "reporterID", "title",
    "description", "typeId"
];

const comment_request_keys = [
    "incidentId", "authorId", "commentText"
];

var handleAssignationsAll = function(dbConn){
    check.utils.checkNonNullDBConn(dbConn);
    return function(req,res) {
        var incidentId = req.body.id;
        var queryString = "Select MAX(userId) from users";
        var numberUsers;
        //query sending
        dbConn.query(queryString, function (err) {
            if (err)
                return response.status(500).end();
            numberUsers = result[0];
            response.status(200).json(result);
        });

        for (var i = 0; i < numberUsers - 1; i++) {
            queryString = "INSERT INTO ASSIGNATIONS (userId,incidentId) VALUES (" + i + "," + incidentId + ")";
            //query sending
            dbConn.query(queryString, function (err) {
                if (err) {
                    res.status(400).send("SQL ERROR : " + err);
                } else {
                    res.status(200).send("Assignation successfully added.").end();
                }
            });
        }

    };
};

/**
 * Checks the declaration data in the request body,
 * inserts the incident in the table and tells the
 * client if the declaration is successfull.
 * @param dbConn - database connection
 *
 * @returns a request handler function
 */
var handleIncidentDeclaration = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, res) {
        var incidentData = req.body;

        //request checking
        if (!(check_utils.hasKeys(declaration_request_keys, incidentData)))
            return res.status(400).send("Bad request : missing keys.");

        if (Object.keys(incidentData).length !== declaration_request_keys.length)
            return res.status(400).send("Bad request : too many keys.");

        //SQL query building
        sql_utils.escape_field_values(incidentData);
        var fieldValues = Object.values(incidentData);
        var fieldNames = Object.keys(incidentData);

        fieldNames.push("declDate");
        fieldValues.push("CURDATE()");
        fieldNames.push("declHour");
        fieldValues.push("CURTIME()");

        var queryString = sql_utils.buildInsertQuery("incidents", fieldValues, fieldNames);

        //query sending
        dbConn.query(queryString, function (err) {
            if (err) {
                res.status(400).send("SQL ERROR : " + err);
            } else {
                res.status(200).send("Incident successfully added.").end();
            }
        });
    };
};

var handleIncidentModification = function(dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function(req, res) {
        var incidentData = req.body;

        //SQL query building
        sql_utils.escape_field_values(incidentData);
        var fieldValues = Object.values(incidentData);
        var fieldNames = Object.keys(incidentData);
        var queryString = sql_utils.buildUpdateQuery("incidents", fieldValues, fieldNames, "incidentId=" + incidentData.incidentId);

        console.log(queryString);
        //query sending
        dbConn.query(queryString, function (err) {
            if (err) {
                res.status(400).send("SQL ERROR : " + err);
            } else {
                res.status(200).send("{ \"answer\": \"Incident successfully updated.\"}").end();
            }
        });
    };
};

var handleCommentAdding = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function(req, res) {
        let commentData = req.body;
        //request checking

        if (!(check_utils.hasKeys(comment_request_keys, commentData)))
            return res.status(400).send("Bad request : missing keys.");

        if (Object.keys(commentData).length !== comment_request_keys.length)
            return res.status(400).send("Bad request : too many keys.");


        //SQL query building
        sql_utils.escape_field_values(commentData);
        let fieldValues = Object.values(commentData);
        let fieldNames = Object.keys(commentData);

        fieldNames.push("date");
        fieldValues.push("CURDATE()");
        fieldNames.push("hour");
        fieldValues.push("CURTIME()");

        let queryString = sql_utils.buildInsertQuery("commentaries", fieldValues, fieldNames);

        //query sending
        dbConn.query(queryString, function (err) {
            if (err) {
                res.status(400).send("SQL ERROR : " + err);
            } else {
                res.status(200).send("comment successfully added.").end();
            }
        });
    }
};


const sendLoginError = function (res) {
    res.status(401).end();
};

/**
 * Checks that <userName> is an existing user and that <password>
 * is right. Passes the userId and error (if there is one) as parameters of <callback>.
 * Possible errors : error sent by SQL, "unknowUsername" or "wrongPassword".
 *
 * @param dbConn - database connection
 * @param userName {string} -
 * @param password {string} -
 * @param callback {function(userId, err)} -
 */
const authenticate = function (dbConn, userName, password, callback) {
    check_utils.checkNonNullDBConn(dbConn);

    var queryString = "SELECT userId, passwordHash FROM users WHERE userName = " + mysql.escape(userName);

    dbConn.query(queryString, function (err, result) {
        if (err) {
            callback(err);
        } else {

            //calculating hash
            var md5sum = crypto.createHash("md5");
            md5sum.update(password);
            var hash = md5sum.digest("hex");

            //checking credentials
            var userID = null;

            if (result.length === 0) {
                err = "unknowUsername";
            }
            else if (hash !== result[0].passwordHash) {
                console.log(result);
                err = "wrongPassword";
            }else{
                userID = result[0].userId;
            }

            callback(userID, err);

        }
    });
};

/**
 * Sends a query to the DB to know if <userName> is an admin.
 * Calls <callback>.
 *
 * @param dbConn - database connection
 * @param userName {string} -
 * @param callback {function(err,{boolean} isAdmin)} -
 */
const checkIfAdmin = function (dbConn, userName, callback) {

    var queryString = "SELECT admin FROM users WHERE userName = " + mysql.escape(userName);
    dbConn.query(queryString, function (err, result) {
        if (err) return callback(err);
        callback(null, result[0].admin === 1);
    });
};

/**
 * @param dbConn - database connection
 * @returns {Function} - a handler for POST <login URL>
 */
const logIn = function (dbConn) {
    check_utils.checkNonNullDBConn(dbConn);

    return function (req, res) {

        authenticate(dbConn, req.body.username, req.body.password,
            function (userId, err) {
                if (err) return sendLoginError(res);

                checkIfAdmin(dbConn, req.body.username, function (err, isAdmin) {
                    if (err) return sendLoginError(res);

                    req.session.regenerate(function () {
                        req.session.userId = userId;
                        res.status(200).send({ "isAdmin": isAdmin, "userId": userId });
                    });
                });
            }
        );
    };
};

module.exports.authentificate = authenticate;
module.exports.logIn = logIn;
module.exports.handleIncidentDeclaration = handleIncidentDeclaration;
module.exports.handleIncidentModification = handleIncidentModification;
module.exports.handleCommentAdding = handleCommentAdding;