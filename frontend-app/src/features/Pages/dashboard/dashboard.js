import React , { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const AlphaLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#ff69a5' : '#ff69a5',
    },
  }));

  const BetaLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#20c997' : '#20c997',
    },
  }));

  const CharlieLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1890ff' : '#1890ff',
    },
  }));

  const DeltaLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 4,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#fa8b0c' : '#fa8b0c',
    },
  }));

function PulpyDashboard(){
    
    const [progress, setProgress] = useState(0);

    useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 80) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 80);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
    return(
        <>
        <section>
           <div className="container-fluid">
             <div className="row">
               <div className="col-md-12">
                <div className="purple-infocontent">
                  <h5>Good evening, Gowtham!</h5>
                   <p>Here’s what’s happening with your LinkedIn account today</p>
                 </div>
               </div>
             </div>
             <div className='row'>
                <div className='col-md-8'>
                  <div className='row'>
                  <div className='col-md-4'>
                     <div className='static-widget'>
                        <ConnectWithoutContactIcon className='statistics-icon alpha-bg'/>
                        <div className='statistics'>
                        <span><h6>Connection Request</h6></span>
                        <span>1/5</span>
                        </div>                    
                     <AlphaLinearProgress value={20} variant="determinate" className="progress-bar-striped mt-2" /> 
                     </div>
                 </div>
                 <div className='col-md-4'>
                 <div className='static-widget'>
                        <SendIcon className='statistics-icon beta-bg'/>
                        <div className='statistics'>
                        <span><h6>Message Sent</h6></span>
                        <span>3/5</span>
                        </div>                    
                        <BetaLinearProgress value={80} variant="determinate" className="progress-bar-striped mt-2" />
                     </div>
                 </div>
                 <div className='col-md-4'>
                 <div className='static-widget'>
                        <PersonIcon className='statistics-icon charlie-bg'/>
                        <div className='statistics'>
                        <span><h6>Profile Viewed</h6></span>
                        <span>3/5</span>
                        </div>                    
                        <CharlieLinearProgress value={80} variant="determinate" className="progress-bar-striped mt-2" />
                     </div>
                 </div>
                 {/* <div className='col-md-3'>
                 <div className='static-widget'>
                        <ThumbUpIcon className='statistics-icon delta-bg'/>
                        <div className='statistics'>
                        <span><h6>Endorsed</h6></span>
                        <span>3/5</span>
                        </div>                    
                        <DeltaLinearProgress value={70} variant="determinate" className="progress-bar-striped mt-2" /> 
                     </div>
                 </div> */}
                  </div>
                  <div className='row'>
                  <div className='col-md-12'>
                 <div className="widget-instruction">
                   <span>
                    <h3>0</h3><p>Pending Invitations recieved</p>
                  </span>
                  <span>
                    <h3>0</h3><p>Unread Messages
                    </p>
                  </span>
                  <span>
                    <h3>0%
                    </h3><p>Profile Views Since last week </p>
                  </span>
                </div>
                 </div>
                  </div>
                </div>
                 <div className='col-md-4'>
                 <div className="widget-activity">
                  <h5>Recent Activity</h5>
                </div>
                 </div>
             </div>
             <div className='row'>
                 
             </div>
            
           </div>
         </section> 
        </>
    )
}

export default PulpyDashboard;
