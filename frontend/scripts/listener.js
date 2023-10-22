    // Search song form
    function validateForm(event) {
        event.preventDefault(); // prevent page refresh
        const inputField = document.getElementById("search-song");
        const errorMessage = document.getElementById("error-message");
        if (inputField.value.trim() === "") {
            errorMessage.textContent = "Please enter a song name.";
            errorMessage.style.color = "red"; 
            return false; // Prevent form submission
        }
        errorMessage.textContent = "";
        searchSong(inputField.value);
        return true; // Allow form submission
    }

    // Change username
    const element = document.querySelector(".change-name");
    element.addEventListener("click", function() {
        let newUsername;
        do {
            newUsername = prompt("Please enter your new name:");
            if (newUsername == null) {
                return;
            }
        } while (newUsername !== null && newUsername.trim() === "");
        document.cookie = "username=" + newUsername + "; SameSite=Lax";
        document.getElementById("listener-name").innerHTML = "Hello " + newUsername + "!";
    });

function selectGenre() {
    const buttons = document.querySelectorAll("[class^='genre-button']");
    // Event Listener: change preference according to button color and index
    buttons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            const preferences = JSON.parse(localStorage.getItem("preferences"));
            //console.log(preferences);
            // Turn off genre preference, button switches to black
            if (button.style.backgroundColor === "grey") {
                button.style.backgroundColor = "#1a1a1a";
                switch(index) {
                    case 0:
                        preferences.genre.Electronic = false;
                        break;
                    case 1: 
                        preferences.genre.LoFi = false;
                        break;
                    case 2:
                        preferences.genre.Ambient = false;
                        break;
                    case 3:
                        preferences.genre.Classical = false;
                        break;
                    default:
                        break;
                }
            } else { // Turn on genre preference, button switches to grey
                button.style.backgroundColor = "grey"
                //console.log("A genre was selected");
                switch(index) {
                    case 0:
                        preferences.genre.Electronic = true;
                        break;
                    case 1: 
                        preferences.genre.LoFi = true;
                        break;
                    case 2:
                        preferences.genre.Ambient = true;
                        break;
                    case 3:
                        preferences.genre.Classical = true;
                        break;
                    default:
                        break;
                }
            }
            localStorage.setItem("preferences", JSON.stringify(preferences));
            console.log("Selected Preferences: ", preferences.genre);
        });
    });
}

function selectDJ() {
    const djSelect = document.getElementById("DJ");
    // Event Listener: change the DJ preference
    djSelect.addEventListener("change", function () {
        const preferences = JSON.parse(localStorage.getItem("preferences"));
        preferences.DJ = djSelect.value; // new property

        localStorage.setItem("preferences", JSON.stringify(preferences));
        console.log("Selected DJ: ", preferences.DJ);
        console.log(preferences);
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Display searched songs
function searchSong(song) {
    console.log("Searching a song '" + song + "'...")
    // Get Preferences
    // Call server API
    // Display Table
}


selectGenre();
selectDJ();