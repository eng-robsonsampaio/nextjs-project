import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'use-context-selector';
import { io } from 'socket.io-client';

interface FanNoiseContextProps {
    // initSocket: () => void;
    requestSoundLevel: () => void;
    soundLevel: number;
    
}



const FanNoiseContext = createContext<FanNoiseContextProps>(
  {} as FanNoiseContextProps,
);
const FanNoiseProvider: React.FC = ({ children }) => {

    const socket  = io('http://localhost:50000');
    const [soundLevel, setSoundLevel] = useState(0);

    function requestSoundLevel(){
        
       
        console.log('Request sound level')

        if(socket.connected){
            socket.emit('request', 'sound_level')

            socket.on('sound_level', (data) => {
                console.log('Data: ', data)                
                setTimeout(() => {
                    setSoundLevel(data.res)
                }, 1000)
            })
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
