import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useGetCurrentQuestion } from '../../api';
import styles from './index.module.scss';
import { increment as incrementScore, decrement as decrementScore } from '../../state/score/scoreSlice';
import { increment as incrementQuestion, clearQuestions } from '../../state/questions/questionSlice'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

type GoNextType = {
  isLastQuestion: boolean
  setAnswer: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>> 
}

const GoNext: React.FC<GoNextType> = ( {setIsCorrect, isLastQuestion, setAnswer} ) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoNext: () => void = () => {
    if (!isLastQuestion) {
      setIsCorrect(undefined);
      setAnswer(undefined);
      dispatch(incrementQuestion())
    } else {
      setAnswer(undefined);
      dispatch(clearQuestions())
      navigate('/highscore')
    }
  } 
  return (
    <Button btnType='NextQuestion' text={!isLastQuestion ? 'Next question}': 'Finish game!'} onClick={handleGoNext} />
  )
}

const QuestionCard: React.FC = () => {
  const [answer, setAnswer] = useState<string | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const question = useGetCurrentQuestion();
  const questionState = useAppSelector(state => state.question);

  useEffect(() => {
    if (questionState.index === questionState.questions.length-1) setIsLastQuestion(true);
  }, [question])

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    if (answer === question.correct_answer) {
      dispatch(incrementScore());
      setIsCorrect(true)
    } else {
      dispatch(decrementScore());
      setIsCorrect(false);
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
            <>
              <h3>{`Yes! ${question.correct_answer} is the correct answer! +1 score`}</h3>
              <GoNext isLastQuestion={isLastQuestion} setIsCorrect={setIsCorrect} setAnswer={setAnswer}/>
            </>
          ) : (
            <>
              <h3>{`Oh no! ${answer} was not the correct answer. The correct answer was ${question.correct_answer}! -1 score`}</h3>
              <GoNext isLastQuestion={isLastQuestion} setIsCorrect={setIsCorrect} setAnswer={setAnswer}/>
            </>
          )
          : null
        }
      </div>
    </div>
  )
}

export default QuestionCard