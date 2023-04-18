import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "../LandingPage1/navbar.js"
import NutrientTable from "../Table/nutrientTable.js"
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
  const [obj, setObj] = useState([]);
  const [email, setEmail]=useState("");

  useEffect(()=>{
      //Geting the email from local Storage and setting it to the email valriable to pass it to to the backend as post req
  setEmail(localStorage.getItem('email'));
  }, [])


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
        setObj(res.data.totalDaily);
        setCalCount(res.data.calories);
        
    }catch(error) {
      console.error(error);
    }
  }

  const saveData = async(event)=>{
    event.preventDefault();
    try {
      const obj = {
        foodItem,
        calCount,
        email
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
          <VStack py={10} spacing={2}>
            <Container maxW='md'>
              <FormControl isRequired>
                <FormLabel>So User, What You Ate ?</FormLabel>
                <Textarea placeholder='Eg : 2 large apples' name="input" onChange={handleChange} />
              </FormControl>
            </Container>
          </VStack>

            <Container maxW='md' mt={0} mb={4}>
              <Button m={2} colorScheme='teal' size='md' onClick={handleSubmit}>Submit</Button>
              <Button m={2} colorScheme='teal' size='md' onClick={saveData}>
                Save
              </Button>
            </Container>
          
            <NutrientTable object={obj} calories={calCount} food={input} />
        </>
    );
}