//demo data
import { PRIORITY_COLOR_MAP } from '../assets/demo_data/demo_data'

// chakra
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
    Button,
    Icon,
    Text,
    Stack,
    Checkbox,
} from '@chakra-ui/react'

import FilterIcon from './icons/FilterIcon'

function Filters({ filterId, columnFilters, setColumnFilters }) {

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
                <Button
                    size='sm'
                    leftIcon={<Icon as={FilterIcon} />}
                >
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverCloseButton />
                <PopoverBody
                    maxHeight={'50vh'}
                    overflowY={'auto'}
                >
                    <Text
                        fontSize="md"
                        fontWeight="bold"
                        mb={4}
                    >
                        Filter By:
                    </Text>

                    <Stack>
                        {Object.keys(PRIORITY_COLOR_MAP).map(filterValue =>
                            <Checkbox
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


function foo() {
    return
}