
import { Button, Typography, Box, Container, TextField } from '@mui/material';

import * as yup from 'yup';
import { useFormik } from 'formik';

import login from '../api_calls/login';

import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";


import { MessageContext } from '../components/MessageService';
import { AuthenticationContext } from '../components/AuthenticationService';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

function Login() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (credentials) => {
      handleLogin(credentials)
    },
  });

  const [loading, setLoading] = useState(false);

  const { setMessage } = useContext(MessageContext);
  const { setUser } = useContext(AuthenticationContext);

  const navigate = useNavigate()

  const handleLogin = async (payload) => {
    setLoading(true)
    const response = await login(payload)
    setLoading(false)
    setMessage(response)
    if (response.success === true) {
      console.log("Response to api succeeded:", response)
      setUser(response.data)
      navigate('/')
    } else {
      console.log("Response to api failed:", response)
    }
  }

  return (
    <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "100px" }}>
            <Typography variant="h3" >
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField 
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth 
                    variant="outlined" 
                    sx={{marginBottom: 2}}
                />
                <TextField 
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth 
                    variant="outlined" 
                    sx={{marginBottom: 2}}
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
        </Box>
    </Container>
  );
}

export default Login;
