'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');

const postHandler = require('./request_handlers/post');
const getHandler = require('./request_handlers/get');
const deleteHandler = require("./request_handlers/delete");

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'decldb'
});

dbConn.connect(err => {
    if (err) throw err;
console.log('Connected!');
});

var session = require('express-session');
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

app.use(express.static('public'));

app.post("/login", postHandler.logIn(dbConn));
app.post('/declaredIncidents', postHandler.handleIncidentDeclaration(dbConn));
app.post('/incidents/update', postHandler.handleIncidentModification(dbConn));
app.post('/comments', postHandler.handleCommentAdding(dbConn));

app.get('/id', getHandler.handleId);
app.get('/incidents/byattribute', getHandler.handleFilteredIncidentsRequest(dbConn)); //TODO passer les variables GET
app.get('/comments', getHandler.handleCommentsRequest(dbConn));
app.get('/declaredIncidents', getHandler.handleDeclaredIncidents(dbConn));
app.get('/assignedIncidents', getHandler.handleAssignedIncidents(dbConn));
app.get('/types', getHandler.handleIncidentTypesRequest(dbConn));
app.get('/locations', getHandler.handleLocationsRequest(dbConn));
app.get('/members', getHandler.handleUsersRequest(dbConn));

app.delete("/incidents/:id", deleteHandler.handleIncidentDeletion(dbConn));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
});
