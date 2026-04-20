let pageBody = document.querySelector("body");

function buildMenu(foodData) {
    let foodList = document.querySelector("#foodList");
    for (let i = 0; i < foodData.length; i++) {
        console.log(foodData[i]);
        let foodItem = document.createElement("li");
        foodItem.innerText = `${foodData[i].food_name} - ${foodData[i].price} - ${foodData[i].calories} - ${foodData[i].food_cat} - ${foodData[i].desc} - ${foodData[i].is_combo} - ${foodData[i].combo_price} - ${foodData[i].food_quantity}`;

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        foodItem.appendChild(delBtn);
        delBtn.addEventListener("click", function () {
            delId = foodData[i].food_id;
            console.log(`time to delete ${delId}!!`);
            delItem(delId);
        });

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        foodItem.appendChild(editBtn);
        editBtn.addEventListener("click", function() {
            editId = foodData[i].food_id;
            console.log(`time to edit ${editId}`);
            window.location.href = `product_edit.html?menuItem=${editId}`;
        });
        foodList.appendChild(foodItem);
    }
    
    pageBody.appendChild(foodList);
}

function buildTitle() {
    let titleEl = document.createElement("h1");
    titleEl.innerText = "Welcome to Blorgs Fine Cuisine";
    let subTitleEl = document.createElement("h2");
    subTitleEl.innerText = "Our Secret is Edible Food!";
    let titleHolder = document.createElement("header");
    titleHolder.appendChild(titleEl);
    titleHolder.appendChild(subTitleEl);
    pageBody.appendChild(titleHolder);
}

function buildFoodHolder() {
    let foodList = document.createElement("ul");
    foodList.id = "foodList";
    pageBody.appendChild(foodList);
    getData();
}

function clearFoodList() {
    document.querySelector("#foodList").innerHTML = "";
}

function buildForm(foodImages) {
    console.log("about to build an absolutely amazing form");
    let formHolder = document.createElement("section");
    formHolder.innerHTML = `
    <h2>Add More Food!</h2>
    <form action="#" id="foodForm">
        <fieldset>
            <label for="foodName">Food Name</label>
            <input type="text" name="foodName" id="foodName">
        </fieldset>
        <fieldset>
            <label for="foodPrice">Food Price</label>
            <input type="text" name="foodPrice" id="foodPrice">
        </fieldset>
        <fieldset>
            <label for="foodCalories">Food Calories</label>
            <input type="text" name="foodCalories" id="foodCalories">
        </fieldset>
        <fieldset>
            <label for="foodCat">Food Category</label>
            <select name="foodCat" id="foodCat">
                <option value="">-- Select Category --</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Sides">Sides</option>
            </select>
        </fieldset>
        <fieldset>
            <label for="foodDesc">Description</label>
            <input type="text" name="foodDesc" id="foodDesc">
        </fieldset>
        <fieldset>
            <label for="isCombo">Is Combo?</label>
            <input type="checkbox" name="isCombo" id="isCombo">
        </fieldset>
        <fieldset>
            <label for="comboPrice">Combo Price</label>
            <input type="text" name="comboPrice" id="comboPrice">
        </fieldset>
        <fieldset>
            <label for="foodQuantity">Food Quantity</label>
            <input type="number" name="foodQuantity" id="foodQuantity">
        </fieldset>
        <fieldset>
            <label for="foodImage">Food Image</label>
            <select name="foodImage" id="foodImage">
                <option value="">No Image Selected</option>
            </select>
        </fieldset>
        <input type="submit" value="Submit" id="food_submit">
    </form>`;
    pageBody.appendChild(formHolder);

    // Populate image dropdown from directory listing
    let foodImageSelector = document.querySelector("#foodImage");
    for(let i = 0; i < foodImages.length; i++){
        console.log(foodImages[i]);
        let imageSelection = document.createElement("option");
        imageSelection.value = foodImages[i];
        imageSelection.innerText = foodImages[i];
        foodImageSelector.appendChild(imageSelection);
    }

    let foodSubmit = document.querySelector("#food_submit");
    foodSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        let foodName     = document.querySelector("#foodName").value;
        let foodPrice    = document.querySelector("#foodPrice").value;
        let foodCalories = document.querySelector("#foodCalories").value;
        let foodCat      = document.querySelector("#foodCat").value;
        let foodDesc     = document.querySelector("#foodDesc").value;
        let isCombo      = document.querySelector("#isCombo").checked ? 1 : 0;
        let comboPrice   = document.querySelector("#comboPrice").value;
        let foodQuantity = document.querySelector("#foodQuantity").value;
        let foodImage    = document.querySelector("#foodImage").value;
        console.log(`${foodName} ${foodPrice} ${foodCalories} ${foodCat} ${foodDesc} ${isCombo} ${comboPrice} ${foodQuantity} ${foodImage}`);
        addFood(foodName, foodPrice, foodCalories, foodCat, foodDesc, isCombo, comboPrice, foodQuantity, foodImage);
    });
}

async function getData() {
    const url = "./foods_api.php";
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

async function delItem(item) {
    const url = "./remove_food_api.php";
    let jsonData = JSON.stringify({ food_id: item });
    console.log(jsonData);
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
        clearFoodList();
        getData();
    } catch (error) {
        console.error(error.message);
    }
}

async function addFood(foodName, foodPrice, foodCalories, foodCat, foodDesc, isCombo, comboPrice, foodQuantity, foodImage) {
    const url = "./add_food_api.php";
    console.log("about to add the liver chunks of doom?");
    console.log(`${foodName} ${foodPrice} ${foodCalories} ${foodCat} ${foodDesc} ${isCombo} ${comboPrice} ${foodQuantity} ${foodImage}`);
    let jsonData = JSON.stringify({
        food_name:     foodName,
        price:         foodPrice,
        calories:      foodCalories,
        food_cat:      foodCat,
        desc:          foodDesc,
        is_combo:      isCombo,
        combo_price:   comboPrice,
        food_quantity: foodQuantity,
        food_image:    foodImage
    });
    console.log(jsonData);
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
        clearFoodList();
        getData();
    } catch (error) {
        console.error(error.message);
    }
}

async function getImagesListing() {
    const url = "./directoryListing.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        buildForm(result);
    } catch (error) {
        console.error(error.message);
    }
}

function init() {
    buildTitle();
    getImagesListing();
    buildFoodHolder();
}

init();