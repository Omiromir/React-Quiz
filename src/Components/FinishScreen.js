function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🎖️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
     <div className="finish-btns">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart the quiz
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "openReview" })}
        >
          Review Answers
        </button>
     </div>
    </>
  );
}

export default FinishScreen;
