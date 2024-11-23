import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert('Please fill out all fields.');
      return;
    }

    const newUser = { email, password, role };

    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (registeredUsers.find((user) => user.email === email)) {
      alert('User already exists');
      return;
    }
    registeredUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(registeredUsers));

    alert('User registered successfully');
    navigate('/admin'); 
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', paddingTop: '50px' }}>
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: 'white', backgroundColor: '#333' },
              }}
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
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: 'white', backgroundColor: '#333' },
              }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel style={{ color: '#ccc' }}>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ color: 'white', backgroundColor: '#333' }}
              >
                <MenuItem value="viewer">Viewer</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: '16px', backgroundColor: '#1E90FF', '&:hover': { backgroundColor: '#1C86EE' } }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
