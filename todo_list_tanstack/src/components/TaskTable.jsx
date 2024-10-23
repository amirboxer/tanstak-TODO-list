
// react hooks
import { useState } from "react";

// tanstack tools
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

// initial demo-data
import { DATA } from "../assets/demo_data/demo_data";

// components
import EditableTask from "./EditableTask";
import Piority from "./Priority";
import DeleteTask from "./DeleteTask";
import Filters from "./Filters";

const columns = [
    {
        //  task column editble as text
        accessorKey: 'task',
        header: 'Task',
        size: 225,
        cell: EditableTask,
    },

    {
        //  assignee column editble as text
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: EditableTask,
    },
    {
        //  priority column editble as a dropDown
        accessorKey: 'priority',
        header: 'Priority',
        cell: Piority,
    },
    {
        accessorKey: 'edit',
        header: 'Edit',
        cell: props => <div>{props.getValue()}</div>,
    },
    {
        accessorKey: 'delete',
        header: 'Delete',
        cell: DeleteTask,
    }

]

function TaskTable() {
    // states
    const [data, setData] = useState(DATA);
    const [columnFilters, setColumnFilters] = useState([{id:'priority', value: []}, {id:'assignee', value: []}]);

    // tanstack
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: 'onChange',
        meta: {
            updateData: (rowIdx, colId, newVal) => setData(prev =>
                prev.map((row, i) => i !== rowIdx ? row : { ...row, [colId]: newVal })
            )
        }
    });


    return (
        <table
            style={{
                width: table.getCenterTotalSize(),
            }}
            className="task-table"
        >
            {/* headers */}
            <thead
                className="thead">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="th"
                                style={{ width: header.getSize() }}
                            >
                                {/* header which will appear to user */}
                                {header.column.columnDef.header}

                                {/* column resizer */}
                                <div
                                    onDoubleClick={() => header.column.resetSize()}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                />

                                {/* filters */}
                                {(header.id === 'priority' || header.id === 'assignee') &&
                                    <Filters
                                        filterId={header.id}
                                        columnFilters={columnFilters}
                                        setColumnFilters={setColumnFilters}
                                    />
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </thead >

            {/* rows - data */}
            < tbody >
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className="tr"
                    >
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="td"
                                style={{ width: cell.column.getSize() }}
                            >
                                {/* data displayed here */}
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default TaskTable