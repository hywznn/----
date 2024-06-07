const host = "http://52.71.108.9:8080";

// Function to fetch entries and render them
async function fetchEntries() {
    try {
        console.log('Fetching entries from server...');
        const response = await axios.get(`${host}/entries`);
        console.log('Response received:', response);
        const entries = response.data.entries;
        const guestbook = document.getElementById('guestbook');
        guestbook.innerHTML = ''; // Clear existing entries
        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'speech-bubble';
            entryElement.innerHTML = `
                <p><strong>${entry.nickname}</strong></p>
                <p>${entry.message}</p>
                <p>${entry.date} ${entry.time}</p>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            `;
            guestbook.appendChild(entryElement);
        });
    } catch (error) {
        console.error('Error fetching entries:', error);
    }
}

// Function to add a new entry
async function addEntry() {
    const nicknameInput = document.getElementById('nickname');
    const messageInput = document.getElementById('message');
    const nickname = nicknameInput.value;
    const message = messageInput.value;

    if (!nickname || !message) {
        alert('Please fill out both fields');
        return;
    }

    try {
        const date = new Date();
        const entry = {
            nickname,
            message,
            date: date.toISOString().split('T')[0],
            time: date.toTimeString().split(' ')[0]
        };
        console.log('Adding entry:', entry);
        await axios.post(`${host}/entries`, entry);
        nicknameInput.value = '';
        messageInput.value = '';
        fetchEntries();
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

// Function to delete an entry
async function deleteEntry(entryId) {
    try {
        console.log('Deleting entry with ID:', entryId);
        await axios.delete(`${host}/entries/${entryId}`);
        fetchEntries();
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
}

// Initialize the guestbook
document.addEventListener('DOMContentLoaded', fetchEntries);
