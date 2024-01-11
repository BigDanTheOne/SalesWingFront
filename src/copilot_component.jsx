import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import ChatContainer from "./interviewBohonko";
var MediaStreamRecorder = require('msr');

let recordedChunks = [];
let isMicConnected;
let isTabConnected;

const Interview = (props) => {
    useEffect(() => {
        isMicConnected = false;
        isTabConnected = false;
    }, [])

    const [disabled, setDisabled] = useState(true);
    const [isInterview, setIsInterview] = useState(false);
    const { socket, userId, micTranscription, tabTranscription, copilotFeedback } = props;
    const tabAudioChunksRef = useRef([]);
    const micAudioChunksRef = useRef([]);
    const tabAudioRecorderRef = useRef(null);
    const micAudioRecorderRef = useRef(null);



    function startRecording(stream) {
        console.log('Запись начинается');
        recordedChunks = [];
        let audioStream = stream;
        let mediaRecorder = new MediaRecorder(audioStream);

        mediaRecorder.ondataavailable = function(e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
                // socket.emit('audio_data', e.data); // TODO
            }
        };

        mediaRecorder.onstop = function() {
            // const blob = new Blob(recordedChunks, { 'type' : 'audio/webm' });
            // socket.emit('audio_data', blob);
            console.log("Аудиоданные отправлены");
        };

        // Начало записи с созданием чанков каждую секунду
        mediaRecorder.start(10000);
    }

    function updateInterviewButton() {
        const interviewButton = document.getElementById('interview-button');
        console.log(isMicConnected, isTabConnected);
        if (isMicConnected && isTabConnected) {
            console.log("access granted")
            interviewButton.disabled = false;
            setDisabled(false);
            interviewButton.classList.remove('custom-button-disabled');
            interviewButton.classList.remove('disabled');
        } else {
            console.log('no access')
            interviewButton.disabled = true;
            interviewButton.classList.add('custom-button-disabled');
        }
    }

    const handleMicClick = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            micAudioRecorderRef.current = new MediaStreamRecorder(stream);
            micAudioRecorderRef.current.mimeType = 'audio/pcm';
            micAudioRecorderRef.current.audioChannels = 1;
            micAudioRecorderRef.current.sampleRate = 48000;


            // Microphone is available
            console.log('Microphone is connected');
            isMicConnected = true;
            document.getElementById('mic-button').innerText = 'Микрофон подключен';
            document.getElementById('mic-button').classList.remove('custom-button-red');
            document.getElementById('mic-button').classList.add('custom-button-green');
            updateInterviewButton();
        }
    }

    const handleTabClick = async () => {
        try {
            // Request screen capture permissions from the user
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
            tabAudioRecorderRef.current = new MediaStreamRecorder(stream);
            tabAudioRecorderRef.current.mimeType = 'audio/pcm';
            tabAudioRecorderRef.current.audioChannels = 1;
            tabAudioRecorderRef.current.sampleRate = 48000;

            // Tab is available
            console.log('Tab is connected');
            isTabConnected = true;
            document.getElementById('tab-button').innerText = 'К интервью подключено';
            document.getElementById('tab-button').classList.remove('custom-button-red');
            document.getElementById('tab-button').classList.add('custom-button-green');
            updateInterviewButton();
        } catch (err) {
            console.error('Error capturing the tab:', err);
            isTabConnected = false;
            updateInterviewButton();
        }
    };

    const handleInterviewClick = () => {
        tabAudioRecorderRef.current.ondataavailable = async (blob) => {
            socket.emit('audio_data_tab', { audio: blob, user_id: userId });
            tabAudioChunksRef.current.push(blob);
            console.log(blob)
        };
        micAudioRecorderRef.current.ondataavailable = async (blob) => {
            socket.emit('audio_data_mic', { audio: blob, user_id: userId });
            micAudioChunksRef.current.push(blob);
            console.log(blob)
        };


        micAudioRecorderRef.current.start(1000);
        tabAudioRecorderRef.current.start(1000);
        setIsInterview(true);

    };

    return (
        <div>
            { isInterview ? <ChatContainer  micTranscription={micTranscription} tabTranscription={tabTranscription}
                                            copilotFeedback={copilotFeedback} /> :
                    <div className="button-container">
                        <button id="mic-button" className="custom-button custom-button-red" onClick={handleMicClick}>
                            Подключить микрофон
                        </button>
                        <button id="tab-button" className="custom-button custom-button-red" onClick={handleTabClick}>
                            Подключиться к интервью
                        </button>
                        <button id="interview-button" className="custom-button custom-button-disabled"
                                onClick={handleInterviewClick} disabled={disabled}>
                            Начать интервью
                        </button>
                    </div>

            }
        </div>
    );
};

export default Interview;
