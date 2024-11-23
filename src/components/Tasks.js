import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, Card, CardContent } from '@mui/material';

const Tasks = ({ user, setUser }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(tasks);
  }, []);

  const handleEdit = (task) => {
    if (user.role === 'admin' || user.role === 'editor') {
      const updatedTask = prompt('Edit Task Description:', task.description);
      if (updatedTask) {
        task.description = updatedTask;
        const updatedTasks = [...tasks];
        const taskIndex = updatedTasks.findIndex((t) => t.createdAt === task.createdAt);
        updatedTasks[taskIndex] = task;
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <Container>
      <Box sx={{ marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Tasks
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Button onClick={handleLogout} variant="outlined" color="error">
            Logout
          </Button>
          {user.role === 'admin' && (
            <Link to="/add-content" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Add New Task
              </Button>
            </Link>
          )}
        </Box>
        <Box>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Card key={task.createdAt} sx={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6">{task.task}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Created by: {task.createdBy} on {new Date(task.createdAt).toLocaleString()}
                  </Typography>
                  {(user.role === 'admin' || user.role === 'editor') && (
                    <Button
                      onClick={() => handleEdit(task)}
                      variant="outlined"
                      sx={{ marginTop: '10px', marginLeft: '10px' }}
                    >
                      Edit
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No tasks available</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Tasks;
