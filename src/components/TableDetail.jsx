import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'date-fns';
import axios from 'axios'
import Swal from 'sweetalert2'


const TableDetail = ({ user, setUser }) => {

    const [data, setData] = useState()

    useEffect(() => {
        console.log(user)
        const getData = async () => {
            try {
                const response = await axios.get('https://backusersjs.herokuapp.com/users/detail', {
                    params: {
                        email: user
                    }
                })
                const userData = response.data
                setData(userData)
            } catch (error) {
                if (!error?.response?.data?.errors) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error Al mostrar datos',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error?.response?.data?.errors[0].msg,
                    })
                }

            }
        }
        getData();
    }, [user])

    if (!data) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Grid container spacing={2} align="end">
                <Grid item xs={12} sm={12} md={12}>
                    <Button color="primary" variant="contained" onClick={() => { setUser(null) }} >
                        Back to users table
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={data.name}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={data.email}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="charge"
                        name="charge"
                        label="Charge"
                        value={data.charge}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="date"
                        name="date"
                        label="Born Date"
                        value={data.date}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        value={data.address}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box className='abs'>
                        <h5>Abilities: </h5>
                        <span>
                            {
                                data.abilities
                            }
                        </span>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
};


export default TableDetail;