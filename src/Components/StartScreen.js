function StartScreen({ numQuestions, dispatch, hasStarted }) {
  const handleBackToMenu = () => {
    dispatch({ type: "BackMenu" });
  };

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
      <button className="btn btn-ui" onClick={handleBackToMenu}>Back to Menu</button>
    </div>
  );
}

export default StartScreen;
