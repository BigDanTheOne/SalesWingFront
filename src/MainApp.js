import SearchArea from "./SearchArea";
import Interview from "./copilot_component";
import ChatContainer from './interviewBohonko'
import React, { useState } from 'react';
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


let rows = jsonQuestions.map(({ _id, title, fullQuestion, tip, difficulty, companies, category }) => ({ _id,  title, fullQuestion, tip, difficulty, companies, category  }));
rows = rows.map(obj => ({ ...obj, status: false }));
const drawerWidth = 240;


export default function MainApp() {
    const [selectedOptions, setSelectedOptions] = useState({ Difficulty: 'All',
        Category: 'All',  Status: 'All', Companies: 'All',JobType: 'All' });
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');





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
                            <ListItem button key={'AI sales тренажёр'} component={Link} to={`/`}>
                                <ListItemIcon>
                                    <RadioButtonUncheckedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'AI Sales тренажёр'} />
                            </ListItem>
                            <ListItem button key={'Sales Copilot'} component={Link} to={`/copilot`}>
                                <ListItemIcon>
                                    <RadioButtonUncheckedIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Sales Copilot'} />
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
                                    <InterviewQuestion setPassed={setPassed}  transcription={transcription} feedback={feedback}/>
                                }/>
                                <Route  path="/copilot" element={
                                    <Interview/>
                                }/>
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </DataProvider>
    );
}

