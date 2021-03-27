const jwt = require('jsonwebtoken');
// Get the user data template and structure
let User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require("../config/appconfig");
const mailer = require("nodemailer");


module.exports = {

    valideToken,
    recoverPass,
    updatePassword

};

function recoverPass(usremail, callback, response) {
    //console.log("recovering: "+usremail);
    User.find({ "email": usremail }, function (error, data) {
        if (error) {
            //console.log("(recoverPass) error getting users: "+error);
            callback({ "Error": error }, response);
        } else {
            if (data.length > 0) {
                //console.log("(recoverPass) User to recover pass was found succesfully");
                let usrData = data[0];
                let payload = {
                    "_id": usrData["_id"],
                    "email": usrData["email"],
                    "TokenType": "onlyRecoverToken"
                };
                jwt.sign(payload, config.secret, { expiresIn: '5m' }, function (err, token) {
                    if (err) {
                        //console.log("(recoverPass) erro getting token: "+err);
                        callback({ "Error": err }, response);
                    } else {
                        //console.log("token to recover pass: "+token);
                        //send mail
                        let transport = mailer.createTransport({
                            service: "gmail",
                            auth: config.email
                        });
                        let body = "<div style='width: 80%; margin-left:10%; border-radius: 5%; padding: 5%;'>";
                        body += "<h1>Prueba de recuperacion de contrase�a</h1>";
                        body += "<p>Dirijase al siguiente link</p>";
                        body += "<a href='http://localhost:3000/updatePass/" + token + "'>Recuperar mi contrase�a</a>";
                        body += "</div > ";

                        let mailOptions = {
                            from: config.email.user,
                            to: usremail,
                            subject: "Solicitud de reestablecimiento de contrase�a",
                            html: body
                        };

                        transport.sendMail(mailOptions, function (err, data) {
                            if (err) {
                                console.log("Error sending the email ", err);
                                callback({ "Error": err }, response);
                            } else {
                                callback({ "Success": "se envi� un correo con un link, vigencia de 10 minutos" }, response);
                            }
                        });


                    }
                });
            } else {
                console.log("(recoverPass) User was not found");
                callback({ "Error": "Email was not found" }, response);
            }
        }
    });

}

function valideToken(tokenObj, callback, response) {
    //console.log("validating token: "+tokenObj.token);
    jwt.verify(tokenObj.token, config.secret, function (err, decoded) {
        if (err) {
            callback({ "Error": err }, response);
        } else {
            callback(decoded, response);
        }
    });

}



function updatePassword(idUser, passencrip, callback, response) {
    //generate the hash
    // bcrypt.hash(newPwdm, 10, (err, hash) => {
    //     if (err) {
    //         console.log(err, "aca el error")
    //         callback({ "Error": err }, response);

    //     } else {

    User.updateOne({ "_id": idUser }, { "password": passencrip }, (err, data) => {
        if (err) {
            console.log(err, "aca el error")
        } else {
            console.log("Contrase�a actualizada: " + JSON.stringify(data));
            callback({ "Succes": "Credentials updated" }, response);
        }
    });
    //  }
    // });
}



