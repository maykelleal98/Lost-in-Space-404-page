document.addEventListener('mousemove', (e) => {
    // Get the center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate mouse position relative to the center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Select parallax layers
    const backgroundLayer = document.querySelector('.parallax-background');
    const midgroundLayer = document.querySelector('.parallax-midground');
    const foregroundLayer = document.querySelector('.parallax-foreground');
    const lostObject = document.querySelector('.lost-object');

    // Calculate parallax effect based on mouse position
    // Adjust these multipliers to control the speed of each layer
    const bgSpeed = 0.02; // Slower for background
    const mgSpeed = 0.05; // Medium for midground
    const fgSpeed = 0.08; // Faster for foreground
    const objectSpeed = 0.04; // Adjust for lost object

    // Apply transform for parallax effect
    // We're moving the background *opposite* to the mouse direction to simulate depth
    if (backgroundLayer) {
        backgroundLayer.style.transform = `translate(${mouseX * bgSpeed}px, ${mouseY * bgSpeed}px)`;
    }
    if (midgroundLayer) {
        midgroundLayer.style.transform = `translate(${mouseX * mgSpeed}px, ${mouseY * mgSpeed}px)`;
    }
    // For the foreground, it moves slightly less than the content to create a subtle separation
    if (foregroundLayer) {
        foregroundLayer.style.transform = `translate(${mouseX * fgSpeed}px, ${mouseY * fgSpeed}px)`;
    }
    // Make the lost object drift slightly with the mouse
    if (lostObject) {
        lostObject.style.transform = `translate(calc(-50% + ${mouseX * objectSpeed}px), calc(-50% + ${mouseY * objectSpeed}px))`;
    }
});

// Optional: Add a subtle tilt/rotate effect to the lost object on mouse movement
document.addEventListener('mousemove', (e) => {
    const lostObject = document.querySelector('.lost-object img'); // Target the img itself for rotation
    if (lostObject) {
        const rect = lostObject.getBoundingClientRect();
        const objectCenterX = rect.left + rect.width / 2;
        const objectCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - objectCenterX;
        const deltaY = e.clientY - objectCenterY;

        // Calculate rotation based on mouse position relative to object center
        // Invert deltaY for more natural tilt (up mouse -> tilt up)
        const rotateX = -deltaY * 0.03; // Adjust sensitivity
        const rotateY = deltaX * 0.03;  // Adjust sensitivity

        lostObject.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

// Optional: Typewriter effect for the main message (e.g., "Lost in the Digital Void")
const heading2 = document.querySelector('.content h2');
const originalText = heading2 ? heading2.textContent : '';
let charIndex = 0;

function typeWriter() {
    if (!heading2) return;
    heading2.textContent = ''; // Clear existing text

    function typeChar() {
        if (charIndex < originalText.length) {
            heading2.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 70); // Adjust typing speed
        }
    }
    typeChar();
}

// Call typewriter effect after a short delay
if (heading2) {
    setTimeout(typeWriter, 1500); // Start typing after 1.5 seconds
}

// Optional: Background star generation (more advanced, but cool)
// You could replace the background image with dynamically generated stars
const bgLayer = document.querySelector('.parallax-background');
function createStars(count) {
    if (!bgLayer) return;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`; // Stagger animation
        bgLayer.appendChild(star);
    }
}
// Add this to your CSS for .star
/*
.star {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    opacity: 0;
    animation: twinkle 4s infinite ease-in-out;
    width: 2px;
    height: 2px;
}

@keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1); }
}
*/
// createStars(200); // Call this if you want dynamic stars