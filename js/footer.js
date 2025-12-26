document.addEventListener('DOMContentLoaded', function () {
   const footerHTML = `
    <footer class="custom-footer py-4 mt-5">
        <div class="container text-center">
            <div class="mb-2">
                <span class="badge badge-success mb-2">Open to Work</span>
            </div>
            <h5 class="mb-1">Your Name</h5>
            <p class="text-muted small mb-2">email@example.com</p>
            <div class="text-muted small">
                &copy; 2025 Your Name. All rights reserved.
            </div>
        </div>
    </footer>
    `

   document.body.insertAdjacentHTML('beforeend', footerHTML)
})
