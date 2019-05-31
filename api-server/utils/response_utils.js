const sendStringifiedCallback = function(res){

    return function (err, obj) {
        if(err){
            res.status(400).send("ERROR : "+err);
        }else{
            res.header("Content-Type","application/json")
            res.status(200).send(JSON.stringify(obj));
        }
    }
};

module.exports.sendStringifiedCallback = sendStringifiedCallback;
