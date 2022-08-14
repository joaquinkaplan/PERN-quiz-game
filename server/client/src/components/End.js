import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { formatTime } from "../utils";
import axios from "axios";

const End = ({ results, data, onReset, onAnswersCheck, time }) => {
  const { user } = useAppContext();
  const nickname = user?.nickname;
  const id = user?.userId;
  const [correctAnswers, setCorrectAnswers] = useState(null);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);

    // eslint-disable-next-line
  }, []);

  const score = Math.floor((correctAnswers / data.length) * 100) + "%";

  const addScore = async () => {
    try {
      const URL = "http://localhost:5000/api/score/";
      await axios.post(`${URL}addScore`, {
        id,
        nickname,
        score,
      });
      console.log("player:", nickname, "score:", score);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (correctAnswers !== null) {
      addScore();
    }
  }, [addScore]);

  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>Your results</h3>
            <p>
              {correctAnswers} of {data.length}
            </p>
            <p>
              <strong>{score}</strong>
            </p>
            <p>
              <strong>Your time:</strong> {formatTime(time)}
            </p>
            <button className="button is-info mr-2" onClick={onAnswersCheck}>
              Check your answers
            </button>
            <button className="button is-success" onClick={onReset}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default End;
