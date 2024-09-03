import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateSale from './components/CreateSale';
import ListSales from './components/ListSales';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Sales App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Create Sale
            </Button>
            <Button color="inherit" component={Link} to="/list">
              List Sales
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<CreateSale />} />
          <Route path="/list" element={<ListSales />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
