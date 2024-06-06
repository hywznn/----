let entryId = 0;

function addEntry() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (nickname && message) {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.classList.add('speech-bubble');
        entry.id = `entry-${entryId++}`;

        entry.innerHTML = `
            <p><strong>${nickname}</strong></p>
            <p>${message}</p>
            <p>${date} ${time}</p>
            <button class="delete-btn" onclick="deleteEntry('${entry.id}')">Delete</button>
        `;

        const guestbook = document.getElementById('guestbook');
        guestbook.appendChild(entry);

        const totalEntries = guestbook.children.length;
        const row = Math.floor((totalEntries - 1) / 4) + 1;
        const col = (totalEntries - 1) % 4 + 1;

        entry.style.gridRow = row;
        entry.style.gridColumn = col;

        document.getElementById('nickname').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please enter both nickname and message');
    }
}

function deleteEntry(id) {
    const entry = document.getElementById(id);
    entry.parentNode.removeChild(entry);
    reorderEntries();
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

