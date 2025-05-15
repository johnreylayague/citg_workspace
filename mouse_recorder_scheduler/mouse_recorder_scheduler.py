import time
import json
import threading
import tkinter as tk
from tkinter import messagebox, ttk
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
    last_checked = datetime.now()
    triggered_today = set()

    while True:
        now = datetime.now()
        current_time_24h = now.strftime("%H:%M:%S")  # 24-hour format
        
        # Detect manual time changes
        time_diff = (now - last_checked).total_seconds()
        if time_diff < 0 or time_diff > 3600:
            triggered_today.clear()
            update_status("System time change detected. Reset triggers.")
        last_checked = now

        # Check scheduled times (all stored in 24h format)
        for time_str_24h in sorted(scheduled_times):
            if current_time_24h.startswith(time_str_24h):
                if time_str_24h not in triggered_today:
                    triggered_today.add(time_str_24h)
                    # Convert to 12h for display
                    hour, minute, second = time_str_24h.split(':')
                    hour_int = int(hour)
                    if hour_int == 0:
                        display_time = f"12:{minute}:{second} AM"
                    elif hour_int < 12:
                        display_time = f"{hour_int}:{minute}:{second} AM"
                    elif hour_int == 12:
                        display_time = f"12:{minute}:{second} PM"
                    else:
                        display_time = f"{hour_int-12}:{minute}:{second} PM"
                    
                    update_status(f"Triggering replay for {display_time}")
                    start_replay()

        time.sleep(1)

def add_schedule_time():
    hour = hour_var.get()
    minute = minute_var.get()
    second = second_var.get()
    ampm = ampm_var.get()
    
    # Convert 12-hour format to 24-hour for internal storage
    if ampm == "PM" and hour != "12":
        hour_24 = str(int(hour) + 12)
    elif ampm == "AM" and hour == "12":
        hour_24 = "00"
    else:
        hour_24 = hour.zfill(2)
        
    time_str_24h = f"{hour_24}:{minute}:{second}"
    time_str_12h = f"{hour}:{minute}:{second} {ampm}"
    
    if time_str_24h not in scheduled_times:
        scheduled_times.add(time_str_24h)
        update_time_listbox()
        update_status(f"Added time {time_str_12h}")
    else:
        update_status(f"Time {time_str_12h} already scheduled.")

def delete_schedule_time():
    try:
        selected_time = time_listbox.get(time_listbox.curselection())
        # Convert displayed 12h time back to 24h format for removal
        time_str, ampm = selected_time.rsplit(' ', 1)
        hour, minute, second = time_str.split(':')
    
        if ampm == "PM" and hour != "12":
            hour_24 = str(int(hour) + 12)
        elif ampm == "AM" and hour == "12":
            hour_24 = "00"
        else:
            hour_24 = hour.zfill(2)
            
        time_str_24h = f"{hour_24}:{minute}:{second}"
        
        scheduled_times.remove(time_str_24h)
        update_time_listbox()
        update_status(f"Deleted time {selected_time}")
    except:
        messagebox.showerror("Error", "Please select a time to delete.")

def update_time_listbox():  
    time_listbox.delete(0, tk.END)  
    for t in sorted(scheduled_times):
        # Convert 24h time to 12h for display
        hour, minute, second = t.split(':')
        hour_int = int(hour)
        
        if hour_int == 0:
            display_hour = "12"
            ampm = "AM"
        elif hour_int < 12:
            display_hour = str(hour_int)
            ampm = "AM"
        elif hour_int == 12:
            display_hour = "12"
            ampm = "PM"
        else:
            display_hour = str(hour_int - 12)
            ampm = "PM"
            
        time_listbox.insert(tk.END, f"{display_hour}:{minute}:{second} {ampm}")

def on_key_press(key):
    if key == keyboard.Key.f9:
        toggle_recording()
    elif key == keyboard.Key.f10:
        toggle_replay()

def start_keyboard_listener():
    listener = keyboard.Listener(on_press=on_key_press)
    listener.daemon = True
    listener.start()

# GUI Setup
root = tk.Tk()
root.title("Mouse Tracker + Click Recorder")
root.geometry("400x450")
root.resizable(False, False)

title_label = tk.Label(root, text="Mouse Recorder & Clicks", font=("Arial", 14)) 
title_label.pack(pady=10) 

record_button = tk.Button(root, text="Start Recording", width=20, command=toggle_recording) 
record_button.pack(pady=5) 

replay_button = tk.Button(root, text="Replay", width=20, command=toggle_replay)
replay_button.pack(pady=5)

# Time selection widgets
hour_var = tk.StringVar(value="12")
minute_var = tk.StringVar(value="00")
second_var = tk.StringVar(value="00")
ampm_var = tk.StringVar(value="AM")

time_frame = tk.Frame(root)
time_frame.pack(pady=5)

# Hour dropdown (1-12)
hour_label = tk.Label(time_frame, text="Hour:")
hour_label.pack(side=tk.LEFT)
hour_menu = ttk.Combobox(time_frame, textvariable=hour_var, 
                        values=[f"{i}" for i in range(1, 13)], width=3, state="readonly")
hour_menu.pack(side=tk.LEFT, padx=2)

# Minute dropdown
minute_label = tk.Label(time_frame, text="Min:")
minute_label.pack(side=tk.LEFT)
minute_menu = ttk.Combobox(time_frame, textvariable=minute_var, 
                          values=[f"{i:02d}" for i in range(60)], width=3, state="readonly")
minute_menu.pack(side=tk.LEFT, padx=2)

# Second dropdown
second_label = tk.Label(time_frame, text="Sec:")
second_label.pack(side=tk.LEFT)
second_menu = ttk.Combobox(time_frame, textvariable=second_var, 
                          values=[f"{i:02d}" for i in range(60)], width=3, state="readonly")
second_menu.pack(side=tk.LEFT, padx=2)

# AM/PM dropdown
ampm_menu = ttk.Combobox(time_frame, textvariable=ampm_var, 
                        values=["AM", "PM"], width=3, state="readonly")
ampm_menu.pack(side=tk.LEFT, padx=2)

schedule_button = tk.Button(root, text="Add Replay Time", command=add_schedule_time)
schedule_button.pack(pady=5)

time_listbox = tk.Listbox(root, height=5, width=20)
time_listbox.pack(pady=5)

delete_button = tk.Button(root, text="Delete Selected Time", command=delete_schedule_time)
delete_button.pack(pady=5)

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