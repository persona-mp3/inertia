"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchForm = document.querySelector('.search-form');
const inputEls = document.querySelector('.search-input');
const placeholder = document.querySelector('.placeholder');
const apiKey = '';
function formDataConversion(form) {
    // FormData class has readonly properties, making query assigned to any
    const formData = new FormData(form);
    const query = Object.fromEntries(formData);
    // return user search
    return query;
}
function fetchSearch(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = query.search;
        // the movidedb 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer your-generated-token'
            }
        };
        // initiate fetch call
        try {
            const res = yield fetch(url, options);
            if (!res.ok) {
                return alert('Netwoek err occured');
            }
            const data = yield res.json();
            if (data.results.length === 0 && !Array.isArray(data.results)) {
                return console.log('No movies found or error');
            }
            const movies = data.results;
            movies.forEach((movie) => {
                console.log(movie.title, movie.release_date, movie.overview, typeof movie.vote_average);
                // if movie.overview is null/empty assign error message
                const container = document.createElement('div');
                // for the rating and date styling
                const container02 = document.createElement('div');
                const title = document.createElement('h2');
                const overview = document.createElement('p');
                const releaseDate = document.createElement('p');
                const vote_avg = document.createElement('p');
                container.classList.add('render');
                title.classList.add('render-title');
                overview.classList.add('render-overview');
                title.innerText = `${movie.title}`;
                if (movie.overview === "") {
                    overview.innerText = `Hmmm, it appears we don't have anything much on this`;
                }
                else {
                    overview.innerText = `${movie.overview}`;
                }
                releaseDate.innerText = `Release: ${movie.release_date}`;
                vote_avg.innerText = `Ratings: ${movie.vote_average}`;
                container.appendChild(title);
                container.appendChild(overview);
                container02.appendChild(releaseDate);
                container02.appendChild(vote_avg);
                container.appendChild(container02);
                placeholder === null || placeholder === void 0 ? void 0 : placeholder.appendChild(container);
                // placeholder?.appendChild(releaseDate);
                // placeholder?.appendChild(overview);
                // placeholder?.appendChild(vote_avg);
            });
        }
        catch (err) {
            // use catch to handle reject
            console.error(err);
        }
    });
}
searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (inputEls.value === '') {
        e.preventDefault();
        return console.log('empty search');
    }
    const query = formDataConversion(searchForm);
    fetchSearch(query);
    console.log(query);
}));
