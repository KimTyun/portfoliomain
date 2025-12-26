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
   })
})
