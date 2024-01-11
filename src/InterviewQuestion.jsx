import React, { useState, useRef, useEffect } from 'react';
import { useData } from './DataContext';


// Assuming you're using a styling library like styled-components
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  ustify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;

const Question = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const RecordButton = styled(Button)`
  background-color: #52c022;

  &:hover {
    background-color: #2e6e15;
  }
`;

const AudioRecorder = (props) => {
    const {rowId, setPassed, socket} = props;
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const { data } = useData();


    const startRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("recording")
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    // socket.emit('audio_data', event.data);
                    audioChunksRef.current.push(event.data);
                    mediaRecorderRef.current.pause();
                    console.log(event.data)
                }
            };

            mediaRecorderRef.current.onstop = sendToSpeechRecognitionApi;
            console.log(mediaRecorderRef.current);
            mediaRecorderRef.current.start(1000);
            setIsRecording(true);
        } else {
            console.error('Audio recording is not supported in this browser');
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setPassed(rowId);
    };

    const sendToSpeechRecognitionApi = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav'});
        audioChunksRef.current = [];
        socket.emit('audio_data', {'user_id': data.userId,'audio': audioBlob});
        console.log("Аудиоданные отправлены");
    };

    return (
        <div>
            <RecordButton onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Finish Recording' : 'Start Recording'}
            </RecordButton>
        </div>
    );
};

function InterviewQuestion(props) {
    const {setPassed, socket, transcription, feedback} = props;
    const { data } = useData();

    return (
        <Container>
            <Header>
                <BackLink href="/">Back to all questions</BackLink>
            </Header>
            <Question>{data.rowData.fullQuestion}</Question>
                <AudioRecorder rowId={data.rowData._id} setPassed={setPassed} socket={socket}/>
                {/*<p>Transcription: {transcription}</p>*/}
                <p>Feedback: {feedback}</p>
        </Container>
    );
}

export default InterviewQuestion;
