import React from 'react'
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from './navbar.js'
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
    Input
  } from '@chakra-ui/react'

  const BASE = 'http://localhost:1999/api/v1';

function setGoal() {

    const [cal, setCal] = useState(0);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCal(value);
    };

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{

            // Latest update : write backend function for setting the calorie goal for the user.  26-04-2023
            const response =  await axios.post(BASE+'/setCaloriesGoal', cal);
        }catch(err){
            console.log(err);
        }
    }
  return (
        <>
        <Navbar />
        <VStack py={10} spacing={2}>
                <Container maxW='md'>
                    <Input type='number' placeholder='Your Calorie Goal' />
                </Container>
            </VStack>
            <Container maxW='md' mt={0} mb={4}>
                <h3 style={{textAlign:"center"}}>Enter your calorie goal.</h3>
                <Button m={2} colorScheme='teal' size='md' onClick={handleSubmit}>Submit</Button>
            </Container>
        </>
  )
}

export default setGoal