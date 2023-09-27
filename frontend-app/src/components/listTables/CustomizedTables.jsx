import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {createTheme} from '@mui/system';
import {TablePagination} from "@mui/material";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#e9e9ea',
        color: theme.palette.common.black,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        marginTop: 20,
    },

}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    marginTop: '8px',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat) {
    return {name, calories, fat};
}

const rows = [
    createData(1, 'CTO Campaign', '22/10/22'),
    createData(2, 'CXO Campaign', '22/10/22'),
    createData(3, 'CMO Campaign', '22/10/22'),
];


export default function CustomizedTables() {
    const headerColumns = ["S.No", "Table Name", "Creation Date"];
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {headerColumns.map(value => {
                                return (<StyledTableCell align="left">{value}</StyledTableCell>);
                            })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.calories}</StyledTableCell>
                                <StyledTableCell align="left">{row.fat}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}