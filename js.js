



const host = "http://52.71.108.9:8080";
let entryId = 0;

console.log('JavaScript Loaded'); // JS 로드 확인

function getEntries() {
    console.log('Fetching entries...'); // 디버깅 로그
    axios.get(`${host}/entries`)
        .then(response => {
            console.log('Entries fetched:', response.data.entries); // 디버깅 로그
            renderEntries(response.data.entries);
        })
        .catch(error => {
            console.error('Error fetching entries:', error);
        });
}

function renderEntries(entries) {
    console.log('Rendering entries:', entries); // 디버깅 로그
    const guestbook = document.getElementById('guestbook');
    guestbook.innerHTML = ''; // 초기화
    entries.forEach(entry => {
        addEntryToDOM(entry);
    });
}

function addEntryToDOM(entryData) {
    console.log('Adding entry to DOM:', entryData); // 디버깅 로그
    const entry = document.createElement('div');
    entry.classList.add('speech-bubble');
    entry.id = `entry-${entryData.id}`;

    entry.innerHTML = `
        <p><strong>${entryData.nickname}</strong></p>
        <p>${entryData.message}</p>
        <p>${entryData.date} ${entryData.time}</p>
        <button class="delete-btn" onclick="deleteEntry('${entryData.id}')">Delete</button>
    `;

    const guestbook = document.getElementById('guestbook');
    guestbook.appendChild(entry);

    reorderEntries(); // 요소 추가 후 재정렬
}

function addEntry() {
    console.log('Adding new entry...'); // 디버깅 로그
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (nickname && message) {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const entryData = {
            id: entryId++, // 클라이언트 측에서 ID 생성
            nickname: nickname,
            message: message,
            date: date,
            time: time
        };

        console.log('Entry Data to be sent:', entryData); // 서버로 보낼 데이터 로그

        axios.post(`${host}/entries`, entryData)
            .then(response => {
                console.log('Server Response:', response.data); // 서버 응답 로그
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
    console.log('Deleting entry with id:', id); // 디버깅 로그
    axios.delete(`${host}/entries/${id}`)
        .then(response => {
            console.log('Entry deleted'); // 디버깅 로그
            getEntries();
        })
        .catch(error => {
            console.error('Error deleting entry:', error);
        });
}

function reorderEntries() {
    console.log('Reordering entries'); // 디버깅 로그
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
    console.log('DOM fully loaded and parsed'); // 디버깅 로그
    getEntries();
});
