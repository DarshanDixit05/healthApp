import { Progress } from '@chakra-ui/react'


const progress = () => {

    return (
        <div>
            <Progress colorScheme='green' size='md' value={20} />
        </div>
    );
}

export default progress;