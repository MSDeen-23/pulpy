import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Switch, { SwitchProps } from '@mui/material/Switch';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

const CampaignsTable = (props) => {
    const [pageination, setpageination] = React.useState(1);
    const [rowfilter, setrowfilter] = React.useState(10);

    const getCampDetails = (key) => {
        props.setcampId(key)
    }

    const normalise = (value) => ((value - 0) * 100) / (100 - 0);

    return (
        <TableContainer component={Paper} className="camp_table">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {
                            props.leadTablehead.map((head) =>
                                <StyledTableCell align="left" sx={{ "background-color": "red" }}>{head}</StyledTableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>

                    {props.row.map((row, index) => (
                        <StyledTableRow key={row.title1.cname} style={{ "font-family": 'Poppins' }} onClick={ e => getCampDetails(index + 1)}>
                            <StyledTableCell scope="row">
                                {index + 1}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                <p>{row.title1[0]}</p>
                                <p>{row.title1[1]}</p>
                                <p><span>{row.title1[2]}</span><span className='pr_bar'><LinearProgress variant="determinate" value={normalise(row.title1[3])} /></span></p>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <p>{row.title2[0]}</p>
                                <p>{row.title2[1]}</p>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <p>{row.title3[0]}</p>
                                <p>{row.title3[1]}</p>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <p>{row.title4[0]}</p>
                                <p>{row.title4[1]}</p>
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.title5}</StyledTableCell>
                            <StyledTableCell align="left" className='action_set'>
                                <FormGroup>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                    </Stack>
                                    {/* <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                        label="iOS style"
                                    /> */}
                                </FormGroup>
                                {/* <Button variant="outlined" onClick={e => getDetail(index + 1)} sx={{ "font-family": 'Poppins', "borderColor": "#000", "color": '#000', "borderRadius": "5px", "textTransform": "capitalize" }}>Upgrade</Button> */}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CampaignsTable;