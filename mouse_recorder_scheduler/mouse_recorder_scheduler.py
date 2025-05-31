import threading
import time
import tkinter as tk
import json
import os
from pynput import mouse, keyboard
import logging
from logging.handlers import RotatingFileHandler
from apscheduler.schedulers.background import BackgroundScheduler

SAVE_PATH = "recorded_events.json"

# Logging setup
logger = logging.getLogger("MouseRecorder")
logger.setLevel(logging.INFO)
handler = RotatingFileHandler("mouse_recorder.log", maxBytes=1_000_000, backupCount=5)
handler.setFormatter(logging.Formatter("%(asctime)s - %(message)s", datefmt="%Y-%m-%d %I:%M:%S %p"))
logger.addHandler(handler)

class MouseRecorder:
    def __init__(self):
        self.recording = False
        self.playing = False
        self.looping = False
        self.events = []
        self.start_time = None
        self.lock = threading.Lock()
        self.mouse_controller = mouse.Controller()
        self.scheduler = BackgroundScheduler()
        self.scheduler.start()
        self.load_events()

    def on_move(self, x, y):
        if self.recording:
            with self.lock:
                self.events.append(('move', x, y, time.time() - self.start_time))

    def on_click(self, x, y, button, pressed):
        if self.recording:
            with self.lock:
                self.events.append(('click', x, y, str(button), pressed, time.time() - self.start_time))

    def toggle_recording(self, update_status_callback):
        if self.playing or self.looping:
            update_status_callback("Stop playback before recording.")
            return

        if self.recording:
            self.recording = False
            self.save_events()
            return f"Recording stopped. {len(self.events)} events saved."
        
        self.events.clear()
        self.start_time = time.time()
        self.recording = True
        return "Recording started..."

    def _play_once(self, update_status_callback):
        self.playing = True
        start_play = time.time()
        for event in self.events:
            if not self.playing:
                update_status_callback("Playback stopped.")
                break
            wait = event[-1] - (time.time() - start_play)
            if wait > 0:
                time.sleep(wait)

            if event[0] == 'move':
                _, x, y, _ = event
                self.mouse_controller.position = (x, y)
            elif event[0] == 'click':
                _, x, y, button, pressed, _ = event
                self.mouse_controller.position = (x, y)
                if pressed:
                    self.mouse_controller.press(eval(button))
                else:
                    self.mouse_controller.release(eval(button))
        self.playing = False
        if not self.looping:
            update_status_callback("Playback finished.")

    def start_loop(self, interval, update_status_callback):
        if self.recording:
            update_status_callback("Stop recording before playback.")
            return
        if self.scheduler.get_job('auto_play'):
            update_status_callback("Looping already active.")
            return
        if not self.events:
            update_status_callback("No events recorded.")
            return

        self.looping = True

        def task():
            logger.info("Auto playback started.")
            try:
                self._play_once(update_status_callback)
            except Exception as e:
                update_status_callback(f"Playback error: {e}")
            logger.info("Auto playback finished.")

        self.scheduler.add_job(task, 'interval', seconds=interval, id='auto_play')
        update_status_callback(f"Auto playback every {interval:.0f}s.")

    def stop_playback(self):
        self.playing = False

    def stop_loop(self, update_status_callback):
        job = self.scheduler.get_job('auto_play')
        if job:
            job.remove()
            self.looping = False
            self.stop_playback()
            update_status_callback("Looping stopped.")
        else:
            update_status_callback("Loop not active.")

    def save_events(self):
        with open(SAVE_PATH, "w") as f:
            json.dump(self.events, f)

    def load_events(self):
        if os.path.exists(SAVE_PATH):
            with open(SAVE_PATH, "r") as f:
                self.events = json.load(f)

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Mouse Recorder")
        self.geometry("400x250")
        self.recorder = MouseRecorder()
        mouse.Listener(on_move=self.recorder.on_move, on_click=self.recorder.on_click).start()
        keyboard.Listener(on_press=self.on_key_press).start()
        self.create_widgets()

    def create_widgets(self):
        self.record_btn = tk.Button(self, text="Start Recording (F9)", width=25, command=self.toggle_recording)
        self.record_btn.pack(pady=10)

        tk.Label(self, text="Auto Replay Interval (seconds):").pack()
        self.delay_entry = tk.Entry(self)
        self.delay_entry.pack(pady=5)
        self.delay_entry.insert(0, "3600")

        self.loop_btn = tk.Button(self, text="Start Auto Playback (F10)", width=25, command=self.toggle_loop)
        self.loop_btn.pack(pady=10)

        self.status_label = tk.Label(self, text="Status: Idle", fg="blue")
        self.status_label.pack(pady=10)

    def toggle_recording(self):
        msg = self.recorder.toggle_recording(self.update_status)
        if msg:
            self.record_btn.config(text="Stop Recording (F9)" if self.recorder.recording else "Start Recording (F9)")
            self.loop_btn.config(state="disabled" if self.recorder.recording else "normal")
            self.update_status(msg)

    def toggle_loop(self):
        if self.recorder.recording:
            self.update_status("Stop recording before playback.")
            return

        try:
            interval = float(self.delay_entry.get())
            if interval <= 0:
                raise ValueError
        except ValueError:
            self.update_status("Invalid interval")
            return

        if self.recorder.scheduler.get_job('auto_play'):
            self.recorder.stop_loop(self.update_status)
            self.loop_btn.config(text="Start Auto Playback (F10)")
            self.record_btn.config(state="normal")
        else:
            self.recorder.start_loop(interval, self.update_status)
            self.loop_btn.config(text="Stop Auto Playback (F10)")
            self.record_btn.config(state="disabled")

    def update_status(self, msg):
        self.status_label.config(text=f"Status: {msg}")

    def on_key_press(self, key):
        if key == keyboard.Key.f9:
            self.after(0, self.toggle_recording)
        elif key == keyboard.Key.f10:
            self.after(0, self.toggle_loop)

if __name__ == "__main__":
    app = App()
    app.mainloop()
