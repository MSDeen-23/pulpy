import React from 'react'
import Team from '../../../assets/images/Team.svg';
import linkedin from '../../../assets/images/linkedin.svg'
import Button from '@mui/material/Button';

const TeamDetail = () => {
    return (
        <>
            <div className='row'>
                <div className="col-lg-2" style={{ "display": 'flex', "alignItems": 'center' }}>
                    <span><img src={Team} /></span>&nbsp;&nbsp;
                    <h5>Team</h5>
                </div>
            </div>
            <div className='row team_in' >
                <div className='col-lg-4'>
                    <div className='align_teamdetail'>
                        <div>
                            <h5>D</h5>
                        </div>
                        <div className='team_details'>
                            <p>
                                <span> <img src={linkedin} /></span> &nbsp;&nbsp;
                                <span>Dilip Kumar</span>
                            </p>
                            <p >Role : Owner</p>
                            <Button variant="outlined" >
                                Upgrade to Annual
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='col-lg-8'  style={{"display":'flex' , "alignItems":'center'}}>
                    <div className='col-lg-4'>

                    </div>
                    <div className='col-lg-8'>
                        <div className='col-lg-4'>
                                <div>
                                    
                                </div>
                        </div>
                        <div className='col-lg-8'>
                            <div className='bar_set'>
                                <ul>
                                    <li style={{"display":'flex' , "justifyContent":'space-between' , "alignItems":'center'}}>
                                        <div style={{ "display": 'flex', "alignItems": 'center'}}>
                                            <span className='sm_bar' id="bar_highlight"></span>&nbsp;&nbsp;
                                            <span>Active Campaigns</span>
                                        </div>
                                        <p style={{"margin":"0px"}}>4</p>
                                    </li>
                                    <li style={{"display":'flex' , "justifyContent":'space-between' , "alignItems":'center'}}>
                                        <div style={{ "display": 'flex', "alignItems": 'center'}}>
                                            <span className='sm_bar' id="bar_highlight1"></span>&nbsp;&nbsp;
                                            <span>Connections</span>
                                        </div>
                                        <p style={{"margin":"0px"}}>4</p>
                                    </li>
                                    <li style={{"display":'flex' , "justifyContent":'space-between' , "alignItems":'center'}}>
                                        <div style={{ "display": 'flex', "alignItems": 'center'}}>
                                            <span className='sm_bar' id="bar_highlight2"></span>&nbsp;&nbsp;
                                            <span>Pending invites received</span>
                                        </div>
                                        <p style={{"margin":"0px"}}>4</p>
                                    </li>
                                    <li style={{"display":'flex' , "justifyContent":'space-between' , "alignItems":'center'}}>
                                        <div style={{ "display": 'flex', "alignItems": 'center'}}>
                                            <span className='sm_bar' id="bar_highlight3"></span>&nbsp;&nbsp;
                                            <span>Profile views last week</span>
                                        </div>
                                        <p style={{"margin":"0px"}}>4</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='recent_camp'>
                    <h5 style={{"float":'left' , "width":'100%'}}>Recent Campaigns</h5>
                    <ul style={{"float":'left' , "width":'100%' , "padding":'0px'}}>
                        <li>
                            <p>March Campaigns</p>
                            <p>50.5%</p>
                            <p>80.5%</p>
                            <p>6</p>
                            <p>18 Mar, 2022</p>
                        </li>
                    </ul>
            </div>
        </>
    )
}

export default TeamDetail