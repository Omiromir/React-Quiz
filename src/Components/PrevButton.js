function PrevButton({ dispatch, index }) {
  const isFirst = index === 0;

  return (
    <button
      className="btn btn-ui btn-left"
      onClick={() => dispatch({ type: "prevQuestion" })}
      disabled={isFirst}
    >
      Previous
    </button>
  );
}

export default PrevButton;
