import { Button, Typography, Box, Container, TextField } from '@mui/material'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { signinUser } from '../api_calls'

import useRegister from '../hooks/useRegister'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    username: yup
        .string('Enter your username')
        .min(3, 'Username should be of minimum 3 characters length')
        .required('Username is required'),
})

function Signin() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
        },
        validationSchema: validationSchema,
        onSubmit: (credentials) => handleApiSubmit(credentials),
    })

    const [handleApiSubmit, loading] = useRegister(signinUser)
    const navigate = useNavigate()

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '100px',
                }}
            >
                <Typography variant="h3" sx={{ paddingBottom: '1rem' }}>
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.username &&
                            Boolean(formik.errors.username)
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
                        }
                        fullWidth
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
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
                        Signin
                    </Button>
                </form>
                <Typography
                    variant="caption"
                    sx={{ marginTop: '2rem', cursor: 'pointer' }}
                    onClick={() => navigate('/signin/admin')}
                >
                    Or register as admin
                </Typography>
            </Box>
        </Container>
    )
}

export default Signin
