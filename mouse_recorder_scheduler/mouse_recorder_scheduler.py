import time
import json
import threading
import tkinter as tk
from tkinter import messagebox
from pynput import mouse, keyboard
from datetime import datetime
from pynput.mouse import Controller, Button

events_log = []
recording = False
replaying = False
mouse_listener = None
replay_thread = None
scheduled_times = set()
triggered_today = set()

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

    def run_mouse_listener():
        global mouse_listener
        mouse_listener = mouse.Listener(on_move=on_move, on_click=on_click)
        mouse_listener.start()
        mouse_listener.join()

    threading.Thread(target=run_mouse_listener, daemon=True).start()
    record_button.config(text="Stop Recording")

def stop_recording():
    global recording, mouse_listener
    recording = False
    if mouse_listener:
        mouse_listener.stop()
    mouse_listener = None

    with open("mouse_log.json", "w") as f:
        json.dump(events_log, f)
    update_status("Recording stopped and saved.")
    record_button.config(text="Start Recording")

def toggle_recording():
    if recording:
        stop_recording()
    else:
        start_recording()

def toggle_replay():
    global replaying
    if replaying:
        replaying = False  # Signal to stop
        update_status("Replay stopping...")
    else:
        start_replay()

def start_replay():
    global replaying, replay_thread
    def replay():
        global replaying
        root.attributes("-disabled", True)
        try:
            with open("mouse_log.json", "r") as f:
                loaded_events = json.load(f)
        except FileNotFoundError:
            messagebox.showerror("Error", "No recording found.")
            root.attributes("-disabled", False)
            return

        if not loaded_events:
            messagebox.showinfo("Info", "No events to replay.")
            root.attributes("-disabled", False)
            return

        mouse_controller = Controller()
        update_status("Replaying...")
        replaying = True

        for i, event in enumerate(loaded_events):
            if not replaying:
                break

            event_type = event[0]
            timestamp = event[1]
            wait_time = 0
            if i > 0:
                wait_time = timestamp - loaded_events[i - 1][1]
            time.sleep(wait_time)

            if not replaying:
                break

            if event_type == "move":
                _, _, x, y = event
                mouse_controller.position = (x, y)
            elif event_type == "click":
                _, _, x, y, button_str, pressed = event
                mouse_controller.position = (x, y)
                button = Button.left if "left" in button_str else Button.right
                if pressed:
                    mouse_controller.press(button)
                else:
                    mouse_controller.release(button)

        replaying = False
        update_status("Replay complete.")
        root.attributes("-disabled", False)
        root.lift()
        root.focus_force()

    replay_thread = threading.Thread(target=replay, daemon=True)
    replay_thread.start()

def update_status(message):
    status_label.config(text=f"Status: {message}")

def time_scheduler():
    global triggered_today
    while True:
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")  # Use full time (HH:MM:SS) for comparison

        # Compare current time with scheduled times
        for time_str in list(scheduled_times):
            if current_time.startswith(time_str):  # Check if current time matches the scheduled time
                if time_str not in triggered_today:
                    triggered_today.add(time_str)
                    start_replay()

        # Reset every midnight
        if current_time == "00:00:00":
            triggered_today.clear()

        time.sleep(1)  # Check every second

def add_schedule_time():
    time_str = time_entry.get().strip()
    # Validate time format (HH:MM:SS or HH:MM)
    if len(time_str) >= 5 and time_str[2] == ":" and time_str.replace(":", "").isdigit():
        try:
            if len(time_str) == 5:  # HH:MM format
                scheduled_times.add(time_str + ":00")  # Add seconds as 00 for HH:MM
            elif len(time_str) == 8:  # HH:MM:SS format
                hours, minutes, seconds = map(int, time_str.split(":"))
                if hours < 24 and minutes < 60 and seconds < 60:
                    scheduled_times.add(time_str)
                else:
                    raise ValueError("Invalid time value.")
            else:
                raise ValueError("Invalid time format.")
            update_time_listbox()
            update_status(f"Added time {time_str}")
            time_entry.delete(0, tk.END)
        except ValueError as e:
            messagebox.showerror("Invalid time", str(e))
    else:
        messagebox.showerror("Invalid time", "Please enter time in HH:MM or HH:MM:SS format.")

def delete_schedule_time():
    try:
        selected_time = time_listbox.get(time_listbox.curselection())
        scheduled_times.remove(selected_time)
        update_time_listbox()
        update_status(f"Deleted time {selected_time}")
    except:
        messagebox.showerror("Error", "Please select a time to delete.")

def update_time_listbox():
    time_listbox.delete(0, tk.END)
    for t in sorted(scheduled_times):
        time_listbox.insert(tk.END, t)

# --- Global Keyboard Listener ---
def on_key_press(key):
    if key == keyboard.Key.f9:
        toggle_recording()
    elif key == keyboard.Key.f10:
        toggle_replay()

def start_keyboard_listener():
    listener = keyboard.Listener(on_press=on_key_press)
    listener.daemon = True
    listener.start()

# --- GUI Setup ---
root = tk.Tk()
root.title("Mouse Tracker + Click Recorder")
root.geometry("320x400")
root.resizable(False, False)
root.attributes('-topmost', True)

title_label = tk.Label(root, text="Mouse Recorder & Clicks", font=("Arial", 14))
title_label.pack(pady=10)

record_button = tk.Button(root, text="Start Recording", width=20, command=toggle_recording)
record_button.pack(pady=5)

replay_button = tk.Button(root, text="Replay", width=20, command=toggle_replay)
replay_button.pack(pady=5)

# Time input
time_entry = tk.Entry(root, width=10)
time_entry.pack(pady=2)

schedule_button = tk.Button(root, text="Add Replay Time", command=add_schedule_time)
schedule_button.pack(pady=2)

# Listbox to show times
time_listbox = tk.Listbox(root, height=5)
time_listbox.pack(pady=5)

# Delete Button
delete_button = tk.Button(root, text="Delete Selected Time", command=delete_schedule_time)
delete_button.pack(pady=2)

status_label = tk.Label(root, text="Status: Idle", fg="blue")
status_label.pack(pady=10)

instructions_label = tk.Label(
    root,
    text="Keyboard Shortcuts:\nF9  - Start/Stop Recording\nF10 - Start/Stop Replay",
    font=("Arial", 10),
    fg="gray"
)
instructions_label.pack(pady=5)

# Start background services
start_keyboard_listener()
threading.Thread(target=time_scheduler, daemon=True).start()

root.mainloop()
