export default function QuestionNavigator({
  numQuestions,
  index,
  userAnswers,
  dispatch,
}) {
  const answeredSet = new Set(userAnswers.map((a) => a.questionIndex));

  return (
    <div className="question-nav">
      {Array.from({ length: numQuestions }, (_, i) => {
        const isCurrent = i === index;
        const isAnswered = answeredSet.has(i);

        return (
          <button
            key={i}
            type="button"
            className={[
              "question-nav__btn",
              isCurrent ? "is-current" : "",
              isAnswered ? "is-answered" : "is-unanswered",
            ].join(" ")}
            onClick={() => dispatch({ type: "goToQuestion", payload: i })}
            aria-current={isCurrent ? "true" : "false"}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
