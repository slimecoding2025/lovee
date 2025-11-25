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
  statusTxt.innerText = "Recording...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

stopBtn.onclick = () => {
  recorder.stop();
  statusTxt.innerText = "Recording stopped";
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

playBtn.onclick = () => {
  const audioURL = URL.createObjectURL(audioFile);
  const audio = new Audio(audioURL);

  // 🔥 التصويرة تظهر وقت يبدأ الصوت
  photo.classList.add("show-photo");

  audio.play();

  audio.onended = () => {
    // تخفي الصورة بعد ما يكمّل الصوت
    photo.classList.remove("show-photo");
  };
};
