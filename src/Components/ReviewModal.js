export default function ReviewModal({ questions, userAnswers, dispatch }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Review Answers</h2>

        <div className="review-list">
          {questions.map((q, i) => {
            const answerObj = userAnswers.find(a => a.questionIndex === i);
            return (
              <div key={i} className="review-item">
                <h3>{i + 1}. {q.question}</h3>

                <p>
                  <strong>Correct Answer:</strong> {q.options[q.correctOption]}
                </p>

                <p className="explanation">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "closeReview" })}
        >
          Close
        </button>
      </div>
    </div>
  );
}
