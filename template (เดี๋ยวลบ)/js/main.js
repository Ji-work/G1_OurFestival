// 🧭 แสดงข้อความใน console ให้ตรวจว่าเชื่อม JS สำเร็จ
console.log("Main.js loaded successfully!");

// 🔧 ตัวอย่างโค้ดเสริม (optional)
document.addEventListener("DOMContentLoaded", () => {
  // highlight เมนูหน้าปัจจุบัน
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initScrollAnimations();
  initGalleryModal();
  initSparkleEffect();
});

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const teamCards = document.querySelectorAll(".team-card");
  teamCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
  });


  const quickLinks = document.querySelectorAll(".quick-link-card");
  quickLinks.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
  });
}


function initGalleryModal() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector(".gallery-img");
      const modal = createModal(img.src, img.alt);
      document.body.appendChild(modal);

      setTimeout(() => {
        modal.classList.add("show");
      }, 10);

      modal.addEventListener("click", function () {
        this.classList.remove("show");
        setTimeout(() => {
          this.remove();
        }, 300);
      });
    });
  });
}

function createModal(src, alt) {
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="gallery-modal-content">
      <img src="${src}" alt="${alt}">
      <p class="gallery-modal-caption">${alt}</p>
      <button class="gallery-modal-close">&times;</button>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    .gallery-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }
    
    .gallery-modal.show {
      opacity: 1;
    }
    
    .gallery-modal-content {
      max-width: 90%;
      max-height: 90%;
      text-align: center;
      animation: modalZoom 0.3s ease;
    }
    
    .gallery-modal-content img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 10px;
      box-shadow: 0 10px 50px rgba(211, 84, 0, 0.5);
    }
    
    .gallery-modal-caption {
      color: white;
      margin-top: 1rem;
      font-size: 1.2rem;
    }
    
    .gallery-modal-close {
      position: absolute;
      top: 20px;
      right: 30px;
      font-size: 3rem;
      color: white;
      background: none;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .gallery-modal-close:hover {
      transform: scale(1.2);
    }
    
    @keyframes modalZoom {
      from {
        transform: scale(0.7);
      }
      to {
        transform: scale(1);
      }
    }
  `;

  if (!document.querySelector("style[data-modal-style]")) {
    style.setAttribute("data-modal-style", "true");
    document.head.appendChild(style);
  }

  return modal;
}

function initSparkleEffect() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    createSparkle(hero);
  }
}

function createSparkle(container) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";

  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = 2 + Math.random() * 2;

  sparkle.style.cssText = `
    position: absolute;
    left: ${x}%;
    top: ${y}%;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    z-index: 4;
    animation: sparkle ${duration}s ease-in-out ${delay}s infinite;
    box-shadow: 0 0 6px white;
  `;

  container.appendChild(sparkle);

  if (!document.querySelector("style[data-sparkle-style]")) {
    const style = document.createElement("style");
    style.setAttribute("data-sparkle-style", "true");
    style.textContent = `
      @keyframes sparkle {
        0%, 100% {
          opacity: 0;
          transform: scale(0);
        }
        50% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

document.querySelectorAll(".team-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.background = "linear-gradient(135deg, #fff 0%, #fff5f0 100%)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.background = "white";
  });
});

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-section");
  if (hero) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
  }
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
