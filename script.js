// Custom Cursor
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Typewriter Effect
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Software Developer", "Web Developer", "MCA Student", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenu && navLinksContainer) {
    mobileMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close mobile menu when a link is clicked
    const navItems = navLinksContainer.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// Skills Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-item');

if (filterBtns.length > 0 && skillItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else if (item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
}

// Certificate Modal
const modal = document.getElementById("cert-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalIssuer = document.getElementById("modal-issuer");
const modalDownload = document.getElementById("modal-download");
const modalClose = document.querySelector(".modal-close");
const viewCertBtns = document.querySelectorAll(".view-cert-btn");

if (modal && viewCertBtns.length > 0) {
    viewCertBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".certification-card");
            if (card) {
                const imgUrl = card.getAttribute("data-cert-img");
                const title = card.getAttribute("data-cert-title");
                const issuer = card.getAttribute("data-cert-issuer");
                const date = card.getAttribute("data-cert-date");

                if (modalImg) modalImg.src = imgUrl;
                if (modalTitle) modalTitle.textContent = title;
                if (modalIssuer) modalIssuer.textContent = `${issuer} | ${date}`;
                if (modalDownload) modalDownload.href = imgUrl;

                modal.classList.add("show");
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

    // Close on click outside the content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
}

// Cursor Hover Effect
const updateHoverEffect = () => {
    const hoverables = document.querySelectorAll("a, button, .filter-btn, .modal-close, .view-cert-btn, .menu-toggle");
    hoverables.forEach(el => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
        
        el.addEventListener("mouseenter", addHoverClass);
        el.addEventListener("mouseleave", removeHoverClass);
    });
};

function addHoverClass() {
    if (typeof cursorOutline !== 'undefined' && cursorOutline) cursorOutline.classList.add("cursor-hover");
    if (typeof cursorDot !== 'undefined' && cursorDot) cursorDot.classList.add("cursor-hover-dot");
}

function removeHoverClass() {
    if (typeof cursorOutline !== 'undefined' && cursorOutline) cursorOutline.classList.remove("cursor-hover");
    if (typeof cursorDot !== 'undefined' && cursorDot) cursorDot.classList.remove("cursor-hover-dot");
}

document.addEventListener("DOMContentLoaded", () => {
    updateHoverEffect();
});

// Run hover effect scanner immediately
updateHoverEffect();
