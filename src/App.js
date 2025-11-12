import { useEffect, useReducer } from "react";
import Error from "./Components/Error";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import StartScreen from "./Components/StartScreen";
import Main from "./Components/Main";
import Question from "./Components/Question";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";
import ReviewModal from "./Components/ReviewModal";

const SECS_PER_QUESTION = 60;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  userAnswers: [],
  reviewMode: false,
  hasStarted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        hasStarted: true,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "resume":
      return {
        ...state,
        status: "active",
      };
    case "loadState":
      return {
        ...state,
        ...action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        userAnswers: [
          ...state.userAnswers,
          { questionIndex: state.index, selected: action.payload },
        ],
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      localStorage.removeItem("quizState");
      return {
        ...state,
        answer: null,
        points: 0,
        index: 0,
        secondsRemaining: 10,
        status: "ready",
        userAnswers: [], 
        reviewMode: false, 
        hasStarted: false,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "openReview":
      return { ...state, reviewMode: true };

    case "closeReview":
      return { ...state, reviewMode: false };

    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      reviewMode,
      userAnswers,
      hasStarted,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      dispatch({
        type: "loadState",
        payload: JSON.parse(savedState),
      });
    }

    fetch("./questions.json")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(() => {
    if (status === "loading" || status === "error") return;

    const stateToSave = {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      userAnswers,
      reviewMode,
      hasStarted,
    };

    console.log("Saving state to localStorage");
    localStorage.setItem("quizState", JSON.stringify(stateToSave));
  }, [
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    userAnswers,
    reviewMode,
    hasStarted,
  ]);

  return (
    <div className="app">
      <Header dispatch={dispatch} hasStarted={hasStarted}/>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            hasStarted={hasStarted}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {reviewMode && (
          <ReviewModal
            questions={questions}
            userAnswers={userAnswers}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
