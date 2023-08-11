function setupCarousel() {
    const carouselContainer = document.querySelector(".container");
    const carousel = document.querySelector(".carousel");
    const products = carousel.querySelectorAll(".product");
    const arrowLeft = carouselContainer.querySelector(".fa-arrow-left");
    const arrowRight = carouselContainer.querySelector(".fa-arrow-right");
    const slideWidth = products[0].offsetWidth;
    
    let currentIndex = 0;
    let autoPlayInterval;

    const clonedProducts = [...products].map(product => product.cloneNode(true));
    clonedProducts.forEach(clonedProduct => {
        carousel.appendChild(clonedProduct);
    });

    arrowLeft.addEventListener("click", () => navigate("backward"));
    arrowRight.addEventListener("click", () => navigate("forward"));

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => navigate("forward"), 1000);
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
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft += slideWidth;
            }
        } else if (direction === "backward") {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = products.length - 1;
                carousel.scrollLeft = carousel.scrollWidth - slideWidth;
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