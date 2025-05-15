from cx_Freeze import setup, Executable

build_options = {
    "packages": ["tkinter", "pynput", "threading", "json", "time", "datetime", "queue"],
    "excludes": [],
    "include_files": []
}

base = "Win32GUI"  # Use "Win32GUI" for no console, None for console

executables = [
    Executable(
        "mouse_recorder_scheduler.py",  # Your script name
        base=base,
        icon="pointer.ico",  # Replace with your .ico file
        target_name="Mouse Recorder.exe"  # Optional: Rename the output .exe
    )
]

setup(
    name="Mouse Recorder",
    version="1.0",
    description="Mouse and Click Recorder with Scheduler",
    options={"build_exe": build_options},
    executables=executables
)