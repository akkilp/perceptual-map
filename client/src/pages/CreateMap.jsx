
import { Typography, TextField, Container, Paper, Grid, ListItem, List, IconButton, ListItemText, ListSubheader, ListItemButton, Title, Link, Button } from "@mui/material";


import * as yup from 'yup';
import { useFormik } from 'formik';

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

const CreateMap = () => {
    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
          tags: ''
        },
        validationSchema: validationSchema,
        onSubmit: (credentials) => console.log(credentials)
      });
    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Paper
              sx={{
                padding: 4
              }}
            >
                <Typography               sx={{
                padding: 4
              }}variant="h3">
                Create new map</Typography>


 <form onSubmit={formik.handleSubmit}>
                <TextField 
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        fullWidth 
                        label="Multiline"
                        multiline
                        maxRows={4}
                        sx={{marginBottom: 2}}
                        />
                <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                fullWidth
                />                         
                <Button 
                  variant="contained" 
                  size="large" 
                  type="submit"
                  disabled={false}
                  >
                  Signin
                </Button>  
            </form>
                    </Paper>
      </Container>
    )
}

export default CreateMap