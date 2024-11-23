
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded Admin Check
    if (email === 'admin@gmail.com' && password === '12345678') {
      loginUser({ email, role: 'admin' });
      navigate('/admin'); // Redirect to admin page
    } else {
      // Check if the user is a registered viewer/editor
      const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = registeredUsers.find((user) => user.email === email && user.password === password);

      if (user) {
        loginUser({ email: user.email, role: user.role });
        navigate('/Tasks'); // Redirect to home page (for viewer/editor)
      } else {
        alert('Invalid email or password'); // Show error for invalid login
      }
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
      
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          width: '100%',
        }}
      >
        <Typography variant="h5"  align="center" 
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          color:'black',
          borderColor:'black',
          
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
