// Enhanced Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("mainCarousel")
  const bootstrap = window.bootstrap // Declare the bootstrap variable

  if (carousel) {
    // Initialize Bootstrap carousel
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
      touch: true,
    })

    // Add smooth transition effects
    carousel.addEventListener("slide.bs.carousel", (e) => {
      const activeItem = e.relatedTarget
      const icon = activeItem.querySelector(".carousel-icon")
      const title = activeItem.querySelector(".carousel-title")
      const description = activeItem.querySelector(".carousel-description")

      // Reset animations
      if (icon) {
        icon.style.animation = "none"
        setTimeout(() => {
          icon.style.animation = "float 3s ease-in-out infinite"
        }, 10)
      }

      if (title) {
        title.style.animation = "none"
        setTimeout(() => {
          title.style.animation = "slide-in-left 0.6s ease-out"
        }, 10)
      }

      if (description) {
        description.style.animation = "none"
        setTimeout(() => {
          description.style.animation = "slide-in-left 0.6s ease-out 0.1s backwards"
        }, 10)
      }
    })

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
      bsCarousel.pause()
    })

    carousel.addEventListener("mouseleave", () => {
      bsCarousel.cycle()
    })
  }

  // Project Cards Hover Effects
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Smooth Scroll for Buttons (if needed)
  const buttons = document.querySelectorAll(".btn-primary")

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe project cards
  projectCards.forEach((card) => {
    observer.observe(card)
  })

  // Parallax effect for banner
  window.addEventListener("scroll", () => {
    const banner = document.querySelector(".blender-banner")
    if (banner) {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      banner.style.transform = `translateY(${parallax}px)`
    }
  })

  // Add ripple effect styles dynamically
  const style = document.createElement("style")
  style.textContent = `
        .btn-primary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
})

// Console log for debugging
console.log("[v0] Blender Projects page loaded successfully")
