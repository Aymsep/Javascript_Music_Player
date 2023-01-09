const data = [
    {
        id:1,
        singer:'kygo',
        title:'forever yours',
        song:'kygo.mp3',
        small_image:'./small_images/kygosm.jpg',
        bg_image:'./bg_images/kygobg.jpg'
     },
    {
        id:2,
        singer:'jay sean',
        title:'down',
        song:'jaysean.mp3',
        small_image:'./small_images/jayseansm.jpg',
        bg_image:'./bg_images/jayseanbg.jpg'
    },
    {
        id:3,
        singer:'metallica',
        title:'nothing else matter',
        song:'metallica.mp3',
        small_image:'./small_images/metallicasm.jpg',
        bg_image:'./bg_images/metallicabg.jpg'
    },
    {
        id:4,
        singer:'micheal jackson',
        title:'billie jean',
        song:'mj.mp3',
        small_image:'./small_images/mjsm.jpg',
        bg_image:'./bg_images/mjbg.jpg'
    },
]










const contain = document.querySelector('.container')
const song = document.querySelector('#song')
const play = document.querySelector('#play')
const current = document.querySelector('#song_currentTime')
const duration = document.querySelector('#song_duration')
const progress = document.querySelector('#progress')
const volume = document.querySelector('#volume')
const i  = document.querySelector('#pause')
const i_volume  = document.querySelector('#volume_high')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const song_source = document.getElementById('source')
const bg_image = document.getElementById('big_image')
const small_image = document.getElementById('small_image')
const song_title = document.getElementById('song_title')
const artist = document.getElementById('artist')
const circle = document.querySelector('.circle')
let  isDragging = false
let current_index = 0




function display_song(index){
    const item = data[index]
    song_source.setAttribute('src', item.song)
    bg_image.src = item.bg_image
    small_image.src = item.small_image
    song_title.innerHTML = item.title
    artist.innerHTML = item.singer
    song.autoplay = true
    song.value = volume.value
    progress.value = 0
    song.load()
    
}
song.ontimeupdate = ()=>{
    const min = Math.floor(song.currentTime / 60)
    const sec = Math.floor(song.currentTime % 60)
    current.innerHTML = min + ':' + (sec < 10 ? '0' : '') + sec; 
    progress.value = song.currentTime / song.duration
}
  song.onloadedmetadata = () =>{
    let dur = (song.duration / 60).toFixed(2)
    dur = dur.replace(".",":")
    duration.innerHTML = dur
}
display_song(0)


let previous = true;
pause.addEventListener('click', ()=>{
    previous?(song.pause() && i.classList.remove('fa-pause')):(song.play() && i.classList.add('fa-pause'));
    previous?i.classList.add('fa-play'):i.classList.remove('fa-play')
    previous = !previous
})



next.addEventListener('click', ()=>{
    current_index++;
    if(current_index > data.length - 1){
        current_index = 0
    }
    setTimeout(()=>{
        display_song(current_index)
        
    },500)
})

prev.addEventListener('click', ()=>{
    setTimeout(()=>{
        display_song(current_index)
        
    },500)
    current_index--;
    if(current_index < 0){
        current_index = data.length - 1
    }
})


volume.addEventListener('input', (e)=>{
    song.volume = volume.value
})











        

progress.addEventListener('click', (e)=>{
    const x = e.offsetX
    const width = e.target.offsetWidth
    song.currentTime = x / width * song.duration
})

progress.addEventListener('mousedown', (event)=>{
    isDragging=true;
})

progress.addEventListener('mousemove', (event)=>{
    if(isDragging){
        const x = event.offsetX
        const width = event.target.offsetWidth
        song.currentTime = (x  / width * song.duration).toFixed(0) 
    }
})

progress.addEventListener('mouseup', (event)=>{
    isDragging=false
})
        




const onmute = ()=>{
    song.volume = 0
    volume.value = 0
}
const offmute = ()=>{
    song.volume = 0.5
    volume.value = 0.5
}

let prev_volume = true; 
i_volume.addEventListener('click', ()=> {
    prev_volume?(i_volume.classList.add('fa-volume-mute')):(i_volume.classList.remove('fa-volume-mute'))
    prev_volume?onmute():offmute()
    prev_volume = !prev_volume
})
































// // duration.innerHTML = (song.duration / 60).toFixed(2)

// song.onloadedmetadata = function() {

//   }
