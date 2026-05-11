// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.remove('light');
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
    }
});

// Set default theme to dark
body.classList.add('dark');

// Mouse Spotlight
const spotlight = document.getElementById('spotlight');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    spotlight.style.setProperty('--x', `${x}%`);
    spotlight.style.setProperty('--y', `${y}%`);
});

// Scroll Reveal
const sections = document.querySelectorAll('.section');
const finalSection = document.getElementById('final');
const summaryCards = document.querySelectorAll('.summary-card');
const skillIcons = document.querySelectorAll('.skill-icon');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillIcons.forEach(icon => {
                icon.classList.remove('exit');
                icon.classList.add('enter');
            });
        } else {
            skillIcons.forEach(icon => {
                icon.classList.remove('enter');
                icon.classList.add('exit');
            });
        }
    });
}, { threshold: 0.25 });

skillsObserver.observe(skillsSection);

const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            finalSection.classList.add('visible');
            summaryCards.forEach(card => {
                card.classList.remove('active');
                requestAnimationFrame(() => card.classList.add('active'));
            });
        } else {
            summaryCards.forEach(card => card.classList.remove('active'));
        }
    });
}, { threshold: 0.25 });

finalObserver.observe(finalSection);

// Dynamic Background Particles (for Dark Mode)
function createParticles() {
    if (body.classList.contains('dark')) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            document.body.appendChild(particle);
        }
    } else {
        // Remove particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => p.remove());
    }
}

// Dynamic Clouds (for Light Mode)
function createClouds() {
    if (body.classList.contains('light')) {
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            cloud.style.top = Math.random() * 50 + '%';
            cloud.style.animationDelay = Math.random() * 20 + 's';
            document.body.appendChild(cloud);
        }
    } else {
        // Remove clouds
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach(c => c.remove());
    }
}

// Update background on theme change
themeSwitch.addEventListener('change', () => {
    createParticles();
    createClouds();
});

// Initial load
createParticles();