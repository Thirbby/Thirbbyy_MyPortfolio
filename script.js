document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close mobile menu on clicking any navigation link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // 2. Typing Effect for Hero Title
  const textToType = "Building creative, modern, and responsive web experiences.";
  const typingElement = document.getElementById("typing-text");
  let index = 0;

  function typeEffect() {
    if (index < textToType.length) {
      typingElement.textContent += textToType.charAt(index);
      index++;
      setTimeout(typeEffect, 40);
    }
  }
  typeEffect();

  // 3. Scroll-Triggered Reveal Animations
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));

  // 4. Highlight Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. Back to Top Button Logic
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 6. Profile Card Subtle 3D Mouse Tilt Effect (Desktop only)
  const tiltCard = document.querySelector(".tilt-card");

  if (tiltCard && window.matchMedia("(hover: hover)").matches) {
    tiltCard.addEventListener("mousemove", (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      tiltCard.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
      tiltCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // 7. Preview Tooltip & Modal Viewer (Optimized for Mobile & Desktop)
  const previewLinks = document.querySelectorAll(".preview-link");
  const tooltip = document.getElementById("image-tooltip");
  const tooltipImg = document.getElementById("tooltip-img");
  const tooltipPdf = document.getElementById("tooltip-pdf");

  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalPdf = document.getElementById("lightbox-pdf");
  const modalClose = document.querySelector(".lightbox-close");

  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  previewLinks.forEach((link) => {
    const fileSrc = link.getAttribute("data-file");
    const fileType = link.getAttribute("data-type");

    if (!isTouchDevice) {
      // Hover behaviors for Desktop
      link.addEventListener("mouseenter", () => {
        if (fileType === "image") {
          tooltipPdf.style.display = "none";
          tooltipImg.src = fileSrc;
          tooltipImg.style.display = "block";
        } else if (fileType === "pdf") {
          tooltipImg.style.display = "none";
          tooltipPdf.src = fileSrc;
          tooltipPdf.style.display = "block";
        }
        tooltip.classList.add("visible");
      });

      link.addEventListener("mousemove", (e) => {
        let x = e.clientX + 15;
        let y = e.clientY + 15;

        if (x + 260 > window.innerWidth) x = e.clientX - 265;
        if (y + 180 > window.innerHeight) y = e.clientY - 185;

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
      });

      link.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible");
        tooltipPdf.src = "";
      });
    }

    // Direct click/tap behavior to open Modal across all devices
    link.addEventListener("click", (e) => {
      e.preventDefault();
      tooltip.classList.remove("visible");

      if (fileType === "image") {
        modalPdf.style.display = "none";
        modalPdf.src = "";
        modalImg.src = fileSrc;
        modalImg.style.display = "block";
      } else if (fileType === "pdf") {
        modalImg.style.display = "none";
        modalPdf.src = fileSrc;
        modalPdf.style.display = "block";
      }

      modal.classList.add("active");
    });
  });

  // Close Lightbox Modal
  const closeModal = () => {
    modal.classList.remove("active");
    modalPdf.src = "";
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});