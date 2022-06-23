import React, { useEffect, useState, useContext } from 'react';
import { Question, QuestionType, useAppDispatch, useAppSelector, useGetCurrentQuestion } from '../../api';
import styles from './index.module.scss';
import { increment as incrementScore, decrement as decrementScore, reset as resetScore } from '../../state/score/scoreSlice';
import { increment as incrementQuestion, clearQuestions, togglePlay } from '../../state/questions/questionSlice';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { recordScores, generateID, getFormattedDate } from '../../utils/LocalScorage';
import { UserNameContext } from '../../contexts/UserName' ;

type GoNextType = {
  isLastQuestion: boolean;
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | undefined>> ;
}

const GoNext: React.FC<GoNextType> = ( {setIsCorrect, isLastQuestion, setAnswer} ) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const score = useAppSelector(state => state.score.value);
  const {userName} = useContext(UserNameContext);
  
  const resetFields = () => {
    setIsCorrect(undefined);
    setAnswer([]);
  }

  const resetGame = () => {
    dispatch(clearQuestions());
    dispatch(togglePlay());
    dispatch(resetScore());
  }

  const handleGoNext: () => void = () => {
    resetFields();
    if (!isLastQuestion) {
      dispatch(incrementQuestion());
    } else {
      recordScores({ id: generateID(), userName, score, date: getFormattedDate() });
      resetGame();
      navigate('/highscores');
    }
  } 
  return (
    <Button btnType='NextQuestion' text={!isLastQuestion ? 'Next question': 'Score screen'} onClick={handleGoNext} />
  );
};

type QuestionFormType = {
  question: Question;
  answer: string[];
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  isCorrect: boolean | undefined;
  handleFormSubmission: (e: React.FormEvent<HTMLFormElement>) => void;
}

const QuestionForm: React.FC<QuestionFormType> = ({ question, answer, setAnswer, isCorrect, handleFormSubmission }) => {
  const handleCheck = (answerOption: string) => {
    if (answer?.includes(answerOption)) {
      setAnswer( prev => prev.filter(answer => answer !== answerOption));
    } else setAnswer(prev => [...prev, answerOption]);
  }
  return (
    <form onSubmit={handleFormSubmission}>
      <div>
        {question.type === QuestionType.single && question.answers.map(answerOption => (
            <div key={answerOption} className={styles.CardQuestion}>
              <input className={styles.CardQuestionRadio} type='radio' id={answerOption} value={answer} checked={answer?.includes(answerOption)} onChange={() => setAnswer([answerOption])} disabled={isCorrect !== undefined} />
              <label htmlFor={answerOption}>{answerOption}</label>
            </div>
          ))}
        {question.type === QuestionType.multiple && question.answers.map(answerOption => (
          <div key={answerOption} className={styles.CardQuestion}>
            <input type='checkbox' id={answerOption} value={answer} checked={answer?.includes(answerOption)} onChange={() => handleCheck(answerOption)} disabled={isCorrect !== undefined}/>
            <label htmlFor={answerOption}>{answerOption}</label>
          </div>
        ))}
      </div>
      <Button type='submit' btnType='Answer' disabled={!answer || isCorrect !== undefined} text='Submit Answer' />
  </form>
  );
};

const QuestionCard: React.FC = () => {
  const [answer, setAnswer] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const question = useGetCurrentQuestion();
  const questionState = useAppSelector(state => state.question);

  useEffect(() => {
    if (questionState.index === questionState.questions.length-1) setIsLastQuestion(true);
  }, [question])

  const validateMCAnswers: (answer: string[], correct_answers: string[]) => boolean = (answer, correct_answers) => {
    if (answer.length !== correct_answers.length)  return false;
    answer.forEach(option => {
      if (!correct_answers.includes(option)) return false;
    });
    return true;
  };

  const correctAnswer = (question: Question) => {
    dispatch(incrementScore(question.value));
    setIsCorrect(true);
  }

  const incorrectAnswer = () => {
    dispatch(decrementScore());
    setIsCorrect(false);
  }

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (question.type === QuestionType.single && question.correct_answer === answer[0]) {
      return correctAnswer(question);
    } ;
    if (question.type === QuestionType.multiple) {
      if (Array.isArray(question.correct_answer)  && validateMCAnswers(answer, question.correct_answer)) {
        return correctAnswer(question);
      };
    };
    return incorrectAnswer();
  };

  return (
    <div className={styles.Card}>
      <div className={styles.CardHeader}>
        <h3>{question.question}</h3>
      </div>
      <div className={styles.CardBody}>
        <QuestionForm question={question} answer={answer} setAnswer={setAnswer} isCorrect={isCorrect} handleFormSubmission={handleFormSubmission} />
        {isCorrect !== undefined ?
          (answer.length && isCorrect) ? (
            <>
              <h3>{`Yes! ${Array.isArray(question.correct_answer) 
                ? `${question.correct_answer.join(', ')} are`
                : `${question.correct_answer} is`} 
                correct! +${question.value} score`}</h3>
              <GoNext isLastQuestion={isLastQuestion} setIsCorrect={setIsCorrect} setAnswer={setAnswer}/>
            </>
          ) : (
            <>
              <h3>{`Oh no! 
              ${Array.isArray(question.correct_answer) 
                ? `${answer.length > 1 
                    ? `${answer.join (', ')} were not the correct answers`  
                    : `${answer[0]} was not the correct answer`}`
                : `${answer}`}. The correct answer was
              ${Array.isArray(question.correct_answer) 
                  ? `${question.correct_answer.join(', ')}`
                  : `${question.correct_answer}`}! -1 score`}</h3>
              <GoNext isLastQuestion={isLastQuestion} setIsCorrect={setIsCorrect} setAnswer={setAnswer}/>
            </>
          )
          : null
        }
      </div>
    </div>
  );
};

export default QuestionCard;