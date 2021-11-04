import eventlet
import socketio

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
    sio.emit('response', {'res': data}, to=sid)
    
if __name__=='__main__':
    eventlet.wsgi.server(eventlet.listen(('', 50000)), app)
