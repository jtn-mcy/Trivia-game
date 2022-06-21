import React, { useState } from 'react';
import { useAppDispatch, useGetCurrentQuestion } from '../../api';
import styles from './index.module.scss';
import { increment as incrementScore, decrement as decrementScore } from '../../state/score/scoreSlice';
import { increment as incrementQuestion } from '../../state/questions/questionSlice'

const QuestionCard: React.FC = () => {
  const [answer, setAnswer] = useState<string | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const dispatch = useAppDispatch();
  const question = useGetCurrentQuestion();
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if (answer === question.correct_answer) {
      dispatch(incrementScore());
      setIsCorrect(true)
    } else {
      dispatch(decrementScore());
      setIsCorrect(false);
    }
    dispatch(incrementQuestion())
  }

  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        <h3>{question.question}</h3>
      </div>
      <div className={styles.CardBody}>
        <form onSubmit={handleFormSubmission}>
          <div>
            {question.answers.map(answerOption => {
              return (
                <div key={answerOption} className={styles.CardQuestion}>
                  <input className={styles.CardQuestionRadio} type='radio' id={answerOption} value={answer} checked={answer === answerOption} onChange={() => setAnswer(answerOption)} disabled={isCorrect !== undefined} />
                  <label htmlFor={answerOption}>{answerOption}</label>
                </div>
              )
            })}
          </div>
          <button className={styles.CardSubmitBtn} disabled={!answer || isCorrect !== undefined}>Submit answer</button>
        </form>
        {isCorrect !== undefined ?
          (answer && isCorrect) ? (
            <h3>{`Yes! ${question.correct_answer} is the correct answer! +1 score`}</h3>
          ) : (
            <h3>{`Oh no! ${answer} was not the correct answer. The correct answer was ${question.correct_answer}! -1 score`}</h3>
          )
          : null
        }
      </div>
    </div>
  )
}

export default QuestionCard