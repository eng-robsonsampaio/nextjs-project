import eventlet
import socketio
from random import randint

sio = socketio.Server(cors_allowed_origins="*", async_mode='eventlet')
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ):
    print('Connected: ', sid)


@sio.event
def disconnect(sid):
    print('Disconnected: ', sid)


def start_test():
    while(1):
        sio.sleep(5)
        print('Inicia teste')
        sio.emit('teste_um', {'value':True})


def start_server():
    eventlet.wsgi.server(eventlet.listen(('', 50000)), app)


def main():
    sio.start_background_task(start_test)
    start_server()
    
    
if __name__=='__main__':
    main()
