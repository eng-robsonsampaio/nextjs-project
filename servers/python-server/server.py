import eventlet
from random import randint
from statistics import mean
from time import sleep
import json
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_socketio import SocketIO

eventlet.monkey_patch()
app = Flask(__name__)
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = 'broker.hivemq.com'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False

mqtt = Mqtt(app)
mqtt.subscribe('robson/test_suite/')
sio = SocketIO(app, cors_allowed_origins="*")


@sio.on('connect')
def connect():
    print('Connected')


@sio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'])


@sio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'])


def do_something(val):
    for i in range(val):
        print(i+1)
        sio.sleep(1)


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    payload=message.payload.decode()
    payload = json.loads(payload)
    print(f"Data: {payload}")
    print('Speaker_test')
    sio.emit('speaker_test', {'action':'start'})
    do_something(5)
    sio.emit('speaker_test', {'action':'stop'})
    do_something(1)
    print('Fan_test')
    sio.emit('fan_test', {'action':'start'})
    do_something(10)
    print('Noise_test')
    sio.emit('noise_test', {'action':'start'})
    do_something(30) 
    sio.emit('fan_test', {'action':'stop'})
    sio.emit('noise_test', {'action':'stop'})



@sio.event
def calibration_init(sid):
    sio.sleep(0.5)
    sio.emit('listening', {'value': False}, to=sid)


@sio.event
def calibration_save(sid, data):
    sio.sleep(0.5)
    sio.emit('calibration', {'value': True}, to=sid)


@sio.event
def noise_threshold(sid, data):
    sio.sleep(0.5)
    sio.emit('noise_threshold', {'value': True}, broadcast=True)

if __name__ == '__main__':
    sio.run(app, port=50000, debug=True)