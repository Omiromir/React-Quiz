function TestSelectionScreen({ tests, dispatch }) {
  return (
    <div className="test-selection">
      <h1>Select a Test</h1>
      <div className="test-list">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <h2>{test.name}</h2>
            <p>{test.description}</p>
            <button
              onClick={() => dispatch({ type: "startTest", testId: test.id })}
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestSelectionScreen;