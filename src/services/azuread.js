import { UserAgentApplication } from "msal";

var msalConfig = {
    auth: {
        clientId: "c4b52bec-6927-481c-9eab-a198b848c118",
        authority: "https://login.microsoftonline.com/d7cbbb08-47a3-4bd7-8347-5018f2744cfb",
        redirectURI: "http://localhost:8080/"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

var requestObj = {
    scopes: ["user.read"]
};

var myMSALObj = new UserAgentApplication(msalConfig);

var login = async () => {
    var authResult = await myMSALObj.loginPopup(requestObj);
    return authResult.account;
};

var logout = () => {
    myMSALObj.logout();
};

var getAuthen = async () => {
    var account = await myMSALObj.getAccount();
    return account;
};



export default {
    login,
    logout,
    getAuthen
}