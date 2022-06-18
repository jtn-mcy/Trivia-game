import React from 'react'
import Logo from "../../IndeedLogo.svg";
import styles from './index.module.scss'

const HighScoreButton: React.FC = () => {
  return (
    <button className={styles.NavButton}>High Scores</button>
  )
}

const HomeButton: React.FC = () => {
  return (
    <button className={styles.NavButton}>Home</button>
  )
}

const Navbar: React.FC = () => {
  return (
    <div className={styles.NavBar}>
      <img src={Logo} alt='Indeed logo' className={styles.Logo} />
      <h1>
        Trivia!
      </h1>
      <div className={styles.NavButtonContainer}>
        <HomeButton />
        <HighScoreButton />
      </div>
    </div>
  )
}

export default Navbar