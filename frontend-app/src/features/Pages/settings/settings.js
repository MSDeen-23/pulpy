import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import account from '../../../assets/images/account_icon.svg'
import limited from '../../../assets/images/limited_settings.svg'
import Timer from '../../../assets/images/timer_settings.svg'
import Bill from '../../../assets/images/bill_settings.svg';
import Typography from '@mui/material/Typography';
import s_logo from '../../../assets/images/settings_logo.svg'
import ProgressBar from './progressBar'
import './settings.css'

const Settings = () => {


    const [percentage, setpercentage] = useState([20, 40 , 50 , 90 , 60 , 40])

    return (
        <div className='log_info'>
            <div className='top_settings'>
                <span><img src={s_logo} /></span>&nbsp;
                <h5>Settings</h5>
            </div>
            <Tabs>
                <TabList>
                    <Tab>
                        <div>
                            <img src={account} />
                        </div>
                        <p>Account</p>
                    </Tab>
                    <Tab>
                        <div>
                            <img src={limited} />
                        </div>
                        <p>Limits & Activity</p></Tab>
                    <Tab>
                        <div>
                            <img src={Timer} />
                        </div>
                        <p>Working Hours</p></Tab>
                    <Tab>
                        <div>
                            <img src={Bill} />
                        </div>
                        <p>Billing</p></Tab>
                    <Tab>
                        <div>
                            <img src={account} />
                        </div>
                        <p>Transactions</p></Tab>
                </TabList>

                <TabPanel>
                    <div className='row tab_body'>
                        <div className='col-lg-6'>
                            <h5>Pulpy Login Informations</h5>
                            <FormControl>
                                <TextField sx={{ "width": '420px', "fontFamily": "Poppins" }} id="outlined-basic" label={
                                    <Typography variant="headline" component="p" sx={{ "fontSize": '14px', "fontFamily": 'Poppins' }}> Current Password </Typography>
                                } size="small" variant="outlined" margin="dense" />
                                <TextField sx={{ "width": '420px' }} id="outlined-basic" label={
                                    <Typography variant="headline" component="p" sx={{ "fontSize": '14px', "fontFamily": 'Poppins' }}> New Password </Typography>
                                } size="small" variant="outlined" margin="dense" />
                                <TextField sx={{ "width": '420px' }} id="outlined-basic" label={
                                    <Typography variant="headline" component="p" sx={{ "fontSize": '14px', "fontFamily": 'Poppins' }}> Repeat Password </Typography>
                                } size="small" variant="outlined" margin="dense" />
                            </FormControl>
                        </div>
                        <div className='col-lg-6'>
                            <h5>LinkedIn Credentials</h5>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='row tab_body'>
                        <h5>Daily processing limits</h5>
                            <div className='col-lg-4 content_set'>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of connections request per day</p>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of messages per day</p>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of profile views per day</p>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of endorsments per day</p>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of likes per day</p>
                                    <p style={{ "marginBottom": '30px' }}>Max. number of following per day </p>
                            </div>
                            <div className='col-lg-8' style={{"position":'relative' , 'lineHeight':'45px'}}>
                                <div style={{'maxWidth':'70%' }}>
                                {
                                    percentage.map((value) =>
                                        <div style={{'marginBottom':'20px'}}>
                                            <div className='p_body_in'>
                                                <p>0</p>
                                                <p>100</p>
                                            </div>
                                            <ProgressBar
                                                progressStyle={{
                                                    top: "60%",
                                                    left: "0",
                                                    height: '10px',
                                                    width: '100%',
                                                    background: '#D6D6D6',
                                                    borderRadius: '10px',

                                                }}
                                                fillerStyle={{
                                                    width: `${value}%`,
                                                    background: '#FF8140',
                                                }}
                                                percentage={value}
                                            />

                                        </div>
                                    )
                                }
                                </div>
                            </div>
                            
                         

                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}


export default Settings 