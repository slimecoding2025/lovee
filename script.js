let recorder, audioFile;
let chunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn  = document.getElementById('stopBtn');
const playBtn  = document.getElementById('playBtn');
const statusTxt = document.getElementById('status');
const photo = document.getElementById('photo');

startBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    audioFile = new Blob(chunks, { type: "audio/webm" });
    chunks = [];
    playBtn.disabled = false;
  };

  recorder.start();
  statusTxt.innerHTML = "Recording...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  recorder.stop();
  statusTxt.innerHTML = "Recording stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

playBtn.onclick = () => {
  const audioURL = URL.createObjectURL(audioFile);
  const audio = new Audio(audioURL);

  // 🔥 Animation for the photo
  photo.classList.add("show-photo");

  audio.play();

  // remove animation after audio ends
  audio.onended = () => {
    photo.classList.remove("show-photo");
  };
};pages.cloudflare.com

