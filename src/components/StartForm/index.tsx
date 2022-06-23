import React, { useContext, useState } from 'react';
import { UserNameContext } from '../../contexts/UserName';
import { togglePlay, addQuestions, reset } from '../../state/questions/questionSlice';
import { useGetRandomQuestions, useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import styles from './index.module.scss';
import { allData } from '../../data';

const StartForm: React.FC = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(1);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetAndStartGame = () => {
    const questions = useGetRandomQuestions(numOfQuestions);
    dispatch(addQuestions(questions));
    dispatch(reset());
    dispatch(togglePlay());
  };

  const handleStartPlay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetAndStartGame();
    navigate('/play');
  };

  return (
    <div>
      <form className={styles.StartForm} onSubmit={e => handleStartPlay(e)}>
        <label htmlFor='username'><h3>Set a username: </h3></label>
        <input id='username' type='text' placeholder='Set a username' onChange={e => setUserName(e.target.value)} />
        <label htmlFor='numOfQuestions'><h3>Number of questions: {numOfQuestions}</h3></label>
        <input type='range' min={1} max={allData.length} onChange={e => setNumOfQuestions(parseInt(e.target.value))} defaultValue={numOfQuestions} />
        <br/>
        <Button btnType='Play' text='Start game!' disabled={!userName || !numOfQuestions} />
      </form>
    </div>
  );
};

export default StartForm;