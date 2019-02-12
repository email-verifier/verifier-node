const https = require("https");

function parseResponse(data) {
    this.data = JSON.parse(data);
    this.field = fieldName => this.data[fieldName];
    this.valid = () => this.data["status"];
}

function verify(email, access_token) {
    const endpoint = `https://verifier.meetchopra.com/verify/${email}?token=${access_token}`;
    let response = "";
    return new Promise((resolve, reject) => {
        https.get(endpoint, res => {
            res.on("data", data => response += data);
            res.on("end", () => resolve(new parseResponse(response)));
        });
    });        
}

module.exports.verify = verify;