import { Progress } from '@chakra-ui/react'


const progress = (props) => {

    return (
        <div>
            <Progress colorScheme='green' size='md' value={props.totalCalorie} />
        </div>
    );
}

export default progress;