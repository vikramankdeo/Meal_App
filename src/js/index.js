

//Storing an object in local storage so that it will keep the object data in memory even after page is refreshed or browser is closed
document.addEventListener('DOMContentLoaded', function() {
    const storedObject = JSON.parse(localStorage.getItem('favourite_prod'));
    if (storedObject) {
        favourite_prod = storedObject;
    }
    });

window.addEventListener('storage', function (e) {
    const storedObject = JSON.parse(localStorage.getItem('favourite_prod'));
    if (storedObject) {
        favourite_prod = storedObject;
    }
});
    

var searchTerms = [];  
var products = [];
var flag = 1;
var favourite_prod = {}; // this is obejct storing favourite meal data in Object form accessed using "strId" of a meal as key
const searchBox = document.getElementById("searchBox");
const suggestionsList = document.getElementById("suggestionsList");
var button_click = document.getElementById("m_search");
// Get a reference to the "Favourite Meal" Button
const openButton = document.getElementById('openButton');

// Add a click event listener to the "Favourite Meal" Button
// Open page "favourites.html" in new tab
openButton.addEventListener('click', function () {
    // Navigate to a new page within the same window
    window.open('public/favourites.html',"blank"); // Replace with the URL of the page you want to open
});





// when enter key is pressed and someting is entere is will listen the "ENTER" key press
// Add an event listener to the input field
searchBox.addEventListener('keydown', function (event) {
    // Check if the pressed key is the Enter key (key code 13)
    if (event.keyCode === 13) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Programmatically click the button
        button_click.click();
    }
});

// show suggestion when user input something
searchBox.addEventListener("input", preupdatesuggestions);
//show suggestion when user focus back to search box
searchBox.addEventListener("focus", preupdatesuggestions);




// user can select meal from seuugestion but if he manually want to type something and search using search button use this
// Take the meal name input from search box when search button is clicked
button_click.addEventListener("click",function(){
    if(searchBox.value.trim().length == 0){
        alert("please input something to search");
    }
    else {
        updateProductmain();
    }

});
 
// call a function when item is selected from suggestion list
suggestionsList.addEventListener("change", handleOptionSelect);





// when user search meal by presseing search button this function is called
// this function will show only those resu;ts which are prefixed with the searched meal entered in input search box.
function updateProductmain() {
    document.getElementById("prod_main").innerHTML = "";
    const prefix = searchBox.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    const filteredSuggestions = searchTerms.filter(term => term.toLowerCase().startsWith(prefix));
    filteredSuggestions.sort();
    console.log("called length is"+filteredSuggestions.length);
    if (filteredSuggestions.length === 0){
        document.getElementById("prod_main").innerHTML = "<h1>Oops No Result Found! Please Try Something else</h1>";
    }
    else {
    for (let x of filteredSuggestions){
        console.log(x);
        console.log("caaaa");
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
        .then(function(res){
            return res.json();
        }).then(function(categories){
            //by clicking on suggestion list of meal currently there is only one meal that is why we are giving
            //categories.meals[0] instead we can use loop through all availaible results and do it as well
            // we have implemented loop throgh availaible results when search button is clicked
            //flag = 0;
            LoadProduct(categories.meals[0]);
         });
    }
}
}





















//when user click on options from suggestion list this function will get called
// will take the "event" as parameter and get the selected option value thorugh "event" object
function handleOptionSelect(event) {
        // Get the selected option value
        const selectedOption = event.target.value;
        // Call your function here with the selected option
        showSelectedMeal(selectedOption);
}


// to show the meal seleceted through suggestion box
// this function will show only one selected meal
function showSelectedMeal(selectedOption) {
    // Your function code her
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedOption}`)
    .then(function(res){
        return res.json();
    }).then(function(categories){
        //by clicking on suggestion list of meal currently there is only one meal that is why we are giving
        //categories.meals[0] instead we can use loop through all availaible results and do it as well
        // we have implemented loop throgh availaible results when search button is clicked
        flag = 0;
        console.log(categories.meals[0]);
            document.getElementById("prod_main").innerHTML = "";
            LoadProduct(categories.meals[0]);
        });
    
}





// to show suggestion based on input on search box
function preupdatesuggestions(){
    
    if(searchBox.value.trim().length == 0){
        suggestionsList.innerHTML = "";
    }
    else {
        console.log("length is "+  searchBox.value.trim().length);
        updateSuggestions();
        
    }
    
}



// to show suggestion based on input on search box
function updateSuggestions() {
    suggestionsList.innerHTML = "";
    const prefix = searchBox.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    const filteredSuggestions = searchTerms.filter(term => term.toLowerCase().startsWith(prefix));
    filteredSuggestions.sort()
    //suggestionsList.innerHTML = "";
    for (let x of filteredSuggestions){
        const li = document.createElement("option");
        li.text = x.toUpperCase();
        li.value = x;
        li.addEventListener("click", function() {
        searchBox.value = x;
        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";
        });
        li.addEventListener("click" , handleOptionSelect);
        suggestionsList.appendChild(li);
        }

    if (filteredSuggestions.length > 0) {
        suggestionsList.style.display = "block";
    } else {
        suggestionsList.style.display = "none";
    }
    }

//function to load all the product required to show in the homepage
//due to API limitation i have to load all the products in the first go
/*in search box when we search for "abc" so it should show suggestion related to "abc" but in "MEAL APP API" when
we search we will not get all related results starting from the same prefix from which we searched so i have used like this for now */
async function loadcateg(){
    for (let charCode = 97; charCode <= 122; charCode++) {
        const letter = String.fromCharCode(charCode).toLowerCase();
               await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                .then(function(res){
                    return res.json();
                }).then(function(categories){
                    let c_data = categories.meals;
                    let i = 0;
                    if (c_data != null){
                    while (i < c_data.length) {
                        let x = c_data[i];
                        searchTerms.push(x.strMeal);
                        products.push(x);
                        i++;
                        if (flag === 1){
                            LoadProduct(x);
                        }
                        else {
                            break;
                        }
                        
                    }
                
                }
                }
                )

                if (flag === 0){
                    break;
                    
                        }
    }
    return 1;
}

// takes object "x" as parameter and create then append content on the main for that object
function LoadProduct(x){
        let div_m =  document.createElement("div");
        div_m.className = "card m-2 p-2";
        div_m.style.width = "350px";
        
        div_m.innerHTML = 
        
        `
        <a href = "public/product_detail.html?param1=${x.idMeal}" target = "_blank">
        <img src = ${x.strMealThumb} height = "200" class = "card-img-top">
        <div class = "card-header" style = "height:60px">
            <p>${x.strMeal}</p>
        </div>
        <div class = "card-body">
            <dl>
                <dt>Category</dt>
                <dd>${x.strCategory}</dd>
                <dt>Area</dt>
                <dd>${x.strArea}</dd>
            </dl>
        </div>
    </a>
        <div class = "card-footer">
        <button class = "btn btn-danger w-100" onclick = "Add_to_favourite('${x.idMeal}')">Add to Cart</button>
        </div>
        
        `;
        document.getElementById("prod_main").appendChild(div_m);
}




// when someone clicks anywhere on body except the input search box this function will get called to hide
// the dropdown or suggestion related to input value
function hidedropdown(){
    document.addEventListener("click", function(event) {
        if (event.target !== searchBox) {
            suggestionsList.style.display = "none";
        }
    });
}













// This function will get called when user click on "Add to Favourite" Button proivded on card
function Add_to_favourite(ell){
    alert("Yooohooo Meal Added as Favourite");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ell}`)
    .then(function(res)
    {
        return res.json()
    }).then(function(data){
        console.log(Object.keys(favourite_prod).length);
        if (!(ell in favourite_prod)){
            favourite_prod[ell] = data;
            

            localStorage.setItem("favourite_prod", JSON.stringify(favourite_prod));
            console.log("added once");
        }
    }
    )
    

}





/** on body load this function will get called **/
function bodyload(){
loadcateg();
    
}       
