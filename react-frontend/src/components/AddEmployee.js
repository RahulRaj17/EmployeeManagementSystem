import React, { useEffect } from "react";
import { Box, TextField, Typography, Button} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddEmployee(props){

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [emailId, setEmailId] = React.useState("");
    const {id} = useParams();
    let navigate = useNavigate();

    function handleClick(){
        if(firstName === "" || lastName === "" || emailId === ""){
            console.error("Incomplete Fields");
        }else{
            const data = {
                firstName,
                lastName,
                emailId
            }

            if(id){
                axios.put("http://localhost:8080/api/v1/employees/" + id, data)
                .then((response) => navigate("/employees"))
                .catch(error => console.error(error));
            }else{
                axios.post("http://localhost:8080/api/v1/employees", data)
                .then((response) => navigate("/employees"))
                .catch(error => console.error(error));
            }
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/employees/"+id)
            .then((response) =>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            })
            .catch(error => console.error(error));
    }, [])

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: "10vh", ml : "20%", mr: "20%" }}>
            <Typography variant="h4" align="center">
                {props.heading}
            </Typography>
            <TextField label="First Name" value = {firstName} onChange={(event) => setFirstName(event.target.value)}/>
            <TextField label="Last Name" value = {lastName} onChange={(event) => setLastName(event.target.value)}/>
            <TextField label="Email" value = {emailId} onChange={(event) => setEmailId(event.target.value)}/>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center"}} >
                <Button variant="contained" onClick={handleClick}>
                Submit
                </Button>
                <Button color="error" variant="contained" onClick={() => navigate("/employees")}>
                Cancel
                </Button>
            </Box>
      </Box>
    )
}

export default AddEmployee;