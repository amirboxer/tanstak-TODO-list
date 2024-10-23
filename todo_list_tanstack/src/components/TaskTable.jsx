
// react hooks
import { useState } from "react";

// tanstack tools
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    getSortedRowModel,
} from "@tanstack/react-table";

// initial demo-data
import { DATA } from "../assets/demo_data/demo_data";

// components
import EditableTask from "./EditableTask";
import Piority from "./Priority";
import DeleteTask from "./DeleteTask";
import Filters from "./Filters";
import AddTask from "./AddTask";

// chakra
import {
    Icon,
} from '@chakra-ui/react';


// icons
import SortIcon from "./icons/SortIcon";

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
        // can be filtered by
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: EditableTask,
        filterFn: (row, columnId, filterAssignee) => !filterAssignee.length ? true : filterAssignee.includes(row.getValue(columnId)),
    },
    {
        //  priority column editble as a dropDown
        // can be filtered by
        accessorKey: 'priority',
        header: 'Priority',
        cell: Piority,
        enableColumnFilter: true,
        filterFn: (row, columnId, filterPriority) => !filterPriority.length ? true : filterPriority.includes(row.getValue(columnId)),
        sortingFn: (rowA, rowB, columnId) => {
            const priorityToNum = {
                'Critical': 1,
                'High': 2,
                'Medium': 3,
                'Low': 4,
                'Lowest': 5,
            }

            const numA = priorityToNum[rowA.getValue(columnId)];
            const numB = priorityToNum[rowB.getValue(columnId)];

            return numA < numB ? 1 : numA > numB ? -1 : 0;

        }
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
    const [columnFilters, setColumnFilters] = useState([{ id: 'priority', value: [] }, { id: 'assignee', value: [] }]);

    // tanstack
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange',
        meta: {
            //  update existing row
            updateData: (rowIdx, colId, newVal) => setData(prev =>
                prev.map((row, i) => i !== rowIdx ? row : { ...row, [colId]: newVal })
            ),

            // delete a row
            deleteRow: rowIdx => {
                setData(prev => prev.filter((row, i) => i !== rowIdx));
                setColumnFilters([{ id: 'priority', value: [] }, { id: 'assignee', value: [] }])
            },

            // add new task
            addTask: (task, assignee, priority) => setData(prev => [{ task, priority, assignee, delete: 'delete'}, ...prev]),
        }
    });

    return (
        <>
            {/* add new task */}
            <AddTask
                table={table}
            />
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

                                    { }

                                    {/* column resizer */}
                                    <div
                                        onDoubleClick={() => header.column.resetSize()}
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                                    />

                                    {/* filters and sorting */}
                                    {(header.id === 'priority' || header.id === 'assignee') &&
                                        <>
                                            <Filters
                                                filterId={header.id}
                                                columnFilters={columnFilters}
                                                setColumnFilters={setColumnFilters}
                                                table={data}
                                            />

                                            <Icon
                                                cursor={'pointer'}
                                                as={SortIcon}
                                                mx={3}
                                                fontSize={14}
                                                onClick={header.column.getToggleSortingHandler()}
                                            />
                                        </>
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
        </>


    )
}

export default TaskTable