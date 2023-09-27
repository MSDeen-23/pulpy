import React, { useEffect } from "react";
import Pagination from '@mui/material/Pagination';

const TableHeaderPulpy = (props) => {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (rowsPerPage) {
            props.setrowfilter(rowsPerPage)
        }
    }, [rowsPerPage])

    useEffect(() => {
        if (page) {
            props.setpageination(page)
        }
    }, [page])


    return (
        <div className='dFlex float-end mt-3 mb-3'>
           
            <Pagination count={Math.round(props.rows.length/10)}  page={page}
                onChange={handleChangePage} showFirstButton showLastButton />
        </div>
    )
}

export default TableHeaderPulpy;