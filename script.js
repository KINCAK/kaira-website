function checkPassword() {
    // 1. Get what the user typed
    const passwordInput = document.getElementById('password-input').value;
    
    // 2. Define your password here
    const secretCode = "vita"; 

    // 3. Get the HTML elements we need to show/hide
    const overlay = document.getElementById('privacy-overlay');
    const content = document.getElementById('main-content');
    const errorMsg = document.getElementById('error-msg');

    // 4. Check if the password matches
    if (passwordInput === secretCode) {
        // Correct Password:
        
        // Hide the error message if it was showing
        errorMsg.style.display = "none";

        // Fade out the black overlay
        overlay.style.opacity = "0";

        // Wait 0.5 seconds for fade to finish, then remove overlay completely
        setTimeout(() => {
            overlay.style.display = "none";
            
            // Show the main website content
            content.style.opacity = "1";
            
            // Re-enable scrolling on the body
            document.body.style.overflow = "auto";
        }, 500);

    } else {
        // Wrong Password: Show error message
        errorMsg.style.display = "block";
    }
}

// Optional: Allow pressing "Enter" key to submit
document.getElementById("password-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

/* --- MOUSE TRAIL EFFECT --- */
document.addEventListener('mousemove', function(e) {
    const container = document.getElementById('particles-container');
    
    // Create a new particle element
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Set position to mouse coordinates
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    
    // Randomize size slightly for variety
    const size = Math.random() * 5 + 2; // Size between 2px and 7px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Add to screen
    container.appendChild(particle);
    
    // Remove the particle from DOM after animation finishes (1 second)
    // This prevents the browser from getting slow
    setTimeout(() => {
        particle.remove();
    }, 1000);
});