import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useDisclosure,
    Box,
    CloseButton,
    Button
  } from '@chakra-ui/react'
  import React from "react"
  import { useState, useEffect } from "react";
  import {useNavigate} from "react-router-dom"

  function CompExample(props) {
    const navigate=useNavigate();
    const {
      isOpen: isVisible,
      onClose,
      onOpen,
    } = useDisclosure({ defaultIsOpen: false})

    const [flag, setFlag]=useState(false)
    useEffect(() => {
        setFlag();
    }, [])
    return props.f ? (
      <Alert status='success'>
        <AlertIcon />
        <Box>
          <AlertDescription>
            Yayy! You've reached your GOAL!
          </AlertDescription>
        </Box>
        <Button m={2} colorScheme='teal' size='md' onClick={()=>{
            navigate("/setGoal")
        }}>New Goal</Button>
      </Alert>
    ) : null
  }

  export default CompExample;