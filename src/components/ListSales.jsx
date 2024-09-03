// sales-frontend/src/components/ListSales.js
import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TablePagination, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import { getSales } from '../api/sales';

const ListSales = () => {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(0);  // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(10);  // Filas por página
  const [totalSales, setTotalSales] = useState(0);  // Total de ventas
  const [filters, setFilters] = useState({
    search: '',
    product_category: '',
    ordering: 'sale_date',  // Ordenamiento por defecto
  });

  useEffect(() => {
    fetchSales();
  }, [page, rowsPerPage, filters]);  // Actualizar cuando se cambia la página, filas por página o filtros

  const fetchSales = async () => {
    try {
      const params = {
        page: page + 1,  // Las páginas en el backend empiezan en 1
        page_size: rowsPerPage,
        search: filters.search,
        product_category: filters.product_category,
        ordering: filters.ordering,
      };

      const response = await getSales(params);
      setSales(response.results);
      setTotalSales(response.count);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Resetear a la primera página
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(0);  // Resetear a la primera página cuando se cambia un filtro
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales List
      </Typography>

      {/* Filtros de búsqueda y ordenamiento */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField 
          label="Search Product" 
          name="search" 
          value={filters.search} 
          onChange={handleFilterChange} 
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Product Category</InputLabel>
          <Select
            name="product_category"
            value={filters.product_category}
            label="Product Category"
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Home Appliances">Home Appliances</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Order By</InputLabel>
          <Select
            name="ordering"
            value={filters.ordering}
            label="Order By"
            onChange={handleFilterChange}
          >
            <MenuItem value="sale_date">Sale Date</MenuItem>
            <MenuItem value="unit_price">Unit Price</MenuItem>
            <MenuItem value="quantity_sold">Quantity Sold</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Tabla de ventas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Code</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Sale Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.product_name}</TableCell>
                <TableCell>{sale.product_code}</TableCell>
                <TableCell>{sale.product_category}</TableCell>
                <TableCell>{sale.quantity_sold}</TableCell>
                <TableCell>{sale.unit_price}</TableCell>
                <TableCell>{sale.sale_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={totalSales}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};

export default ListSales;
