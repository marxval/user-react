import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const AddAb = ({ setAbs }) => {

    const [ab, setAb] = useState('')

    const handleClick = () => {
        // Validation
        if (ab !== '') {
            setAbs((abs) => {
                let str = ab.charAt(0).toUpperCase() + ab.slice(1);
                str = str.trim().split(' ')[0]
                if (str !== '')
                    return [...abs, str]
                else
                    return [...abs]
            })
            setAb('')
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setAb(e.currentTarget.value)
    }

    return (
        <Box display='flex' alignItems='center'>
            <TextField
                fullWidth
                onChange={handleChange}
                id="addAb"
                name="addAb"
                label="Add abilities"
                value={ab}
            />
            <Button color="primary" variant="contained" style={{ width: '100px', height: '35px' }} onClick={handleClick} fullWidth >
                Add
            </Button>
        </Box>
    );
};


export default AddAb;