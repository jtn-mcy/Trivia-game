import React from 'react'
import Logo from "../../IndeedLogo.svg";
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const HighScoreButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button btnType='NavButton' onClick={() => navigate('/highscores')} text='High Scores' />
  )
}

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button btnType='NavButton' onClick={() => navigate('/home')} text='Home' />
  )
}

const Navbar: React.FC = () => {
  return (
    <div className={styles.NavBar}>
      <img src={Logo} alt='Indeed logo' className={styles.Logo} />
      <h1 className={styles.Title}>
        Trivia
      </h1>
      <div className={styles.NavButtonContainer}>
        <HomeButton />
        <HighScoreButton />
      </div>
    </div>
  )
}

export default Navbar