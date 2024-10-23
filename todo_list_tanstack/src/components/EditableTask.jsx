// chakra
import { Input } from '@chakra-ui/react'

function EditableTask({ getValue: getInitialValue, row, column, table }) {
    function onUpdateData({target}) {
        // setValue(target.value);
        table.options.meta?.updateData(row.index, column.id, target.value);
     } 

    return (
        <Input
            className='drak-font'
            value={getInitialValue()}
            variant={"filled"}
            background={'gray.200'}
            size="sm"
            w="85%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            // event handlers
            onChange={onUpdateData}
        />
    )
}

export default EditableTask