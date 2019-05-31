const mysql = require('mysql');

var handleIncidentDeletion = function(dbConn) {
    return function(req, res) {
        var incidentID = req.params.id;
        var escapedIncidentID = mysql.escape(incidentID);
        var sqlReq = "DELETE FROM incidents WHERE incidentId=" + escapedIncidentID;
        console.log(sqlReq);
        dbConn.query(sqlReq, function(err) {
            if (err) throw err;
            res.status(200);
            res.end();
        });
    };
};

module.exports.handleIncidentDeletion = handleIncidentDeletion;
