import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Index.module.css'
import { io } from 'socket.io-client'

import Image from 'next/image'


const Index: NextPage = () => {

  const [test, setTest] = useState(null); 
  const socket = io('http://localhost:50000');

  
  useEffect(() =>{
    socket.on('connect', () => {
      console.log('Connected: ', socket.connected)
    });
  },[])


  useEffect(() =>{
    socket.on('disconnect', () => {
      console.log('Connected: ', socket.connected)
    });
  },[])


  useEffect(() =>{
    socket.on('speaker_test', (data) => {
      console.log('speaker_test: ', data.action)
    });
  },[])


  useEffect(() =>{
    socket.on('fan_test', (data) => {
      console.log('fan_test: ', data.action)
    });
  },[])


  useEffect(() =>{
    socket.on('noise_test', (data) => {
      console.log('noise_test: ', data.action)
    });
  },[])

  
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

export default Index
