let pageBody = document.querySelector("body");
let purchasedItems = [];

function buildTitle() {
    let titleHolder = document.createElement("header");
    titleHolder.classList.add("pos-header");
    
    let titleEl = document.createElement("h1");
    titleEl.innerText = "BLORGS POS";
    titleHolder.appendChild(titleEl);
    
    let subtitle = document.createElement("span");
    subtitle.innerText = "Breakfast Terminal";
    titleHolder.appendChild(subtitle);
    
    pageBody.appendChild(titleHolder);
}

function buildLayout() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("pos-wrapper");
    
    // Left side - menu
    let menuPanel = document.createElement("div");
    menuPanel.classList.add("menu-panel");
    
    let menuTitle = document.createElement("h2");
    menuTitle.innerText = "Menu Items";
    menuPanel.appendChild(menuTitle);
    
    let foodList = document.createElement("div");
    foodList.id = "foodList";
    foodList.classList.add("food-grid");
    menuPanel.appendChild(foodList);
    
    wrapper.appendChild(menuPanel);
    
    // Right side - cart
    let cartPanel = document.createElement("div");
    cartPanel.classList.add("cart-panel");
    
    let cartTitle = document.createElement("h2");
    cartTitle.innerText = "Current Order";
    cartPanel.appendChild(cartTitle);
    
    let cartList = document.createElement("ul");
    cartList.id = "cartList";
    cartPanel.appendChild(cartList);
    
    let cartTotal = document.createElement("div");
    cartTotal.classList.add("cart-total");
    cartTotal.id = "cartTotal";
    cartTotal.innerText = "Total: $0.00";
    cartPanel.appendChild(cartTotal);
    
    let itemCount = document.createElement("div");
    itemCount.classList.add("item-count");
    itemCount.id = "itemCount";
    itemCount.innerText = "0 items";
    cartPanel.appendChild(itemCount);
    
    wrapper.appendChild(cartPanel);
    pageBody.appendChild(wrapper);
    
    getData();
}

function buildMenu(foodData) {
    let foodList = document.querySelector("#foodList");
    foodList.innerHTML = "";
    
    for (let i = 0; i < foodData.length; i++) {
        let card = document.createElement("div");
        card.classList.add("food-card");
        
        if (foodData[i].food_quantity == 0) {
            card.classList.add("out-of-stock");
        }
        
        let foodImage = document.createElement("img");
        foodImage.src = `./img/${foodData[i].food_image}`;
        foodImage.alt = foodData[i].food_name;
        foodImage.classList.add("food-img");
        card.appendChild(foodImage);
        
        let foodInfo = document.createElement("div");
        foodInfo.classList.add("food-info");
        
        let foodName = document.createElement("h3");
        foodName.innerText = foodData[i].food_name;
        foodInfo.appendChild(foodName);
        
        let foodPrice = document.createElement("span");
        foodPrice.classList.add("food-price");
        foodPrice.innerText = `$${foodData[i].price}`;
        foodInfo.appendChild(foodPrice);
        
        let foodQty = document.createElement("span");
        foodQty.classList.add("food-qty");
        if (foodData[i].food_quantity <= 5 && foodData[i].food_quantity > 0) {
            foodQty.classList.add("low-stock");
        }
        foodQty.innerText = `Qty: ${foodData[i].food_quantity}`;
        foodInfo.appendChild(foodQty);
        
        card.appendChild(foodInfo);
        
        if (foodData[i].food_quantity > 0) {
            let buyBtn = document.createElement("button");
            buyBtn.classList.add("buy-btn");
            buyBtn.innerText = "Purchase";
            card.appendChild(buyBtn);
            buyBtn.addEventListener("click", function () {
                purchaseItem(foodData[i].food_id, foodData[i].food_name, foodData[i].price);
            });
        } else {
            let soldOut = document.createElement("span");
            soldOut.classList.add("sold-out");
            soldOut.innerText = "SOLD OUT";
            card.appendChild(soldOut);
        }
        
        foodList.appendChild(card);
    }
}

function updateCart(foodName, price) {
    purchasedItems.push({ name: foodName, price: parseFloat(price) });
    
    let cartList = document.querySelector("#cartList");
    let cartItem = document.createElement("li");
    
    let itemName = document.createElement("span");
    itemName.innerText = foodName;
    cartItem.appendChild(itemName);
    
    let itemPrice = document.createElement("span");
    itemPrice.classList.add("cart-price");
    itemPrice.innerText = `$${price}`;
    cartItem.appendChild(itemPrice);
    
    cartList.appendChild(cartItem);
    
    // Update total
    let total = purchasedItems.reduce((sum, item) => sum + item.price, 0);
    let cartTotal = document.querySelector("#cartTotal");
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    
    // Update item count
    let itemCount = document.querySelector("#itemCount");
    itemCount.innerText = `${purchasedItems.length} item${purchasedItems.length > 1 ? 's' : ''}`;
}

async function getData() {
    const url = "./services/all_breakfast_api.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        buildMenu(result);
    } catch (error) {
        console.error(error.message);
    }
}

async function purchaseItem(foodId, foodName, price) {
    const url = "./purchase_api.php";
    let jsonData = JSON.stringify({ food_id: foodId });
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        
        updateCart(foodName, price);
        getData();
    } catch (error) {
        console.error(error.message);
    }
}

function init() {
    buildTitle();
    buildLayout();
}

init();