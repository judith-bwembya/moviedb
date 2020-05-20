import React, {useState} from "react";
import MovieCard from './MovieCard';

export default function SearchMovies(){
   
    //states- input query, movies
    const [query, setQuery] = useState('');

    const [movies, setMovies] =useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();

        //tmdb api
        const url = `https://api.themoviedb.org/3/search/movie?api_key=7b2e82b5b17f750111b91576ab2a5275&language=en-US&query=${query}&page=1&include_adult=false`;
    
        try{
            const res = await fetch(url)
            const data = await res.json();
            console.log(data.results);
            setMovies(data.results) //tracks which movies are displayed when searched.
        }catch(err){
            console.error(err); //handles errors
        }
        
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                  <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>    
        </>
    )
}