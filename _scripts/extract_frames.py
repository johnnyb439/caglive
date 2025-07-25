#!/usr/bin/env python3
"""
Script to extract frames from video using OpenCV or PIL
"""

import sys
import os

def check_dependencies():
    try:
        import cv2
        print("OpenCV is installed")
        return "opencv"
    except ImportError:
        print("OpenCV not installed")
    
    try:
        from PIL import Image
        print("PIL/Pillow is installed")
        return "pil"
    except ImportError:
        print("PIL/Pillow not installed")
    
    return None

def extract_frames_opencv(video_path, output_dir):
    import cv2
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Open video
    cap = cv2.VideoCapture(video_path)
    
    # Get video properties
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print(f"Video FPS: {fps}")
    print(f"Total frames: {total_frames}")
    
    # Extract frames every 5 seconds
    frame_interval = int(fps * 5)  # Every 5 seconds
    
    frame_count = 0
    saved_count = 0
    
    while True:
        ret, frame = cap.read()
        
        if not ret:
            break
        
        if frame_count % frame_interval == 0:
            output_path = os.path.join(output_dir, f"frame_{saved_count:04d}.jpg")
            cv2.imwrite(output_path, frame)
            print(f"Saved frame {saved_count} at time {frame_count/fps:.2f}s")
            saved_count += 1
        
        frame_count += 1
    
    cap.release()
    print(f"Extracted {saved_count} frames")

if __name__ == "__main__":
    video_path = "/tmp/video_extract/Screen Recording 2025-07-22 at 10.14.37.mov"
    output_dir = "/Users/tone/cleared-advisory/video_screenshots"
    
    lib = check_dependencies()
    
    if lib == "opencv":
        extract_frames_opencv(video_path, output_dir)
    else:
        print("No suitable video processing library found")
        print("Please install opencv-python: pip install opencv-python")