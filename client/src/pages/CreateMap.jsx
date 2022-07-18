import {
    Typography,
    TextField,
    Container,
    Paper,
    Grid,
    ListItem,
    List,
    IconButton,
    ListItemText,
    ListSubheader,
    ListItemButton,
    Title,
    Link,
    Button,
} from '@mui/material'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { createMap } from '../api_calls'
import { useSubmit } from '../hooks/useSubmit'
import useAuth from '../hooks/useAuth'
import makeAuthHeader from '../util/makeAuthHeader'

import { useEffect } from 'react'
import useMessager from '../hooks/useMessager'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    description: yup
        .string('Enter your description')
        .min(8, 'Description should be of minimum 8 characters length')
        .max(300, 'Description should be maximum of 300 characters length')
        .required('Description is required'),
    title: yup
        .string('Enter your title')
        .min(3, 'Title should be of minimum 3 characters length')
        .max(50, 'Title should be of maximum of 50 characters length')
        .required('Title is required'),
})

const CreateMap = () => {
    const [handleApiSubmit, loading, error, response] = useSubmit(createMap)
    const { user } = useAuth()
    const { displayMessage } = useMessager()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) =>
            handleApiSubmit({ ...values, creator: user.id }),
    })

    useEffect(() => {
        if (response) {
            const message = `Map '${response.data.title}' created.`
            displayMessage(message, 'success')
            navigate(`/maps/${response.data.id}`)
        } else if (error) {
            displayMessage(error.message)
        }
    }, [response, loading, error])

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
                sx={{
                    padding: 4,
                }}
            >
                <Typography
                    sx={{
                        padding: 4,
                    }}
                    variant="h3"
                >
                    Create new map
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                        fullWidth
                        label="Select title"
                        multiline
                        maxRows={4}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                        helperText={
                            formik.touched.description &&
                            formik.errors.description
                        }
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={false}
                    >
                        Create
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateMap
