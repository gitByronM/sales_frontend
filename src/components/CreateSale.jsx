import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { createSale } from '../api/sales';

const CreateSale = () => {
  const EMPTY_SALE = {
    product_name: '',
    product_code: '',
    product_category: '',
    quantity_sold: '',
    unit_price: '',
    sale_date: '',
  }
  const [saleData, setSaleData] = useState(EMPTY_SALE);

  const handleChange = (e) => {
    setSaleData({
      ...saleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSale(saleData);
      console.log('Sale created successfully:', response);
      alert('Sale created successfully!');

      setSaleData(EMPTY_SALE);
    } catch (error) {
      console.error('Error creating sale:', error);
      alert('Error creating sale. Please try again.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create a New Sale
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Product Name" name="product_name" value={saleData.product_name} onChange={handleChange} required />
        <TextField label="Product Code" name="product_code" value={saleData.product_code} onChange={handleChange} required />
        <FormControl required>
          <InputLabel id="product-category-label">Product Category</InputLabel>
          <Select
            labelId="product-category-label"
            name="product_category"
            value={saleData.product_category}
            label="Product Category"
            onChange={handleChange}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Home Appliances">Home Appliances</MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Quantity Sold" name="quantity_sold" type="number" value={saleData.quantity_sold} inputProps={{ min: 0 }}  onChange={handleChange} required />
        <TextField label="Unit Price" name="unit_price" type="number" step="0.01" value={saleData.unit_price} inputProps={{ min: 0 }}  onChange={handleChange} required />
        <TextField 
          label="Sale Date" 
          name="sale_date" 
          type="date" 
          value={saleData.sale_date} 
          onChange={handleChange} 
          InputLabelProps={{ shrink: true }} 
          inputProps={{ max: today }}
          required 
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CreateSale;
