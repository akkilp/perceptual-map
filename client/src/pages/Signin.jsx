
import { Button, Typography, Box, Container, TextField } from '@mui/material';

import * as yup from 'yup';
import { useFormik } from 'formik';
import signinUser from '../api_calls/signinUser';

import { useContext, useState } from 'react';

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
    username: yup
      .string('Enter your username')
      .min(3, 'Username should be of minimum 3 characters length')
      .required('Username is required'),
  });

function Signin() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    validationSchema: validationSchema,
    onSubmit: (credentials) => handleSignIn(credentials)
  });

  const [loading, setLoading] = useState(false);

  const { setMessage } = useContext(MessageContext);
  const { user, setUser } = useContext(AuthenticationContext);

  const handleSignIn = async (payload) => {
    setLoading(true)
    const response = await signinUser(payload)
    setLoading(false)
    setMessage(response)
    if (response.success === true) {
      console.log("Response to api succeeded:", response)
      setUser(response.data)
    } else {
      console.log("Response to api failed:", response)
    }
  }

  return (
    <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "100px" }}>
            <Typography variant="h3" sx={{paddingBottom: '1rem'}}>
              Signin
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField 
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        fullWidth 
                        variant="outlined" 
                        sx={{marginBottom: 2}}
                />
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
                  Signin
                </Button>
                
            </form>
        </Box>
    </Container>
  );
}

export default Signin;
