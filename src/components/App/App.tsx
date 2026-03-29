import { useState } from "react"
import { fetchMovies } from "../../services/movieService"
import css from './App.module.css'
import SearchBar from "../SearchBar/SearchBar"
import toast, { Toaster } from "react-hot-toast"
import type { Movie } from "../../types/movie"
import MovieGrid from "../MovieGrid/MovieGrid"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const [selected, setSelected] = useState<Movie | null>(null)

  async function onSubmit(title: string) {
    try {
      setIsLoading(true);
      setIsError(false);
      const result = await fetchMovies(title);
      if (!result.length) {
        toast.error("No movies found for your request.")
      }
      setMovies(result);
    } catch (err) {
      console.log(err);
      setMovies([]);
      setIsError(true);
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setSelected(null)
  }

  function onSelect(movie: Movie) {
    setSelected(movie)
  }

  return <div className={css.app}>
    <div><Toaster/></div>
    <SearchBar onSubmit={onSubmit} />
    {movies.length > 0 && <MovieGrid movies={movies} onSelect={onSelect} />}
    {isLoading && <Loader />}
    {isError && <ErrorMessage />}
    {selected && <MovieModal onClose={closeModal} movie={selected}/>}
  </div>
}

export default App
