let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// fetch data from api 

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

// if input field is empty

    if(movieName <= ""){
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // if movie exist in database
            if(data.Response == "True"){
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK8HogfK3gn2v1RPLoJ92ig_S3z97mzZTfZVpcVqD-Iw&s">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="ryr">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                `;
            }

            // if movie doesn't exist in database
            else{
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })

        // if error occur
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`
        })
    }
};

searchBtn.addEventListener("click", getMovie);
// window.addEventListener("load", getMovie);