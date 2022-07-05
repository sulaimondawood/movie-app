const url = "https://yts.mx/api/v2/list_movies.json?quality=3D";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const row = document.querySelector(".row");
const over = document.querySelector(".over");
console.log(over);
const movieInfo = document.querySelector(".movie__info");
const header = document.querySelector(".header__container");
// console.log(header);

//OBSERVER
// function headerObs(entries, observer) {
// 	console.log(entries);
// 	const { entry } = entries;
// 	console.log(entry);
// }
// headerObs();
// const observe = new IntersectionObserver(headerObs, {
// 	root: null,
// 	threshold: 0.1,
// });

let movieData;
const getData = async function () {
	try {
		const res = await fetch(url);
		const dat = await res.json();
		console.log(dat);
		if (dat.status !== "ok") throw new Error(`${dat.status_message}`);
		const { data } = dat;
		console.log(dat.status_message);
		movieData = data.movies;
		displayData(movieData);
	} catch (err) {
		console.error(err);
	}
};
getData();
// console.log(movieData);

form.addEventListener("submit", function (e) {
	e.preventDefault();
});

input.addEventListener("keyup", function (e) {
	const value = e.target.value;
	const filterMovies = movieData.filter((filterMovie) => {
		if (value) {
			return filterMovie.title.toLowerCase().includes(value.toLowerCase());
		} else {
			window.location.reload();
		}
	});
	if (filterMovies.length <= 0) {
		// row.textContent = "Not Found";
		// window.location.reload();
		// console.log("Not Found");
	}
	console.log(filterMovies);
	displayData(filterMovies);
});

// function

function displayData(movieType) {
	const mapMovies = movieType
		.map((mapMovie) => {
			return `						<div class="col">
			<a onClick ="movieCompleted(${mapMovie.id})" class= "click"  href="#" target="_blank" rel="noopener noreferrer" ><img src="${mapMovie.large_cover_image}" alt="" /></a>
	
	<p class="title">${mapMovie.title}</p>
	<span class="date">${mapMovie.year}</span>
</div>`;
		})
		.join("");
	row.innerHTML = mapMovies;
}

function movieCompleted(id) {
	const item = sessionStorage.setItem("item", id);
	window.location = "movie_info.html";
	console.log(item);
}

async function displayMovie() {
	try {
		const itemData = sessionStorage.getItem("item");
		console.log(itemData);
		const res = await fetch(
			`https://yts.mx/api/v2/movie_details.json?movie_id=${itemData}`,
		);
		const dat = await res.json();
		console.log(dat);
		const { movie } = dat.data;
		console.log(movie);
		movieInfo.innerHTML = `	<div class="img">
						<img src="${movie.large_cover_image}" alt="" />
					</div>
					<div class="">
						<h1 class="movie__info__title">${movie.title}</h1>
						<p class="movie__info__year">${movie.year}</p>
						<p class="movie__info__type">${movie.genres[0]}/<span>${movie.genres[1]}/</span><span></span></p>
						<p class="movie__info__text">
						${movie.description_full}
						</p>
					</div>`;
	} catch (err) {
		console.log(err);
	}
}
