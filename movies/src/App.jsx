import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
const backendAPI = import.meta.env.VITE_BACKEND_URL
const App = () => {
  // console.log(backendAPI)
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fetchMovies = async (query) => {
    setLoading(true)
    try {
      const response = await fetch(`${backendAPI}/getMovies/${query}`)
      const data = await response.json()
      if(data.Error){
        setError(data.Error)
        return
      }
      setMovies(data.Search)
      setSearchTerm("")
      setError("")
    } catch (e){
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    console.log(searchTerm)
    await fetchMovies(searchTerm)
  }
  useEffect(() => {
    fetchMovies("mario")
  }, [])

  

  return (
    <div className='min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white gap-6'>
     { loading ?(<div className="animate-spin bg-slate-200">
        <LoaderCircle/>
      </div>):(<>
      <div className="w-full m-4 p-4 gap-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Movies</h1>
      <p className="text-red-500">{error}</p>
      <div className="flex ">
      <input type="text" className="flex-1 bg-slate-800 outline-none px-4 py-1 w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <button className="bg-slate-600 p-4 hover:bg-slate-400 " onClick={handleSearch} >Search</button>
      </div>
      </div>
      <div className='flex flex-col gap-3 grid grid-cols-3 '>
        {movies.length > 0 ?
          movies.map((movie) => 
            <div className="truncate flex flex-col bg-slate-800 p-4 hover:bg-slate-700 rounded-md min-h-96" key={movie.imdbID}>
              <p>
                {movie.Title}
                </p>
            <span>Released {movie.Year}</span>
            <div>
            {movie.Poster ? <img src={movie.Poster} alt={movie.Title} className="h-auto w-96 rounded-xl shadow-lg  object-cover"/> : ""}
            </div>
            </div>
          ) : (<p>No results found</p>)
        }
      </div>
      </>
      )}
    </div>
  )
}

export default App