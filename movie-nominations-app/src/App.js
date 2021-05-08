import React, { useState, useEffect } from 'react';
import './dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [on, displayBanner] = React.useState(false);
  var ban = document.getElementById("ban");
  var nomHeading = document.getElementById("nomHeading");

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=51ed59f0`

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    if(favourites.length==0) {
      nomHeading.classList.add("on");
    }
    if(!favourites.includes(movie)) {
      if(favourites.length < 4) {
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        return null;
      }
      else if(favourites.length == 4){
        const newFavouriteList = [...favourites, movie];
        setFavourites(newFavouriteList);
        ban.classList.add("on");
        displayBanner(!on);
      }
      
    }
    
  }

  const removeFavouriteMovie = (movie) => {
    if(favourites.length==1) {
      nomHeading.classList.remove("on");
    }
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    if(ban.classList.contains("on")) {
      ban.classList.remove("on");
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);

  }, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center header'>
        <MovieListHeading heading='The Shoppies'/>
        <SearchBox searchValue = {searchValue} setSearchValue={setSearchValue}/>
      </div>
			<div className='row movieSelect'>
				<MovieList 
        movies={movies} 
        favouriteComponent={AddFavourites} 
        handleFavouritesClick={addFavouriteMovie}/>
			</div>

      <div className={on ? 'on' : null} className='banner' id='ban'>
        <h5>You have reached 5 Nominations</h5>
      </div>
      
      <div className='row d-flex align-items-center' id= 'nomHeading'>
        <MovieListHeading heading='Your Nominations'/>
      </div>
      <div className='row nominationsList'>
        <MovieList 
        movies={favourites} 
        handleFavouritesClick={removeFavouriteMovie}
        favouriteComponent={RemoveFavourites} />
      </div>

		</div>
	);
};

export default App;