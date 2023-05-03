import { useState, useEffect } from "react";
// import {useNavigate} from "react-router-dom"
import Navbar from "../LandingPage1/navbar"
import axios from 'axios';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';

  const BASE = 'http://localhost:1999/api/v1';  //Base url 
  
  export default function UserProfileEdit(): JSX.Element {
    const [email,setEmail] = useState('');

    useEffect(()=>{
      setEmail(localStorage.getItem('email'));
    }, [])
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        dupPassword:''
    });

    const [postImage, setPostImage] = useState( { myFile : ""})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createPost = async (newImage) => {
      try{
        await axios.post(BASE+'/updateProfileImage', {newImage, email})

        //getImage is not working properly
        localStorage.setItem('profileImage', postImage.myFile);
      }catch(error){
        console.log(error)
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(formData);
          await axios.patch(BASE+'/updateProfile', formData);
          createPost(postImage)
          console.log("Uploaded")
          alert('Profile updated successfully!');
        } catch (err) {
          console.error(err);
          alert('Error updating profile!');
        }
      };

      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile : base64 })
      }

    return (
        <>
        <Navbar />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <form onSubmit={handleSubmit}>
        <Stack
          spacing={5}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={7}
          // my={12}
          >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={postImage.myFile || "https://bit.ly/sage-adebayo"}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
              <input 
          type="file"
          lable="Image"
          name="myFile"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="userName" value={formData.userName} onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              name="email" value={formData.email} onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              name="password" value={formData.password} onChange={handleChange}
            />
          </FormControl>
          <FormControl id="dupPassword" isRequired>
            <FormLabel>Re-enter Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              name="dupPassword" value={formData.dupPassword} onChange={handleChange}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              type="submit"
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
        </form>
      </Flex>
        </>
    );
  }


  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }