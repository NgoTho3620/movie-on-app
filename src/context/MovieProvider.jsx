import { createContext, useState } from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import PropTypes from "prop-types";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      setTrailerKey(data.results[0]?.key);
      setModalIsOpen(true);
      console.log(data, "data");
    } catch (error) {
      setModalIsOpen(false);
      console.log(error.message);
    }
  };
  return (
    <MovieContext.Provider value={{ modalIsOpen, setModalIsOpen, trailerKey, setTrailerKey, handleTrailer }}>
      {children}
      <Modal
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
      >
        <YouTube
          videoId={trailerKey}
          opts={{
            height: "390",
            width: "640",
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          }}
        />
      </Modal>
    </MovieContext.Provider>
  );
};
MovieProvider.PropTypes = {
  children: PropTypes.node,
};
export { MovieContext, MovieProvider };
