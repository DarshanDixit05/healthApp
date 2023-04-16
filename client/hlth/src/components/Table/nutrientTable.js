import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import {
  Card, CardHeader, CardBody, CardFooter,
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
  Heading,
  Stack,
  StackDivider,
  Text,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList
  } from '@chakra-ui/react'

  const BASE = 'http://localhost:1999/api/v1';  //Base url 

  export default function nutrientTable(props){
    // console.log(props.object);
    return(
      <Container>
        <Card>
  <CardHeader>
    <Heading size='md'>Nutrient Report</Heading>
  </CardHeader>
  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          {props.food}
        </Heading>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Calories
        </Heading>
        <Text pt='2' fontSize='sm'>
          {props.calories}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Nutrient Details
        </Heading>
        <UnorderedList pt='2' fontSize='sm'>
          <ListItem>Calcium : {(props.object.CA)?props.object.CA.quantity:0} %</ListItem>
          <ListItem>Carbs : {(props.object.CHOCDF)?props.object.CHOCDF.quantity:0} %</ListItem>
          <ListItem>Cholesterol : {(props.object.CHOLE)?props.object.CHOLE.quantity:0} %</ListItem>
          <ListItem>Energy : {(props.object.ENERC_KCAL)?props.object.ENERC_KCAL.quantity:0} %</ListItem>
          <ListItem>Saturated : {(props.object.FASAT)?props.object.FASAT.quantity:0} %</ListItem>
          <ListItem>Fat : {(props.object.FAT)?props.object.FAT.quantity:0} %</ListItem>
          <ListItem>Iron : {(props.object.FE)?props.object.FE.quantity:0} %</ListItem>
          <ListItem>Fiber : {(props.object.FIBTG)?props.object.FIBTG.quantity:0} %</ListItem>
          <ListItem>Folate equivalent (total) : {(props.object.FOLDFE)?props.object.FOLDFE.quantity:0} %</ListItem>
          <ListItem>Potassium : {(props.object.K)?props.object.K.quantity:0} %</ListItem>
          <ListItem>Magnesium : {(props.object.MG)?props.object.MG.quantity:0} %</ListItem>
          <ListItem>Sodium : {(props.object.NA)?props.object.NA.quantity:0} %</ListItem>
          <ListItem>Niacin (B3) : {(props.object.NIA)?props.object.NIA.quantity:0} %</ListItem>
          <ListItem>Phosphorus : {(props.object.P)?props.object.P.quantity:0} %</ListItem>
          <ListItem>Protein : {(props.object.PROCNT)?props.object.PROCNT.quantity:0} %</ListItem>
          <ListItem>Riboflavin (B2) : {(props.object.RIBF)?props.object.RIBF.quantity:0} %</ListItem>
          <ListItem>Thiamin (B1) : {(props.object.THIA)?props.object.THIA.quantity:0} %</ListItem>
          <ListItem>Vitamin E : {(props.object.TOCPHA)?props.object.TOCPHA.quantity:0} %</ListItem>
          <ListItem>Vitamin A : {(props.object.VITA_RAE)?props.object.VITA_RAE.quantity:0} %</ListItem>
          <ListItem>Vitamin B6 : {(props.object.VITB6A)?props.object.VITB6A.quantity:0} %</ListItem>
          <ListItem>Vitamin B12 : {(props.object.VITB12)?props.object.VITB12.quantity:0} %</ListItem>
          <ListItem>Vitamin C : {(props.object.VITC)?props.object.VITC.quantity:0} %</ListItem>
          <ListItem>Vitamin D : {(props.object.VITD)?props.object.VITD.quantity:0} %</ListItem>
          <ListItem>Vitamin K : {(props.object.VITK1)?props.object.VITK1.quantity:0} %</ListItem>
          <ListItem>Zinc : {(props.object.ZN)?props.object.ZN.quantity:0} %</ListItem>
        </UnorderedList>
      </Box>
    </Stack>
  </CardBody>
</Card>
      </Container>
    );
  }