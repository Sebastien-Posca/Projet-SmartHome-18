const mysql = require("mysql");

// ========= SQL UTILS =========

/**
 * Builds an INSERT INTO SQL query.
 * The elements of <values> are copied into VALUES (..).
 * If <fields> is given each field name is copied before VALUES (..).
 *
 * @param tableName - the name of the table to insert a new row into
 * @param values - list of values
 * @param fields - list of fieldNames
 *
 * @returns {string} the built SQL query
 */
var buildInsertQuery = function (tableName, values, fields) {
    var queryString = "INSERT INTO " + tableName;
    if (fields !== undefined){
        if(values.length !== fields.length)
            throw Error("there must as many values as field names.");
        queryString += (" (" + fields.join(",") + ")");
    }
    queryString += (" VALUES (" + values.join(",") + ")");
    return queryString;
};

var buildUpdateQuery = function (tableName, values, fields, condition) {
    var queryString = "UPDATE " + tableName + " SET ";
    var first = true;
    for (var i = 0;  i < values.length; i++) {
        if (first) first = false;
        else queryString += ", ";
        queryString += fields[i] + "=" + values[i];
    }
    queryString+= " WHERE " + condition;
    return queryString;
};

/**
 * Escapes all field values in <object> to prevent SQL injection
 *
 * @param object - any object
 */
var escape_field_values = function(object){
    for(var i in object){
        object[i] = mysql.escape(object[i]);
    }
};

/**
 * Selects some fields in a table and renames them (ie: creates
 * "reduced" rows), then calls <callback> on the list of reduced rows.
 * @param dbConn - database connection
 * @param tableName - the name of the table to select from
 * @param fieldToObjectFieldMap - keys : fields to select from <tableName>,
 *                                values : renamed fields
 * @param callback
 */
var selectFields = function(dbConn, tableName, fieldToObjectFieldMap, callback){
    if(dbConn == null)
        throw TypeError("null database connection");

    dbConn.query("SELECT * FROM " + tableName, function (err, rows){
        if(err){
            callback(err);
        }else{
            var reducedRows = [];

            for(var ind in rows){

                var row = rows[ind];
                var reducedRow = {};

                for(var field in fieldToObjectFieldMap){
                    var objectField = fieldToObjectFieldMap[field];
                    reducedRow[objectField] = row[field];
                }
                reducedRows.push(reducedRow);
            }

            callback(null, reducedRows);
        }
    });
};

module.exports.buildInsertQuery = buildInsertQuery;
module.exports.buildUpdateQuery = buildUpdateQuery;
module.exports.escape_field_values = escape_field_values;
module.exports.selectFields = selectFields;
