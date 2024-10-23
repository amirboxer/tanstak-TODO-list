// chakra
import { DeleteIcon } from "@chakra-ui/icons";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
} from '@chakra-ui/react';

// react hooks
import { useRef } from "react";

function DeleteTask({ row, table }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);

    function onDelete(e) {
        onClose(e);
        // deleting from state 
        table.options.meta.deleteRow(row.index);
    }

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                Delete
                <DeleteIcon
                    ml={4}
                />
            </Button>

            {/* alerting modal */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Task
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You will not be able to undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            {/* event handler for deleteing task */}
                            <Button colorScheme='red' onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteTask

