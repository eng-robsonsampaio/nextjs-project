import eventlet
import socketio
from random import randint

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('Connected: ', sid)

@sio.event
def disconnect(sid):
    print('Disconnected: ', sid)

@sio.event
def request(sid, data):
    print('request: ', data)
    for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
        value = randint(10, 30)
        print(" ************ ")
        print(f"\n{value}\n")
        print(" ************ ")
        sio.emit('response', {'res': value}, to=sid)
        eventlet.sleep(0.7)
    
if __name__=='__main__':
    eventlet.wsgi.server(eventlet.listen(('', 50000)), app)
