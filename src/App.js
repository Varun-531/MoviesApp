import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import MovieCard from "./MovieCard";
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=4848f1fb";
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(search);
  }, []);

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for Movies"
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
        <button onClick={()=>searchMovies(search)}>Search</button>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
         {movies.map((movie)=>{
           return <MovieCard key={movie.imdbID} movie={movie}/>
         })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies</h2>
        </div>
      )}
    </div>
  );
}

export default App;
