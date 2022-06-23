import { useEffect, useState } from 'react';
import searchIcon from './search.svg'
import MovieCard from './MovieCard'
import './App.css'

const API_URL = "https://omdbapi.com?apikey=b6df9bc8"

const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies('LEGO')
    }, [])

    return (
        <div className='app'>
            <div className='header'>
                <h1>CineZilla</h1>
                <p>A Movies Database Company</p>
            </div>

            <div className='search'>
                <input placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? searchMovies(searchTerm) : setSearchTerm(e.target.value)} />
                <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>
            {movies?.length > 0 ?
                (<div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} ></MovieCard>
                    ))}
                </div>) :
                (<div className='empty'>
                    <h2>No movies found</h2>
                </div>)
            }
            <footer>
                <ul>
                    <li><a href="/#">Facebook</a></li>
                    <li><a href="/#">Instagram</a></li>
                    <li><a href="/#">YouTube</a></li>
                </ul>
                <span>
                    © 2018-2022 by CineZilla.com
                </span>
            </footer>
        </div >
    );
}

export default App;