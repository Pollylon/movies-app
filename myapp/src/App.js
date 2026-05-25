import React from "react";
import UnSaveIcon from './src/bookmark (1).png'
import SaveIcon from './src/bookmark.png'
import stareIcon from './src/star.png'
import mune from './src/right.png'
import unMune from './src/bars.png'





function App() {

 
const [movieApi, setMovieApi] = React.useState([])
/// SET SEARCH IN STATE
const [search,setSearch] = React.useState(null)
/// set save ids in state
const [watchList,setWatchList] = React.useState([])

/// toggle function
const [menutoggle, setmenutoggle]= React.useState(false)

//// is card open 
const [selectMovie , setSelectMovie] = React.useState(null )
///// type 
const [ type, setType ] = React.useState('tv')
//// page number 
const [ page , setpage] = React.useState(1)

React.useEffect(()=>{
  const save =JSON.parse (localStorage.getItem('save')) || []
  setWatchList(save)
},[]
  )
 
function toggleFunction(movies){
  let up;  
  const exists = watchList.some(item => item.id ===movies.id)
  if(exists){
   up = watchList.filter(id => id.id !== movies.id)
  }
  else{
    up=[...watchList, movies]
  }
  setWatchList(up)
  localStorage.setItem('save' , JSON.stringify(up))
}


// search by name
function searchFunction(e, search){
e.preventDefault()
const formda = new FormData(e.target)
const searchValue = formda.get('search-bar')
setSearch(searchValue)
}
 const arr = ['tv', 'movie']
React.useEffect(()=>{
  const url = (() => {

    if (search) {
      return `https://api.themoviedb.org/3/search/movie?api_key=f02e37370e9e12fb65249dbf6db833fb&query=${encodeURIComponent(search)}`;
    
     } else if (menutoggle) {
  
       return `https://api.themoviedb.org/3/search/multi?api_key=f02e37370e9e12fb65249dbf6db833fb&page=${page}`;
  
    } else {
  
      return `https://api.themoviedb.org/3/${type}/popular?api_key=f02e37370e9e12fb65249dbf6db833fb&page=${page}`;
    
    }
  
  })();
  
  fetch(url)
  .then(res=> res.json())
  .then(data => setMovieApi(pre => page ===1 ? data.results : [...pre,...data.results]))
  
},[search ,type ,page])
console.log(movieApi)





// 
function handlPapular(papular){
  setSearch(papular )
  setpage(1)

}

  return (
    <div className="App">

      <header className="header">
    
        <form className="input-form" onSubmit={searchFunction} >
          <input type="search" name="search-bar" placeholder="PAPULAR MOVIES"></input>


          {movieApi.slice(0,6).map(any => (
            <button  className="papular-search"
            onClick={()=> handlPapular(any.title|| any.name)}
            >{any.title||any.name}</button> ))}

</form>
<div className="choise">
      <button className="tv" onClick={()=> {setType('tv') ;setpage(1)}}>TV</button>
      <button className="movie" onClick={()=> {setType('movie'); setpage(1)}}>MOVIES</button>

    </div>
         <span className="menu-whacthlist">
            <img 
               className="menu-icon"
                 src={menutoggle ? mune : unMune}
                   alt="menu icon"
                     onClick={() => setmenutoggle(pri => !pri) }
        />
 </span>
</header>





   {menutoggle ? (
     !selectMovie ? (
       <div>
         {watchList.map(movies => (
           <div className="card" key={movies.id} >
             <a className="title"onClick={() => setSelectMovie(movies)}>{movies.title || movies.name}</a>
             <div className="vote-div">
               <img className="vote-img" src={stareIcon} alt="star" />
               <b className="vote-number">{movies.vote_average}</b>
             </div>

             <div className="saves">
               <img className="save-icon" src={watchList.some(item => item.id === movies.id)? SaveIcon : UnSaveIcon} alt="save icon" onClick={() => toggleFunction(movies)} />
             </div>

             <img onClick={() => setSelectMovie(movies)} src={movies.poster_path ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}` : "https://via.placeholder.com"} alt={movies.title} />
           </div>
         ))}
       </div>
     ) : (
       <div className="card-clicked">
         <div className="card-open" key={selectMovie.id}>
           <h2 className="title-open">{selectMovie.title || selectMovie.name}</h2>

           <div className="vote-div-open">
             <img className="vote-img-open" src={stareIcon} alt="star" />
             <h2 className="vote-avg-open">{selectMovie.vote_average}</h2>
             <h3 className="vote-num-open">{selectMovie.vote_count}</h3>
           </div>

           <div className="saves-open">
             <img className="save-icon-open" src={watchList.includes(selectMovie.id) ? SaveIcon : UnSaveIcon} alt="save icon" onClick={() => toggleFunction(selectMovie)} />
           </div>

           <div className="detail-open">
             <h3 className="adult-open">age : {selectMovie.adult === true ? '18+' : 'any'}</h3>
             <h2 className="language-open">  {selectMovie.original_language === 'en' ? 'ENGLISH' : 'un diffing'}</h2>
             <date className='date-open'>    {selectMovie.release_date}</date>
             <p className="over-view-open">   {selectMovie.overview}</p>
           </div>
           <img className="img-open" src={selectMovie.poster_path ? `https://image.tmdb.org/t/p/w500/${selectMovie.poster_path}` : "https://via.placeholder.com"} alt={selectMovie.title} />
         </div>
       </div>
     )
   ) : ( 
    
    !selectMovie ? (
    <div className="movie-container">
      {movieApi.map(movies  => (
        <div className="card" key={movies.id}>
          <h2 className="title" onClick={() => setSelectMovie(movies)}>{movies.title|| movies.name}</h2>

          <div className="vote-div">
            <img className="vote-img" src={stareIcon} alt="star" />
            <b className="vote-number">{movies.vote_average}</b>
          </div>

          <div className="saves">
            <img className="save-icon" src={watchList.some(item => item.id === movies.id) ? SaveIcon : UnSaveIcon} alt="save icon" onClick={() => toggleFunction(movies)} />
          </div>

          <img onClick={() => setSelectMovie(movies)} src={movies.poster_path ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}` : "https://via.placeholder.com"} alt={movies.title} />
        </div>
      ))}
    </div>
  ) : (
    <div className="card-clicked">
      <div className="card-open" key={selectMovie.id}>
        <h2 className="title-open">{selectMovie.title||selectMovie.name}</h2>

        <div className="vote-div-open">
          <img className="vote-img-open" src={stareIcon} alt="star" />
          <h2 className="vote-avg-open">{selectMovie.vote_average}</h2>
          <h3 className="vote-num-open">{selectMovie.vote_count}</h3>
        </div>

        <div className="saves-open">
          <img className="save-icon-open" src={watchList.some(item => item.id === selectMovie.id) ? SaveIcon : UnSaveIcon} alt="save icon" onClick={() => toggleFunction(selectMovie)} />
        </div>

        <div className="detail-open">
          <h3 className="adult-open">age {selectMovie.adult === true ? '18+' : 'any'}</h3>
          <h2 className="language-open">{selectMovie.original_language === 'en' ? 'ENGLISH' : 'un diffing'}</h2>
          <date className='date-open'>{selectMovie.release_date}</date>
          <p className="over-view-open">{selectMovie.overview}</p>
        </div>
        <img className="img-open" src={selectMovie.poster_path ? `https://image.tmdb.org/t/p/w500/${selectMovie.poster_path}` : "https://via.placeholder.com"} alt={selectMovie.title} />
      </div>
      <button className="back" onClick={()=> setSelectMovie("")}>BACK</button>
    </div>
  )
  )}

  <button className="next-page" onClick={()=>setpage(pre => pre +1)}   >next-page</button>
    </div>
  );
}

export default App;
