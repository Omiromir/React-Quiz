export default function QuestionNavigator({
  questions,
  numQuestions,
  index,
  userAnswers,
  dispatch,
}) {
  const answerMap = new Map(
    userAnswers.map((a) => [a.questionIndex, a.selected]),
  );

  return (
    <div className="question-nav">
      {Array.from({ length: numQuestions }, (_, i) => {
        const isCurrent = i === index;
        const selected = answerMap.get(i);

        const hasAnswer = selected !== undefined && selected !== null;
        const isCorrect =
          hasAnswer && Number(selected) === Number(questions[i].correctOption);

        const stateClass = !hasAnswer
          ? "is-unanswered"
          : isCorrect
            ? "is-correct"
            : "is-wrong";

        return (
          <button
            key={i}
            type="button"
            className={[
              "question-nav__btn",
              stateClass,
              isCurrent ? "is-current" : "",
            ].join(" ")}
            onClick={() => dispatch({ type: "goToQuestion", payload: i })}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
