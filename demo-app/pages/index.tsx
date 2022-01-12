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
      console.log('Connected socket: ', socket.connected)
    });
  },[])

  useEffect(() =>{
    socket.on('disconnect', () => {
      console.log('Connected socket: ', socket.connected)
    });
  },[])

  useEffect(() =>{
    socket.on('speaker_test', (data) => {
      console.log('speaker_test: ', data.action)
    });
  },[])

  useEffect(() =>{
    socket.on('noise_test', (data) => {
      console.log('noise_test: ', data.action)
    });
  },[])

  
  useEffect(() =>{
    socket.on('mqtt_connected', (data) => {
      console.log('mqtt_connected: ', data)
    });
  },[])

  useEffect(() =>{
    socket.on('mqtt_connection_fail', (data) => {
      console.log('mqtt_connection_fail: ', data)
    });
  },[])

  useEffect(() =>{
    socket.on('mqtt_connected', (data) => {
      console.log('mqtt_connected: ', data)
    });
  },[])

  function set_credentials(){
    socket.volatile.emit('set_credentials', {
      user: 'mqtt-test',
      psk: 'mqtt-test',
      address: 'broker.hivemq.com',
      port: 1883
    });
  }
  
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
        <button onClick={set_credentials}>Add</button>
      </div>
    </div>
    </>

    
  )
}

export default Index
