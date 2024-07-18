import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { useState, useEffect } from "react";

function App() {
  const [moviePopular, setMoviePopular] = useState([]);
  const [movieTopRate, setMovieTopRate] = useState([]);

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
      <div className="bg-black pb-10">
        <Header />
        <Banner />
        <MovieList data={moviePopular} title={"Phim hot"} />
        <MovieList data={movieTopRate} title={"Phim đề cử"} />
      </div>
    </>
  );
}

export default App;
