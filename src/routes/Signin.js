import React from 'react';
// import './Signin.css';

import { Link } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit">
        react-study__tutorials/
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1F2891',
    },
    secondary: {
      main: '#FB5A2E',
      dark: '#D73B21'
    },
    error: {
      main: '#F24C3D'
    },
    warning: {
      main: '#F2BE22'
    },
    success: {
      main: '#26A699'
    },
    info: {
      main: '#64748B'
    }
  },
});

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Link to="/" className='back-to-home'>
            <ArrowBackOutlinedIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
            Home
          </Link>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <TextField
            margin="normal"
            label="Email address"
            name="email"
            autoComplete="email"
            required
            fullWidth
          />
          <TextField
            margin="normal"
            label="Password"
            name="password"
            autoComplete="current-password"
            type="password"
            required
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" />
            }
            label="Remember me"
          />
          <Button
            margin="normal"
            type="submit"
            variant="contained"
            sx={{ m: '1rem' }}
            fullWidth
            onClick={() => handleSubmit()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot Password?</Link>
            </Grid>
            <Grid item>
              <Link href="#">Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}