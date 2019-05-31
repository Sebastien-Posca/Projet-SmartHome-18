var assert = require('assert');
var sql_utils = require("../../utils/sql_utils");


describe("buildInsertQuery", function () {

    it("case no fieldNames", function () {
       assert.equal(
           sql_utils.buildInsertQuery("users", [0, "Thomas"]),
           "INSERT INTO users VALUES (0,Thomas)"
       );
    });


    it("case fieldNames", function () {
        assert.equal(
            sql_utils.buildInsertQuery("users", [0, "Thomas"], ["age", "name"]),
            "INSERT INTO users (age,name) VALUES (0,Thomas)"
        );
    });

});