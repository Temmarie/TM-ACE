// --- Load Navbar First ---
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // --- Toggle Mobile Menu ---
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
    }

    // --- Close Mobile Menu on Link Click ---
    const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.getElementById("mobile-menu").classList.add("hidden");
      });
    });

    // --- Highlight Active Link ---
    const navLinks = document.querySelectorAll(".nav_link");
    const currentPage = window.location.pathname.split("/").pop();
    navLinks.forEach((navLink) => {
      const pageLink = navLink.getAttribute("href");
      if (pageLink === currentPage) {
        navLink.classList.add("text-yellow-400", "font-bold", "relative");
        const icon = document.createElement("i");
        icon.className =
          "fa-solid fa-caret-up text-red-500 text-xs absolute -bottom-10 left-1/2 transform -translate-x-1/2";
        navLink.appendChild(icon);
      }
    });

    // --- Scroll Behavior on Navbar ---
    const navbar = document.getElementById("navbar-scroll");
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
  });

// --- Load Footer ---
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// --- DOMContentLoaded for Everything Else ---
document.addEventListener("DOMContentLoaded", () => {
  // --- Show More Button ---
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

  // --- Project Carousel ---
  const carousel = document.getElementById("carousel");
  const cards = carousel?.querySelectorAll("div.group");
  const dotsContainer = document.getElementById("carousel-dots");

  if (carousel && cards?.length && dotsContainer) {
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

  // --- Testimonials Carousel ---
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

  // --- Slideshow ---
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
