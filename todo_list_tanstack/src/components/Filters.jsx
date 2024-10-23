//demo data
import { PRIORITY_COLOR_MAP } from '../assets/demo_data/demo_data'

// chakra
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
    Box,
    Icon,
    Text,
    Stack,
    Checkbox,
} from '@chakra-ui/react'

import FilterIcon from './icons/FilterIcon'

function Filters({ filterId, columnFilters, setColumnFilters, table }) {

    const selectedFilters = columnFilters[filterId];


    function toggleFilterValue(e) {
        setColumnFilters(prev => {
            // array of values to filter by
            let currFilters = prev.find(filter => filter.id === filterId).value;

            if (e.target.checked) {
                currFilters.push(e.target.value);
            }

            else {
                currFilters = currFilters.filter(filter => filter !== e.target.value);
            }

            return prev.map(filter => filter.id !== filterId ? filter : { id: filterId, value: currFilters })
        })
    }


    return (
        <Popover
            isLazy
        >
            <PopoverTrigger>
                <Box
                    display={'inline'}
                >
                    <Icon
                        cursor={'pointer'}
                        as={FilterIcon}
                        mx={3}
                        fontSize={14}
                    />
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverCloseButton />
                <PopoverBody
                    maxHeight={'50vh'}
                    overflowY={'auto'}
                >
                    <Text
                        color={'black'}
                        fontSize="md"
                        fontWeight="bold"
                        mb={4}
                    >
                        Filter By:
                    </Text>

                    <Stack>
                        {getCheckboxes(filterId, table).map(filterValue =>
                            <Checkbox
                                color={'black'}
                                key={filterValue}
                                value={filterValue}
                                isChecked={columnFilters.find(filter => filter.id === filterId).value.includes(filterValue)}
                                // event handler
                                onChange={e => toggleFilterValue(e)}
                            >
                                {filterValue}
                            </Checkbox>
                        )}
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>)
}

export default Filters


function getCheckboxes(filterId, table) {
    return filterId === 'priority' ? Object.keys(PRIORITY_COLOR_MAP) : extractAssignees(table);
}


function extractAssignees(table) {
    return [...new Set(table.map(row => row.assignee))];
}