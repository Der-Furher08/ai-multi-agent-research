import socketio

sio = socketio.Client()

def connect_socket():
    if not sio.connected:
        sio.connect("http://localhost:5000")
        print("Connected to socket server")

def disconnect_socket():
    if sio.connected:
        sio.disconnect()
        print("Disconnected from socket server")

def emit_progress(agent, status):
    sio.emit(
        "agent-progress",
        {
            "agent": agent,
            "status": status
        }
    )