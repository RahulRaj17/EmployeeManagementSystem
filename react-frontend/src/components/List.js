import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function List(){
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/employees")
        .then(response => setEmployees(response.data))
        .catch(error => console.error(error));
    }, [])

    function deleteId(id){
        axios.delete("http://localhost:8080/api/v1/employees/" + id)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }

    return(
        <Box ml={"5vh"} mr={"5vh"} mt={"5vh"} sx = {{border: 1 }}>
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Fist Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                        <TableRow
                            key={employee}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {employee.id}
                            </TableCell>
                            <TableCell align="center">{employee.firstName}</TableCell>
                            <TableCell align="center">{employee.lastName}</TableCell>
                            <TableCell align="center">{employee.emailId}</TableCell>
                            <TableCell align="center"><Link to={`/update-employee/${employee.id}`}><Button color="primary" variant="contained">Update</Button></Link></TableCell>
                            <TableCell align="center"><Button color="error" variant="contained" onClick={() => deleteId(employee.id)}>Delete</Button></TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default List;