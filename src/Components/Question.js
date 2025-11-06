import Options from "./Options"

function Question({question, dispatch, answer}) {
    const hasAnswered = answer !== null
    const isCorrect = answer === question.correctOption

    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/>

            {hasAnswered && (
                <div className={`explanation ${isCorrect ? "correct" : "wrong"}`}>{question.explanation}</div>
            ) }
        </div>
    )
}



export default Question
