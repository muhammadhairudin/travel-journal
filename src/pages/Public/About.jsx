import { Container, Grid, Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const About = () => {
  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 40 }} />,
      title: 'Destinasi Terpercaya',
      description: 'Berbagai pilihan destinasi wisata yang telah diverifikasi dan direview oleh komunitas kami.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Komunitas Travel',
      description: 'Bergabung dengan komunitas traveler untuk berbagi pengalaman dan tips perjalanan.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Keamanan Terjamin',
      description: 'Sistem pembayaran yang aman dan perlindungan data pribadi yang terjamin.'
    },
    {
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
      title: 'Harga Terbaik',
      description: 'Dapatkan penawaran khusus dan harga terbaik untuk setiap perjalanan Anda.'
    }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              background: `rgba(25, 118, 210, ${Math.random() * 0.1})`,
              borderRadius: '50%',
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </Box>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 8,
          position: 'relative',
          zIndex: 1 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tentang Travel Journal
          </Typography>
          
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 8 }}>
            Platform perjalanan terpercaya untuk menemukan, merencanakan, dan berbagi pengalaman wisata Anda
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Visi Kami
              </Typography>
              <Typography variant="body1" paragraph>
                Menjadi platform perjalanan terdepan yang menghubungkan para traveler dengan pengalaman wisata autentik dan tak terlupakan di seluruh Indonesia.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Misi Kami
              </Typography>
              <Typography variant="body1" paragraph>
                Memudahkan setiap orang untuk menemukan dan merencanakan perjalanan mereka melalui rekomendasi terpercaya, teknologi modern, dan dukungan komunitas yang aktif.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
            Mengapa Memilih Kami?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 