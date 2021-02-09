import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Spinner from 'react-bootstrap/Spinner'

export default function Home() {

  const [num, setNum] = useState(0)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("Nothing!")

  useEffect(() => {
    while (num < 6) {
      const interval = setInterval(() => {
        setNum(p => p += 1)
        console.log(num)
        if (num >= 5) {
          setShow(true)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [num, show])

  function handleClick() {
    setShow(false)
    setMessage("All Caught Up!")
  }

  return (
    <div className={styles.Not}>
      <h1>LOL</h1>
      {show ? (<button className={styles.abs} onClick={handleClick}>LOL</button>) : (<div>{message}</div>)}
      <Spinner animation="border" variant="primary" />
    </div>
  )
}
