import React from 'react'
import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from './navbar.js'
import axios from 'axios';
// import DatePicker from "../dateInput/dateInput.js"
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
    Textarea
  } from '@chakra-ui/react'

  const BASE = 'http://localhost:1999/api/v1';

function SetGoal() {

    const [cal, setCal] = useState();
    const [date, setDate] = useState('');
    const [currDate, setCurrDate] = useState('');
    const dateInputRef = useRef(null);

    useEffect(()=>{
        const currDate = new Date(); 
        let currentDay= String(currDate.getDate()).padStart(2, '0');

        let currentMonth = String(currDate.getMonth()+1).padStart(2,"0");

        let currentYear = currDate.getFullYear();

        setCurrDate(`${currentYear}-${currentMonth}-${currentDay}`);
    }, []);

    const getDate = (data) =>{
        setDate(data);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value);
        setCal(value);
    };
    const handleChange1 = (e) =>{
        setDate(e.target.value);
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            const email = localStorage.getItem("email");
            const response =  await axios.post(BASE+'/setCaloriesGoal', { calorie : cal, email : email, endDate: date, currDate:currDate});
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }
  return (
        <>
        <Navbar />
        <VStack py={10} spacing={2}>
                <Container maxW='md'>
                    <Input type='number' value={cal} onChange={handleChange} placeholder='Your Calorie Goal' />
                </Container>
            </VStack>
            <Container maxW='md' mt={0} mb={4}>
            <input
                type="date"
                onChange={handleChange1}
                ref={dateInputRef}
            />
                <h3 style={{textAlign:"center"}}>Date Selected : {date}</h3>
            </Container>
            <Container maxW='md' mt={0} mb={4}>
                <h3 style={{textAlign:"center"}}>Enter your calorie goal.</h3>
                <Button m={2} colorScheme='teal' size='md' onClick={handleSubmit}>Submit</Button>
            </Container>
        </>
  )
}

export default SetGoal