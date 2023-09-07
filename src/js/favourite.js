document.addEventListener('DOMContentLoaded', function () {
    const storedObject = JSON.parse(localStorage.getItem('favourite_prod'));
    if (storedObject) {
        favourite_prod = storedObject;
    }
});

var searchTerms = [];
var products = [];
var favourite_prod = {};

function Remove_from_favourite(ell) {
    if (ell in favourite_prod) {
        delete favourite_prod[ell];
        localStorage.setItem('favourite_prod', JSON.stringify(favourite_prod));
        console.log("deleted once");
        loadFavourite();
    }
}

function loadFavourite() {
    document.getElementById("favourites").innerHTML = "";
    let div_h = document.createElement("h2");
    console.log(favourite_prod);
    const keysArray = Object.keys(favourite_prod);
    // Calculate the length by getting the length of the keysArray
    const objectLength = keysArray.length;
    if (objectLength === 0) {
        div_h.innerText = "Sorry! No item in your favourite List";
        div_h.style.marginBottom = "20px";
        div_h.style = "color: skyblue; margin-top: 30vh; margin-left: 20vw;";
        document.getElementById("favourites").appendChild(div_h);
    } else {
        div_h.innerText = "Your Favourite Selections";
        div_h.style.marginBottom = "20px";
        document.getElementById("favourites").appendChild(div_h);
        for (let y in favourite_prod) {
            x = favourite_prod[y].meals[0];
            let div_m = document.createElement("div");
            div_m.className = "m-2 p-2 d-flex flex-row justify-content-start";
            div_m.style.width = "95%";
            div_m.innerHTML =
                `
                <div>
                    <img src = ${x.strMealThumb} height = "150" style = "width:150px;">
                </div>
                <div class = "d-flex flex-row w-100 justify-content-start">
                    <div style = "width: 50%; margin-left: 10px">
                        <p id="fp_name"><span>${x.strMeal}</span></p>
                        <p id="fp_category">Category: <span>${x.strCategory}</span></p>
                        <p id="fp_value">Area: <span>${x.strArea}</span></p>
                    </div>
                    <div>
                        <button class = "btn btn-danger w-100" onclick = "Remove_from_favourite('${x.idMeal}')">REMOVE</button>
                    </div>
                </div>
            `;
            document.getElementById("favourites").appendChild(div_m);
        }
    }
}

function bodyload() {
    loadFavourite();
}