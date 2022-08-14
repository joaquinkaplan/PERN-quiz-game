import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const Start = ({ onQuizStart }) => {
  const [lastScore, setLastScore] = useState("");
  const [highScore, setHighScore] = useState("");
  const { user } = useAppContext();
  const nickname = user?.nickname;

  async function getScores() {
    const URL = "http://localhost:5000/api/score/";
    const nickname = user?.nickname;
    const lastScoreObtained = await axios.get(`${URL}lastScore/${nickname}`);
    if (lastScoreObtained.data.latestScore == null) {
      setLastScore(null);
    } else {
      setLastScore(lastScoreObtained.data.latestScore.score);
    }
    const highScoreObtained = await axios.get(`${URL}highScore/${nickname}`);
    if (highScoreObtained.data.latestScore == null) {
      setHighScore(null);
    } else {
      setHighScore(highScoreObtained.data.latestScore.score);
    }
  }
  useEffect(() => {
    getScores();
  }, [getScores]);

  function postScores() {
    if (lastScore && lastScore == highScore) {
      return <p>Your last -and highest- score is {lastScore}</p>;
    }
    if (lastScore && lastScore != highScore) {
      return (
        <div>
          <p>
            <strong>Last score: </strong>
            {lastScore}
          </p>
          <p>
            <strong>Highest score: </strong>
            {highScore}
          </p>
        </div>
      );
    }
    if (lastScore == null) {
      return <p>Seems you haven't played yet!</p>;
    }
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1> Challenge yourself, {nickname}!</h1>
          {postScores()}
          <button
            className="button is-info is-medium mt-4"
            onClick={onQuizStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
