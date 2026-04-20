let pageBody = document.querySelector("body");

function buildMenu(foodData){
    // Regular breakfast items
    let regularBreakfastList = document.querySelector("#regularBreakfastPrice");
    let regularBreakfastItems = foodData.breakfast;
    for(let i = 0; i < regularBreakfastItems.length; i++){
        let foodItem = document.createElement("li");

        let foodImage = document.createElement("img");
        foodImage.src = `./img/${regularBreakfastItems[i].food_image}`;
        foodImage.alt = regularBreakfastItems[i].food_name;
        foodImage.classList.add("food-img");
        foodItem.appendChild(foodImage);

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = regularBreakfastItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(regularBreakfastItems[i].is_combo == "1"){
            itemPrice.innerText = `$${regularBreakfastItems[i].price} (Combo: $${regularBreakfastItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${regularBreakfastItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${regularBreakfastItems[i].desc} — ${regularBreakfastItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        regularBreakfastList.appendChild(foodItem);
    }

    // Value breakfast items
    let valueBreakfastList = document.querySelector("#valueBreakfastPrice");
    let valueBreakfastItems = foodData.valueBreakfast;
    for(let i = 0; i < valueBreakfastItems.length; i++){
        let foodItem = document.createElement("li");

        let foodImage = document.createElement("img");
        foodImage.src = `./img/${valueBreakfastItems[i].food_image}`;
        foodImage.alt = valueBreakfastItems[i].food_name;
        foodImage.classList.add("food-img");
        foodItem.appendChild(foodImage);

        let topRow = document.createElement("div");
        topRow.classList.add("menu-item-top");

        let itemName = document.createElement("span");
        itemName.classList.add("item-name");
        itemName.innerText = valueBreakfastItems[i].food_name;

        let itemPrice = document.createElement("span");
        itemPrice.classList.add("item-price");
        if(valueBreakfastItems[i].is_combo == "1"){
            itemPrice.innerText = `$${valueBreakfastItems[i].price} (Combo: $${valueBreakfastItems[i].combo_price})`;
        } else {
            itemPrice.innerText = `$${valueBreakfastItems[i].price}`;
        }

        topRow.appendChild(itemName);
        topRow.appendChild(itemPrice);
        foodItem.appendChild(topRow);

        let itemDesc = document.createElement("p");
        itemDesc.classList.add("item-desc");
        itemDesc.innerText = `${valueBreakfastItems[i].desc} — ${valueBreakfastItems[i].calories} cal`;
        foodItem.appendChild(itemDesc);

        valueBreakfastList.appendChild(foodItem);
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
    let regularBreakfastTitle = document.createElement("h2");
    regularBreakfastTitle.innerText = "Regular Breakfast Menu";
    pageBody.appendChild(regularBreakfastTitle);
    let regularBreakfast = document.createElement("ul");
    regularBreakfast.id = "regularBreakfastPrice";
    pageBody.appendChild(regularBreakfast);
    
    let valueBreakfastTitle = document.createElement("h2");
    valueBreakfastTitle.innerText = "Affordable Breakfasts";
    pageBody.appendChild(valueBreakfastTitle);
    let valueBreakfastPrice = document.createElement("ul");
    valueBreakfastPrice.id = "valueBreakfastPrice";
    pageBody.appendChild(valueBreakfastPrice);

    getData();
}

async function getData() {
    const url = "./services/full_breakfast_api.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        console.log("the breakfast items");
        console.log(result.breakfast);
        console.log("the value breakfast items");
        console.log(result.valueBreakfast);
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