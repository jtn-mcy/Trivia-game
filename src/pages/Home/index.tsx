import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { useAppSelector, useAppDispatch, useGetRandomQuestions } from '../../api'
import { togglePlay, addQuestions, clearQuestions } from '../../state/questions/questionSlice'
import styles from './index.module.scss'

const Home: React.FC = () => {
  const inPlay = useAppSelector(state => state.question.inPlay)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleStartPlay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const questions = useGetRandomQuestions(6);

    dispatch(addQuestions(questions))
    dispatch(togglePlay());
    navigate('play')
  }

  const handleAbandonGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(clearQuestions())
    dispatch(togglePlay())
  }

  return (
    <>
      {inPlay
        ? (
          <div className={styles.HomeButtonContainer}>
            <Button text='Continue playing?' btnType='Play' onClick={() => navigate('/play')} />
            <Button text='Abandon game?' btnType='Play' onClick={handleAbandonGame} />
          </div>
        ) : (
          <Button text='Play!' btnType='Play' onClick={handleStartPlay} />
        )
      }
    </>
  )
}

export default Home