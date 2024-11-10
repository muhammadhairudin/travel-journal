import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  LinkedIn,
  Telegram,
  ArrowForward
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(to bottom, ${theme.palette.primary.light}15, ${theme.palette.primary.main}15)`,
        color: 'text.primary',
        py: 8,
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url('/path/to/pattern.png')`, // Opsional: tambahkan pattern subtle
          opacity: 0.1,
          pointerEvents: 'none',
        }
      }}
    >
      {/* Section Divider Top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      />

      <Container maxWidth="lg">
        {/* Company Info Section dengan background berbeda */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: 'primary.main',
                  fontSize: '1.5rem'
                }}
              >
                Travel Journal
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: 'text.secondary',
                  lineHeight: 1.8
                }}
              >
                Jelajahi keindahan Indonesia bersama kami. Temukan pengalaman 
                perjalanan yang tak terlupakan dengan panduan terbaik dan 
                pelayanan profesional yang akan membuat liburan Anda menjadi 
                momen berharga.
              </Typography>
              <Stack 
                direction="row" 
                spacing={1.5}
                sx={{ mb: 3 }}
              >
                {[
                  { icon: <Facebook />, label: 'Facebook' },
                  { icon: <Twitter />, label: 'Twitter' },
                  { icon: <Instagram />, label: 'Instagram' },
                  { icon: <YouTube />, label: 'YouTube' },
                  { icon: <LinkedIn />, label: 'LinkedIn' },
                  { icon: <Telegram />, label: 'Telegram' }
                ].map((social) => (
                  <IconButton 
                    key={social.label}
                    color="primary"
                    aria-label={social.label}
                    sx={{ 
                      '&:hover': { 
                        bgcolor: 'primary.light',
                        transform: 'translateY(-3px)',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links dengan hover effect yang lebih menarik */}
          <Grid item xs={12} sm={6} md={2}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.07)',
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={2}>
                {[
                  { text: 'Home', href: '/' },
                  { text: 'About Us', href: '/about' },
                  { text: 'Activities', href: '/activities' },
                  { text: 'Categories', href: '/categories' },
                  { text: 'Blog', href: '/blog' },
                  { text: 'Contact', href: '/contact' }
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        paddingLeft: '8px',
                        transition: 'all 0.3s ease'
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Support dengan style yang sama */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.07)',
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                Support
              </Typography>
              <Stack spacing={2}>
                {[
                  { text: 'Help Center', href: '/help' },
                  { text: 'Terms of Service', href: '/terms' },
                  { text: 'Privacy Policy', href: '/privacy' },
                  { text: 'FAQ', href: '/faq' },
                  { text: 'Booking Guide', href: '/guide' },
                  { text: 'Customer Support', href: '/support' }
                ].map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        paddingLeft: '8px',
                        transition: 'all 0.3s ease'
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Contact Info dengan highlight */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                Contact Us
              </Typography>
              <Stack spacing={3}>
                <Stack 
                  direction="row" 
                  spacing={2} 
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  <LocationOn sx={{ fontSize: 24 }} />
                  <Typography variant="body2">
                    Jl. Travel Journal No. 123<br />
                    Jakarta Selatan, Indonesia 12345
                  </Typography>
                </Stack>
                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  <Phone sx={{ fontSize: 24 }} />
                  <Typography variant="body2">
                    +62 123 4567 890<br />
                    +62 098 7654 321
                  </Typography>
                </Stack>
                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  <WhatsApp sx={{ fontSize: 24 }} />
                  <Typography variant="body2">
                    +62 812 3456 7890<br />
                    (Available 24/7)
                  </Typography>
                </Stack>
                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      transition: 'all 0.3s ease'
                    },
                  }}
                >
                  <Email sx={{ fontSize: 24 }} />
                  <Typography variant="body2">
                    info@traveljournal.com<br />
                    support@traveljournal.com
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Newsletter section dengan background yang kontras */}
        <Box 
          sx={{ 
            my: 6,
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography 
            variant="h5" 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              mb: 2 
            }}
          >
            Subscribe to Our Newsletter
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Dapatkan update terbaru tentang destinasi menarik dan penawaran spesial 
            langsung di inbox Anda.
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: '500px', mx: 'auto' }}
          >
            <TextField
              fullWidth
              placeholder="Masukkan email Anda"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                }
              }}
            />
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>

        {/* Copyright dengan background subtle */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography 
            variant="body2" 
            align="center"
            sx={{ 
              color: 'text.secondary'
            }}
          >
            © {currentYear} Travel Journal. All rights reserved. Made with ❤️ in Indonesia
          </Typography>
        </Box>
      </Container>

      {/* Section Divider Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        }}
      />
    </Box>
  );
};

export default Footer; 