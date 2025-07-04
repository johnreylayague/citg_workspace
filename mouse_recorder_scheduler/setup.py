from cx_Freeze import setup, Executable

build_options = {
 "packages": [
        "pynput",
        "tkinter",
        "threading",
        "json",  
        "time", 
        "queue",
        "logging",
        "gc",
        "psutil",
        "os"
    ],
    "includes": ["pynput.mouse", "pynput.keyboard"],
    "excludes": [],
    "include_files": ["pointer.ico"],  # Add your icon file here
}

base = "Win32GUI"  # No console window on Windows

executables = [
    Executable(
        script="mouse_recorder_scheduler.py",     # Your main script name here
        base=base,
        target_name="Mouse Recorder.exe",
        icon="pointer.ico"
    )
]

setup(
    name="Mouse Recorder",
    version="1.0",
    description="Simple Mouse Auto-Replay with Hotkeys",
    options={"build_exe": build_options},
    executables=executables
)
