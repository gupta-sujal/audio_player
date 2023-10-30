from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# List of audio file URLs
audio_files = [
    '/static/Kitna_Haseen_Chehra.mp3',
    '/static/raah_mein_unse.mp3',
    '/static/Too_Shayar_Hai_Main_Teri_Shayari.mp3',
    '/static/Mera_Dil_Bhi_Kitna_Pagal_Hai.mp3',
    '/static/Is_Tarah_Aashiqui_Ka.mp3',
    '/static/Jeeta_Tha_Jiske_Liye.mp3',
    '/static/tere_naam.mp3',
    '/static/Mujhse_Mohabbat.mp3',
    '/static/Pehli_Pehli_Baar_Mohabbat.mp3',
    # Add more audio file URLs as needed
]
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play_random_song')
def play_random_song():
    random_audio_url = random.choice(audio_files)
    random_audio_index=audio_files.index(random_audio_url)
    random_audio_name=random_audio_url[8:]
    return jsonify({'audio_url': random_audio_url,'audio_index':random_audio_index+1,'audio_name':random_audio_name})

if __name__ == '__main__':
    app.run(debug=True)