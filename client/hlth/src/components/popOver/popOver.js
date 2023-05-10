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

  function CompExample(props) {
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
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        
      </Alert>
    ) : null
  }

  export default CompExample;