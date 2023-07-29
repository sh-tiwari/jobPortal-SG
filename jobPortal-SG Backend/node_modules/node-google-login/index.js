const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

class NodeGoogleLogin {
  constructor(config) {
    this.clientID = config.clientID;
    this.clientSecret = config.clientSecret;
    this.redirectURL = config.redirectURL;
    this.defaultScope = config.defaultScope;
  }

  createConnection(){
    return new google.auth.OAuth2(
      this.clientID,
      this.clientSecret,
      this.redirectURL
    );
  }

  getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: this.defaultScope
    });
  }

  generateAuthUrl(){
    const auth = this.createConnection();
    const connectonURL = this.getConnectionUrl(auth);
    return connectonURL
  }

  getUserProfile(code){
    return new Promise(async (resolve,reject)=>{
      try {
        const oAuthClient = await this.createConnection();
        const client = new OAuth2Client(this.clientID);
        const tokens = await oAuthClient.getToken(code)
        const {id_token} = tokens.tokens
        console.log("id_token",id_token);
        const ticket = await client.verifyIdToken({
          idToken: id_token,
          audience: this.clientID
        });
        const payload = ticket.getPayload();
        resolve({user: payload, tokens: tokens.tokens})
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = NodeGoogleLogin