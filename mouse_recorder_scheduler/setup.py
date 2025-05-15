from cx_Freeze import setup, Executable

build_options = {
    "packages": ["tkinter", "pynput", "threading", "json", "time", "datetime", "queue"],
    "excludes": [],
    "include_files": []
}

base = "Win32GUI"

setup(
    name="Mouse Recorder",
    version="1.0",
    description="Mouse and Click Recorder with Scheduler",
    options={"build_exe": build_options},
    executables=[Executable("mouse_recorder_scheduler.py", base=base)]  # Use your correct script name
)
