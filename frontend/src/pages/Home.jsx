import axios from "axios";
import { useState, useEffect } from "react";
import Answer from "../components/Answer";
import Poster from "../components/Poster";

const movieIdArray = [
  11, 19, 105, 120, 129, 272, 329, 406, 429, 500, 524, 550, 1878, 22538, 27205,
  37799, 157336, 313369, 333339, 419430,
];

export default function Home() {
  const [movie, setMovie] = useState();
  const [falseMovie1, setFalseMovie1] = useState();
  const [falseMovie2, setFalseMovie2] = useState();
  const [falseMovie3, setFalseMovie3] = useState();

  function getMovie() {
    movieIdArray.sort(() => Math.random() - 0.5);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieIdArray[0]}?api_key=df8d2d90ff4e6f4a0f1e460dda3a4a35`
      )
      .then((resp) => resp.data)
      .then((data) => setMovie(data));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieIdArray[1]}?api_key=df8d2d90ff4e6f4a0f1e460dda3a4a35`
      )
      .then((resp) => resp.data)
      .then((data) => setFalseMovie1(data));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieIdArray[2]}?api_key=df8d2d90ff4e6f4a0f1e460dda3a4a35`
      )
      .then((resp) => resp.data)
      .then((data) => setFalseMovie2(data));
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieIdArray[3]}?api_key=df8d2d90ff4e6f4a0f1e460dda3a4a35`
      )
      .then((resp) => resp.data)
      .then((data) => setFalseMovie3(data));
  }

  function nextLevel() {
    getMovie();
  }

  useEffect(getMovie, []);

  return (
    <>
      <h1>Posteries</h1>
      <div className="timerPoints">
        <p>Timer</p>
        <p>Points</p>
      </div>
      {movie && falseMovie1 && falseMovie2 && falseMovie3 && (
        <>
          <Poster poster={movie.poster_path} title={movie.original_title} />
          <div className="answers">
            <Answer title={movie.original_title} movie={movie} res />
            <Answer
              title={falseMovie1.original_title}
              movie={falseMovie1}
              res={false}
            />
            <Answer
              title={falseMovie2.original_title}
              movie={falseMovie2}
              res={false}
            />
            <Answer
              title={falseMovie3.original_title}
              movie={falseMovie3}
              res={false}
            />
          </div>
        </>
      )}
      <button type="button" onClick={nextLevel}>
        NEXT QUESTION
      </button>
    </>
  );
}
