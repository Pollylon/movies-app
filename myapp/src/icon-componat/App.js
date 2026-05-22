import React from 'react';
import star from './star.png';
import save from './bookmark.png';
import unsave from './bookmark (1).png';
import menu from './bars.png';
import back from './right.png';

function App() {
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [savedIds, setSavedIds] = React.useState([]);
  const [showSaved, setShowSaved] = React.useState(false);
  const [page , setpage] = React.useState(1)
const [search , setsearch] = React.useState('')
const [watchlist , setwatchlist] =React.useState(false)
const [type, settype] = React.useState('movie')

const list = ['watch later' ,"Favorites" ]


// save id in storge 
 
React.useEffect(()=>{
  const store = JSON.parse(localStorage.getItem('savd')) || []
  setSavedIds(store)
  
  },[])


  // get movie
  React.useEffect(() => {
   const  url = search  ? `https://api.themoviedb.org/3/search/movie?api_key=f02e37370e9e12fb65249dbf6db833fb&query=${search}&page=${page}` : 
    `https://api.themoviedb.org/3/${type}/popular?api_key=f02e37370e9e12fb65249dbf6db833fb&&page=${page}` 

    fetch(url)
      .then(res => res.json())
      .then(data => setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]));
  }, [page,search,type]);
console.log(movies)
  //  toggle fu
  function toggleSave(movie) {

let up; 
    if (savedIds.includes(movie.id)) {
    up= savedIds.filter(id => id !== movie.id); 
    } else {
      up = [...savedIds, movie.id];
    }

    setSavedIds(up)
    localStorage.setItem('savd' , JSON.stringify(up))
  }

  // 🔥 الأفلام المحفوظة (بدون API إضافي
   const savedMovies = movies.filter(m => savedIds.includes(m.id));

  // 🔥 أي قائمة نعرض؟
  const listToShow = showSaved ? savedMovies : movies;

function searchfu(e){
  e.preventDefault();
const getdata = new FormData(e.target)
const input_value= getdata.get('movie-name')
setsearch(input_value)
setpage(1)
}

function handlpopulermovie(any){
setsearch(any)
setpage(1)
}


  return (
    <div className="App">
<form className='forms' onSubmit={searchfu}>
  
  
  <input className='input-bur'  placeholder='the boys ...'  name='movie-name'></input>
  {movies.slice(0,6).map((m) =>( <div className='populermove'onClick={()=>handlpopulermovie(m.title)} key={m.id}>{m.title}</div>))}
</form>
      {/* HEADER */}
      <header className='head'>
        <div className='header-mune'>
          <button onClick={()=> settype('tv')}>movies</button> <button onClick={()=> settype('movie')}>Tv series</button>
        </div>
        <h1>MOHAMED SARKEZ</h1>
        <img
          onClick={() => setShowSaved(s => !s)}
          className='icon'
          src={showSaved ? back : menu}
          alt="toggle"
        />  <h1> WATCH LIST</h1>
      </header>

      {/* LIST */}
      {!selectedMovie && (
        listToShow.length > 0 ? (
          listToShow.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMovie(m)}
              className="movie-card"
            >
              <h2 className='title'>{m.title || m.name}</h2>

              <div className="rating">
                <img
                  src={savedIds.includes(m.id) ? save : unsave}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(m);
                  }}
                  className='icon'
                  alt="save"
                
                /> 
                <img className="icon" src={star} alt="star" />
                <p>{m.vote_average}</p>
              </div>

              <img
                className='poster-opened'
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${m.poster_path}`
                    : "https://via.placeholder.com"
                }
                alt={m.title}
              />
            </div>
          ))
        ) : (
          <p style={{ padding: "20px" }}>
            {showSaved ? "No saved movies" : "Loading..."}
          </p>
        )
      )}

      {/* DETAIL */}
      {selectedMovie && (
        <div className="movie-detail">

          <img
            className="poster-opened"
            src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />

          <div>
            <h1>{selectedMovie.title}</h1>

            <div className="rating-opened">
              <img className="icon" src={star} alt="star" />
              <p>{selectedMovie.vote_average}</p>
            </div>

            <div className='more-thiges'>
              <h3>{selectedMovie.overview}</h3>
              <h3>DATE: {selectedMovie.release_date ||selectedMovie.first_air_date}</h3>
              <h3>VOTES: {selectedMovie.vote_count}</h3>
              <h3>ADULT: {selectedMovie.adult ? 'YES' : 'NO'}</h3>
            </div>

            <button
              onClick={() => setSelectedMovie(null)}
              className='btuttn'
            >
              Back
            </button>
          </div>

        </div>
      )}
      {!watchlist &&(<div>

        {list.map((lis)=> <button>{lis}</button>)}
      </div>)}
<button className='buttn' onClick={()=> setpage(pri => pri +1)} > NEXT PAGE</button>
    </div>
  );
}

export default App;