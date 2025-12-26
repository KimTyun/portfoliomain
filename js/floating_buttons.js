document.addEventListener('DOMContentLoaded', function () {
   // 플로팅 버튼 HTML 주입
   const floatingButtonsHTML = `
      <div class="position-fixed" style="bottom: 30px; right: 30px; z-index: 1000; display: flex; flex-direction: column; gap: 10px">
         <a href="index.html" class="btn btn-secondary rounded-circle shadow-lg d-flex align-items-center justify-content-center" style="width: 60px; height: 60px" title="홈으로">
            <span class="material-symbols-outlined">home</span>
         </a>
         <button id="darkModeToggle" class="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center" style="width: 60px; height: 60px" title="다크 모드 토글">
            <span class="material-symbols-outlined" style="font-size: 30px">dark_mode</span>
         </button>
      </div>
    `

   document.body.insertAdjacentHTML('beforeend', floatingButtonsHTML)

   // 다크 모드 로직
   const darkModeToggle = document.getElementById('darkModeToggle')
   const icon = darkModeToggle.querySelector('.material-symbols-outlined')
   const body = document.body

   // 시스템 설정 확인
   const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

   // 초기 테마 설정 (localStorage 저장된 값 우선, 없으면 시스템 설정)
   const currentTheme = localStorage.getItem('theme')

   if (currentTheme === 'dark') {
      body.classList.add('dark-mode')
      icon.textContent = 'light_mode'
   } else if (currentTheme === 'light') {
      body.classList.remove('dark-mode')
      icon.textContent = 'dark_mode'
   } else if (prefersDarkScheme.matches) {
      body.classList.add('dark-mode')
      icon.textContent = 'light_mode'
   }

   // 버튼 클릭 이벤트
   darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode')
      let theme = 'light'
      if (body.classList.contains('dark-mode')) {
         icon.textContent = 'light_mode'
         theme = 'dark'
      } else {
         icon.textContent = 'dark_mode'
      }
      localStorage.setItem('theme', theme)
   })
})
