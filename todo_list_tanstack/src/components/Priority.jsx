// react hooks
import { useState, useEffect } from "react";

// chakra
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import { ChevronDownIcon, TimeIcon } from '@chakra-ui/icons'

// demo data
import { PRIORITY_COLOR_MAP } from "../assets/demo_data/demo_data";


function Piority({ getValue: getInitialValue, row, column, table }) {
    function updatePriorityLevel(priorityLevel) {
        table.options.meta.updateData(row.index, column.id, priorityLevel)
    }

    return (
        <Menu
            className='drak-font'
            isLazy
        >
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                h="100%"
                w="100%"
                p={1}

                bg={PRIORITY_COLOR_MAP[getInitialValue()]}
            >
                {getInitialValue()}
            </MenuButton>

            {/* priority selection */}
            <MenuList>
                {Object.keys(PRIORITY_COLOR_MAP).map(level =>
                    // priority option
                    <MenuItem
                        key={level}
                        // event handlers
                        onClick={() => updatePriorityLevel(level)}
                    >
                        <TimeIcon
                            mr={4}
                        />
                        {level}
                    </MenuItem>)}
            </MenuList>
        </Menu>
    )
}


export default Piority