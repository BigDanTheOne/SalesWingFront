import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client";

import './style.css';
import { useData } from './DataContext';
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
    const [socket, setSocket] = useState(null);
    const {userId} = props;
    const tabAudioChunksRef = useRef([]);
    const micAudioChunksRef = useRef([]);
    const tabAudioRecorderRef = useRef(null);
    const micAudioRecorderRef = useRef(null);
    const { data, setData } = useData();
    const [micTranscription, setMicTranscription] = useState(['']);
    const [tabTranscription, setTabTranscription] = useState(['']);
    const [copilotFeedback, setCopilotFeedback] = useState(['']);

    useEffect(() => {
        isMicConnected = false;
        isTabConnected = false;
    }, []);

    useEffect(() => {
        if (socket == null) {
            const socket_ = io('http://copilotapi.onrender.com', {
                transports: ['websocket', 'polling'],
                query: data['session_id'] ? { session_id: data['session_id'] } : {}
            });
            socket_.on('session_id', (session_id) => {
                setData({rowData: data.rowData, session_id: session_id});
                console.log("Connection established, user_id: ", session_id);
            });
            setSocket(socket_);
        }
    }, [])
    useEffect(() => {
        if (socket != null) {
            socket.on('mic_transcript', (data_) => {
                console.log("Mic from server:", data_.response);
                const length = data_.len;
                let newMic = [...micTranscription];
                if (length > newMic.length){
                    newMic.push('');
                }
                newMic = newMic.map((c, i) => {
                    if (i === length - 1) {
                        return data_.response;
                    } else {
                        return c;
                    }
                });
                console.log(newMic, length);
                setMicTranscription(newMic);
                console.log("Real mic state value: ", micTranscription);
            });
            socket.on('tab_transcript', (data_) => {
                console.log("Tab from server:", data_.response);
                const length = data_.len;
                let newTab = [...tabTranscription];
                if (length > newTab.length){
                    newTab.push('')
                }
                newTab = newTab.map((c, i) => {
                    if (i === length - 1) {
                        return data_.response;
                    } else {
                        return c;
                    }
                });
                console.log(newTab, length);
                setTabTranscription(newTab);
                console.log("Real tab state value: ", tabTranscription);
            });
            socket.on('copilot', (data_) => {
                console.log("Tab from server:", data_.response);
                const length = data_.len;
                let newFeedback = [...copilotFeedback];
                if (length > newFeedback.length){
                    newFeedback.push('')
                }
                newFeedback = newFeedback.map((c, i) => {
                    if (i === length - 1) {
                        return data_.response;
                    } else {
                        return c;
                    }
                });
                console.log(newFeedback, length);
                setCopilotFeedback(newFeedback);
                console.log("Real tab state value: ", tabTranscription);
            });
            // socket.on('feedback', (data_) => {
            //     console.log("Feedback from server:", data_.response);
            //     setFeedback(data_.response);
            // });
        }
    }, [socket, tabTranscription, micTranscription, copilotFeedback]);

    useEffect(() => {
        console.log("Updated mic state value: ", micTranscription);
        console.log("Updated mic state value: ", tabTranscription);
        console.log("Updated mic state value: ", copilotFeedback);
    }, [micTranscription, tabTranscription, copilotFeedback]);

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
        socket.emit('new_session', data['session_id'])
        tabAudioRecorderRef.current.ondataavailable = async (blob) => {
            socket.emit('audio_data_tab', { audio: blob }, () => {
                tabAudioChunksRef.current.push(blob);
                console.log(blob)
            });

        };
        micAudioRecorderRef.current.ondataavailable = async (blob) => {
            socket.emit('audio_data_mic', { audio: blob }, () => {
                micAudioChunksRef.current.push(blob);
                console.log(blob);
            });

        };
        micAudioRecorderRef.current.start(100);
        tabAudioRecorderRef.current.start(100);
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
