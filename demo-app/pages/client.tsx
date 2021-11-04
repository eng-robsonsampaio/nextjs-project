import { privateEncrypt } from 'crypto';
import { io } from 'socket.io-client'
import React, {useState} from 'react'

// window.navigator.userAgent = 'react-native';

const socket = io('http://localhost:50000');
// const [soundLevel, setSoundLevel] = useState(null);


export function requestSoundLevel(){
    
    console.log('Request sound level')
    if(socket.connected){
        socket.emit('request', 'sound_level')

        socket.on('sound_level', (data) => {
            console.log(data)
        })
    }
}

export function handlerWebSocket (req, res){

    socket.on('connect', () => {        
        console.log('Connected: ', socket.connected)
        console.log('Id: ', socket.id);
        console.log(req, res)
    })

    // socket.emit("request", 'sound_level');

    socket.on('sound_level', (data) => {        
        console.log(data)
    })
      
    socket.on("disconnect", () => {
        console.log('Connected: ', socket.connected)
        console.log('Id: ', socket.id);
        console.log(req, res)
    });
};