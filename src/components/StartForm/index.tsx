import React, { useContext, useEffect, useState } from 'react';
import { UserNameContext } from '../../contexts/UserName';
import { togglePlay, addQuestions, reset } from '../../state/questions/questionSlice';
import { useGetRandomQuestions, useAppDispatch, useGetCategories, useGetNumberOfCategoryQuestions } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import styles from './index.module.scss';
import { QuestionCategory } from '../../types';

const StartForm: React.FC = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const categories = useGetCategories();
  const [selectedNumOfQuestions, setSelectedNumOfQuestions] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const numberOfQuestions = useGetNumberOfCategoryQuestions(selectedCategory);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedNumOfQuestions(1)
  }, [selectedCategory]);

  const resetAndStartGame = () => {
    const questions = useGetRandomQuestions(selectedNumOfQuestions, selectedCategory);
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
        <input
          id='username'
          type='text'
          placeholder='Username'
          className={styles.Input}
          onChange={e => setUserName(e.target.value)}
          defaultValue={''}
        />

        <label htmlFor='categories'><h3>Optional: Choose a category.</h3></label>
        <select
          id='categories'
          name='categories'
          className={styles.Select}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value as QuestionCategory | 'all')}
        >
          <option value='all'>Any</option>
          {categories && categories.map(category =>
            <option key={category} value={category}>{category[0].toUpperCase() + category.slice(1)}</option>)}
        </select>

        <label htmlFor='numOfQuestions'><h3>Maximum of questions: {numberOfQuestions}</h3></label>
        <input
          type='number'
          className={styles.Input}
          min={1}
          max={numberOfQuestions}
          defaultValue={numberOfQuestions}
          onChange={e => setSelectedNumOfQuestions(parseInt(e.target.value))}
        />
        <br/>

        <Button btnType='Play' text='Start game!' disabled={!userName || !selectedNumOfQuestions} />
      </form>
    </div>
  );
};

export default StartForm;