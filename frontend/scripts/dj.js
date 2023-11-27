let timeslots = [];

fetch('../../../backend/data/timeslots.json')
  .then(response => response.json())
  .then(data => {
    timeslots = data;
    populateTimeSlots(); // Populate the time slot dropdown once the data is fetched
  });

  // Function to populate time slots
  function populateTimeSlots() {
    const timeslotSelect = document.getElementById("TimeSlots");
    timeslots.forEach(slot => {
      const option = document.createElement("option");
      option.value = slot;
      option.innerText = slot;
      timeslotSelect.appendChild(option);
    });
  }

  window.onload = function() {
    const cookies = document.cookie.split("; ");
    const ls = localStorage.getItem("preferences");
    console.log("(onload) Cookies: ", cookies);
    console.log("(onload) Local Storage: ", ls);
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "username") {
            const username = decodeURIComponent(value);
            console.log("(onload) ", username +" already logged in");

            // Reload page state
            reloadListener(username);
            break;
        } else {
            login();
        }
    }
}

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

function login() {
    let username; 
    // let password;
    do {
        username = prompt("Please enter your username:"); 
        if (username == null) {
            window.location.href = "../index.html";
        }
    } while (username !== null && username.trim() === "");
    console.log(username + " tried to logged in...");

    // Username and password sent to server for verification...

    if (username) { // (note: This will work because login() will accept any non-empty string)
        // Login Success
        console.log(username +" logged in successfully");
        document.cookie = "username=" + username + "; SameSite=Lax"; // Save encrypted user session in cookie

        // Login event
        welcomeListener(username); // Listener login
    } else {
        // Login Fail
        console.log("Login Failed!") // Login failure handler or redirection to login page to be implemented
    }
}

function welcomeListener(username) {
  const text = "DJ " + username;
  document.getElementById("dj-name")
  .innerHTML = text;
}

function reloadListener(username) {
  let text = "DJ " + username;
  document.getElementById("dj-name").innerHTML = text;
}