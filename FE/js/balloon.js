const host = "http://52.71.108.9:8080";  // 또는 서버의 실제 IP 주소
const guestbookContainer = document.querySelector('#guestbook');

// 방명록 항목 불러오기
function getEntries() {
    console.log('Fetching entries...');
    axios.get(`${host}/entries`)
        .then(response => {
            console.log('Entries fetched:', response.data);
            renderEntries(response.data.entries);
        })
        .catch(error => {
            console.error('Error fetching entries:', error);
        });
}

// 방명록 항목 렌더링
function renderEntries(entries) {
    guestbookContainer.innerHTML = ''; // guestbookContainer 초기화
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('speech-bubble');
        entryDiv.innerHTML = `<p><strong>${entry.nickname}:</strong> ${entry.message}</p>
                              <p class="entry-date">${entry.date} ${entry.time}</p>`;

        // 삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            deleteEntry(entry.id);
        });

        entryDiv.appendChild(deleteBtn);
        guestbookContainer.appendChild(entryDiv);
    });
}

// 방명록 항목 추가
function addEntry(event) {

    const name = document.querySelector('#nickname').value.trim();
    const message = document.querySelector('#message').value.trim();
    if (name === '' || message === '') return;

    const now = new Date();
    const dateString = now.toLocaleDateString();
    const timeString = now.toLocaleTimeString();

    const newEntry = {
        id: 0,
        nickname: name,
        message: message,
        date: dateString,
        time: timeString
    };

    console.log('Adding entry:', newEntry);

    axios.post(`${host}/entries`, newEntry)
        .then(response => {
            console.log('New Entry Added:', response.data);
            document.querySelector('#nickname').value = '';
            document.querySelector('#message').value = '';
            getEntries();
        })
        .catch(error => {
            console.error('Error adding entry:', error);
        });
}

// 방명록 항목 삭제
function deleteEntry(entryId) {
    console.log('Deleting entry with ID:', entryId);

    axios.delete(`${host}/entries/${entryId}`)
        .then(response => {
            console.log('Entry Deleted:', response.data);
            getEntries();
        })
        .catch(error => {
            console.error('Error deleting entry:', error);
        });
}

// 페이지 로드 시 방명록 항목 불러오기
window.addEventListener('DOMContentLoaded', function () {
    getEntries();

    // 폼 제출 처리
    const form = document.querySelector('.entry-form');
    form.addEventListener('submit', function(event) {
        addEntry(event);
    });
});