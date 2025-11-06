function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        const isSelected = answer === index;
        const isCorrect = index === question.correctOption;

        return (
          <button
            key={index}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
            className={`btn btn-option
              ${isSelected ? "answer" : ""}
              ${hasAnswered ? (isCorrect ? "correct" : "wrong") : ""}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
