import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Swal from 'sweetalert2'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function CustomizedTable({ setUser }) {
    const classes = useStyles();
    const [data, setData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://backusersjs.herokuapp.com/users')
                const usersData = response.data.map((row) => {
                    let obj = { ...row }
                    obj['detail'] = <Button
                        variant='contained'
                        onClick={() => { setUser(row.email) }}
                    >
                        Details
                    </Button>
                    return obj;
                })
                setData(usersData)
            } catch (error) {
                const { errors } = error?.response?.data;
                if (!errors) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error Al mostrar datos',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errors[0].msg,
                    })
                }

            }
        }
        getData();
    }, [])

    if (!data) {
        return <p>Loading</p>
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>User</StyledTableCell>
                        <StyledTableCell >Email</StyledTableCell>
                        <StyledTableCell >Charge</StyledTableCell>
                        <StyledTableCell >Detail</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell >{row.email}</StyledTableCell>
                            <StyledTableCell >{row.charge}</StyledTableCell>
                            <StyledTableCell >{row.detail}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}