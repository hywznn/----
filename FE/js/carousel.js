document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.portfolio-item');
    const btnPrev = document.querySelector('.btnPrev');
    const btnNext = document.querySelector('.btnNext');
    const carouselInner = document.querySelector('.carousel-inner');
    const pagination = document.querySelector('.pagination');
    const modal = document.getElementById('modal');
    const modalBody = document.querySelector('.modal-body');
    const closeModalBtn = document.querySelector('.close-btn');
    let currentIndex = 0; // 시작 인덱스를 0으로 설정

    // Add pagination dynamically
    let pageChild = '';
    for (let i = 0; i < items.length; i++) {
        pageChild += '<li class="dot';
        pageChild += (i === currentIndex) ? ' dot_active' : '';
        pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
    }
    pagination.innerHTML = pageChild;
    const pageDots = document.querySelectorAll('.dot');

    function showModal(index) {
        const item = items[index % items.length];
        modalBody.innerHTML = `
            <img src="${item.querySelector('img').src}" alt="${item.querySelector('h3').innerText}">
            <h3>${item.querySelector('h3').innerText}</h3>
            <p>${item.querySelector('p').innerText}</p>
        `;
        modal.style.display = 'block';
    }

    // function updateCarousel() {
    //     items.forEach((item, index) => {
    //         item.classList.remove('center', 'left', 'right');
    //         if (index === currentIndex % items.length) {
    //             item.classList.add('center');
    //         } else if (index === (currentIndex - 1 + items.length) % items.length) {
    //             item.classList.add('left');
    //         } else if (index === (currentIndex + 1) % items.length) {
    //             item.classList.add('right');
    //         }
    //     });
    //     const offset = -33.33 * (currentIndex - 1) + '%'; // 가운데를 기준으로 위치 조정
    //     carouselInner.style.transition = 'transform 0.5s ease';
    //     carouselInner.style.transform = `translateX(${offset})`;

    //     // Update pagination
    //     pageDots.forEach(dot => dot.classList.remove('dot_active'));
    //     pageDots[currentIndex % items.length].classList.add('dot_active');
    // }

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('center', 'left', 'right');
            if (index === currentIndex % items.length) {
                item.classList.add('center');
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('left');
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('right');
            }
        });
        const offset = -33.33 * (currentIndex - 1) + '%'; // 각 아이템이 33.33% 차지하도록 조정
        carouselInner.style.transition = 'transform 0.5s ease';
        carouselInner.style.transform = `translateX(${offset})`;
    
        // 페이지네이션 업데이트
        pageDots.forEach(dot => dot.classList.remove('dot_active'));
        pageDots[currentIndex % items.length].classList.add('dot_active');
    }
    


    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            showModal(index);
        });
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }
        updateCarousel();
    });

    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Pagination click event
    pageDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateCarousel();
        });
    });
    // 자동 슬라이드 기능 추가
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 3000); // 3초 간격


    updateCarousel();
});
