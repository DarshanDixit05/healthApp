import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "./navbar.js"
import Progress from "../Status/Progress.js"
import axios from 'axios';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Container ,
    VStack,
    Button,
    ButtonGroup,
    Textarea,
  } from '@chakra-ui/react'

  const BASE = 'http://localhost:1999/api/v1';

const StatusPage = () => {
    const [em, setEmail] = useState("");

    const options = {
        method: 'GET',
        url: BASE+'/getCalCount',
        params: {email: em},  // user req.query.email in backend to catch 
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            setEmail(localStorage.getItem('email'));
            await axios.request(options).then(res=>{console.log(res)}).catch(err=>{console.log(err);});
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <>
            <Navbar />
            <VStack py={10} spacing={2}>
                <Container maxW='md'>
                    <Progress />
                </Container>
            </VStack>
            <Container maxW='md' mt={0} mb={4}>
                <h3 style={{textAlign:"center"}}>You have completed 30% of your calorie goal !</h3>
                <Button m={2} colorScheme='teal' size='md' onClick={handleSubmit}>Know Your Progress</Button>
            </Container>
        </>
    );
}

export default StatusPage;