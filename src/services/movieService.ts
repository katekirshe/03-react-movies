import axios from "axios";
import type { Movie } from "../types/movie";
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

interface ResponseMovies {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

export async function fetchMovies(title: string): Promise<Movie[]> {
    const response = await axios.get<ResponseMovies>('https://api.themoviedb.org/3/search/movie', {
        params: {query: title },
        headers: {
            Authorization: `Bearer ${tmdbToken}`,
        }
    })
    return response.data.results;
    
}

