#!/usr/bin/env python3
"""
whisper_transcribe.py
Local transcription script for Pippin intake protocol.
No API calls. Runs entirely offline after initial model download.
"""

import sys
import os
import subprocess
import re
from pathlib import Path

# --- SETUP: Self-installing dependencies ---

def check_and_install_deps():
    """Check for required packages and install if missing."""
    required = ['openai-whisper', 'numpy', 'torch']
    
    try:
        import whisper
        import numpy
        import torch
        return True
    except ImportError:
        print("First run: installing dependencies...", file=sys.stderr)
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + required,
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print("Dependencies installed. Restarting...", file=sys.stderr)
            return True
        except subprocess.CalledProcessError:
            print("ERROR: Could not install dependencies automatically.", file=sys.stderr)
            print("Run: pip install openai-whisper numpy torch", file=sys.stderr)
            sys.exit(1)

# Check ffmpeg
def check_ffmpeg():
    """Check if ffmpeg is installed. Whisper needs it for some formats."""
    try:
        subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

# --- TRANSCRIPTION ---

def transcribe_audio(audio_path, model_size='base'):
    """Transcribe audio file using Whisper."""
    import whisper
    
    # Load model (downloads on first use)
    model = whisper.load_model(model_size)
    
    # Transcribe
    result = model.transcribe(audio_path)
    
    return result['text'].strip()

# --- TEXT CLEANING ---

def clean_transcript(text):
    """Remove filler words and clean up run-on sentences."""
    # Filler words to remove
    fillers = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of', 
               'basically', 'literally', 'actually', 'honestly']
    
    # Remove fillers (case insensitive, word boundaries)
    for filler in fillers:
        pattern = r'\b' + re.escape(filler) + r'\b'
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    
    # Break run-on sentences at natural pause points
    # Add period after long clauses or when we see certain patterns
    text = re.sub(r'([a-z]{3,}) (and|but|so|then|because) ', r'\1. \2 ', text)
    
    # Ensure sentences start with capital
    sentences = text.split('. ')
    sentences = [s.strip().capitalize() if s.strip() else '' for s in sentences]
    text = '. '.join(sentences)
    
    # Clean up any remaining double spaces or issues
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    
    return text

# --- MAIN ---

def main():
    # Check deps
    if not check_and_install_deps():
        sys.exit(1)
    
    # Check args
    if len(sys.argv) < 2:
        print("Usage: python whisper_transcribe.py <audio_file> [--small]", file=sys.stderr)
        sys.exit(1)
    
    audio_path = sys.argv[1]
    model_size = 'base'
    
    # Check for small model flag
    if '--small' in sys.argv:
        model_size = 'small'
    
    # Validate file
    if not os.path.exists(audio_path):
        print(f"ERROR: File not found: {audio_path}", file=sys.stderr)
        sys.exit(1)
    
    # Check extension
    valid_exts = ['.m4a', '.mp3', '.ogg', '.wav']
    ext = Path(audio_path).suffix.lower()
    if ext not in valid_exts:
        print(f"ERROR: Unsupported format: {ext}. Use: {', '.join(valid_exts)}", file=sys.stderr)
        sys.exit(1)
    
    # Check ffmpeg for non-wav formats
    if ext != '.wav' and not check_ffmpeg():
        print("ERROR: ffmpeg required for this audio format.", file=sys.stderr)
        print("Install: brew install ffmpeg", file=sys.stderr)
        sys.exit(1)
    
    try:
        # Transcribe
        raw_text = transcribe_audio(audio_path, model_size)
        
        # Clean
        clean_text = clean_transcript(raw_text)
        
        # Generate output paths
        base_path = Path(audio_path).with_suffix('')
        raw_path = Path(str(base_path) + '_raw.txt')
        clean_path = Path(str(base_path) + '_clean.txt')
        
        # Check for existing files (don't overwrite)
        if raw_path.exists() or clean_path.exists():
            print(f"ERROR: Transcript already exists for {audio_path}", file=sys.stderr)
            print("Delete existing .txt files or rename input.", file=sys.stderr)
            sys.exit(1)
        
        # Write outputs
        with open(raw_path, 'w') as f:
            f.write(raw_text)
        
        with open(clean_path, 'w') as f:
            f.write(clean_text)
        
        # Success output (silent, just paths)
        print(str(clean_path))
        
    except Exception as e:
        print(f"ERROR: Transcription failed: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
