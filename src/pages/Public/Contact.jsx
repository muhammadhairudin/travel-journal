import { Container, Grid, Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';

const Contact = () => {
  const [currentPantun, setCurrentPantun] = useState(0);
  const [direction, setDirection] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentPantun]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentPantun((prev) => (prev + newDirection + pantunList.length) % pantunList.length);
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      detail: 'support@traveljournal.com',
      color: '#e65100'
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Alamat',
      detail: 'Jl. Travel Journal No. 123, Jakarta',
      color: '#2e7d32'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Telepon',
      detail: '+62 821-2345-6789',
      color: '#1976d2'
    }
  ];

  const pantunList = [
    {
      sampiran1: "Pergi ke pasar membeli duku",
      sampiran2: "Sambil mencari si buah naga",
      isi1: "Travel Journal tempatmu berlabuh",
      isi2: "Menjelajah dunia penuh bahagia"
    },
    {
      sampiran1: "Pagi-pagi memetik melati",
      sampiran2: "Di bawah pohon sambil bernyanyi",
      isi1: "Ayo kawan jangan berhenti",
      isi2: "Jelajahi Indonesia sampai ke sini"
    },
    {
      sampiran1: "Berlayar jauh ke pulau seberang",
      sampiran2: "Membawa bekal nasi dan ikan",
      isi1: "Bersama kami takkan kepalang",
      isi2: "Mewujudkan impian perjalanan"
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'grey.50',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 6
            }}
          >
            Hubungi Kami
          </Typography>

          <Grid container spacing={4}>
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <Box sx={{ color: info.color, mb: 2 }}>{info.icon}</Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {info.title}
                    </Typography>
                    <Typography color="text.secondary">{info.detail}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}

            {/* Contact Form */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                      Kirim Pesan
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      Kami siap membantu mewujudkan perjalanan impian Anda
                    </Typography>
                    <form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Nama" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Email" type="email" required />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Subjek" required />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Pesan"
                            multiline
                            rows={4}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}
                          >
                            Kirim Pesan
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>

                  {/* Pantun Section */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
                        Pantun Travel Journal
                      </Typography>

                      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                        <AnimatePresence initial={false} custom={direction}>
                          <motion.div
                            key={currentPantun}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                              const swipe = swipePower(offset.x, velocity.x);
                              if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                              } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                              }
                            }}
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Paper
                              elevation={3}
                              sx={{
                                p: 4,
                                width: '90%',
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                borderRadius: 2,
                                textAlign: 'center'
                              }}
                            >
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontStyle: 'italic',
                                  color: 'text.secondary',
                                  mb: 2
                                }}
                              >
                                {pantunList[currentPantun].sampiran1}<br />
                                {pantunList[currentPantun].sampiran2}
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: 'primary.main'
                                }}
                              >
                                {pantunList[currentPantun].isi1}<br />
                                {pantunList[currentPantun].isi2}
                              </Typography>
                            </Paper>
                          </motion.div>
                        </AnimatePresence>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                        <IconButton onClick={() => paginate(-1)}>
                          <ArrowBackIosIcon />
                        </IconButton>
                        <IconButton onClick={() => paginate(1)}>
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact; 