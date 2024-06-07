const host = "http://54.210.3.83:8080";
let entryId = 0;

function getEntries() {
    axios.get(`${host}/entries`)
        .then(response => {
            renderEntries(response.data.entries);
        })
        .catch(error => {
            console.error('Error fetching entries:', error);
        });
}

function renderEntries(entries) {
    const guestbook = document.getElementById('guestbook');
    guestbook.innerHTML = ''; // 초기화
    entries.forEach(entry => {
        addEntryToDOM(entry);
    });
}

function addEntryToDOM(entryData) {
    const entry = document.createElement('div');
    entry.classList.add('speech-bubble');
    entry.id = `entry-${entryData.id}`;

    entry.innerHTML = `
        <p><strong>${entryData.nickname}</strong></p>
        <p>${entryData.message}</p>
        <p>${entryData.date} ${entryData.time}</p>
        <button class="delete-btn" onclick="deleteEntry('${entry.id}')">Delete</button>
    `;

    const guestbook = document.getElementById('guestbook');
    guestbook.appendChild(entry);

    const totalEntries = guestbook.children.length;
    const row = Math.floor((totalEntries - 1) / 4) + 1;
    const col = (totalEntries - 1) % 4 + 1;

    entry.style.gridRow = row;
    entry.style.gridColumn = col;
}

function addEntry() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (nickname && message) {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const entryData = {
            id: entryId++, // Assuming the id is generated on the client-side
            nickname: nickname,
            message: message,
            date: date,
            time: time
        };

        axios.post(`${host}/entries`, entryData)
            .then(response => {
                document.getElementById('nickname').value = '';
                document.getElementById('message').value = '';
                getEntries();
            })
            .catch(error => {
                console.error('Error adding entry:', error);
            });
    } else {
        alert('Please enter both nickname and message');
    }
}

function deleteEntry(id) {
    const entryId = id.split('-')[1];
    axios.delete(`${host}/entries/${entryId}`)
        .then(response => {
            getEntries();
        })
        .catch(error => {
            console.error('Error deleting entry:', error);
        });
}

function reorderEntries() {
    const guestbook = document.getElementById('guestbook');
    const entries = Array.from(guestbook.children);

    entries.forEach((entry, index) => {
        const row = Math.floor(index / 4) + 1;
        const col = index % 4 + 1;
        entry.style.gridRow = row;
        entry.style.gridColumn = col;
    });
}

document.getElementById('nickname').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addEntry();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    getEntries();
});
