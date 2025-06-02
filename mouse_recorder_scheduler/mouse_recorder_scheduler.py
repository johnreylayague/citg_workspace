import json
import time
import threading
import tkinter as tk
from tkinter import messagebox
from pynput import mouse, keyboard
from pynput.mouse import Controller, Button

recording = False
replaying = False
events_log = []
interval_seconds = 10
mouse_listener = None
replay_thread = None
stop_replay_event = threading.Event()

def on_move(x, y):
    if recording:
        timestamp = time.time()
        events_log.append(("move", timestamp, x, y))

def on_click(x, y, button, pressed):
    if recording:
        timestamp = time.time()
        events_log.append(("click", timestamp, x, y, str(button), pressed))

def start_recording():
    global recording, events_log, mouse_listener
    events_log = []
    recording = True
    update_status("Recording...")

    def run_listener():
        global mouse_listener
        mouse_listener = mouse.Listener(on_move=on_move, on_click=on_click)
        mouse_listener.start()
        mouse_listener.join()

    threading.Thread(target=run_listener, daemon=True).start()

def stop_recording():
    global recording, mouse_listener
    recording = False
    if mouse_listener:
        mouse_listener.stop()
        mouse_listener = None
    with open("mouse_log.json", "w") as f:
        json.dump(events_log, f)
    update_status("Recording saved.")

def toggle_recording():
    if recording:
        stop_recording()
    else:
        start_recording()

def toggle_replay():
    global replaying
    if replaying:
        stop_replay_event.set()
        replaying = False
        update_status("Stopped replay.")
    else:
        stop_replay_event.clear()
        start_replay()

def start_replay():
    global replaying, replay_thread
    replaying = True
    update_status(f"Replaying every {interval_seconds}s...")

    def replay_loop():
        try:
            with open("mouse_log.json", "r") as f:
                loaded_events = json.load(f)
        except:
            messagebox.showerror("Error", "No recording found.")
            return

        mouse_controller = Controller()

        while not stop_replay_event.is_set():
            start_time = time.time()
            for i, event in enumerate(loaded_events):
                if stop_replay_event.is_set():
                    break
                wait_time = 0 if i == 0 else event[1] - loaded_events[i - 1][1]
                if stop_replay_event.wait(timeout=wait_time):
                    break
                if event[0] == "move":
                    _, _, x, y = event
                    mouse_controller.position = (x, y)
                elif event[0] == "click":
                    _, _, x, y, button_str, pressed = event
                    mouse_controller.position = (x, y)
                    button = Button.left if "left" in button_str else Button.right
                    if pressed:
                        mouse_controller.press(button)
                    else:
                        mouse_controller.release(button)

            elapsed = time.time() - start_time
            remaining = max(0, interval_seconds - elapsed)
            if stop_replay_event.wait(timeout=remaining):
                break

        update_status("Replay stopped.")

    replay_thread = threading.Thread(target=replay_loop, daemon=True)
    replay_thread.start()

def update_status(msg):
    status_label.config(text="Status: " + msg)

def update_interval(*args):
    global interval_seconds
    try:
        sec = int(interval_var.get())
        interval_seconds = max(1, sec)
        update_status(f"Interval set to {interval_seconds}s.")
    except:
        pass  # silently ignore invalid input

def on_key_press(key):
    if key == keyboard.Key.f9:
        toggle_recording()
    elif key == keyboard.Key.f10:
        toggle_replay()

keyboard.Listener(on_press=on_key_press).start()

# GUI
root = tk.Tk()
root.title("Simple Mouse Auto-Replay")
root.geometry("300x200")

tk.Label(root, text="Replay Interval (seconds):").pack(pady=5)

interval_var = tk.StringVar()
interval_var.set("10")
interval_var.trace_add("write", update_interval)

interval_entry = tk.Entry(root, width=10, textvariable=interval_var)
interval_entry.pack()

status_label = tk.Label(root, text="Status: Idle", fg="blue")
status_label.pack(pady=10)

shortcut_label = tk.Label(root, text="F9 = Record | F10 = Auto-Replay", fg="gray")
shortcut_label.pack(pady=5)

root.mainloop()
