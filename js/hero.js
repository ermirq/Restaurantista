let currentIndex = 0;
const visibleItemsCount = 3;
let currentFoodPrice = 0;
let currentQuantity = 1;

async function fetchFoodData() {
    try{
        const response = await fetch("js/foods.json");
        const foodData = await response.json();

        const initialCategory = "Lunch";
        renderFoodCarousel(foodData.categories[initialCategory]);

        document.querySelector(".price").textContent = `$${foodData.categories[initialCategory][0].price.toFixed(2)}`;
        updateHeroImage(foodData.categories[initialCategory][0]);
        setupArrowNavigation(foodData.categories[initialCategory]);
    } catch (error) {
        console.error("Error fetching food data:", error);
    }
}

function renderFoodCarousel (foods) {
    const foodItemsContainer = document.querySelector(".food-items");
    foodItemsContainer.innerHTML = "";

    foods.forEach((food, index) => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");
        if(index ===0) {
            foodItem.classList.add("selected");
        }

        foodItem.innerHTML = `
            <img src = "${food.image}" alt = "${food.name}" />
            <p>${food.name} <br/>
            <span class = "food-price">
                <span class="valute">$</span>
                ${food.price.toFixed(2)}
            </span></p>
        `;

        if (index >= visibleItemsCount) {
            foodItem.style.display = "none";
        }

        foodItem.addEventListener("click", () => {
            selectFoodItem(food, foodItem);
            currentIndex = index;
        });

        foodItemsContainer.appendChild(foodItem);
    });
}

function updateTotalPrice() {
    const totalPriceElement = document.querySelector (
        ".order-info-total .price"
    );
    const total = currentFoodPrice * currentQuantity;
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(newQuantity) {
    currentQuantity = newQuantity;
    console.log(currentQuantity);

    const quantityElement = document.querySelector(".quantity");
    if (quantityElement) {
        quantityElement.textContent = currentQuantity;
    }
    updateTotalPrice();
}

const increaseBtn = document.getElementById("increment");
if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
        updateQuantity(currentQuantity + 1);
    });
}

const decreaseBtn = document.getElementById("decrement");
if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
        if (currentQuantity > 1) {
            updateQuantity(currentQuantity - 1);
        }
    });
}

function selectFoodItem (selectedFood, selectedElement) {
    updateHeroImage(selectedFood);

    currentFoodPrice = selectedFood.price;
    currentQuantity = 1;
    updateQuantity(currentQuantity);

    const allFoodItems = document.querySelectorAll(".food-item");
    allFoodItems.forEach((item) => {
        item.classList.remove("selected");
    });
    selectedElement.classList.add("selected");
}

function updateHeroImage(food) {
    const heroImage = document.querySelector(".hero-main-image")
    const foodTitle = document.querySelector(".food-title p:first-of-type");
    const foodRating =document.querySelector(".food-title p:last-of-type");
    const preparationTime = document.querySelector(".prepare-time")

    heroImage.src = food.image;
    heroImage.alt = food.name;
    foodTitle.textContent = food.name;
    foodRating.innerHTML = `<i class="fa-solid fa-star"></i> ${food.rating}`;
    preparationTime.textContent = `${food.preparationTime} min`;
}

function setupArrowNavigation(foods) {
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = foods.length - visibleItemsCount;
        }
        updateVisibleItems(foods);
    });

    rightArrow.addEventListener("click", () => {
        if (currentIndex < foods.length - visibleItemsCount) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateVisibleItems(foods);
    });
}

function updateVisibleItems() {
    const foodItems = document.querySelectorAll(".food-item");

    foodItems.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + visibleItemsCount) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    })
}

document.querySelector(".add-to-cart").addEventListener("click", () => {
    const selectedFood = {
        name: document.querySelector(".food-title p:first-of-type").textContent,
        price: currentFoodPrice,
        image: document.querySelector(".hero-main-image").src,
    }
    addToCart(selectedFood);
})

function addToCart(selectedFood) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exisitingItemIndex = cart.findIndex(
        (item) => item.name === selectedFood.name
    );

    if(exisitingItemIndex !== -1) {
        cart[exisitingItemIndex].quantity += currentQuantity;
    } else {
        cart.push({
            name: selectedFood.name,
            price: selectedFood.price,
            image: selectedFood.image,
            quantity: currentQuantity,
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

    Toastify({
        text: `${selectedFood.name} added to cart!`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "#ff7a00",
        stopOnFocus: true,
    }).showToast();
} 

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalUniqueItems = cart.length;

    document.getElementById("cart-badge").textContent = totalUniqueItems;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchFoodData();
    updateCartBadge();
});