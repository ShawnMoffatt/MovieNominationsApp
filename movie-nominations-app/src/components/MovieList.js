import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='movie-container d-flex'>
                    <h3 className='movie-title'>{movie.Title}</h3>
                    <h7 className='movie-year'>{movie.Year}</h7>
                    <img src={movie.Poster} className='movie-poster'></img>
                    <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent/>
                    </div>
				</div>
			))}
		</> 
	);
};

export default MovieList;