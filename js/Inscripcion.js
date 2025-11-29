// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active")
    }
  })
}, observerOptions)

// Observe all elements with scroll-animate class
document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el)
})

// Form submission
const registrationForm = document.getElementById("registrationForm")
if (registrationForm) {
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      plan: document.getElementById("plan").value,
      experience: document.getElementById("experience").value,
      message: document.getElementById("message").value,
    }

    // Simulate form submission
    console.log("Form submitted:", formData)

    // Show success modal
    const successModal = document.getElementById("successModal")
    if (successModal) {
      const modalInstance = new window.bootstrap.Modal(successModal)
      modalInstance.show()
    }

    // Reset form
    registrationForm.reset()

    // In a real application, you would send this data to a server
    // Example:
    // fetch('/api/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     successModal.show();
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
  })
}

// Ripple effect for buttons
document.querySelectorAll(".btn-cta").forEach((button) => {
  button.addEventListener("click", function (e) {
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

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Animate counters when they come into view
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
        entry.target.classList.add("animated")
      }
    })
  },
  { threshold: 0.5 },
)

// Add data-target attributes and observe stat numbers
document.querySelectorAll(".stat-number").forEach((stat) => {
  const text = stat.textContent.trim()
  const number = Number.parseInt(text.replace(/\D/g, ""))
  if (!isNaN(number)) {
    stat.setAttribute("data-target", number)
    stat.textContent = "0"
    statObserver.observe(stat)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-particles")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Video modal - pause video when modal is closed
const videoModal = document.getElementById("videoModal")
if (videoModal) {
  videoModal.addEventListener("hidden.bs.modal", function () {
    const iframe = this.querySelector("iframe")
    if (iframe) {
      const src = iframe.src
      iframe.src = src
    }
  })
}

// Accordion icon rotation
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", function () {
    const icon = this.querySelector(".iconify")
    if (icon) {
      icon.style.transform = this.classList.contains("collapsed") ? "rotate(0deg)" : "rotate(180deg)"
    }
  })
})

// Form validation feedback
const formInputs = document.querySelectorAll(".form-control, .form-select")
formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() === "" && this.hasAttribute("required")) {
      this.classList.add("is-invalid")
    } else {
      this.classList.remove("is-invalid")
      this.classList.add("is-valid")
    }
  })

  input.addEventListener("input", function () {
    if (this.classList.contains("is-invalid")) {
      this.classList.remove("is-invalid")
    }
  })
})

// Email validation
const emailInput = document.getElementById("email")
if (emailInput) {
  emailInput.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.value)) {
      this.classList.add("is-invalid")
    } else {
      this.classList.remove("is-invalid")
      this.classList.add("is-valid")
    }
  })
}

// Phone validation
const phoneInput = document.getElementById("phone")
if (phoneInput) {
  phoneInput.addEventListener("input", function () {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, "")
  })
}

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add active class to current nav item
const currentLocation = window.location.hash
if (currentLocation) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active")
    }
  })
}

// Pricing plan selector
document.querySelectorAll(".pricing-card .btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const planName = this.closest(".pricing-card").querySelector("h3").textContent
    const planSelect = document.getElementById("plan")
    if (planSelect) {
      // Set the selected plan in the form
      const options = planSelect.options
      for (let i = 0; i < options.length; i++) {
        if (options[i].text.includes(planName)) {
          planSelect.selectedIndex = i
          break
        }
      }
    }
  })
})

// Console log for debugging
console.log("[v0] Blender Course Landing Page initialized")
console.log("[v0] All event listeners attached successfully")
