import React, { useState, useEffect } from 'react';
import './dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=51ed59f0`

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);

  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = {...favourites, movie};
    setFavourites(newFavouriteList);
  }

	return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue = {searchValue} setSearchValue={setSearchValue}/>
      </div>
			<div className='row'>
				<MovieList movies={movies} 
        handleFavouritesClick ={addFavouriteMovie} 
        favouriteComponent = {AddFavourite}/>
			</div>

      <div className='row d-flex align-items-center'>
        <MovieListHeading heading='Nominations'/>
      </div>
      <div className='row'>
				<MovieList 
        movies={favourites} 
        handleFavouritesClick ={addFavouriteMovie} favouriteComponent = {AddFavourite}/>
			</div>

		</div>
	);
};

export default App;