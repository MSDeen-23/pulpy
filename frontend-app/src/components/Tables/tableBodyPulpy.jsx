import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHeaderPulpy from '../Tables/tableHeaderPulpy'
import editicon from '../../assets/images/edit.svg'
import deleteicon from '../../assets/images/trash.svg'
import { TablePagination, TextField } from "@mui/material";
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const editlead = (e) => {

}

const deletelead = (e) => {

}


export default function TableBodyPulpy(props) {
    const [pageination, setpageination] = React.useState(1);
    const [rowfilter, setrowfilter] = React.useState(10);
    const [leadslist, setLeadlist] = useState([props.row]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const getDetail = (key) =>{
        props.setteamid(key)
    }
    return (
        <div className='leadtable'>Settings

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                props.leadTablehead.map((head) =>
                                    <StyledTableCell align="left">{head}</StyledTableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {(rowfilter > 0
                            ? props.row.slice((pageination - 1) * rowfilter, pageination * rowfilter)
                            : props.row
                        ).map((row , index) => (
                            <StyledTableRow key={row.title1}  style={{"font-family":'Poppins'}}>
                                <StyledTableCell scope="row">
                                   { props.from == "teamslist" ? <span className='initial' >{row.title1.charAt(0)}</span>:null } {row.title1}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.title2}</StyledTableCell>
                                <StyledTableCell align="left">{row.title3}</StyledTableCell>
                                {props.from == "allleads" || props.from == "teamslist" ? <StyledTableCell align="left">
                                    <StyledTableCell align="left">{row.title4}</StyledTableCell>
                                </StyledTableCell> : <StyledTableCell align="left" className='action_set'>
                                    <div onClick={e => editlead(e)}>
                                        <img src={editicon} alt="edit" />
                                    </div>
                                    <div onClick={e => deletelead(e)}>
                                        <img src={deleteicon} alt="edit" />
                                    </div>

                                </StyledTableCell>}
                                {
                                    props.from == "teamslist" ? <StyledTableCell align="left" className='action_set'>
                                        <Button variant="outlined" onClick={ e=> getDetail(index+1)} sx={{ "font-family":'Poppins' , "borderColor":"#000" , "color":'#000' , "borderRadius":"5px" , "textTransform":"capitalize"}}>Upgrade</Button>
                                    </StyledTableCell> : null
                                }

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableHeaderPulpy setrowfilter={setrowfilter} setpageination={setpageination} rows={props.row} />
        </div>

    );
}