import React , {useState} from 'react'
import TableBodyPulpy from '../../../components/Tables/tableBodyPulpy'
import iteam from "../../../assets/images/invite.svg"
import Team from '../../../assets/images/Team.svg';
import Button from '@mui/material/Button';
import TeamDetail from './teamDetail'


function createData(title1, title2, title3, title4, title5) {
    return { title1, title2, title3, title4, title5 };
}

const leadTablehead = ["Users", "Role", 'Active Campaign', "Plan", ""];

const leadTablebody = [
    createData('Dilipkumar', 'Owner ', '2', 'Free', 'action'),
    createData('Dilipkumar', 'Owner ', '2', 'Free', 'action'),
    createData('Dilipkumar', 'Owner ', '2', 'Free', 'action'),
    createData('Dilipkumar', 'Owner ', '2', 'Free', 'action'),
    
];

const TeamList = () => {

    const [teamid , setteamid] = useState(1);

    return (
        <div className='all_leads'>
            {
                teamid  === 0 ? <>
                <div className='row'>
                    <div className="col-lg-2" style={{ "display": 'flex', "alignItems": 'center' }}>
                        <span><img src={Team} /></span>&nbsp;&nbsp;
                        <h5>Team</h5>
                    </div>
                    <div className="col-lg-7">
                        <div class="form-group has-search">
                            <span class="fa fa-search form-control-feedback"></span>
                            <input type="text" class="form-control" placeholder="Search" />
                        </div>
                    </div>
    
                    <div className='col-lg-3 del_button'>
                        <Button variant="outlined" startIcon={<iteam />} sx={{ "background": '#FF8140', "color": '#fff', "text-transform": "capitalize", "border-color": "#ff8140", "border-radius": '8px' }}>
                            <img src={iteam} /> &nbsp;&nbsp;Invite Team Member
                        </Button>
                    </div>
                </div>
                <TableBodyPulpy leadTablehead={leadTablehead} row={leadTablebody} from={"teamslist"} setteamid={setteamid}/>
                </> : <TeamDetail />
            } 
            
        </div>
    )
}
export default TeamList;