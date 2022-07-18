import {
    Container,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    IconButton,
    ListItemText,
    Button,
    Divider,
    TextField,
    FormControl,
    FormLabel,
    Radio,
    FormControlLabel,
    RadioGroup,
    Fab,
    CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { v4 as uuid } from 'uuid'
import { useSubmit } from '../hooks/useSubmit'

import { createDimension, mutateDimension, updateDimension } from '../api_calls'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import useMessager from '../hooks/useMessager'

const validationSchema = yup.object({
    name: yup
        .string('Enter name of the dimension')
        .required('Name of dimension is required'),
    valueType: yup.string().required('Value type is required'),
    minValue: yup.number('Min value has to be a number').required(),
    maxValue: yup.number('Max value has to be a number').required(),
})

const newItem = {
    id: uuid(),
    name: '',
    valueType: 'integer',
    minValue: 0,
    maxValue: 5,
}

const existingItem = (data) => {
    return {
        id: data.id,
        name: data.name,
        valueType: data.valueType,
        minValue: data.minValue,
        maxValue: data.maxValue,
    }
}

const EditDimension = ({ handleClose, data, editing, handleUpdate }) => {
    const [handleApiSubmit, loading, error, response] = useSubmit(
        editing ? updateDimension : createDimension
    )
    const { mapId } = useParams()
    const formik = useFormik({
        initialValues: data ? existingItem(data) : newItem,
        validationSchema: validationSchema,
        onSubmit: (payload) => {
            handleApiSubmit(payload, mapId)
        },
    })

    const { displayMessage } = useMessager()

    useEffect(() => {
        if (response) {
            const message = `${
                editing ? 'Updated' : 'Created'
            } dimension succesfully.`
            displayMessage(message, 'success')
            handleUpdate(response.data)
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [loading, error, response])

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'col',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <TextField
                    sx={{ width: 400 }}
                    id="name"
                    name="name"
                    label="name"
                    type="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                >
                    Name
                </TextField>
                <FormControl>
                    <FormLabel id="valueType">Value type</FormLabel>
                    <RadioGroup
                        row
                        name="type"
                        label="type"
                        type="valueType"
                        value={formik.values.valueType}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.valueType &&
                            Boolean(formik.errors.valueType)
                        }
                        helperText={
                            formik.touched.valueType && formik.errors.valueType
                        }
                    >
                        <FormControlLabel
                            value="integer"
                            control={<Radio />}
                            label="Integer"
                        />
                        <FormControlLabel
                            value="float"
                            control={<Radio />}
                            label="Float"
                        />
                    </RadioGroup>
                </FormControl>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    <TextField
                        sx={{ width: 100 }}
                        id="minValue"
                        name="minValue"
                        label="minValue"
                        type="minValue"
                        value={formik.values.minValue}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.minValue &&
                            Boolean(formik.errors.minValue)
                        }
                        helperText={
                            formik.touched.minValue && formik.errors.minValue
                        }
                    >
                        Min
                    </TextField>
                    <Typography variant="h4" component="p" sx={{ p: 1 }}>
                        -
                    </Typography>
                    <TextField
                        sx={{ width: 100 }}
                        id="maxValue"
                        name="maxValue"
                        label="maxValue"
                        type="maxValue"
                        value={formik.values.maxValue}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.maxValue &&
                            Boolean(formik.errors.maxValue)
                        }
                        helperText={
                            formik.touched.maxValue && formik.errors.maxValue
                        }
                    >
                        Max
                    </TextField>
                </div>
                <Fab
                    color="primary"
                    aria-label="add"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> : <CheckIcon />}
                </Fab>
            </Box>
        </form>
    )
}

export default EditDimension
