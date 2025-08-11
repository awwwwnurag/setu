import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Snackbar, Alert, IconButton, Fab, List, ListItem, ListItemText, InputAdornment } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
// Removed axios import

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(8px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: '2.5rem 2rem',
  maxWidth: 500,
  width: '95vw',
  textAlign: 'center',
  margin: 'auto',
};

const gradientBg = {
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
};

const placeholderImg = 'https://via.placeholder.com/80x80?text=Product';

const mockSuppliers = [
  {
    id: '1',
    name: 'FreshMart',
    location: 'Delhi',
    rating: 4.8,
    avatar: <StorefrontIcon sx={{ color: '#43cea2', fontSize: 60 }} />,
    products: [
      { name: 'Tomatoes', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80' },
      { name: 'Onions', price: 25, unit: 'kg', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=80&q=80' },
      { name: 'Potatoes', price: 20, unit: 'kg', image: 'https://images.unsplash.com/photo-1518976024611-4886d7a7d7a5?auto=format&fit=crop&w=80&q=80' },
    ],
    reviews: [
      { name: 'Ravi', rating: 5, comment: 'Great quality and timely delivery!' },
      { name: 'Sita', rating: 4, comment: 'Affordable prices, will buy again.' },
      { name: 'Amit', rating: 5, comment: 'Very trustworthy supplier.' },
    ],
  },
  {
    id: '2',
    name: 'VeggieHub',
    location: 'Mumbai',
    rating: 4.6,
    avatar: <StorefrontIcon sx={{ color: '#43cea2', fontSize: 60 }} />,
    products: [
      { name: 'Carrots', price: 40, unit: 'kg', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80' },
      { name: 'Cabbage', price: 18, unit: 'kg', image: '' },
    ],
    reviews: [
      { name: 'Priya', rating: 5, comment: 'Fresh veggies every time!' },
      { name: 'Sunil', rating: 4, comment: 'Good service.' },
    ],
  },
  // Add more mock suppliers as needed
];

export default function SupplierProfile() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderQty, setOrderQty] = useState('');
  const [orderProduct, setOrderProduct] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { from: 'vendor', text: 'Hi, is Tomatoes available in bulk?' },
    { from: 'supplier', text: 'Yes, we have fresh stock today!' },
  ]);

  useEffect(() => {
    setLoading(true);
    // Find supplier from mock data
    const found = mockSuppliers.find(s => s.id === id);
    setSupplier(found || null);
    setLoading(false);
  }, [id]);

  const handleOrder = () => {
    setOrderOpen(false);
    setOrderQty('');
    setOrderProduct('');
    setOrderSuccess(true);
  };

  const handleSendChat = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { from: 'vendor', text: chatInput }]);
      setTimeout(() => {
        setChatMessages(msgs => [...msgs, { from: 'supplier', text: 'Thank you for your message!' }]);
      }, 800);
      setChatInput('');
    }
  };

  if (loading) {
    return (
      <Box sx={gradientBg}>
        <CircularProgress sx={{ color: '#43cea2' }} />
      </Box>
    );
  }
  if (!supplier) {
    return (
      <Box sx={gradientBg}>
        <Typography variant="h5" color="#fff">Supplier not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={gradientBg}>
      <Box sx={glassStyle}>
        <Avatar sx={{ bgcolor: '#fff', width: 80, height: 80, mx: 'auto', mb: 2 }}>
          {supplier.avatar}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          {supplier.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1, mb: 2 }}>
          <LocationOnIcon sx={{ color: '#ffd200', mr: 0.5 }} />
          <Typography variant="body1" sx={{ color: '#fff', opacity: 0.9 }}>
            {supplier.location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <StarIcon sx={{ color: '#ffd200', mr: 0.5 }} />
          <Typography variant="body1" sx={{ color: '#fff', opacity: 0.9 }}>
            {supplier.rating} / 5.0
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1, mt: 2 }}>
          Products
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          {supplier.products.map((p, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Paper elevation={4} sx={{ p: 2, borderRadius: 4, background: 'linear-gradient(120deg, #fffbe6 60%, #f3e5f5 100%)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.10)' }}>
                <img src={p.image || placeholderImg} alt={p.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover', marginRight: 16, boxShadow: '0 2px 8px #fcb69f55' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#185a9d', fontSize: '1.1rem' }}>{p.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>₹{p.price} / {p.unit}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: '2rem',
            boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.25)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.06) rotateY(-6deg)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              background: 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)',
            },
            mb: 3,
          }}
          onClick={() => setOrderOpen(true)}
        >
          Order from this Supplier
        </Button>
        <Dialog open={orderOpen} onClose={() => setOrderOpen(false)} PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(120deg, #fffbe6 60%, #f3e5f5 100%)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            p: 2,
          }
        }}>
          <DialogTitle sx={{ fontWeight: 700, color: '#185a9d', fontFamily: 'Montserrat, sans-serif', textAlign: 'center', pb: 0 }}>
            Place Order
          </DialogTitle>
          <DialogContent sx={{ pt: 2, pb: 1 }}>
            <TextField
              select
              label="Product"
              fullWidth
              value={orderProduct}
              onChange={e => setOrderProduct(e.target.value)}
              sx={{ mb: 2, background: '#fffbe6', borderRadius: 2 }}
            >
              {supplier.products.map((p, i) => (
                <MenuItem value={p.name} key={i}>{p.name} (₹{p.price}/{p.unit})</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Quantity"
              fullWidth
              value={orderQty}
              onChange={e => setOrderQty(e.target.value.replace(/[^0-9]/g, ''))}
              disabled={!orderProduct}
              sx={{ background: '#fffbe6', borderRadius: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={() => setOrderOpen(false)} sx={{ color: '#185a9d', fontWeight: 600, borderRadius: 2 }}>Cancel</Button>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                boxShadow: '0 2px 8px #43cea255',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)',
                },
              }}
              onClick={handleOrder}
              disabled={!orderProduct || !orderQty}
            >
              Place Order
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={orderSuccess} autoHideDuration={3000} onClose={() => setOrderSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Order placed successfully!
          </Alert>
        </Snackbar>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2, mt: 2 }}>
          Reviews
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {supplier.reviews.map((r, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: 'rgba(255,255,255,0.85)' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#185a9d' }}>{r.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon sx={{ color: '#ffd200', fontSize: 20, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 600 }}>{r.rating} / 5</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#333' }}>{r.comment}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Floating Chat Button */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }} onClick={() => setChatOpen(true)}>
        <ChatIcon />
      </Fab>
      <Dialog open={chatOpen} onClose={() => setChatOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Chat with {supplier.name}</DialogTitle>
        <DialogContent dividers sx={{ minHeight: 250, maxHeight: 350, overflowY: 'auto', background: '#f5f5f5' }}>
          <List>
            {chatMessages.map((msg, i) => (
              <ListItem key={i} sx={{ justifyContent: msg.from === 'vendor' ? 'flex-end' : 'flex-start' }}>
                <ListItemText
                  primary={msg.text}
                  sx={{
                    bgcolor: msg.from === 'vendor' ? '#43cea2' : '#fff',
                    color: msg.from === 'vendor' ? '#fff' : '#333',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    maxWidth: '70%',
                    textAlign: msg.from === 'vendor' ? 'right' : 'left',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendChat} color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
} 