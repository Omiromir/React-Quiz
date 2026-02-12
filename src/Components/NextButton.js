function NextButton({ dispatch, answer, index, numQuestions }) {

    const hasAnswered = answer !== null;

    if (!hasAnswered) return null;

    const isLast = index === numQuestions - 1;

    return (
        <button
            className="btn btn-ui btn-right"
            onClick={() => dispatch({ type: isLast ? "finish" : "nextQuestion" })}
        >
            {isLast ? "Finish" : "Next"}
        </button>
    );
}

export default NextButton;
