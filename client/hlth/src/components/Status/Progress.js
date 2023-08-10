import { Progress } from '@chakra-ui/react';
import CompExample from "../popOver/popOver.js";
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

const BASE = 'http://localhost:1999/api/v1';

function ProgressComponent(props) {
    const [reached, setReached] = useState(false);
    const [email, setEmail] = useState("");
    const sendMail = {
      method: 'POST',
      url: BASE+'/sendMail',
      params: {email: email},  // user req.query.email in backend to catch 
    }; 
    useEffect(()=>{
      setEmail(localStorage.getItem('email'));
      if(props.totalCalorie>=100)axios(sendMail).then(res =>{
        console.log(res);
      })
  },[])

  return (
    <div>
      <Progress colorScheme='green' size='md' value={props.totalCalorie} />
      <CompExample f={(props.totalCalorie>=100)}/>
    </div>
  );
}

export default ProgressComponent;
