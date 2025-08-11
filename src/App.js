import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, BottomNavigation, BottomNavigationAction, Paper, Card, CardContent, CardActions, Avatar as MuiAvatar, List, ListItem, ListItemAvatar, ListItemText, Divider, ThemeProvider, createTheme, useTheme, IconButton, CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import Landing from './components/Landing';
import SupplierCard from './components/SupplierCard';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Login from './components/Login';
import SupplierProfile from './components/SupplierProfile';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import '@fontsource/pacifico';
import InfoIcon from '@mui/icons-material/Info';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import About from './pages/About';
import SupplierList from './pages/SupplierList';
import MyAccount from './pages/MyAccount';
import Vendors from './pages/Vendors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Contact from './pages/Contact';
import LogoutButton from './components/LogoutButton';

function LanguageSelector({ language, setLanguage }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  
  return (
    <Select
      value={language}
      onChange={e => {
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
      }}
      size="small"
      sx={{ 
        ml: 2, 
        color: isLight ? '#185a9d' : '#8bd3dd',
        backgroundColor: isLight ? 'rgba(255,255,255,0.1)' : 'rgba(139, 211, 221, 0.1)',
        borderRadius: '12px',
        border: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-icon': {
          color: isLight ? '#185a9d' : '#8bd3dd',
        },
        '& .MuiSelect-select': {
          padding: '8px 12px',
          fontWeight: 500,
        }
      }}
    >
      <MenuItem value="en" sx={{ color: isLight ? '#185a9d' : '#8bd3dd' }}>English</MenuItem>
      <MenuItem value="hi" sx={{ color: isLight ? '#185a9d' : '#8bd3dd' }}>हिन्दी</MenuItem>
      {/* Add more languages here */}
    </Select>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [navValue, setNavValue] = useState(location.pathname);
  const [mode, setMode] = useState('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#ffecd2',
                  paper: '#fff',
                },
                primary: { main: '#185a9d' },
                secondary: { main: '#43cea2' },
                text: { primary: '#222', secondary: '#555' },
              }
            : {
                background: {
                  default: '#0f0f23', // deep dark blue
                  paper: '#1a1a2e', // slightly lighter dark blue
                },
                primary: { main: '#8bd3dd' }, // soft cyan
                secondary: { main: '#f7971e' }, // accent orange
                text: { primary: '#eaeaea', secondary: '#b5b5b5' },
                divider: 'rgba(139, 211, 221, 0.2)',
              }),
        },
        typography: {
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          h1: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
          },
          h2: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          },
          h3: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          },
          h4: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
          },
          h5: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
          },
          h6: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
          },
          body1: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          },
          body2: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    setNavValue(location.pathname);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
              <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: mode === 'light' 
              ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' 
              : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
            borderBottom: mode === 'light' 
              ? '1px solid rgba(252, 182, 159, 0.3)' 
              : '1px solid rgba(139, 211, 221, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
        <Toolbar sx={{ 
          justifyContent: 'center', 
          minHeight: '70px',
          px: { xs: 2, sm: 4 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}>
            <RestaurantMenuIcon sx={{ 
              fontSize: 40, 
              color: mode === 'light' ? '#185a9d' : '#8bd3dd', 
              mb: 0.5,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Pacifico, cursive',
                color: mode === 'light' ? '#185a9d' : '#8bd3dd',
                fontWeight: 700,
                letterSpacing: 1.5,
                textShadow: mode === 'light' 
                  ? '0 2px 8px rgba(24, 90, 157, 0.2)' 
                  : '0 2px 8px rgba(139, 211, 221, 0.2)',
                background: mode === 'light'
                  ? 'linear-gradient(45deg, #185a9d 30%, #f7971e 90%)'
                  : 'linear-gradient(45deg, #8bd3dd 30%, #f7971e 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SupplySetu
            </Typography>
          </Box>
          <Box sx={{ 
            position: 'absolute', 
            right: { xs: 16, sm: 32 }, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5 
          }}>
            <IconButton 
              sx={{ 
                color: mode === 'light' ? '#185a9d' : '#8bd3dd',
                backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(139, 211, 221, 0.1)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(139, 211, 221, 0.2)',
                  transform: 'scale(1.1)'
                }
              }} 
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <LanguageSelector language={language} setLanguage={setLanguage} />
            {typeof window !== 'undefined' && localStorage.getItem('token') && <LogoutButton />}
          </Box>
        </Toolbar>
      </AppBar>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardWithT t={t} />} />
            <Route path="/supplier/:id" element={<SupplierProfile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1201,
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' 
            : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          borderTop: mode === 'light' 
            ? '1px solid rgba(252, 182, 159, 0.3)' 
            : '1px solid rgba(139, 211, 221, 0.3)',
          backdropFilter: 'blur(10px)',
        }} 
        elevation={0}
      >
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(e, newValue) => {
            setNavValue(newValue);
            navigate(newValue);
          }}
          sx={{
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              color: mode === 'light' ? 'rgba(24, 90, 157, 0.7)' : 'rgba(139, 211, 221, 0.7)',
              '&.Mui-selected': {
                color: mode === 'light' ? '#185a9d' : '#8bd3dd',
              },
              '&:hover': {
                color: mode === 'light' ? '#185a9d' : '#8bd3dd',
                backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(139, 211, 221, 0.1)',
              }
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              fontWeight: 500,
            }
          }}
        >
          <BottomNavigationAction label={t('About')} value="/about" icon={<InfoIcon />} />
          <BottomNavigationAction label={t('Suppliers')} value="/suppliers" icon={<StoreIcon />} />
          <BottomNavigationAction label={t('My Account')} value="/my-account" icon={<AccountCircleIcon />} />
          <BottomNavigationAction label={t('Vendors')} value="/vendors" icon={<GroupsIcon />} />
          <BottomNavigationAction label={t('Contact Us')} value="/contact" icon={<ContactMailIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}

// Wrappers to pass t to placeholder pages
function DashboardWithT({ t }) {
  // Example supplier data
  const suppliers = [
    { name: 'FreshMart', rating: 4.8, location: 'Delhi' },
    { name: 'VeggieHub', rating: 4.6, location: 'Mumbai' },
    { name: 'SpiceWorld', rating: 4.9, location: 'Kolkata' },
    { name: 'DairyDirect', rating: 4.7, location: 'Chennai' },
    { name: 'GrainBazaar', rating: 4.5, location: 'Bangalore' },
  ];
  return (
    <Box sx={{ p: { xs: 1, sm: 4 }, background: 'linear-gradient(135deg, #fcb69f 0%, #43cea2 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" sx={{ color: '#185a9d', fontWeight: 900, mb: 4, fontFamily: 'Pacifico, cursive', letterSpacing: 1, textShadow: '0 2px 8px #fffbe6' }}>{t('Dashboard')}</Typography>
      <Grid container spacing={4} justifyContent="center">
        {suppliers.map((s, i) => (
          <Grid item key={s.name}>
            <Fade in={true} style={{ transitionDelay: `${i * 120}ms` }}>
              <div><SupplierCard {...s} /></div>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
