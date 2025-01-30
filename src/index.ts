const searchForm: HTMLFormElement | null = document.querySelector('.search-form');
const inputEls = document.querySelector('.search-input') as HTMLInputElement;
const placeholder: HTMLDivElement| null = document.querySelector('.placeholder')


// object interface for the returned query
interface QueryObj {
  search: String,
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average:string;
  vote_count: string;
}

const apiKey: string = '';



function formDataConversion(form: HTMLFormElement) :QueryObj{
  // FormData class has readonly properties, making query assigned to any
  const formData: any = new FormData(form);
  const query: any = Object.fromEntries(formData);
  // return user search
  return query
}

async function fetchSearch(query: QueryObj ){
  const search = query.search;
  // the movidedb 
  const url: any = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;

  const options: object = {
    method : 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer your-generated-token'
    }
  }
  
  // initiate fetch call
  try {
    const res = await fetch(url, options);
    if (!res.ok){
      return alert('Netwoek err occured');
    }


    const data: any = await res.json();

    if (data.results.length === 0 && ! Array.isArray(data.results)) {
      return console.log('No movies found or error');
    }
    
    const movies: Movie[] = data.results;
    movies.forEach((movie: Movie) => {
      console.log(movie.title, movie.release_date,  movie.overview, typeof movie.vote_average);

      // if movie.overview is null/empty assign error message

      const container: HTMLDivElement = document.createElement('div');
      // for the rating and date styling
      const container02: HTMLDivElement = document.createElement('div');
      const title: HTMLHeadingElement = document.createElement('h2')
      const overview: HTMLParagraphElement = document.createElement('p');
      const releaseDate: HTMLParagraphElement = document.createElement('p');
      const vote_avg: HTMLParagraphElement | number |string = document.createElement('p');
      
      container.classList.add('render');
      title.classList.add('render-title')
      overview.classList.add('render-overview');


      title.innerText =`${movie.title}`;
      
      if (movie.overview === ""){
        overview.innerText = `Hmmm, it appears we don't have anything much on this`
      }else{

        overview.innerText =`${movie.overview}`
      }
      releaseDate.innerText = `Release: ${movie.release_date}`;
      vote_avg.innerText = `Ratings: ${movie.vote_average}`;

      container.appendChild(title);
      container.appendChild(overview)
      container02.appendChild(releaseDate);
      container02.appendChild(vote_avg);
      container.appendChild(container02);


      placeholder?.appendChild(container);
      // placeholder?.appendChild(releaseDate);
      // placeholder?.appendChild(overview);
      // placeholder?.appendChild(vote_avg);

    })



  } catch (err) {
    // use catch to handle reject
    console.error(err)
  }
  
}

searchForm?.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  if (inputEls.value === ''){
    e.preventDefault()
    return console.log('empty search')
  }

  const query = formDataConversion(searchForm);
  fetchSearch(query)
  console.log(query)
})