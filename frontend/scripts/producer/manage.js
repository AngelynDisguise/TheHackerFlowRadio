// Mock data fetch
let djs = [];
let songs = [];

fetch('../../../backend/data/songs.json')
    .then(response => response.json())
    .then(data => {
        songs = data;
    });

// Fetch DJs and Songs
fetch('../../../backend/data/djs.json').then(response => response.json()).then(data => {
    djs = data;
    populateDJDropdown();
});

fetch('../../../backend/data/songs.json').then(response => response.json()).then(data => {
    songs = data;
});

function populateDJDropdown() {
    const djSelect = document.getElementById('dj-playlist-select');
    djs.forEach(dj => {
        const option = document.createElement('option');
        option.value = dj.djID;
        option.innerText = dj.name;
        djSelect.appendChild(option);
    });
}

// Add song to DJ's playlist
document.getElementById('add-song-btn').addEventListener('click', function () {
    const songName = document.getElementById('add-song-to-dj').value;
    const selectedDJID = document.getElementById('dj-playlist-select').value;
    const song = songs.find(s => s.title === songName);

    if (song) {
        const dj = djs.find(dj => dj.djID === parseInt(selectedDJID));
        if (dj && !dj.playlist.includes(song.songID)) {
            dj.playlist.push(song.songID);
            console.log(`${song.title} added to ${dj.name}'s playlist.`);
        }
    }
});

document.getElementById('add-song-to-dj').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    searchAndDisplaySongs(event, 'add-dj-song-list');
});

document.getElementById('theme-song-input').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    searchAndDisplaySongs(event, 'add-theme-song-list');
});

function searchAndDisplaySongs(event, elementID) {
    const searchTerm = event.target.value.toLowerCase();
    const matchedSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm));
    displaySongs(matchedSongs, elementID);
}

function displaySongs(matchedSongs, elementID) {
    const songList = document.getElementById(elementID);
    songList.innerHTML = ''; // Clear the current list

    matchedSongs.forEach(song => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.type = 'checkbox';
        input.id = `song${song.songID}`;
        input.name = 'selected-songs';
        input.value = song.songID; // Using songID here since it is unique

        label.htmlFor = input.id;
        label.innerText = song.title;

        li.appendChild(input);
        li.appendChild(label);
        songList.appendChild(li);
    });
}

document.getElementById('add-song-btn').addEventListener('click', function () {
    const selectedSongs = document.querySelectorAll('#add-dj-song-list input[name="selected-songs"]:checked');
    const selectedDJID = document.getElementById('dj-playlist-select').value;
    
    selectedSongs.forEach(input => {
        const songID = parseInt(input.value);
        const song = songs.find(s => s.songID === songID);
        
        if (song) {
            const dj = djs.find(dj => dj.djID === parseInt(selectedDJID));
            if (dj && !dj.playlist.includes(song.songID)) {
                dj.playlist.push(song.songID);
                console.log(`${song.title} added to ${dj.name}'s playlist.`);
            }
        }
    });
});


