import React from 'react';
import { Box, Typography, Card, Button, List, ListItem, ListItemText, Avatar, Paper, Chip, Divider, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MyAccount() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const user = { name: 'Shrishti Verma', phone: '+91-9876543210', role: 'Vendor' };
  const orders = [
    { id: 'o1', supplier: 'FreshMart', product: 'Tomatoes', qty: 10, status: 'Delivered' },
    { id: 'o2', supplier: 'VeggieHub', product: 'Carrots', qty: 5, status: 'Pending' },
  ];
  const { t } = useTranslation();
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 5,
          p: { xs: 3, sm: 5 },
          background: isLight ? 'rgba(255,255,255,0.97)' : 'rgba(26, 26, 46, 0.97)',
          boxShadow: isLight
            ? '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
            : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Avatar sx={{ bgcolor: isLight ? 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' : 'linear-gradient(135deg, #8bd3dd 0%, #1a1a2e 100%)', width: 72, height: 72, mx: 'auto', mb: 2, fontSize: 40, boxShadow: isLight ? '0 2px 8px #43cea255' : '0 2px 8px #8bd3dd55' }}>
          <PersonIcon fontSize="inherit" />
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700, color: isLight ? '#185a9d' : '#8bd3dd', fontFamily: 'Montserrat, sans-serif', mb: 1 }}>{user.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <PhoneIphoneIcon sx={{ color: isLight ? '#43cea2' : '#8bd3dd', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: isLight ? '#333' : '#eaeaea', fontWeight: 500 }}>{user.phone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
          <BadgeIcon sx={{ color: '#f7971e', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: isLight ? '#333' : '#eaeaea', fontWeight: 500 }}>{t('Role')}: {t(user.role)}</Typography>
        </Box>
        <Button variant="contained" sx={{
          background: isLight
            ? 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)'
            : 'linear-gradient(90deg, #8bd3dd 0%, #1a1a2e 100%)',
          color: '#fff',
          fontWeight: 600,
          borderRadius: 3,
          px: 3,
          boxShadow: isLight ? '0 2px 8px #43cea255' : '0 2px 8px #8bd3dd55',
          textTransform: 'none',
          '&:hover': {
            background: isLight
              ? 'linear-gradient(90deg, #185a9d 0%, #43cea2 100%)'
              : 'linear-gradient(90deg, #1a1a2e 0%, #8bd3dd 100%)',
          },
          mt: 1
        }} onClick={() => navigate('/profile')}>{t('Edit Profile')}</Button>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 5,
          p: { xs: 2, sm: 3 },
          background: isLight ? 'rgba(255,255,255,0.93)' : 'rgba(26, 26, 46, 0.93)',
          boxShadow: isLight
            ? '0 4px 16px 0 rgba(31, 38, 135, 0.10)'
            : '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
          textAlign: 'left',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: isLight ? '#185a9d' : '#8bd3dd', fontWeight: 700, textAlign: 'center' }}>{t('Recent Orders')}</Typography>
        <List>
          {orders.map(o => (
            <React.Fragment key={o.id}>
              <ListItem divider sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: isLight ? '#333' : '#eaeaea' }}>{t(o.product)} {t('from')} {t(o.supplier)}</Typography>
                  <Typography variant="body2" sx={{ color: isLight ? '#888' : '#b5b5b5' }}>{t('Qty')}: {o.qty}</Typography>
                </Box>
                <Chip
                  icon={o.status === 'Delivered' ? <LocalShippingIcon sx={{ color: isLight ? '#43cea2' : '#8bd3dd' }} /> : <PendingActionsIcon sx={{ color: '#f7971e' }} />}
                  label={t(o.status)}
                  sx={{
                    bgcolor: o.status === 'Delivered' ? (isLight ? '#e0f7fa' : '#1a1a2e') : (isLight ? '#fffde7' : '#2a2a40'),
                    color: o.status === 'Delivered' ? (isLight ? '#00796b' : '#8bd3dd') : (isLight ? '#b26a00' : '#f7971e'),
                    fontWeight: 600,
                    px: 1.5,
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 