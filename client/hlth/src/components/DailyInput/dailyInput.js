import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "../LandingPage1/navbar.js"
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

const BASE = 'http://localhost:1999/api/v1';  //Base url 

export default function DailyInput(){

  const [input, setInput] = useState("");
  const [foodItem, setItem] = useState("");
  const [calCount, setCalCount] = useState();

  const options = {
    method: 'GET',
    url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
    params: {ingr: input},
    headers: {
      'X-RapidAPI-Key': '9d21d8cadamshc9f83a39072628fp103f85jsn5df28fb37a7d',
      'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
    }
  };

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try{
        const res = await axios.request(options);
        console.log(res.data);
        setCalCount(res.data.calories);
        
    }catch(error) {
      console.error(error);
    }
    // console.log(input);
  }

  const saveData = async(event)=>{
    event.preventDefault();
    try {
      const obj = {
        foodItem,
        calCount
      }
      const response = await axios.post(BASE+'/sotreCalorie', obj);
      console.log(response.data);
    } catch (err) {
      // Handle error response
      console.error(err);
      // Show error message to user or take appropriate action
    }
  }


  const handleChange = (event) =>{
    event.preventDefault();
    setInput(event.target.value);
    setItem(input);
  }

    return(
        <>
        <Navbar />
          <VStack py={10} spacing={4}>
            <Container maxW='md'>
              <FormControl isRequired>
                <FormLabel>So User, What You Ate ?</FormLabel>
                <Textarea placeholder='Eg : 2 large apples' name="input" onChange={handleChange} />
              </FormControl>
            </Container>
            <Button colorScheme='teal' size='md' onClick={handleSubmit}>
    Submit
  </Button>
  <Button colorScheme='teal' size='md' onClick={saveData}>
    Save
  </Button>
          </VStack>
        </>
    );
}