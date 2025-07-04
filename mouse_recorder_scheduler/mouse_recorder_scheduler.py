import json
import time
import threading
import tkinter as tk
from tkinter import messagebox
from pynput import mouse, keyboard
from pynput.mouse import Controller, Button
import logging
from logging.handlers import RotatingFileHandler
import gc
import psutil
import os

# Setup rotating logging with 1MB per file, keeping 3 backups
log_handler = RotatingFileHandler(
    "mouse_replay.log", maxBytes=1_000_000, backupCount=3
)
log_formatter = logging.Formatter(
    fmt="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%I:%M:%S %p %m/%d/%Y"
)
log_handler.setFormatter(log_formatter)
logging.basicConfig(level=logging.INFO, handlers=[log_handler])

recording = False
replaying = False
events_log = []
interval_seconds = 10
mouse_listener = None
replay_thread = None
stop_replay_event = threading.Event()

def now():
    return time.monotonic()

def get_memory_usage():
    try:
        process = psutil.Process(os.getpid())
        return process.memory_info().rss / (1024 * 1024)  # in MB
    except Exception as e:
        logging.error(f"Memory reading error: {e}")
        return 0.0

def on_move(x, y):
    if recording:
        timestamp = now()
        events_log.append(("move", timestamp, x, y))

def on_click(x, y, button, pressed):
    if recording:
        timestamp = now()
        events_log.append(("click", timestamp, x, y, str(button), pressed))

def start_recording():
    global recording, events_log, mouse_listener
    events_log = []
    recording = True
    logging.info("Recording started.")
    update_status("Recording...")

    def run_listener():
        global mouse_listener
        try:
            mouse_listener = mouse.Listener(on_move=on_move, on_click=on_click)
            mouse_listener.start()
            mouse_listener.join()
        except Exception as e:
            logging.error("Listener error", exc_info=True)
            update_status(f"Listener error: {type(e).__name__}: {e}")

    threading.Thread(target=run_listener, daemon=True).start()

def stop_recording():
    global recording, mouse_listener
    recording = False
    if mouse_listener:
        mouse_listener.stop()
        mouse_listener = None
    try:
        with open("mouse_log.json", "w") as f:
            json.dump(events_log, f)
        logging.info("Recording stopped and saved to mouse_log.json.")
        update_status("Recording saved.")
        mem = get_memory_usage()
        logging.info(f"Memory usage: {mem:.2f} MB")
    except Exception as e:
        logging.error("Save error", exc_info=True)
        update_status(f"Save error: {type(e).__name__}: {e}")

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
        logging.info("Replay manually stopped.")
        update_status("Stopped replay.")
    else:
        stop_replay_event.clear()
        start_replay()

def start_replay():
    global replaying, replay_thread
    replaying = True
    logging.info(f"Replay started with interval {interval_seconds}s.")
    update_status(f"Replaying every {interval_seconds}s...")

    def replay_loop():
        try:
            with open("mouse_log.json", "r") as f:
                loaded_events = json.load(f)
            logging.info(f"{len(loaded_events)} events loaded from mouse_log.json.")
        except Exception as e:
            logging.error("Error loading mouse_log.json", exc_info=True)
            messagebox.showerror("Error", f"No recording found or file error: {e}")
            update_status("Replay error.")
            return

        if not loaded_events:
            update_status("Empty event list.")
            return

        mouse_controller = Controller()

        while not stop_replay_event.is_set():
            start_time = now()
            mem_before = get_memory_usage()

            for i, event in enumerate(loaded_events):
                if stop_replay_event.is_set():
                    break
                try:
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
                except Exception as e:
                    logging.error("Replay event error", exc_info=True)
                    update_status(f"Replay event error: {type(e).__name__}: {e}")

            elapsed = now() - start_time
            gc.collect()
            mem_after = get_memory_usage()
            released = mem_before - mem_after
            logging.info("Replay cycle completed.")
            logging.info(f"Memory before GC: {mem_before:.2f} MB, after GC: {mem_after:.2f} MB, released: {released:.2f} MB")
            remaining = max(0, interval_seconds - elapsed)
            if stop_replay_event.wait(timeout=remaining):
                break

        logging.info("Replay loop exited.")
        update_status("Replay stopped.")

    replay_thread = threading.Thread(target=replay_loop, daemon=True)
    replay_thread.start()

def update_status(msg):
    logging.info(msg)
    print("[STATUS]", msg)
    status_label.config(text="Status: " + msg)

def update_interval(*args):
    global interval_seconds
    try:
        sec = int(interval_var.get())
        interval_seconds = max(1, sec)
        logging.info(f"Interval updated to {interval_seconds}s.")
        update_status(f"Interval set to {interval_seconds}s.")
    except Exception as e:
        logging.error("Interval update error", exc_info=True)
        update_status(f"Interval update error: {type(e).__name__}: {e}")

def on_key_press(key):
    try:
        if key == keyboard.Key.f9:
            logging.info("F9 pressed.")
            toggle_recording()
        elif key == keyboard.Key.f10:
            logging.info("F10 pressed.")
            toggle_replay()
    except Exception as e:
        logging.error("Hotkey error", exc_info=True)
        update_status(f"Hotkey error: {type(e).__name__}: {e}")

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

logging.info("Script started.")
root.mainloop()
