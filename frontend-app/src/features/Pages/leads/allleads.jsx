import React from 'react'
import TableBodyPulpy from '../../../components/Tables/tableBodyPulpy'
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import searchIcon from '../../../assets/images/Search.svg';
import fillterIcon from '../../../assets/images/Filter.svg';
import Team from '../../../assets/images/Team.svg';

function createData(title1, title2, title3, title4) {
    return { title1, title2, title3, title4 };
}

const leadTablehead = ["Name", "Headline", 'Location', "Creation Date"];

const leadTablebody = [
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022'),
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022'),
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022'),
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022'),
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022'),
    createData('Luke Short', 'CTO | Director | CFO ', 'Texas, US', '28 Mar, 2022')];

const AllLeads = () => {
    return (
        <div className='all_leads'>
            <div className='row'>
                <div className="col-lg-2" style={{"display":'flex' , "alignItems":'center' }}>
                    <span><img src={Team} /></span>&nbsp;&nbsp;
                    <h5>Leads</h5>
                </div>
                <div className="col-lg-7">
                    <div class="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" placeholder="Search" />
                    </div>
                </div>

                <div className='col-lg-3 del_button'>
                    <Button variant="outlined" sx={{"background":'#393838' , "marginRight":'20px'}}>
                        <img src={fillterIcon} />
                    </Button>
                    <Button variant="outlined" startIcon={<IosShareIcon />} sx={{"background":'#FF8140' , "color":'#fff' , "text-transform":"capitalize" , "border-color":"#ff8140" , "border-radius":'8px'}}>
                        Export
                    </Button>
                </div>
            </div>
            <TableBodyPulpy leadTablehead={leadTablehead} row={leadTablebody} from={"allleads"} />
        </div>
    )
}

export default AllLeads