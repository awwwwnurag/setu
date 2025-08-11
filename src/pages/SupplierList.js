import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Avatar, Button, CircularProgress, Alert, Chip, Tooltip, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', location: '', rating: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { t } = useTranslation();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch suppliers');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      setSuppliers(suppliers.filter(s => s._id !== id));
    } catch (err) {
      setError('Failed to delete supplier');
    }
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/suppliers', {
        name: form.name,
        location: form.location,
        rating: parseFloat(form.rating),
      });
      setSuppliers(suppliers => [...suppliers, res.data]);
      setForm({ name: '', location: '', rating: '' });
      setError('');
    } catch (err) {
      setError('Failed to register supplier');
    }
    setSubmitting(false);
  };

  if (loading) return <Box p={2}><CircularProgress /></Box>;
  if (error) return <Box p={2}><Alert severity="error">{error}</Alert></Box>;

  const vegImages = [
    { src: 'https://cdn-icons-png.flaticon.com/512/415/415733.png', alt: 'Tomato' },
    { src: 'https://cdn-icons-png.flaticon.com/512/415/415734.png', alt: 'Onion' },
    { src: 'https://cdn-icons-png.flaticon.com/512/415/415735.png', alt: 'Carrot' },
    { src: 'https://cdn-icons-png.flaticon.com/512/415/415736.png', alt: 'Broccoli' },
    { src: 'https://cdn-icons-png.flaticon.com/512/415/415737.png', alt: 'Potato' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: isLight
          ? 'linear-gradient(135deg, #fcb69f 0%, #ffecd2 100%)'
          : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
        py: 6,
        px: { xs: 1, sm: 4 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: isLight ? '#185a9d' : '#8bd3dd', fontFamily: 'Pacifico, cursive', textAlign: 'center', letterSpacing: 1 }}>
        {t('Suppliers')}
      </Typography>
      <Paper sx={{ maxWidth: 400, mx: 'auto', mb: 4, p: 3, borderRadius: 3, background: isLight ? '#fff' : '#1a1a2e' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('Register as Supplier')}</Typography>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input name="name" value={form.name} onChange={handleFormChange} placeholder={t('Name')} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input name="location" value={form.location} onChange={handleFormChange} placeholder={t('Location')} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input name="rating" value={form.rating} onChange={handleFormChange} placeholder={t('Rating')} type="number" min="0" max="5" step="0.1" required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? t('Registering...') : t('Register')}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </form>
      </Paper>
      <Grid container spacing={4} justifyContent="center">
        {suppliers.map(s => (
          <Grid item xs={12} sm={6} md={4} key={s._id}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: 4,
                background: isLight
                  ? 'linear-gradient(120deg, #fffbe6 60%, #f3e5f5 100%)'
                  : 'linear-gradient(120deg, #1a1a2e 60%, #0f0f23 100%)',
                boxShadow: isLight
                  ? '0 4px 24px 0 rgba(31, 38, 135, 0.10)'
                  : '0 4px 24px 0 rgba(139, 211, 221, 0.10)',
                transition: '0.2s',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'scale(1.04) rotateY(-3deg)',
                  background: isLight
                    ? 'linear-gradient(120deg, #f3e5f5 60%, #fffbe6 100%)'
                    : 'linear-gradient(120deg, #0f0f23 60%, #1a1a2e 100%)',
                },
              }}
              onClick={() => navigate(`/supplier/${s._id}`)}
            >
              <CardContent sx={{ textAlign: 'center', pb: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: isLight ? 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' : 'linear-gradient(135deg, #8bd3dd 0%, #1a1a2e 100%)',
                    width: 64,
                    height: 64,
                    fontSize: 32,
                    mx: 'auto',
                    mb: 1.5,
                    boxShadow: isLight ? '0 2px 8px #43cea255' : '0 2px 8px #8bd3dd55',
                  }}
                >
                  {s.name[0]}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, color: isLight ? '#333' : '#eaeaea', mb: 0.5 }}>{s.name}</Typography>
                {/* Remove vegetable images for FreshMart */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ color: '#f7971e', fontSize: 20, mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">{t(s.location)}</Typography>
                </Box>
                <Tooltip title={t('Supplier Rating')} arrow>
                  <Chip
                    icon={<StarIcon sx={{ color: '#ffd600' }} />}
                    label={s.rating}
                    sx={{ bgcolor: isLight ? '#fffde7' : '#2a2a40', color: isLight ? '#7b3f00' : '#f7971e', fontWeight: 600, fontSize: 16, px: 1.5, mb: 1 }}
                  />
                </Tooltip>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    background: isLight
                      ? 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)'
                      : 'linear-gradient(90deg, #8bd3dd 0%, #1a1a2e 100%)',
                    color: '#fff',
                    borderRadius: 3,
                    fontWeight: 600,
                    px: 3,
                    boxShadow: isLight ? '0 2px 8px #43cea255' : '0 2px 8px #8bd3dd55',
                    textTransform: 'none',
                    '&:hover': {
                      background: isLight
                        ? 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)'
                        : 'linear-gradient(90deg, #1a1a2e 0%, #8bd3dd 100%)',
                    },
                  }}
                  onClick={e => { e.stopPropagation(); navigate(`/supplier/${s._id}`); }}
                >
                  {t('View Profile')}
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  color="error"
                  onClick={e => { e.stopPropagation(); handleDelete(s._id); }}
                >
                  {t('Delete')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 