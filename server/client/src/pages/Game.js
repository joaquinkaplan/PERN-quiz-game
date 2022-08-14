import React, { useState, useEffect } from "react";
import { Start, Question, Modal, End } from "../components";
import quizData from "../data/quiz.json";
import { useAppContext } from "../context/appContext";

let interval;
const Game = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  const { logoutUser } = useAppContext();

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  return (
    <>
      <button type="button" className="btn btn-block" onClick={logoutUser}>
        LOGOUT
      </button>
      <div className="App">
        {step === 1 && <Start onQuizStart={quizStartHandler} />}
        {step === 2 && (
          <Question
            data={quizData.data[activeQuestion]}
            onAnswerUpdate={setAnswers}
            numberOfQuestions={quizData.data.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
          />
        )}
        {step === 3 && (
          <End
            results={answers}
            data={quizData.data}
            onReset={resetClickHandler}
            onAnswersCheck={() => setShowModal(true)}
            time={time}
          />
        )}

        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            results={answers}
            data={quizData.data}
          />
        )}
      </div>
    </>
  );
};

export default Game;
