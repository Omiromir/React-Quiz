function StartScreen({ numQuestions, dispatch, hasStarted }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} question to test your mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: hasStarted ? "resume" : "start" })}
      >
        {!hasStarted ? "Let's start" : "Resume the test"}
      </button>
    </div>
  );
}

export default StartScreen;
