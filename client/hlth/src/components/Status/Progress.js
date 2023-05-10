import { Progress } from '@chakra-ui/react';
import CompExample from "../popOver/popOver.js";
import { useState, useEffect } from "react";
import React from "react";

const BASE = 'http://localhost:1999/api/v1';

function ProgressComponent(props) {
    const [reached, setReached] = useState(false);
  return (
    <div>
      <Progress colorScheme='green' size='md' value={props.totalCalorie} />
      <CompExample f={props.flag}/>
    </div>
  );
}

export default ProgressComponent;
