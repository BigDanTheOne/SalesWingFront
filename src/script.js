
let isMicConnected = false;
let isTabConnected = false;

updateInterviewButton(); // Вызов этой функции установит начальное состояние кнопки

function updateInterviewButton() {
    const interviewButton = document.getElementById('interview-button');
    if (isMicConnected && isTabConnected) {
        interviewButton.disabled = false;
        interviewButton.classList.remove('custom-button-disabled');
    } else {
        interviewButton.disabled = true;
        interviewButton.classList.add('custom-button-disabled');
    }
}

let audioStream;
let mediaRecorder;

// Инициализация соединения с Socket.io
const socket = io('http://127.0.0.1:5000');
function startRecording(stream) {
    console.log('Запись начинается');
    audioStream = stream;
    mediaRecorder = new MediaRecorder(audioStream);

    // Начало записи с созданием чанков каждую секунду
    mediaRecorder.start(1000);

    mediaRecorder.ondataavailable = function(e) {
        if (e.data.size > 0) {
            socket.emit('audio_data', e.data);
        }
    };
}


function checkMicrophone() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            isMicConnected = true;
            updateInterviewButton();
            document.getElementById('mic-button').innerText = 'Микрофон подключен';
            document.getElementById('mic-button').classList.remove('custom-button-red');
            document.getElementById('mic-button').classList.add('custom-button-green');
            // stream.getTracks().forEach(track => track.stop());
            startRecording(stream);
        })
        .catch(function(err) {
            console.error('Не удалось получить доступ к микрофону:', err);
            isMicConnected = false;
            updateInterviewButton();
        });
}


function captureTab() {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then(function(stream) {
            isTabConnected = true;
            updateInterviewButton();
            document.getElementById('tab-button').innerText = 'К интервью подключено';
            document.getElementById('tab-button').classList.remove('custom-button-red');
            document.getElementById('tab-button').classList.add('custom-button-green');
        })
        .catch(function(err) {
            console.error('Не удалось захватить вкладку:', err);
            isTabConnected = false;
            updateInterviewButton();
        });
}

