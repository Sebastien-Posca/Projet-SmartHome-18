const hasKeys = function (keys, object) {
    for(var i in keys){
        if (!(keys[i] in object)){
            return false;
        }
    }
    return true;
};

const checkNonNullDBConn = function(dbConn){
    if (dbConn == null) {
        return TypeError("null database connection");
    }
} ;

module.exports.hasKeys = hasKeys;
module.exports.checkNonNullDBConn = checkNonNullDBConn;