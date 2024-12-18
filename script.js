let currentProject = 1;

document.getElementById("next-project").addEventListener("click", function() {
    currentProject = currentProject === 1 ? 2 : 1;  // Toggle between project 1 and 2
    displayProject(currentProject);
});

document.getElementById("prev-project").addEventListener("click", function() {
    currentProject = currentProject === 1 ? 2 : 1;  // Toggle between project 1 and 2
    displayProject(currentProject);
});

function displayProject(projectNumber) {
    const project1 = document.getElementById("project-1");
    const project2 = document.getElementById("project-2");

    if (projectNumber === 1) {
        project1.style.display = "block";
        project2.style.display = "none";
    } else {
        project1.style.display = "none";
        project2.style.display = "block";
    }
}
// JavaScript for Fade-in and Slide-in on Scroll
const faders = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, {
    threshold: 0.2,
});

faders.forEach(fader => appearOnScroll.observe(fader));

document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.querySelector('.arrow').style.animation = 'bounce 0.3s';
    });

    link.addEventListener('animationend', () => {
        link.querySelector('.arrow').style.animation = '';
    });
});

// Add CSS animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
    0% { transform: translateX(0); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
