// User and their Preferences
// Preferences are temporary and cleared after reload
let user = {
    "username": "",
    "preferences": {
        "genre": {
            "Electronic": false,
            "LoFi": false,
            "Ambient": false,
            "Classical": false
        },
        // "DJ": ""
    }
}

// Display searched songs
// function searchSong() {
//     console.log("Searching a song...");
    
//     // Get User
//     const username = getCookie("username");
//     console.log(username);

//     if(username) {
//         // Get Preferred Genres
//         const selectedGenres = [];
//         for (const genre in user.preferences.genre) {
//             if (user.preferences.genre[genre] === true) {
//             selectedGenres.push(genre);
//             }
//         }
//         console.log("Selected Genres: " + selectedGenres);
//         // Get Preferred DJ
//         const selectedDJ = user.preferences.DJ;
//         console.log("Selected DJ: " + selectedDJ)
//     } else {
//         console.log("Username not found in cookies.");
//     }
// }
    

function selectGenre() {
    //const buttons = document.querySelectorAll(".genre-button");
    const buttons = document.querySelectorAll("[class^='genre-button']");

    buttons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            if (button.style.backgroundColor === "grey") {
                button.style.backgroundColor = "#1a1a1a";
                switch(index) {
                    case 0:
                        user.preferences.genre.Electronic = false;
                        break;
                    case 1: 
                        user.preferences.genre.LoFi = false;
                        break;
                    case 2:
                        user.preferences.genre.Ambient = false;
                        break;
                    case 3:
                        user.preferences.genre.Classical = false;
                        break;
                    default:
                        break;
                }
                console.log(user.preferences.genre);
            } else {
                button.style.backgroundColor = "grey"
                //console.log("A genre was selected");
                switch(index) {
                    case 0:
                        user.preferences.genre.Electronic = true;
                        break;
                    case 1: 
                        user.preferences.genre.LoFi = true;
                        break;
                    case 2:
                        user.preferences.genre.Ambient = true;
                        break;
                    case 3:
                        user.preferences.genre.Classical = true;
                        break;
                    default:
                        break;
                }
                console.log(user.preferences.genre);
            }
        });
    });
}

// Add DJ property to user
function selectDJ() {
    const djSelect = document.getElementById("DJ");
    djSelect.addEventListener("change", function () {
        user.preferences.DJ = djSelect.value; // new property
        console.log("Selected DJ:", user.preferences.DJ);
        console.log(user);
    });
}

function setUser() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) {
        user.username = parts.pop().split(';').shift();
        console.log("User set to: " + user.username);
    }
}

// console.log(user); // empty object
setUser();
selectGenre();
selectDJ();
console.log(user); // initialized object