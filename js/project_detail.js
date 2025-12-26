document.addEventListener('DOMContentLoaded', function () {
   // 다크 모드 관리 (기존 script.js 로직 재사용)
   const darkModeToggle = document.getElementById('darkModeToggle')
   const icon = darkModeToggle.querySelector('.material-symbols-outlined')
   const body = document.body

   // 시스템 설정 확인
   const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

   // 초기 테마 설정
   if (prefersDarkScheme.matches) {
      body.classList.add('dark-mode')
      icon.textContent = 'light_mode'
   } else {
      body.classList.remove('dark-mode')
      icon.textContent = 'dark_mode'
   }

   // 버튼 클릭 이벤트
   darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode')
      if (body.classList.contains('dark-mode')) {
         icon.textContent = 'light_mode'
      } else {
         icon.textContent = 'dark_mode'
      }
   })

   // URL 파라미터에서 ID 가져오기
   const urlParams = new URLSearchParams(window.location.search)
   const projectId = parseInt(urlParams.get('id'))

   if (!projectId) {
      showError('잘못된 접근입니다. 프로젝트 ID가 없습니다.')
      return
   }

   // 데이터 로드
   fetch('data/projects.json')
      .then((response) => {
         if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.')
         }
         return response.json()
      })
      .then((data) => {
         const project = data.find((p) => p.id === projectId)
         if (project) {
            renderProject(project)
         } else {
            showError('해당 프로젝트를 찾을 수 없습니다.')
         }
      })
      .catch((error) => {
         console.error('Error:', error)
         showError('오류가 발생했습니다: ' + error.message)
      })

   function renderProject(project) {
      const contentDiv = document.getElementById('project-content')
      const template = document.getElementById('project-template')
      const clone = document.importNode(template.content, true)

      // 이미지 설정
      const img = clone.getElementById('p-image')
      img.src = project.image
      img.alt = project.title

      // 텍스트 정보 설정
      clone.getElementById('p-title').textContent = project.title
      clone.getElementById('p-description').textContent = project.description

      // GitHub 링크 설정
      const githubBtn = clone.getElementById('p-github')
      if (project.github) {
         githubBtn.href = project.github
      } else {
         githubBtn.style.display = 'none'
      }

      // 링크 설정
      const linkBtn = clone.getElementById('p-link')
      if (project.link) {
         linkBtn.href = project.link
      } else {
         linkBtn.style.display = 'none'
      }

      // PDF 다운로드 설정
      const pdfBtn = clone.getElementById('p-pdf')
      if (project.pdf) {
         pdfBtn.href = project.pdf
      } else {
         pdfBtn.style.display = 'none'
      }

      // 관련 문서 설정
      const docsContainer = clone.getElementById('p-docs')
      if (project.docs && project.docs.length > 0) {
         project.docs.forEach((doc) => {
            const docLink = document.createElement('a')
            docLink.href = doc.url
            docLink.className = 'doc-link'
            docLink.target = '_blank'
            docLink.innerHTML = `<span class="material-symbols-outlined mr-2" style="font-size: 18px;">description</span>${doc.title}`
            docsContainer.appendChild(docLink)
         })
      } else {
         docsContainer.innerHTML = '<p class="text-muted">관련 문서가 없습니다.</p>'
      }

      // 로딩 스피너 제거하고 컨텐츠 추가
      contentDiv.innerHTML = ''
      contentDiv.appendChild(clone)
   }

   function showError(message) {
      const contentDiv = document.getElementById('project-content')
      contentDiv.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">오류!</h4>
                    <p>${message}</p>
                    <hr>
                    <p class="mb-0"><a href="index.html" class="alert-link">메인 페이지로 돌아가기</a></p>
                </div>
            </div>
        `
   }
})
