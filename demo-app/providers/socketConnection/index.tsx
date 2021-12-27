import React, { useState, useEffect } from 'react';
import { createContext, useContext } from 'use-context-selector';
import { io } from 'socket.io-client'

interface SocketConnectionContextProps {
    
    startTest1: () => void;
    statusTest1: number;
    startTest2: () => void;
    statusTest2: number;
    startTest3: () => void;
    statusTest3: number;
      
}

const SocketConnectionContext = createContext<SocketConnectionContextProps>(
    {} as SocketConnectionContextProps,
);

const SocketConnectionProvider: React.FC = ({ children }) => {

    const [statusTest1, setStatusTest1] = useState(0);
    const [statusTest2, setStatusTest2] = useState(0);
    const [statusTest3, setStatusTest3] = useState(0);
    const socket = io('http://localhost:50000');

    socket.on('teste_um', (data) => {
      console.log('Dentro o teste 1')
      console.log(data)
    })

    socket.on('teste_dois', (data) => {
      console.log('Dentro o teste 2')
      console.log(data)
    })

    socket.on('teste_tres', (data) => {
      console.log('Dentro o teste 31')
      console.log(data)
    })

    function startTest1(){
      // if(socket.connected){
      //   console.log("Socket connected: ", socket.connected)
      //   socket.on('teste_um', (data) => { 
      //     console.log(data)             
      //   })
      // }
      // else if(!socket.connected){
      //   console.log("Socket connected: ", socket.connected)
      // }
      //   return statusTest1
    }

    function startTest2(){
        
      return statusTest2
    }

    function startTest3(){
          
      return statusTest3
    }

    return (
        <SocketConnectionContext.Provider
          value={{
            startTest1,
            startTest2,
            startTest3,
            statusTest1,
            statusTest2,
            statusTest3
          }}
        >
          {children}
        </SocketConnectionContext.Provider>
      );
};

function useSocketConnectionContext() {
    const context = useContext(SocketConnectionContext);
    return context;
  }
  
  export { SocketConnectionProvider, useSocketConnectionContext };