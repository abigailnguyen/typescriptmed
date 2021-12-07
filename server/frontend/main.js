const healthcheck = () => {
    console.log("button clicked ");
};
const toggleDesignMode = function () {
    let designMode = document.designMode === "on";
    document.designMode = designMode ? "off" : "on";
    document.getElementById("designMode").hidden = designMode;
};
const handleResponseCallback = (response) => {
    if (!response.error) {
        AWS.config.credentials = new AWS.WebIdentityCredentials({
            RoleArn: roleArn,
            WebIdentityToken: response.id_token,
        });
        s3 = new AWS.S3();
        console.log("You are now logged in.");
    }
    else {
        console.log("There was a problem logging you in.");
    }
};
//# sourceMappingURL=main.js.map