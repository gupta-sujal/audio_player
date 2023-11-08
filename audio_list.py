import os
audio_files=[]
for root, dirs, files in os.walk('.'):
        for filename in files:
            if os.path.splitext(filename)[1] == ".mp3":
                audio_files.append(os.path.join(root, filename))
print(audio_files)
