import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { useState, useEffect } from "react";
import { MovieProvider } from "./context/MovieProvider";

function App() {
  const [moviePopular, setMoviePopular] = useState([]);
  const [movieTopRate, setMovieTopRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchVal) => {
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const urlPopular = "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
      const urlTopRate = "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1";

      const [responsePopular, responseTopRate] = await Promise.all([
        fetch(urlPopular, options),
        fetch(urlTopRate, options),
      ]);

      const dataPopular = await responsePopular.json();
      const dataTopRate = await responseTopRate.json();

      setMoviePopular(dataPopular?.results);
      setMovieTopRate(dataTopRate?.results);
    };

    fetchMovie();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="bg-black pb-10">
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 ? (
            <MovieSearch title={"Kết quả tìm kiếm"} data={movieSearch} />
          ) : (
            <>
              <MovieList data={moviePopular} title={"Phim hot"} />
              <MovieList data={movieTopRate} title={"Phim đề cử"} />
            </>
          )}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
