import React from 'react';

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='movie-container d-flex'>
                    <h3 className='movie-title'>{movie.Title}</h3>
                    <h7 className='movie-year'>{movie.Year}</h7>
                    <img src={movie.Poster} className='movie-poster'></img>
                    <div className='overlay d-flex align-items-center justify-content-center'></div>
				</div>
			))}
		</>
	);
};

export default MovieList;