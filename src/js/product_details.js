let vid_id;

function GoToRecipe(){
    const openurl = vid_id;
    window.open(openurl,"_blank");
}

function extractVideoId(url) {
    // Check if the URL includes "watch?v="
    if (url.includes("watch?v=")) {
        // Split the URL by "watch?v=" to get the video ID
        const parts = url.split("watch?v=");
        if (parts.length === 2) {
            const videoId = parts[1];
            // You can further validate or manipulate the videoId if needed
            return videoId;
        }
    }
    // Return null if the URL format doesn't match
    return null;
}


function get_details(ell) {
    console.log("ele is s" + ell);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ell}`)
    .then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        let instr = document.getElementById("method");
        let meal_n = document.getElementById("meal_name");
        let div_d = document.querySelector("#meal_v img");
        let div_cat = document.getElementById("m_category");
        let div_a = document.getElementById("m_area");
        console.log(data.meals[0].strYoutube);
        vid_id = data.meals[0].strYoutube;
        //div_d.src = `https://www.youtube.com/embed/${vid_id}`;
        div_d.src = data.meals[0].strMealThumb;
        div_d.style.padding = "10px";
        instr.innerHTML = data.meals[0].strInstructions;
        meal_n.innerHTML = data.meals[0].strMeal;
        div_cat.innerHTML = data.meals[0].strCategory;
        div_a.innerHTML = data.meals[0].strArea;
    });
}

function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

const searchQuery = getQueryParam("param1");

function bodyload() {
    // document.getElementById("prod_det_main").innerHTML = "";
    //const searchQuery = getQueryParam("param1");
    console.log("query is " + searchQuery);
    get_details(searchQuery);
}