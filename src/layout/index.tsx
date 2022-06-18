import React from 'react'
import styles from './index.module.scss'

type LayoutProps = {
  children?: JSX.Element | JSX.Element[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.Layout}>
      {children}
    </div>
  )
}

export default Layout