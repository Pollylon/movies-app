import React from "react";
import UnSaveIcon from './icon-componat/bookmark (1).png'
import SaveIcon from './icon-componat/bookmark.png'
import stareIcon from './icon-componat/star.png'
import mune from './icon-componat/right.png'
import unMune from './icon-componat/bars.png'





function App() {

 
const [movieApi, setMovieApi] = React.useState([])
//// toggle-save state
// const [toggleSave, setToggleSave] =React.useState(false)
/// set save ids in state
const [wacthList,setWacthList] = React.useState([])


 
function toggleFunction(movies){
  if(movieApi.includes(movies.id)){
    setWacthList(pre => pre.filter(id => id !== movies.id))
  }
  else{
    setWacthList([... wacthList , movies.id ])

  }
}



React.useEffect(()=>{
 const url ="https://api.themoviedb.org/3/movie/popular?api_key=f02e37370e9e12fb65249dbf6db833fb&page=1"
  fetch(url)
  .then(res=> res.json())
  .then(data => setMovieApi(data.results))

},[])
console.log(movieApi)

  return (
    <div className="App">
      {movieApi.map((movies)=>(
        <div className="card" key={movies.id}>
           <h2 className="title">{movies.title}</h2>


           <div className="vote-div">
             <img  className="vote-img"
                 src={stareIcon}
                   alt="star"
                   
                   />
       <b className="vote-number">
          {movies.vote_average}
             </b>
              </div>
               
               <div className="saves">

                <img  className="save-icon"
                src={wacthList.includes(movies.id)? SaveIcon: UnSaveIcon}
                   alt="save icon"
                     onClick={() => toggleFunction(movies)}
                 />
</div>

             <img src={movies.poster_path
                     ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                     : "https://via.placeholder.com"}
                       alt={movies.title}
                     />
</div>

      ))}
    </div>
  );
}

export default App;
