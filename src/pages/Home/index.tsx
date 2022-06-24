import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { togglePlay, clearQuestions } from '../../state/questions/questionSlice';
import StartForm from '../../components/StartForm';
import styles from './index.module.scss';

const Home: React.FC = () => {
  const [isStartPlay, setIsStartPlay] = useState<boolean>(false);
  const [isAbandon, setIsAbandon] = useState<boolean>(false);
  const inPlay = useAppSelector(state => state.question.inPlay);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAbandonGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(clearQuestions());
    dispatch(togglePlay());
  }

  return (
    <>
      {inPlay
        ? (
          <div className={styles.HomeButtonContainer}>
            <Button text='Continue playing?' btnType='Play' onClick={() => navigate('/play')} />
            {!isAbandon
              ? <Button text='Abandon game?' btnType='Play' onClick={() => setIsAbandon(true)} />
              : <Button text='Really abandon?' btnType='Abandon' onClick={handleAbandonGame} />
            }
          </div>
        ) : (
          !isStartPlay ? (
            <Button text='Play!' btnType='Play' onClick={() => setIsStartPlay(true)} />
          ) : (
            <StartForm />
          )
        )
      }
    </>
  );
};

export default Home;