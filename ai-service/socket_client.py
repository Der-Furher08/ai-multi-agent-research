import socketio

sio = socketio.Client()

def connect_socket():
    try:
        sio.connect("http://localhost:5000")
        print("Socket connected")
    except Exception as e:
        print("Socket unavailable:", e)
        
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