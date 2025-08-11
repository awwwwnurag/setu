import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, Chip, Paper, useTheme } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', location: '', phone: '', groupBuy: false });
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { t } = useTranslation();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/vendors');
      setVendors(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch vendors');
    }
    setLoading(false);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/vendors', form);
      setVendors(vs => [...vs, res.data]);
      setForm({ name: '', location: '', phone: '', groupBuy: false });
      setError('');
    } catch (err) {
      setError('Failed to register vendor');
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: isLight
          ? 'linear-gradient(135deg, #43cea2 0%, #fcb69f 100%)'
          : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
        py: 6,
        px: { xs: 1, sm: 4 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: isLight ? '#185a9d' : '#8bd3dd', fontFamily: 'Pacifico, cursive', textAlign: 'center', letterSpacing: 1 }}>
        {t('Vendors')}
      </Typography>
      <Paper sx={{ maxWidth: 400, mx: 'auto', mb: 4, p: 3, borderRadius: 3, background: isLight ? '#fff' : '#1a1a2e' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('Register as Vendor')}</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder={t('Name')} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input name="location" value={form.location} onChange={handleChange} placeholder={t('Location')} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder={t('Phone')} required style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" name="groupBuy" checked={form.groupBuy} onChange={handleChange} />
              {t('Group Buy Available')}
            </label>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? t('Registering...') : t('Register')}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </form>
      </Paper>
      <Grid container spacing={4} justifyContent="center">
        {vendors.map(v => (
          <Grid item xs={12} sm={6} md={4} key={v._id}>
            <Card
              sx={{
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
                p: 2,
              }}
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
                  {v.name[0]}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, color: isLight ? '#333' : '#eaeaea', mb: 0.5 }}>{v.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ color: '#f7971e', fontSize: 20, mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">{t(v.location)}</Typography>
                </Box>
                {v.groupBuy ? (
                  <Chip
                    icon={<GroupAddIcon sx={{ color: isLight ? '#43cea2' : '#8bd3dd' }} />}
                    label={t('Join Group Buy')}
                    sx={{
                      bgcolor: isLight ? '#e0f7fa' : '#1a1a2e',
                      color: isLight ? '#00796b' : '#8bd3dd',
                      fontWeight: 600,
                      px: 1.5,
                      fontSize: 16,
                      mt: 1,
                      boxShadow: isLight ? '0 2px 8px #43cea255' : '0 2px 8px #8bd3dd55',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: isLight ? '#b2ebf2' : '#2a2a40',
                        color: isLight ? '#004d40' : '#f7971e',
                      },
                    }}
                    clickable
                  />
                ) : (
                  <Chip
                    label={t('No Group Buy')}
                    sx={{
                      bgcolor: isLight ? '#fffde7' : '#2a2a40',
                      color: isLight ? '#b26a00' : '#f7971e',
                      fontWeight: 600,
                      px: 1.5,
                      fontSize: 16,
                      mt: 1,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 