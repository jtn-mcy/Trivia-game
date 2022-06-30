import React, { useEffect, useState, useContext } from 'react';
import { Question, QuestionType } from '../../types';
import { useAppDispatch, useAppSelector, useGetCurrentQuestion } from '../../hooks'
import styles from './index.module.scss';
import { increment as incrementScore, decrement as decrementScore, reset as resetScore } from '../../state/score/scoreSlice';
import { increment as incrementQuestion, clearQuestions, togglePlay, toggleIsLastSubmit } from '../../state/questions/questionSlice';
import Button from '../../components/Button';
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
  const { value, questions_correct} = useAppSelector(state => state.score);
  const numberOfQuestions = useAppSelector(state => state.question.questions.length)
  const {userName, setUserName} = useContext(UserNameContext);
  
  useEffect(() => {
    if (isLastQuestion) {
      dispatch(toggleIsLastSubmit());
    }
  }, [dispatch, isLastQuestion]);

  const resetFields = () => {
    setIsCorrect(undefined);
    setAnswer([]);
  }

  const resetGame = () => {
    dispatch(toggleIsLastSubmit());
    dispatch(clearQuestions());
    dispatch(togglePlay());
    dispatch(resetScore());
    setUserName('');
  }

  const handleGoNext: () => void = () => {
    resetFields();
    if (!isLastQuestion) {
      dispatch(incrementQuestion());
    } else {
      recordScores({ id: generateID(), userName, score: value, date: getFormattedDate() });
      resetGame();
      navigate('/highscores');
    }
  } 
  return (
    <>
    <Button btnType='NextQuestion' text={!isLastQuestion ? 'Next question': 'Score screen'} onClick={handleGoNext} />
    {isLastQuestion && 
      <h4>
        {questions_correct > (numberOfQuestions/2) ? 'Woah!' : 'Oh!'} You got {questions_correct} out of {numberOfQuestions} questions correct. {questions_correct > (numberOfQuestions/2) ? 'You are a trivia master!' : 'Play again and try to get a higher score!'}
      </h4>
    }
    </>
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
            <label className={styles.CheckboxContainer} htmlFor={answerOption}>{answerOption}
              <input type='checkbox' id={answerOption} value={answer} checked={answer?.includes(answerOption)} onChange={() => handleCheck(answerOption)} disabled={isCorrect !== undefined}/>
              <span></span>
            </label>
          </div>
        ))}
      </div>
      <Button type='submit' btnType='Answer' disabled={!answer.length || isCorrect !== undefined} text='Submit Answer' />
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

  const validateMCAnswers: (
    answers: string[],
    correct_answers: string[]
  ) => boolean = (answers, correct_answers) => {
    if (answer.length !== correct_answers.length) return false;
    const answerCheckMap: { [key: string]: boolean } = {};
    correct_answers.forEach((answer) => (answerCheckMap[answer] = true));
    for (let i = 0; i < answers.length; i++) {
      let key = answers[i];
      if (!answerCheckMap[key]) return false;
    }
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