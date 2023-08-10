function setupCarousel() {
    const carouselContainer = document.querySelector(".container");
    const carousel = document.querySelector(".carousel");
    const products = carousel.querySelectorAll(".product");
    const arrowLeft = carouselContainer.querySelector(".fa-arrow-left");
    const arrowRight = carouselContainer.querySelector(".fa-arrow-right");
    const slideWidth = products[0].offsetWidth;
    
    let currentIndex = 0;
    let isAutoPlay = true;
    let autoPlayInterval;

    const clonedProducts = [...products].map(product => product.cloneNode(true));
    clonedProducts.forEach(clonedProduct => {
        carousel.appendChild(clonedProduct);
    });

    arrowLeft.addEventListener("click", () => navigate("backward"));
    arrowRight.addEventListener("click", () => navigate("forward"));

    const startAutoPlay = () => {
        if (window.innerWidth >= 768 && isAutoPlay) {
            autoPlayInterval = setInterval(() => navigate("forward"), 1800);
        }
    };
    startAutoPlay();

    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoPlayInterval);
    });

    carousel.addEventListener("mouseleave", () => {
        startAutoPlay();
    });

    const navigate = (direction) => {
        if (direction === "forward") {
            currentIndex++;
            if (currentIndex >= products.length) {
                currentIndex = 0;
                setTimeout(() => {
                    carousel.scrollLeft = 0;
                }, 1000); // Delay for 1 second
            } else {
                carousel.scrollLeft += slideWidth;
            }
        } else if (direction === "backward") {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = products.length - 1;
                setTimeout(() => {
                    carousel.scrollLeft = carousel.scrollWidth - slideWidth;
                }, 1000); // Delay for 1 second
            } else {
                carousel.scrollLeft -= slideWidth;
            }
        }
    };

    window.addEventListener("resize", () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    });
}
setupCarousel();
