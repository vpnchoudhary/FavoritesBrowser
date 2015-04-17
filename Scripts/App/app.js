WL.Event.subscribe("auth.login", onLogin);
WL.Event.subscribe("auth.logout", onLogout);
WL.init({
    client_id: APP_CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    scope: "wl.skydrive wl.signin",
    response_type: "token"
});

WL.ui({
    name: "signin",
    element: "signin"
});
function onLogin(session) {

    if (!session.error) {
        WL.api({
            path: "me",
            method: "GET"
        }).then(
            function (response) {
               document.getElementById("info").innerText =
                    "Hello, " + response.first_name + " " + response.last_name + "!";
            },
            function (responseFailed) {
                document.getElementById("info").innerText =
                    "Error calling API: " + responseFailed.error.message;
            }
        );
    }
    else {
        document.getElementById("info").innerText =
            "Error signing in: " + session.error_description;
    }
}
function onLogout(session) {
    document.getElementById("info").innerText = "";
}
