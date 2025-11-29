// =============================
// MAIN JS OPTIMIZADO
// =============================

document.addEventListener("DOMContentLoaded", () => {
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector(".navbar-custom")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar?.classList.add("scrolled")
    else navbar?.classList.remove("scrolled")
  })

  // ========== MOBILE MENU TOGGLE ==========
  const toggler = document.querySelector(".custom-toggler")
  const menuIcon = toggler?.querySelector(".menu-icon")
  const closeIcon = toggler?.querySelector(".close-icon")
  toggler?.addEventListener("click", () => {
    menuIcon?.classList.toggle("d-none")
    closeIcon?.classList.toggle("d-none")
  })

  // ========== INTERSECTION OBSERVER (ANIMACIONES DE ENTRADA) ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view")
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document
    .querySelectorAll(".animate-fade-in-up, .animate-fade-in-right, .animate-fade-in")
    .forEach((el) => animationObserver.observe(el))

  // ========== COUNTER ANIMATION ==========
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = parseInt(counter.dataset.target, 10)
          let current = 0
          const increment = target / 50

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              counter.textContent = target + (target < 100 ? "+" : "%")
              clearInterval(timer)
            } else {
              counter.textContent = Math.floor(current) + (target < 100 ? "+" : "%")
            }
          }, 30)

          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 }
  )
  document.querySelectorAll(".counter").forEach((c) => counterObserver.observe(c))

  // ========== PROGRESS BAR ANIMATION ==========
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const width = bar.dataset.width
          setTimeout(() => (bar.style.width = width + "%"), 200)
          progressObserver.unobserve(bar)
        }
      })
    },
    { threshold: 0.5 }
  )
  document.querySelectorAll(".progress-fill").forEach((bar) => progressObserver.observe(bar))

  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(link.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // ========== PARALLAX EFFECT ==========
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    document.querySelectorAll(".hero-background, .hero-blender").forEach((hero) => {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    })
  })

  // ========== CARD HOVER EFFECTS ==========
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.boxShadow = "var(--shadow-medium)"
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "none"
    })
  })

  // ========== FEATURE CARD HOVER (Características.html) ==========
  document.querySelectorAll(".feature-card").forEach((card) => {
    const overlay = card.querySelector(".feature-overlay")
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)"
      card.style.boxShadow = "var(--shadow-strong)"
      if (overlay) overlay.style.opacity = "1"
    })
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "var(--shadow-soft)"
      if (overlay) overlay.style.opacity = "0"
    })
  })

  // ========== FORM VALIDATION ==========
  window.validateForm = function (form) {
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let valid = true
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("is-invalid")
        valid = false
      } else {
        input.classList.remove("is-invalid")
      }
    })
    return valid
  }

  // ========== IMAGE FALLBACK ==========
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.src = "https://via.placeholder.com/400x300/2a2a2a/ffffff?text=Imagen+no+disponible"
    })
  })

  // ========== PRELOAD CRITICAL IMAGES ==========
  const preload = [
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2940&auto=format&fit=crop",
  ]
  preload.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  // ========== ACCESSIBILITY IMPROVEMENTS ==========
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
      const main = document.querySelector("main, #hero")
      if (main) {
        main.focus()
        e.preventDefault()
      }
    }
  })

  // ========== PERFORMANCE LOG ==========
  if ("performance" in window) {
    setTimeout(() => {
      const perf = performance.getEntriesByType("navigation")[0]
      console.log("⏱️ Page load time:", perf.loadEventEnd - perf.loadEventStart, "ms")
    }, 0)
  }
})

// ========== DEBOUNCE & OPTIMIZED SCROLL HANDLER ==========
function debounce(func, wait = 16) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

const optimizedScrollHandler = debounce(() => {
  // lugar para animaciones adicionales en scroll
}, 16)

window.addEventListener("scroll", optimizedScrollHandler)
