// chakra
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Text,
    Stack,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';

// react hooks
import { useRef, useState } from 'react';

// demo data
import { PRIORITY_COLOR_MAP } from "../assets/demo_data/demo_data";

function AddTask({table}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // states
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Critical');
    const [assignee, setAssignee] = useState('');

    function onChange(newVal, callBackSetter) {
        callBackSetter(newVal);
    }

    function onAddTask(e) {
        e.preventDefault();
        table.options.meta.addTask(description, assignee, priority);
        onClose();
    }

    // references
    const btnRef = useRef(null);

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen} mb={10} mt={10}>
                New
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create New Task</DrawerHeader>

                    <DrawerBody>
                        <form
                            id='add-task'
                            onSubmit={onAddTask}
                        >
                            {/* task description */}
                            <Text mb={5}>Task:</Text>
                            <Input
                                value={description}
                                variant={"filled"}
                                size="sm"
                                w="85%"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                placeholder='Type here...'
                                mb={10}
                                // event handlers
                                onChange={e => onChange(e.target.value, setDescription)}
                            />

                            {/* task priority */}
                            <Text mb={5}>Priority:</Text>
                            <RadioGroup
                                defaultValue='Critical'
                                onChange={e => onChange(e, setPriority)}
                                mb={10}

                            >
                                <Stack>
                                    {Object.entries(PRIORITY_COLOR_MAP).map(([priority, color]) =>
                                        <Radio
                                            key={priority}
                                            // name='1'
                                            colorScheme={'gray'}
                                            value={priority}
                                        >
                                            {priority}
                                        </Radio>
                                    )}
                                </Stack>
                            </RadioGroup>

                            {/* task assignee */}
                            <Text mb={5}>assignee:</Text>
                            <Input
                                value={assignee}
                                variant={"filled"}
                                size="sm"
                                w="85%"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                                placeholder='Type here...'
                                mb={10}
                                // event handlers
                                onChange={e => onChange(e.target.value, setAssignee)}
                            />


                            <Button type='submit' form='add-task'>
                                Add
                            </Button>
                        </form>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}


export default AddTask;