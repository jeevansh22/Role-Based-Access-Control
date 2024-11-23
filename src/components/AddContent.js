import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddContent = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !description) {
      alert('Please fill out all fields');
      return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const newTask = {
      task,
      description,
      createdBy: 'admin', 
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    alert('Task added successfully');
    navigate('/tasks'); 
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', paddingTop: '50px' }}>
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
            Add New Task
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Task"
              variant="outlined"
              fullWidth
              margin="normal"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: 'white', backgroundColor: '#333' },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: 'white', backgroundColor: '#333' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: '16px', backgroundColor: '#1E90FF', '&:hover': { backgroundColor: '#1C86EE' } }}
            >
              Add Task
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AddContent;
