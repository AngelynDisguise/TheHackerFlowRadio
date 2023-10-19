window.onload = function() {
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "username") {
            const username = decodeURIComponent(value);
            console.log(username +" already logged in");
            let text = "Hello " + username + "!";
            document.getElementById("listener-name").innerHTML = text;
            break;
        } else {
            login();
        }
    }
}

function login() {
    let user;
    do {
        user = prompt("Please enter your name:");
    } while (user !== null && user.trim() === "");
    console.log(user+" tried to logged in");
    if (user) {
        console.log(user +" logged in");
        document.cookie = "username=" + user;
        let text = "Hello " + user + "!";
        document.getElementById("listener-name")
        .innerHTML = text;
    } else {
        window.location.href = "../index.html";
    }
}

function logout() {
    console.log("Logging out");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=../pages/listerner.html; SameSite=None; Secure;";
    //window.location.href = "../index.html";
}
