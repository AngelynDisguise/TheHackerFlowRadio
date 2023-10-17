// Fetch data from the JSON files
let songs = [];
let djs = [];
let timeslots = [];

fetch('../../../backend/data/timeslots.json')
  .then(response => response.json())
  .then(data => {
    timeslots = data;
    populateTimeSlots(); // Populate the time slot dropdown once the data is fetched
  });

fetch('../../../backend/data/songs.json')
  .then(response => response.json())
  .then(data => {
    songs = data;
  });

fetch('../../../backend/data/djs.json')
  .then(response => response.json())
  .then(data => {
    djs = data;
    populateDJs(); // Populate the DJ dropdown once the data is fetched
  });

  // Function to populate time slots
function populateTimeSlots() {
   const timeslotSelect = document.getElementById('time-slot');
   timeslots.forEach(slot => {
     const option = document.createElement('option');
     option.value = slot;
     option.innerText = slot;
     timeslotSelect.appendChild(option);
   });
 }

// Function to populate DJ dropdown
function populateDJs() {
  const djSelect = document.getElementById('dj-select');
  djs.forEach(dj => {
    const option = document.createElement('option');
    option.value = dj.djID;
    option.innerText = dj.name;
    djSelect.appendChild(option);
  });
}

// Search songs
document.getElementById('song-search').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
  const searchTerm = event.target.value.toLowerCase();
  const matchedSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm));
  displaySongs(matchedSongs);
});

// Function to display matched songs
function displaySongs(matchedSongs) {
  const songList = document.getElementById('song-list');
  songList.innerHTML = ''; // Clear the current list

  matchedSongs.forEach(song => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'checkbox';
    input.id = `song${song.songID}`;
    input.name = 'selected-songs';
    input.value = song.title;

    label.htmlFor = input.id;
    label.innerText = song.title;

    li.appendChild(input);
    li.appendChild(label);
    songList.appendChild(li);
  });
}

// Handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const selectedSongs = document.querySelectorAll('input[name="selected-songs"]:checked');
  const selectedDjId = document.getElementById('dj-select').value;
  // Find the selected DJ based on the djID
  const selectedDj = djs.find(dj => dj.djID == selectedDjId); // == is used since dropdown value is string and djID is number
  const timeSlot = document.getElementById('time-slot').value;
  const message = `Selected songs for DJ ${selectedDj.name} at time slot ${timeSlot}: ${Array.from(selectedSongs).map(input => input.value).join(', ')}`;
  // Display the message on the webpage
  document.getElementById('message').innerText = message;
});

