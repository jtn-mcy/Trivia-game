import React from 'react'
import styles from './index.module.scss'
import NavBar from '../components/NavBar'
import CurrentUser from '../components/CurrentUser'
import Score from '../components/Score'

type LayoutProps = {
  children?: JSX.Element | JSX.Element[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.Layout}>
      <NavBar />
      <CurrentUser />
      <Score />
      <div className={styles.GameArea}>
      {children}
      </div>
    </div>
  )
}

export default Layout