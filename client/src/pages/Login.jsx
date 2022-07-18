import { Button, Typography, Box, Container, TextField } from '@mui/material'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { login } from '../api_calls'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MessageContext } from '../contexts/MessageService'
import { AuthenticationContext } from '../contexts/AuthenticationService'
import useAuth from '../hooks/useAuth'
import useMessager from '../hooks/useMessager'

import { useSubmit } from '../hooks/useSubmit'
import { useEffect } from 'react'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
})

function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (credentials) => {
            handleApiSubmit(credentials)
        },
    })

    const { setUser } = useAuth()
    const { displayMessage } = useMessager()
    const navigate = useNavigate()

    const [handleApiSubmit, loading, error, response] = useSubmit(login)

    useEffect(() => {
        if (response) {
            setUser(response.data)
            displayMessage('Logged in', 'success')
            navigate('/home')
        } else if (error) {
            displayMessage(error.message, 'error')
        }
    }, [response, loading, error])

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '100px',
                }}
            >
                <Typography variant="h3">Login</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={loading}
                    >
                        Login
                    </Button>
                </form>
                <Typography
                    variant="caption"
                    sx={{ marginTop: '2rem', cursor: 'pointer' }}
                    onClick={() => navigate('/signin')}
                >
                    Dont have account? Sign up here.
                </Typography>
            </Box>
        </Container>
    )
}

export default Login
