import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'use-context-selector';
import { io } from 'socket.io-client';

interface FanNoiseContextProps {
    
  requestSoundLevel: () => void;
  soundLevel: number;
    
}

const FanNoiseContext = createContext<FanNoiseContextProps>(
  {} as FanNoiseContextProps,
);

const FanNoiseProvider: React.FC = ({ children }) => {

    
    const [soundLevel, setSoundLevel] = useState(0);
    const socket = io('http://localhost:50000');

    function requestSoundLevel(){ 
      
      if(socket.connected){
        console.log("Socket connected: ", socket.connected)
        socket.emit('request', 'Sound Level')
        socket.on('response', (data) => { 
          console.log(data.res)
          setSoundLevel(data.res)               
        })
      }
      else if(!socket.connected){
        console.log("Socket connected: ", socket.connected)
      }
    }
 

  return (
    <FanNoiseContext.Provider
      value={{
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
