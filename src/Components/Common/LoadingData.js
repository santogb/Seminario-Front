import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadingData({ message, message2 }) {
  
  return (

    <div>
      <Container maxWidth="lg" style={{ margin: '50px 0' }}>
        <Typography variant="h4" gutterBottom>{message}</Typography>
        { message2 && <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>{message2}</Typography> }
        <CircularProgress size={64} style={{ color: "#055A8B" }} />
      </Container>
    </div>
  );
}