import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useFanNoiseContext } from '../providers/fanNoise'
import { useSocketConnectionContext } from '../providers/socketConnection'
import Image from 'next/image'


const Home: NextPage = () => {

  const [test, setTest] = useState(null);  // const [splValue, setSplValue] = useState(null);
  // const [value, setValue] = useState(null);

  const { statusTest1,
          statusTest2,
          statusTest3,
          startTest1,
          startTest2,
          startTest3
        } = useSocketConnectionContext();
  
  return (
    <>
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Head>
          <title > Next.js Demo Project</title>
        </Head>

        <div style={{color: "white"}}>
          <h1 > Welcome to the demo Next.js project! </h1>

          <p> This project was developed by <b>Robson Sampaio</b> and it has only academic purpose </p>
        </div>
      </div>
      <div className={styles.rowValues}>
        <div className={styles.testField}>
          status:
        </div>
        <div className={styles.testField}>
          status:
        </div>
        <div className={styles.testField}>
          status:
        </div>
      </div>
    </div>
    </>

    
  )
}

export default Home
