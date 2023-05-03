import { ReactNode } from 'react';
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import axios from 'axios';

const BASE = 'http://localhost:1999/api/v1';  //Base url 

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Nav() {
  const [em, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [imagePath, setImagePath]=useState("");

  const getUserName = {
    method: 'GET',
    url: BASE+'/getCaloriesGoal',
    params: {email: em},  // user req.query.email in backend to catch 
  };  

  const getProfileImage = {
    method: 'GET',
    url: BASE+'/getProfileImage',
    params: {email: em},  // user req.query.email in backend to catch 
  }

  useEffect(()=>{
      setEmail(localStorage.getItem('email'));
      setImagePath(localStorage.getItem('profileImage'));
      console.log(localStorage.getItem('profileImage'));
  }, [])

  const handleSubmit = async()=>{
    try {
        await axios.request(getUserName).then(res=>{ 
          setUserName(res.data.userName);
        })
    } catch (err) {
        console.log(err);
    }
}

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleClick = async (event) =>{
    event.preventDefault();
      try {
        await axios.post(BASE+'/logout');
        console.log("successs!");
        navigate("/login");
      } catch (err) {
        // Handle error response
        console.error(err);
        alert("Failed to logut!")
      }
  }
  const handleUpdateProfile = () =>{
    navigate("/updateProfile")
  }
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  onClick={handleSubmit}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={imagePath || 'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={imagePath || 'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleUpdateProfile}>Update Profile</MenuItem>
                  <MenuItem onClick={handleClick}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}