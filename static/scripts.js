// const audio = document.getElementById('audio');
// const audioSource = document.getElementById('audio-source');
// const playToggleButton = document.getElementById('play-toggle');
// const nextSongButton = document.getElementById('next-song');
// const progressBar = document.getElementById('progress-bar');
// let currentAudio = null;
// let isPlaying = false;

// playToggleButton.addEventListener('click', () => {
//     if (currentAudio) {
//         if (isPlaying) {
//             currentAudio.pause();
//             isPlaying = false;
//             playToggleButton.textContent = 'Play';
//         } else {
//             currentAudio.play();
//             isPlaying = true;
//             playToggleButton.textContent = 'Pause';
//         }
//     } else {
//         fetch('/play_random_song')
//             .then(response => response.json())
//             .then(data => {
//                 const audio = new Audio(data.audio_url);
//                 audio.play();
//                 currentAudio = audio;
//                 isPlaying = true;
//                 playToggleButton.textContent = 'Pause';
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     }
// });

// nextSongButton.addEventListener('click', () => {
//     if (currentAudio) {
//         currentAudio.pause();
//         currentAudio = null;
//         isPlaying = false;
//         playToggleButton.textContent = 'Play';
//     }

//     fetch('/play_random_song')
//         .then(response => response.json())
//         .then(data => {
//             const audio = new Audio(data.audio_url);
//             audio.play();
//             currentAudio = audio;
//             isPlaying = true;
//             playToggleButton.textContent = 'Pause';
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// });


// audio.addEventListener('timeupdate', () => {
//     if (isPlaying) {
//         const currentTime = audio.currentTime;
//         const duration = audio.duration;
//         const progress = (currentTime / duration) * 100;
//         progressBar.value = progress;
//     }
// });
// // Call the progress bar update function when the audio time updates
// if (currentAudio) {
//     currentAudio.addEventListener('timeupdate', updateProgressBar);
// }

// progressBar.addEventListener('click', (event) => {
//     const offsetX = event.offsetX;
//     const progressBarWidth = progressBar.clientWidth;
//     const duration = audio.duration;
//     const seekTime = (offsetX / progressBarWidth) * duration;
//     audio.currentTime = seekTime;
// });

let now_playing = document.querySelector(".now-playing");
// const audio=document.getElementById('audio')
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;
    fetch('/play_random_song')
        .then(response => response.json())
        .then(data => {
            clearInterval(updateTimer);
            updateTimer = setInterval(seekUpdate, 1000);
            const audio = new Audio(data.audio_url);
            const name=data.audio_name;
            const number=data.audio_index;
            document.getElementById("display-track-number").textContent =number ; 
            document.getElementById("display-track-name").textContent =name ; 
            audio.play();
            curr_track=audio
            isPlaying=true
        });
        var imageUrls = [
          'image2.jpg',
          'image3.jpg',
          // Add more image URLs as needed
      ];
function image_change() {
    var element = document.getElementById('top-portion');
    fetch('/get_image_path')
        .then(response => response.text())
        .then(imagePath => {
            element.style.backgroundImage = `url(${imagePath})`;
        });
}
  
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  image_change()
  function seekUpdate() {
    let seekPosition = 0;
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        if(seek_slider.value==100)
        nextTrack()
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    function shuffle()
    {
      var ul = document.querySelector('#music-list ul');
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
    function playTrack() {
    curr_track.play();
    isPlaying = true;
    
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    function nextTrack() {
        pauseTrack()
        resetValues()        
        fetch('/play_random_song')
        .then(response => response.json())
        .then(data => {
            
            const audio = new Audio(data.audio_url);
            const name=data.audio_name;
            const number=data.audio_index;
            clearInterval(updateTimer);
            updateTimer = setInterval(seekUpdate, 1000);
            document.getElementById("display-track-number").textContent =number ; 
            document.getElementById("display-track-name").textContent =name ; 
            curr_track=audio
            playTrack()
            image_change()
            setVolume()
        });
    }
    
    function prevTrack() {
        pauseTrack()
        resetValues()
        fetch('/play_random_song')
        .then(response => response.json())
        .then(data => {
            clearInterval(updateTimer);
            updateTimer = setInterval(seekUpdate, 1000);
            const audio = new Audio(data.audio_url);
            const name=data.audio_name;
            const number=data.audio_index;
            document.getElementById("display-track-number").textContent =number ; 
            document.getElementById("display-track-name").textContent =name ; 
            curr_track=audio
            playTrack()
            image_change()
            setVolume()
        });
    }


    function play_select_Track(song,songs_js) {
        console.log(song)
        songs_js=JSON.parse(songs_js)
        console.log(songs_js.length)
        console.log(songs_js[0])
        pauseTrack()
        resetValues() 
        fetch('/play_select_song', { 
            method: 'POST', 
            headers: { 
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({data: song}) 
          }) 
          .then(response => response.json()) 
          .then(data => {
            clearInterval(updateTimer);
            updateTimer = setInterval(seekUpdate, 1000);
            const audio = new Audio(data.audio_url);
            const name=data.audio_name;
            const number=data.audio_index;
            document.getElementById("display-track-number").textContent =number ; 
            document.getElementById("display-track-name").textContent =name ; 
            curr_track=audio
            playTrack()
            image_change()
            setVolume()
            
        });
        // $.ajax({ 
        //     url: '/play_select_song', 
        //     type: 'POST', 
        //     contentType: 'application/json', 
        //     data: { 'value': song }, 
        //     success: function(response) { 
        //         const audio = new Audio(response.result.json().audio_url); 
        //         const name=data.audio_name;
        //         const number=data.audio_index;
        //         clearInterval(updateTimer);
        //         updateTimer = setInterval(seekUpdate, 1000);
        //         document.getElementById("display-track-number").textContent =number ; 
        //         document.getElementById("display-track-name").textContent =name ; 
        //         curr_track=audio
        //         playTrack()
        //         image_change()
        //     }, 
        //     error: function(error) { 
        //         console.log(error);
        //         console.log(100) 
        //     } 
        // });        
        // fetch("/play_select_song/${song}")
        // .then(response => response.json())
        // .then(data => {            
        //     const audio = new Audio(data.audio_url);
        //     const name=data.audio_name;
        //     const number=data.audio_index;
        //     clearInterval(updateTimer);
        //     updateTimer = setInterval(seekUpdate, 1000);
        //     document.getElementById("display-track-number").textContent =number ; 
        //     document.getElementById("display-track-name").textContent =name ; 
        //     curr_track=audio
        //     playTrack()
        //     image_change()
            
        // });
    }
    
    function seekTo() {
        seek = curr_track.duration * (seek_slider.value / 100);
        curr_track.currentTime = seek;
        }
        
        function setVolume() {
        curr_track.volume = volume_slider.value / 100;
        }
       
        
        
            