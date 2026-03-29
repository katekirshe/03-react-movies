import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css'

interface MovieGridProps {
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
    function onClickHandler(movie: Movie) {
        onSelect(movie);
    }
    return (
        <ul className={css.grid}>
            {movies.map((movie) => {         
                return (
                    <li key={movie.id} onClick={()=> onClickHandler(movie)} >
                        <div className={css.card}>
                            <img 
		                        className={css.image} 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
		                        alt={movie.title} 
		                        loading="lazy"  
		                    />
                            <h2 className={css.title}>{movie.title}</h2>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default MovieGrid