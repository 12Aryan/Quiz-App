import React, { useEffect, useState } from "react";
import QuizData from "../Quiz/quizData.js";
import "../Quiz/quiz.css";

const Quiz = () => {
  console.log("-->>", QuizData);
  const totalQuestion = QuizData.length;
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleClick = (e, currentCorrectAnswer) => {
    console.log("currentCorrectAnswer", currentCorrectAnswer);
    const clicked = Number(e.target.id);
    setQuestionNumber(clicked);
    // setCorrectAnswer(currentCorrectAnswer);
    setIsSubmitted(false)
    setSelectedOption(null);
  };
  const clickToPrevious = () => {
    questionNumber === 1
      ? setQuestionNumber(1)
      : setQuestionNumber(questionNumber - 1);
      setIsSubmitted(false)
    setSelectedOption(null);
  };
  const clickToNext = () => {
    questionNumber === totalQuestion
      ? setQuestionNumber(totalQuestion)
      : setQuestionNumber(questionNumber + 1);
      setIsSubmitted(false)
    setSelectedOption(null);
  };

  const clickToSelect = (e, currentCorrectAnswer) => {
    console.log('currentCorrectAnswer', currentCorrectAnswer)
    const value = Number(e.target.id) + 1;
    setSelectedOption(value);
    setCorrectAnswer(currentCorrectAnswer);
    // QuizData.map((e, i) => {});
  };
  const clickToSubmit = () => {
    console.log("selectedOption-->>", selectedOption);
    if (selectedOption != null) {
      setIsSubmitted(true)
      selectedOption === correctAnswer
        ? setAnswerStatus(true)
        : setAnswerStatus(false);

      setAnswered(answered + 1);
      // setSelectedOption(null);

      // setQuestionNumber(questionNumber + 1);
    }
  };
  console.log("question number", questionNumber);
  console.log("answered", answered);
  console.log("selectedOption", selectedOption);
  console.log("correctAnswer", correctAnswer);
  console.log("answerStatus", answerStatus);
  console.log("isSubmited", isSubmitted);
  
  useEffect(() => {
    // handleClick(1, 3)
    // setIsSubmitted(false)
  });

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
                  onClick={(e) => handleClick(e, question.correctAnswer)}
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
                              index + 1 === selectedOption ? "selected" : ""
                            }`}
                            key={index}
                            id={index}
                            onClick={(e) => clickToSelect(e, element.correctAnswer)}
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
        <div className="answer-container">
          {answerStatus && isSubmitted ? (
            <h4>Your Answer is Correct</h4>
          ) : (
            <h4></h4>
          )}
        </div>
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
        <button
          className={selectedOption == null ? "disabled" : "submit-button"}
          disabled={selectedOption == null ? true : false}
          onClick={() => clickToSubmit()}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Quiz;
