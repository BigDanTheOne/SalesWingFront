import { useData } from './DataContext';
import {useNavigate} from "react-router-dom";
import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function Row(props) {
    const { row, userId } = props;
    const navigate = useNavigate();
    const { data, setData } = useData();


    const handleClick = (row) => {
        // Set the data you want to pass
        console.log(data)
        setData({ userId: userId, rowData: row });

        // Navigate to the About page
        navigate('/question');
    };
    return (
        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}  onClick={() => {handleClick(row);}}>
                <TableCell align="left">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                    >
                        {row.status ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="center">{row.difficulty}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
