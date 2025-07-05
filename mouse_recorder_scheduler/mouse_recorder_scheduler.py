import time
import json
import threading
import tkinter as tk
from tkinter import ttk, messagebox
from pynput import mouse, keyboard
from pynput.mouse import Controller, Button

# Globals
events_log = []
recording = False
replaying = False
interval = 3600
replay_thread = None
mouse_controller = Controller()
status_var = None  # Tkinter StringVar for status

# Mouse Event Handlers
def on_click(x, y, button, pressed):
    if recording:
        events_log.append({
            "type": "click",
            "x": x,
            "y": y,
            "button": str(button),
            "pressed": pressed,
            "time": time.time()
        })

def on_move(x, y):
    if recording:
        events_log.append({
            "type": "move",
            "x": x,
            "y": y,
            "time": time.time()
        })

# File I/O
def save_events():
    with open("mouse_log.json", "w") as f:
        json.dump(events_log, f)

def load_events():
    try:
        with open("mouse_log.json", "r") as f:
            return json.load(f)
    except:
        return []

# Replay Logic
def replay_events():
    global replaying
    while replaying:
        events = load_events()
        if not events:
            set_status("No events to replay")
            return
        start_time = events[0]["time"]
        for event in events:
            if not replaying:
                break
            delay = event["time"] - start_time
            time.sleep(delay)
            if event["type"] == "move":
                mouse_controller.position = (event["x"], event["y"])
            elif event["type"] == "click":
                btn = Button.left if "left" in event["button"] else Button.right
                if event["pressed"]:
                    mouse_controller.press(btn)
                else:
                    mouse_controller.release(btn)
            start_time = event["time"]
        time.sleep(interval)

# Status Update
def set_status(text):
    if status_var:
        status_var.set(f"Status: {text}")

# Keyboard Hotkeys
def on_press(key):
    global recording, replaying, events_log, replay_thread

    if key == keyboard.Key.f9:
        recording = not recording
        if recording:
            events_log = []
            set_status("Recording...")
        else:
            save_events()
            set_status("Stopped")

    elif key == keyboard.Key.f10:
        replaying = not replaying
        if replaying:
            set_status("Replaying...")
            replay_thread = threading.Thread(target=replay_events, daemon=True)
            replay_thread.start()
        else:
            set_status("Stopped")

def start_keyboard_listener():
    keyboard.Listener(on_press=on_press).start()

def start_mouse_listener():
    mouse.Listener(on_click=on_click, on_move=on_move).start()

# Interval Update
def on_interval_change(*args):
    global interval
    try:
        new_value = int(interval_var.get())
        interval = new_value
    except ValueError:
        pass  # Invalid input ignored

# GUI Setup
root = tk.Tk()
root.title("Mouse Interval Recorder")

frame = ttk.Frame(root, padding=10)
frame.pack()

ttk.Label(frame, text="Set Interval (in seconds):").grid(row=0, column=0, sticky="w")
interval_var = tk.StringVar(value="3600")
interval_var.trace_add("write", on_interval_change)
interval_entry = ttk.Entry(frame, textvariable=interval_var)
interval_entry.grid(row=0, column=1)

ttk.Label(frame, text="F9 = Record/Stop | F10 = Replay/Stop").grid(row=1, columnspan=2, pady=5)

status_var = tk.StringVar(value="Status: Idle")
ttk.Label(frame, textvariable=status_var, foreground="blue").grid(row=2, columnspan=2, pady=5)

# Start Listeners
start_keyboard_listener()
start_mouse_listener()

root.mainloop()
