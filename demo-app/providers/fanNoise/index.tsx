import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'use-context-selector';
import { io } from 'socket.io-client';

interface FanNoiseContextProps {
    
  init: () => void;
  requestSoundLevel: () => void;
  soundLevel: number;
    
}

const FanNoiseContext = createContext<FanNoiseContextProps>(
  {} as FanNoiseContextProps,
);

const FanNoiseProvider: React.FC = ({ children }) => {

    
    const [soundLevel, setSoundLevel] = useState(0);
    const socket = io('http://localhost:50000');

    function init(){
      // const socket  = io('http://localhost:50000');
      // console.log("Init Socket connection: ", socket.connected)
    }

    function requestSoundLevel(){ 
      // socket.open()  
      if(socket.connected){
        console.log("Socket connected: ", socket.connected)
        socket.emit('request', 'Sound Level')
        socket.on('response', (data) => { 
          console.log(data.res)
          setSoundLevel(data.res)               
          // setTimeout(() => {
              
          // }, 1000)
        })
        // socket.close()
      }
      else if(!socket.connected){
        console.log("Socket connected: ", socket.connected)
      }
    }
 

  return (
    <FanNoiseContext.Provider
      value={{
        init, 
        requestSoundLevel,
        soundLevel
      }}
    >
      {children}
    </FanNoiseContext.Provider>
  );
};

function useFanNoiseContext() {
  const context = useContext(FanNoiseContext);
  return context;
}

export { FanNoiseProvider, useFanNoiseContext };
