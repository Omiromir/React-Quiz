import { useEffect, useRef } from "react";

export default function ReviewModal({ questions, userAnswers, dispatch }) {
  const close = () => dispatch({ type: "closeReview" });
  const modalRef = useRef(null);

  useEffect(() => {
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      dispatch({ type: "closeReview" });
    }
  };

  window.addEventListener("keydown", onKeyDown);
  modalRef.current?.focus();

  return () => window.removeEventListener("keydown", onKeyDown);
}, [dispatch]);

  const onOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onOverlayMouseDown}
      role="presentation"
    >
      <div
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Review Answers"
      >
        <h2>Review Answers</h2>

        <div className="review-list">
          {questions.map((q, i) => {
            const answerObj = userAnswers.find((a) => a.questionIndex === i);
            if (!answerObj) return null;

            return (
              <div key={i} className="review-item">
                <h3>
                  {i + 1}. {q.question}
                </h3>

                <p>
                  <strong>Correct Answer:</strong> {q.options[q.correctOption]}
                </p>

                <p className="explanation">{q.explanation}</p>
              </div>
            );
          })}
        </div>

        <button className="btn btn-ui" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
