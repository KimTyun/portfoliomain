document.addEventListener('DOMContentLoaded', function () {
    // Swiper 초기화
    var swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        centeredSlidesBounds: true, // 첫 번째 슬라이드가 중앙이 아닌 왼쪽에서 시작하도록 설정
        spaceBetween: 30,
        loop: false,
        observer: true,
        observeParents: true,
    });

    // 다크 모드 관리
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('.material-symbols-outlined');
    const body = document.body;

    // 시스템 설정 확인
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // 초기 테마 설정
    if (prefersDarkScheme.matches) {
        body.classList.add('dark-mode');
        icon.textContent = 'light_mode';
    } else {
        body.classList.remove('dark-mode');
        icon.textContent = 'dark_mode';
    }

    // 버튼 클릭 이벤트
    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            icon.textContent = 'light_mode';
        } else {
            icon.textContent = 'dark_mode';
        }
    });
});
