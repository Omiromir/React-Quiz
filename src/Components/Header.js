function Header({ dispatch, hasStarted, status }) {
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>The React Quiz</h1>
      {hasStarted && status === "active" && (
        <button
          className="btn btn-ui btn-header"
          onClick={() => dispatch({ type: "restart" })}
        >
          Go back to menu
        </button>
      )}
    </header>
  );
}

export default Header;
