let url = new URL(window.location.href); 
console.log(url);
let menuItem = url.searchParams.get("menuItem");
console.log(`the menu item to edit is ${menuItem}`);
let pageBody = document.querySelector("body");

function buildForm(foodData, foodImages){
    console.log("time to build a form");
    console.log("about to build an absolutely amazing form");
    let formHolder = document.createElement("section");
    formHolder.innerHTML = `
    <h2>Edit the ${foodData.food_name}!</h2>
    <form action="#">
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
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dessert">Dessert</option>
            <option value="side">Side</option>
            <option value="dinner">Dinner</option>
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
    <input type="submit" value="Update" id="food_edit_submit">
    </form>`;
    pageBody.appendChild(formHolder);

    // Populate image dropdown from directory listing
    let foodImageSelector = document.querySelector("#foodImage");
    for(let i = 0; i < foodImages.length; i++){
        let imageSelection = document.createElement("option");
        imageSelection.value = foodImages[i];
        imageSelection.innerText = foodImages[i];
        foodImageSelector.appendChild(imageSelection);
    }

    // Set all form fields to current food values
    let nameField = document.querySelector("#foodName");
    nameField.value = foodData.food_name;
    let priceField = document.querySelector("#foodPrice");
    priceField.value = foodData.price;
    let caloriesField = document.querySelector("#foodCalories");
    caloriesField.value = foodData.calories;
    let catField = document.querySelector("#foodCat");
    catField.value = foodData.food_cat;
    let descriptionField = document.querySelector("#foodDesc");
    descriptionField.value = foodData.desc;
    let comboField = document.querySelector("#isCombo");
    comboField.checked = foodData.is_combo == 1;
    let comboPriceField = document.querySelector("#comboPrice");
    comboPriceField.value = foodData.combo_price;
    let quantityField = document.querySelector("#foodQuantity");
    quantityField.value = foodData.food_quantity;
    // Set the image dropdown to the current image
    foodImageSelector.value = foodData.food_image;

    let foodSubmit = document.querySelector("#food_edit_submit");
    console.log(foodSubmit);
    foodSubmit.addEventListener("click", (e)=>{
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
        updateFood(foodData.food_id, foodName, foodPrice, foodCalories, foodCat, foodDesc, isCombo, comboPrice, foodQuantity, foodImage);
    });
}

async function getItem(item) {
    const url = "./get_food_api.php";
    let jsonData = JSON.stringify({food_id: item});
    console.log(jsonData);
    try {
        const response = await fetch(url,{
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
        console.log(result[0]);
        // Got food data, now get the image listing
        getImagesListing(result[0]);
    } catch (error) {
        console.error(error.message);
    }
}

async function getImagesListing(foodData) {
    const url = "./directoryListing.php";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        // Now we have both — build the form
        buildForm(foodData, result);
    } catch (error) {
        console.error(error.message);
    }
}

async function updateFood(foodId, foodName, foodPrice, foodCalories, foodCat, foodDesc, isCombo, comboPrice, foodQuantity, foodImage) {
    const url = "./update_food_api.php";
    console.log("about to update the food item");
    let jsonData = JSON.stringify({
        food_id:       foodId,
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
        window.location.href = "index.html";
    } catch (error) {
        console.error(error.message);
    }
}

getItem(menuItem);