import React from 'react';
import Logo from "../../eevee.svg";
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { useAppSelector } from '../../hooks';

const HighScoreButton: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const navigate = useNavigate();
  return (
    <Button btnType='NavButton' onClick={() => navigate('/highscores')} text='High Scores' disabled={disabled} />
  );
};

const HomeButton: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const navigate = useNavigate();

  return (
    <Button btnType='NavButton' onClick={() => navigate('/home')} text='Home' disabled={disabled} />
  );
};

const Navbar: React.FC = () => {
  const inSubmission = useAppSelector((state) => state.question.isLastSubmit);

  return (
    <div className={styles.NavBar}>
      <img src={Logo} alt='Indeed logo' className={styles.Logo} />
      <h1 className={styles.Title}>
        Trivia
      </h1>
      <div className={styles.NavButtonContainer}>
        <HomeButton disabled={inSubmission} />
        <HighScoreButton disabled={inSubmission} />
      </div>
    </div>
  );
};

export default Navbar;