import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { AddAb } from '.'
import Swal from 'sweetalert2'

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .test('len', 'Must be less than 50 chars', val => val?.length < 50),
    charge: yup
        .string('Enter charge')
        .required('Charge is required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .test('len', 'Must be less than 50 chars', val => val?.length < 50),
    address: yup
        .string('Enter address')
        .required('Address is required')
        .test('len', 'Must be less than 150 chars', val => val?.length < 150),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
        .test('len', 'Must be less than 50 chars', val => val?.length < 50)
});

const WithMaterialUI = () => {

    const [selectedDate, setSelectedDate] = useState()
    const [abs, setAbs] = useState([])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            charge: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Validate abilities and date 
            var twelve = new Date();
            twelve.setFullYear(twelve.getFullYear() - 12);
            let errorMessage = ""

            if (!selectedDate)
                errorMessage = "Born date is required"
            else if (selectedDate > twelve)
                errorMessage = "You must be older than 12 years old to continue"
            else if (abs.length < 1)
                errorMessage = "You must add at least one ability"


            if (errorMessage !== "")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                })
            else {
                // Register field
            }

        },
    });

    return (
        <div>
            <form>
                <Grid container spacing={2} align="end">
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box pt={2} display='flex' alignItems='center'>
                            <TextField
                                fullWidth
                                id="charge"
                                name="charge"
                                label="Charge"
                                value={formik.values.charge}
                                onChange={formik.handleChange}
                                error={formik.touched.charge && Boolean(formik.errors.charge)}
                                helperText={formik.touched.charge && formik.errors.charge}
                            />

                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                disableFuture
                                fullWidth
                                id="date-picker-dialog"
                                label="Born Date"
                                format="dd/mm/yyyy"
                                value={selectedDate}
                                required
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />

                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <AddAb setAbs={setAbs} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box className='abs'>
                            <h6>Abilities: </h6>
                            <span>
                                {
                                    abs.length > 0 ?
                                        abs.reduce((acum, curr) => acum + ',' + curr)
                                        : ''
                                }
                            </span>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button color="primary" variant="contained" onClick={formik.handleSubmit} >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};


export default WithMaterialUI;