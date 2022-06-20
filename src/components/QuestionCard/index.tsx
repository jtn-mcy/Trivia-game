import React, { useState } from 'react';
import { Question, useAppDispatch } from '../../api';
import styles from './index.module.scss';
import { increment, decrement } from '../../state/score/scoreSlice';

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const [answer, setAnswer] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if (answer === question.correct_answer) {
      dispatch(increment());
      setAnswer(undefined)
    } else {
      dispatch(decrement());
      setAnswer(undefined);
    }
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
                  <input className={styles.CardQuestionRadio} type='radio' id={answerOption} value={answer} checked={answer === answerOption} onChange={() => setAnswer(answerOption)} />
                  <label htmlFor={answerOption}>{answerOption}</label>
                </div>
              )
            })}
          </div>
          <button className={styles.CardSubmitBtn} disabled={!answer}>Submit answer</button>
        </form>
      </div>
    </div>
  )
}

export default QuestionCard