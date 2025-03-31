
        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Form submission
        const url = 'https://script.google.com/macros/s/AKfycby-y9hsTh9wTR5A4Y7A2iICivs4dge4PxyqyWJMUvV5d8kCSJduD1TKXW6eJY3Ymkk/exec';
        const form = document.getElementById('queryForm');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Disable submit button to prevent multiple submissions
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Prepare form data
            const formData = new FormData(form);
            
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === "success") {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    errorText.textContent = data.message || 'An error occurred. Please try again.';
                    errorMessage.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorText.textContent = 'Failed to send message. Please check your connection and try again.';
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
        
        // Sticky header on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });
   
    