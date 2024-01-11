import SearchArea from "./SearchArea";
import Interview from "./copilot_component";
import ChatContainer from './interviewBohonko'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InterviewQuestion from './InterviewQuestion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataProvider, useData } from './DataContext';
import jsonQuestions from './questions.json';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Row from './Row'
import './App.css';
import io from "socket.io-client";


let rows = jsonQuestions.map(({ _id, title, fullQuestion, tip, difficulty, companies, category }) => ({ _id,  title, fullQuestion, tip, difficulty, companies, category  }));
rows = rows.map(obj => ({ ...obj, status: false }));
const drawerWidth = 240;


export default function MainApp() {
    const [selectedOptions, setSelectedOptions] = useState({ Difficulty: 'All',
        Category: 'All',  Status: 'All', Companies: 'All',JobType: 'All' });
    const [socket, setSocket] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [micTranscription, setMicTranscription] = useState(['']);
    const [tabTranscription, setTabTranscription] = useState(['']);
    const [copilotFeedback, setCopilotFeedback] = useState(['']);




    const filteredValues = rows.filter(value =>
        (selectedOptions.Difficulty === 'All' || value.difficulty === selectedOptions.Difficulty.toLowerCase()) &&
        (selectedOptions.Category === 'All' || value.category === selectedOptions.Category.toLowerCase()) &&
        (selectedOptions.Status === 'All' || value.status === selectedOptions.Status.toLowerCase()) &&
        (selectedOptions.Companies === 'All' || value.companies.includes(selectedOptions.Companies.toLowerCase()))&&
        (selectedOptions.JobType === 'All' || value.jobType.includes(selectedOptions.JobType.toLowerCase()))
    );


    const setPassed = (rowId) => {
        rows.forEach(obj => {
            if (obj._id === rowId) {
                obj.status = true;
            }
        });
        rows.forEach(obj => {
            if (obj._id === rowId) {
                console.log(obj)
            }
        });
    }
    const { data, setData } = useData();
    const handleSelectionChange = (optionType, value) => {
        setSelectedOptions(prev => ({ ...prev, [optionType]: value }));
    };

    useEffect(() => {
        if (socket == null) {
            const socket_ = io('http://127.0.0.1:5000', {transports: ['websocket', 'polling']});
            socket_.on('connected', (userId) => {
                setData({rowData: data.rowData, userId: userId});
                console.log("Connection established, user_id: ", userId);
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
            socket.on('feedback', (data_) => {
                console.log("Feedback from server:", data_.response);
                setFeedback(data_.response);

            });
        }
    }, [socket, tabTranscription, micTranscription, copilotFeedback]);

    useEffect(() => {
        console.log("Updated mic state value: ", micTranscription);
        console.log("Updated mic state value: ", tabTranscription);
        console.log("Updated mic state value: ", copilotFeedback);
    }, [micTranscription, tabTranscription, copilotFeedback]);

    useEffect(() => {
        console.log("second hook")
        console.log(data)
        if (socket && !data.userId) {
            console.log("joining")
            socket.emit('join');
        }
    }, [socket]);

    return (
        <DataProvider>
            <Router>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <List>
                            <ListItem button key={'Вопросы для интервью'} component={Link} to={`/`}>
                                <ListItemIcon>
                                    <RadioButtonUncheckedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Вопросы для интервью'} />
                            </ListItem>
                            <ListItem button key={'Интервью Copilot'} component={Link} to={`/copilot`}>
                                <ListItemIcon>
                                    <RadioButtonUncheckedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Интервью Copilot'} />
                            </ListItem>
                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar /> {/* This is the spacer for beneath the AppBar */}
                        <Container maxWidth="lg"> {/* Set your desired max-width here */}
                            <Routes>
                                <Route exact path="/" element={
                                    <TableContainer component={Paper}>
                                        {/*<Box sx={{ marginTop: 20,  marginBottom: 20 }}>*/}
                                        {/*Самые лучшие вопросы для интервью [поменять текст]*/}
                                        {/*</Box>*/}
                                        <div className="search-wrapper">
                                            <SearchArea  onSelectionChange={handleSelectionChange}/>
                                        </div>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Status</TableCell>
                                                    <TableCell align="left">Title</TableCell>
                                                    <TableCell align="center">Difficulty</TableCell>
                                                    <TableCell align="center">Category</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredValues.map((row) => ( <Row key={row._id} row={row} userId={data.userId} /> ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }/>
                                <Route  path="/question" element={
                                    <InterviewQuestion setPassed={setPassed} socket={socket} transcription={transcription} feedback={feedback}/>
                                }/>
                                <Route  path="/copilot" element={
                                    <Interview socket={socket} userId={data.userId} micTranscription={micTranscription}
                                               tabTranscription={tabTranscription} copilotFeedback={copilotFeedback}/>
                                }/>
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </DataProvider>
    );
}

