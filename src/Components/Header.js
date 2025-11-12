function Header({ dispatch, hasStarted }) {
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>The React Quiz</h1>
      {hasStarted && (
        <button
          className="btn btn-ui btn-header"
          onClick={() => dispatch({ type: "restart" })}
        >
          Reset Quiz
        </button>
      )}
    </header>
  );
}

export default Header;
