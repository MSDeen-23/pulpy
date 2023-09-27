import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import AppNavBar from './app-bar'
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Pulpy.Io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function AuthContent({children}){
    const auth = true;
    if (!auth){
        return <Navigate to="/" replace />;
        
    }
    return(
        <>
        <Box sx={{ display: 'flex' }}>
        <AppNavBar/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
            <Grid container spacing={3} className='Content'>           
              <Grid item xs={12}>
               
                    {children}                  
                   
               
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 2 }} />
        </Box>
        </Box>
        </>
    )
}

export default AuthContent;