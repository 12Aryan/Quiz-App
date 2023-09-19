import React, { useState } from "react";
import QuizData from "../Quiz/quizData.js";
import "../Quiz/quiz.css";

const Quiz = () => {
  console.log("-->>", QuizData);
  const totalQuestion = QuizData.length;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(0);

  const handleClick = (e) => {
    console.log(e.target.id);
    const clicked = Number(e.target.id);
    console.log("clicked", clicked);
    setQuestionNumber(clicked);
    setSelectedOption(null);
  };
  const clickToPrevious = () => {
    questionNumber === 1
      ? setQuestionNumber(1)
      : setQuestionNumber(questionNumber - 1);
    setSelectedOption(null);
  };
  const clickToNext = () => {
    console.log("len", totalQuestion);
    questionNumber === totalQuestion
      ? setQuestionNumber(totalQuestion)
      : setQuestionNumber(questionNumber + 1);
    setSelectedOption(null);
  };

  const clickToSelect = (e) => {
    console.log(e.target.id);
    const value = Number(e.target.id) + 1;
    setSelectedOption(value);
    QuizData.map((e, i) => {});
  };
  const clickToSubmit = () => {
    console.log("submitted");
    if (selectOption != null) {
      setAnswered(answered + 1);
      setSelectedOption(null);
    }
  };
  console.log("question number", questionNumber);
  console.log("answered", answered);
  return (
    <>
      <div className="header">
        <div className="Number-of-question-container">
          {QuizData.map((question, i) => {
            return (
              <div
                key={i}
                className={
                  question.id === questionNumber ? "outline-active" : ""
                }
              >
                <div
                  id={question.id}
                  className={
                    question.id === questionNumber
                      ? "question-circle-active"
                      : "question-circle"
                  }
                  onClick={(e) => handleClick(e)}
                >
                  {question.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="question-count">
          <div className="total-questions">
            <span>Total Questions: {totalQuestion}</span>
          </div>
          <div className="answered-questions">Answered: {answered}</div>
          <div className="unanswered-questions">
            Unanswered: {totalQuestion - answered}
          </div>
        </div>
        <div className="question-detail-container">
          {QuizData.map((element, i) => {
            return (
              <div key={i} className="">
                {element.id === questionNumber && (
                  <div className="question-container">
                    <div className="question-header">
                      <h3>Question {element.id}</h3>
                    </div>

                    <div className="question-body">
                      <h4>{element.question}</h4>
                    </div>
                    <div className="options">
                      {element.options.map((ele, index) => {
                        return (
                          <div
                            className={`single-option ${
                              index + 1 === selectOption ? "selected" : ""
                            }`}
                            key={index}
                            id={index}
                            onClick={(e) => clickToSelect(e)}
                          >
                            {ele}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="answer-container">
          <h4>Your Answer is Correct</h4>
          <h4>Wrong Answer</h4>
        </div> */}
      </div>
      <div className="footer">
        <button
          className={questionNumber === 1 ? "disabled" : "prev-button"}
          disabled={questionNumber === 1 ? true : false}
          onClick={() => clickToPrevious()}
        >
          Previous
        </button>
        <button
          className={
            questionNumber === totalQuestion ? "disabled" : "next-button"
          }
          onClick={() => clickToNext()}
          disabled={questionNumber === totalQuestion ? true : false}
        >
          Next
        </button>
        <button className="final-button" disabled={selectOption == null ? true : false} onClick={() => clickToSubmit()}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Quiz;
