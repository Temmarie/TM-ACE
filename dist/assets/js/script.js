document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar-scroll");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Scroll hide/show
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      navbar.classList.add("opacity-0", "-translate-y-full");
      navbar.classList.remove("opacity-100", "translate-y-0");
    } else {
      navbar.classList.remove("opacity-0", "-translate-y-full");
      navbar.classList.add("opacity-100", "translate-y-0");
    }
    lastScrollTop = Math.max(currentScroll, 0);
  });

  // Hamburger toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      mobileMenuButton.setAttribute("aria-expanded", String(!isHidden));
    });

    // Close menu on nav link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Resize behavior
  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 920 &&
      mobileMenu &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Highlight active nav link with caret
  const navLinks = document.querySelectorAll(".nav-link");
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage || !currentPage.endsWith(".html")) {
    currentPage = "index.html";
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("text-yellow-400", "font-extrabold", "relative");
      if (!link.querySelector("i.fa-caret-up")) {
        const caret = document.createElement("i");
        caret.className =
          "fa-solid fa-caret-up text-red-500 text-5xl absolute -bottom-18 left-1/2 -translate-x-1/2";
        link.appendChild(caret);
        caret.style.fontSize = "2.5rem";
        caret.style.bottom = "-4rem";
        caret.style.position = "absolute";
        caret.style.left = "80%";
        caret.style.transform = "translateX(-50%)";
      }
    }
  });

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });

  // Show More Button
  const showMoreBtn = document.getElementById("show-more-btn");
  const list = document.getElementById("roles-list");
  if (showMoreBtn && list) {
    showMoreBtn.addEventListener("click", function () {
      const hiddenItems = list.querySelectorAll("li.hidden");
      const showingAll = hiddenItems.length === 0;
      list.querySelectorAll("li").forEach((item, index) => {
        if (index >= 5) {
          item.classList.toggle("hidden", showingAll);
        }
      });
      this.textContent = showingAll ? "Show More" : "Show Less";
    });
  }

  // Project Carousel
  const carousel = document.getElementById("carousel");
  const cards = carousel?.querySelectorAll("div.group");
  const dotsContainer = document.getElementById("carousel-dots");
  if (carousel && cards.length) {
    const cardsPerView =
      window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
    const totalDots = Math.ceil(cards.length / cardsPerView);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.className =
        "w-3 h-3 rounded-full bg-gray-300 hover:bg-yellow-400 transition-colors duration-200 focus:outline-none";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        const scrollTo =
          cards[i * cardsPerView].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: scrollTo, behavior: "smooth" });
      });
      dotsContainer.appendChild(dot);
    }

    function updateActiveDot() {
      const scrollLeft = carousel.scrollLeft;
      let activeIndex = 0;
      for (let i = 0; i < totalDots; i++) {
        const cardIndex = i * cardsPerView;
        if (
          cards[cardIndex] &&
          scrollLeft >= cards[cardIndex].offsetLeft - carousel.offsetLeft - 10
        ) {
          activeIndex = i;
        }
      }
      dotsContainer.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("bg-yellow-400", idx === activeIndex);
        dot.classList.toggle("bg-gray-300", idx !== activeIndex);
      });
    }

    carousel.addEventListener("scroll", updateActiveDot);
    window.addEventListener("resize", () => location.reload());
    updateActiveDot();
  }

  // Testimonials Carousel
  const slidesContainer = document.getElementById("carousel-slides");
  if (slidesContainer) {
    const slides = slidesContainer.children;
    let currentIndex = 0;
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("button");
      dot.className =
        "w-3 h-3 rounded-full bg-gray-300 hover:bg-yellow-400 transition-colors duration-200 focus:outline-none";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }

    function updateCarousel() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      dotsContainer.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("bg-yellow-400", idx === currentIndex);
        dot.classList.toggle("bg-gray-300", idx !== currentIndex);
      });
    }

    updateCarousel();
  }

  // Slideshow
  const slideshow = document.querySelector(".slideshow");
  if (slideshow) {
    const images = slideshow.children;
    let currentImage = 0;

    function showNextImage() {
      images[currentImage].style.opacity = 0;
      images[currentImage].style.transform = "scale(1)";
      currentImage = (currentImage + 1) % images.length;
      images[currentImage].style.opacity = 1;
      images[currentImage].style.transform = "scale(1)";
      setTimeout(() => {
        images[currentImage].style.transform = "scale(1.1)";
      }, 100);
    }

    setInterval(showNextImage, 5000);
    images[0].classList.add("active");
    images[0].style.opacity = 1;
    images[0].style.transform = "scale(1.1)";
  }
});
