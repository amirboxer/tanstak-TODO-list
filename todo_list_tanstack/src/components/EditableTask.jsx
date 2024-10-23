// react hooks
import { useState } from "react";

// chakra
import { Input } from '@chakra-ui/react'

function EditableTask({ getValue: getInitialValue, row, column, table }) {
    // states
    const [value, setValue] = useState(getInitialValue());

    function onUpdateData({target}) {
        setValue(target.value);
        table.options.meta?.updateData(row.index, column.id, target.value);
     } 

    return (
        <Input
            value={value}
            variant={"filled"}
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