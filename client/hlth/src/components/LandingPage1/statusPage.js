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
    const [calArr, setCalArr] = useState([]);
    const [total, setTotal] = useState(0);

    const options = {
        method: 'GET',
        url: BASE+'/getCalCount',
        params: {email: em},  // user req.query.email in backend to catch 
    };  

    let calCulateTotalCal = calArr.map(it=>{
        let sum=0;
        sum = sum + it.calories;
        return sum;
    })

    
    useEffect(()=>{
        setEmail(localStorage.getItem('email'));
    },[])
    console.log(em);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            await axios.request(options).then(res=>{console.log(res); setCalArr(res.data.entries)}).catch(err=>{console.log(err);});
            // setTotal(calCulateTotalCal);
            console.log(calCulateTotalCal);
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <>
            <Navbar />
            <VStack py={10} spacing={2}>
                <Container maxW='md'>
                    <Progress totalCalorie={total} />
                </Container>
            </VStack>
            <Container maxW='md' mt={0} mb={4}>
                <h3 style={{textAlign:"center"}}>You have completed {total} of your calorie goal !</h3>
                <Button m={2} colorScheme='teal' size='md' onClick={handleSubmit}>Know Your Progress</Button>
            </Container>
        </>
    );
}

export default StatusPage;