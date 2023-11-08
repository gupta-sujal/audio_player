from flask import Flask, render_template, jsonify,json,request
import os
import random

app = Flask(__name__)

# List of audio file URLs
# audio_files = [
#     '/static/Kitna_Haseen_Chehra.mp3',
#     '/static/raah_mein_unse.mp3',
#     '/static/Too_Shayar_Hai_Main_Teri_Shayari.mp3',
#     '/static/Mera_Dil_Bhi_Kitna_Pagal_Hai.mp3',
#     '/static/Is_Tarah_Aashiqui_Ka.mp3',
#     '/static/Jeeta_Tha_Jiske_Liye.mp3',
#     '/static/tere_naam.mp3',
#     '/static/Mujhse_Mohabbat.mp3',
#     '/static/Pehli_Pehli_Baar_Mohabbat.mp3',
# ]
audio_files=[]
for root, dirs, files in os.walk('.'):
        for filename in files:
            if os.path.splitext(filename)[1] == ".mp3":
                audio_files.append(os.path.join(root, filename))

@app.route('/')
def index():
    return render_template('index.html',songs=audio_files,songs_js=json.dumps(audio_files))

@app.route('/play_random_song')
def play_random_song():
    random_audio_url = random.choice(audio_files)
    random_audio_index=audio_files.index(random_audio_url)
    random_audio_name=random_audio_url[9:]
    return jsonify({'audio_url': random_audio_url,'audio_index':random_audio_index+1,'audio_name':random_audio_name})

@app.route('/play_select_song',methods=['POST'])
def play_select_song():
    song = request.json['data']
    # song=data['value']
    print(song)
    random_audio_url = song
    random_audio_index=audio_files.index(random_audio_url)
    random_audio_name=random_audio_url[9:]
    return jsonify({'audio_url': random_audio_url,'audio_index':random_audio_index+1,'audio_name':random_audio_name})

image_urls=['/static/image2.jpg','/static/image3.jpg',]

@app.route('/get_image_path')
def get_image_path():
    image_path =  random.choice(image_urls) # Change to the actual path of your image
    return image_path

# @app.route('/shuffle')
# def shuffle():
#     random.shuffle(audio_files)
#     index()

if __name__ == '__main__':
    app.run(debug=True)