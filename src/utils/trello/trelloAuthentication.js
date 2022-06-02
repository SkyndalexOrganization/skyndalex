exports.run = (client, interaction) => {
    const express = require("express")
    const path = require("path")
    const app = express()
    const { OAuth }  = require("oauth")
    const { key, secret, appName, callbackURL } = require("../../config.json").trello

    app.use(express.static(__dirname + '/public'));

    let options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    app.get('/', function (req, res) {
        res.send("OK")
    });

    const requestURL = "https://trello.com/1/OAuthGetRequestToken";
    const accessURL = "https://trello.com/1/OAuthGetAccessToken";
    const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";

    const oauth_secrets = {};

    const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", callbackURL, "HMAC-SHA1")

    app.get("/trello_auth", (req, res) => {
        oauth.getOAuthRequestToken((error, token, tokenSecret) => {
            if (error) console.error(error);
            oauth_secrets[token] = tokenSecret;
            res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=read,write,account&expiration=never`);
        });
    });

    app.get("/trello_callback", (req, res) => {
        const { oauth_token, oauth_verifier } = req.query
        const tokenSecret = oauth_secrets[oauth_token]

        oauth.getOAuthAccessToken(oauth_token, tokenSecret, oauth_verifier, async (error, accessToken) => {
            if (error) console.log(error);
            console.log(key)
            console.log(accessToken)

            await r.table("trello").get("uid").insert({ accessToken: accessToken, key: key }).run(client.con);

            res.redirect("/");
        })
    })

    app.listen(5555, () => console.log("Connected"))
}