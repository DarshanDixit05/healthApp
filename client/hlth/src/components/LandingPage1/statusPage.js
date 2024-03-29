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
    const [percentage, setPercentage] = useState(0);
    const [goal, setCalGoal]=useState(0);
    const [reached, setReached]=useState(false);
    const [date , setDate] = useState("");
    const [daysRem, setRemDays] = useState();
    const [isNaNCheck, setIsNaNCheck] = useState();

    const getCalCount = {
        method: 'GET',
        url: BASE+'/getCalCount',
        params: {email: em},  // user req.query.email in backend to catch 
    };  

    // To get the user calorie Goal value from the server
    const getCalGoal = {
        method: 'GET',
        url: BASE+'/getCaloriesGoal',
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

    const getPercentage = async(sum) => {
        try {
                await axios.request(getCalGoal).then(res=>{
                const totalCalorieGoal = res.data.calorieGoal;
                setCalGoal(totalCalorieGoal);
                setPercentage((sum/totalCalorieGoal)*100);
            })
        } catch (error) {
             console.log(error);
        }
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
            
            // send the value of total calorie consumed directly to the function as setting state takes time.
            await axios.request(getCalCount).then(res=>{console.log(res);  
                console.log(res.data.endDate);
                setDate(res.data.endDate);
                let sum=0;
                for(let i=0; i<res.data.entries.length; i++)
                {
                    sum+=res.data.entries[i].calories;
                }
                if(sum>=goal)
                {
                    setReached(true);
                }
                setTotal(sum);
                setIsNaNCheck(1);
                getPercentage(sum)   }).catch(err=>{console.log(err);});
        } catch (err) {
            console.log(err);
        }
    }


    return(
        <>
            <Navbar />
            <Container maxW='md'>
            {isNaNCheck ? (
                <h3 style={{ textAlign: "center" }}>
                You have got {
                    Math.floor((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                } days to reach your goal
                </h3>
            ) : null}
            </Container>
            <VStack py={10} spacing={2}>
                <Container maxW='md'>
                    <Progress totalCalorie={percentage} userGoal = {goal} flag={reached}/>
                </Container>
            </VStack>
            <Container maxW='md' mt={0} mb={4}>
                <h3 style={{textAlign:"center"}}>You have completed {percentage.toFixed(2)} % of your calorie goal !</h3>
                <Button m={2} colorScheme='teal' size='md' onClick={(e) => handleSubmit(e)}>Know Your Progress</Button>
            </Container>
        </>
    );
}

export default StatusPage;