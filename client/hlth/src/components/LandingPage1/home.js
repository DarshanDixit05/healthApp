import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "./navbar.js"
import axios from 'axios';
import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons';
  import { HStack, VStack } from '@chakra-ui/react'
  
  export default function Home() {
    const navigate = useNavigate();
    const goToCalorieStatus = () =>{
      navigate('/status');
    }
    const goToDailyInput = () =>{
      navigate('/dailyInput');
    }
    return (
        <>
        <Navbar />
      <Center py={6}>
        <VStack py={6} spacing={4}>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}>
            <Text
              fontSize={'sm'}
              fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}>
              Know Your Calorie Status
            </Text>
            {/* <Stack direction={'row'} align={'center'} justify={'center'}>
              <Text fontSize={'3xl'}>$</Text>
              <Text fontSize={'6xl'} fontWeight={800}>
                79
              </Text>
              <Text color={'gray.500'}>/month</Text>
            </Stack> */}
          </Stack>
  
          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                Track your daily progress
              </ListItem>
              {/* <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                50 identified users
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                All features
              </ListItem> */}
            </List>
  
            <Button
              mt={10}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              onClick={goToCalorieStatus}
              _hover={{
                bg: 'green.500',
              }}
              _focus={{
                bg: 'green.500',
              }}>
              Calorie Status
            </Button>
          </Box>
        </Box>
        <Box
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Stack
            textAlign={'center'}
            p={6}
            color={useColorModeValue('gray.800', 'white')}
            align={'center'}>
            <Text
              fontSize={'sm'}
              fontWeight={500}
              bg={useColorModeValue('green.50', 'green.900')}
              p={2}
              px={3}
              color={'green.500'}
              rounded={'full'}>
              Tell Us What You Ate Today
            </Text>
            {/* <Stack direction={'row'} align={'center'} justify={'center'}>
              <Text fontSize={'3xl'}>$</Text>
              <Text fontSize={'6xl'} fontWeight={800}>
                79
              </Text>
              <Text color={'gray.500'}>/month</Text>
            </Stack> */}
          </Stack>
  
          <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                Nutrition details of the food you ate
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                Add the food for your calorie goal
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                Quantity wise food nutrition details
              </ListItem>
              {/* <ListItem>
                <ListIcon as={CheckIcon} color="green.400" />
                All features
              </ListItem> */}
            </List>
  
            <Button
              mt={10}
              w={'full'}
              bg={'green.400'}
              color={'white'}
              rounded={'xl'}
              boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
              _hover={{
                bg: 'green.500',
              }}
              onClick={goToDailyInput}
              _focus={{
                bg: 'green.500',
              }}>
              Let's Go
            </Button>
          </Box>
        </Box>
        </VStack>
      </Center>
      </>
    );
  }