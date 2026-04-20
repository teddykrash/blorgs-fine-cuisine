let pageBody = document.querySelector("body");
function buildMenu(foodData){
    //regular dinner items
    let regulardinnerList = document.querySelector("#regulardinnerPrice");
    let regulardinnerItems = foodData.dinner;
    for(let i=0;i<regulardinnerItems.length;i++){
        let foodItem = document.createElement("li");

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = regulardinnerItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(regulardinnerItems[i].is_combo == "1"){
            itemPrice.innerText = `$${regulardinnerItems[i].price} (Combo: $${regulardinnerItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${regulardinnerItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${regulardinnerItems[i].desc} — ${regulardinnerItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        regulardinnerList.appendChild(foodItem);
    }

    //value dinner items
    let valuedinnerList = document.querySelector("#valuedinnerPrice");
    let valuedinnerItems = foodData.valuedinner;
    for(let i=0;i<valuedinnerItems.length;i++){
        let foodItem = document.createElement("li");

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = valuedinnerItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(valuedinnerItems[i].is_combo == "1"){
            itemPrice.innerText = `$${valuedinnerItems[i].price} (Combo: $${valuedinnerItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${valuedinnerItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${valuedinnerItems[i].desc} — ${valuedinnerItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        valuedinnerList.appendChild(foodItem);
    }

    // Dessert items
    let dessertList = document.querySelector("#desserts");
    let dessertItems = foodData.desserts;
    for(let i=0;i<dessertItems.length;i++){
        let foodItem = document.createElement("li");

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = dessertItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(dessertItems[i].is_combo == "1"){
            itemPrice.innerText = `$${dessertItems[i].price} (Combo: $${dessertItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${dessertItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${dessertItems[i].desc} — ${dessertItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        dessertList.appendChild(foodItem);
    }

    // Side items
    let sidesList = document.querySelector("#sides");
    let sideItems = foodData.side;
    for(let i=0;i<sideItems.length;i++){
        let foodItem = document.createElement("li");

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = sideItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(sideItems[i].is_combo == "1"){
            itemPrice.innerText = `$${sideItems[i].price} (Combo: $${sideItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${sideItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${sideItems[i].desc} — ${sideItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        sidesList.appendChild(foodItem);
    }
}
function buildTitle(){
    let titleHolder = document.createElement("header");

    let logo = document.createElement("img");
    logo.src = "images/logo.png";
    logo.alt = "Blorgs Fine Cuisine Logo";
    logo.classList.add("menu-logo");
    titleHolder.appendChild(logo);

    let titleEl = document.createElement("h1");
    titleEl.innerText = "WELCOME TO BLORGS FINE CUISINE";
    titleHolder.appendChild(titleEl);

    pageBody.appendChild(titleHolder);
}
function buildFoodHolders(){
    let regulardinnerTitle = document.createElement("h2");
    regulardinnerTitle.innerText = "Regular Dinner Menu";
    pageBody.appendChild(regulardinnerTitle);
    let regulardinner = document.createElement("ul");
    regulardinner.id ="regulardinnerPrice";
    pageBody.appendChild(regulardinner);
    
    let valuedinnerTitle = document.createElement("h2");
    valuedinnerTitle.innerText = "Affordable Dinners";
    pageBody.appendChild(valuedinnerTitle);
    let valuedinnerPrice = document.createElement("ul");
    valuedinnerPrice.id ="valuedinnerPrice";
    pageBody.appendChild(valuedinnerPrice);

    let dessertTitle = document.createElement("h2");
    dessertTitle.innerText = "Desserts";
    pageBody.appendChild(dessertTitle);
    let desserts = document.createElement("ul");
    desserts.id = "desserts";
    pageBody.appendChild(desserts);

    let sidesTitle = document.createElement("h2");
    sidesTitle.innerText = "Side Dishes";
    pageBody.appendChild(sidesTitle);
    let sides = document.createElement("ul");
    sides.id = "sides";
    pageBody.appendChild(sides);
    getData();
}
function clearFoodList(){
    document.querySelector("#foodList").innerHTML="";
}

async function getData() {
    const url = "./services/full_dinner_api.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        console.log("the dinner items");
        console.log(result.dinner);
        console.log("the value dinner items");
        console.log(result.valuedinner);
        buildMenu(result);
    } catch (error) {
        console.error(error.message);
    }
}

function init(){
    buildTitle();
    buildFoodHolders();
}
init();