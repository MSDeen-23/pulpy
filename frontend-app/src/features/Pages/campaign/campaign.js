import React, { useState } from "react";
import PulpyStepper from '../../../components/pulpyStepper/pulpyStepper'
import Paper from '@mui/material/Paper';
import CampaignsTable from '../../../components/Tables/campaignTable'
import Button from '@mui/material/Button';
function Campaign() {

    const [campId, setcampId] = useState(0)

    function createData(title1, title2, title3, title4, title5, title6) {
        return { title1, title2, title3, title4, title5, title6 };
    }

    const leadTablehead = ["#", "Name", 'Acceptance Rate', "Reply Rate", "Message till reply", "Created", "Status"];
    const leadTablebody = [
        createData(["March Campaign", "Leads in sequence", "150 / 400", 50], [0, "Acceptance Rate"], [0, "Response Rate"], [0, "Messages Reply"], '18 Mar, 2022'),
        createData(["March Campaign", "Leads in sequence", "150 / 400", 50], [0, "Acceptance Rate"], [0, "Response Rate"], [0, "Messages Reply"], '18 Mar, 2022'),
        createData(["March Campaign", "Leads in sequence", "150 / 400", 50], [0, "Acceptance Rate"], [0, "Response Rate"], [0, "Messages Reply"], '18 Mar, 2022'),
        createData(["March Campaign", "Leads in sequence", "150 / 400", 50], [0, "Acceptance Rate"], [0, "Response Rate"], [0, "Messages Reply"], '18 Mar, 2022'),
    ];
    return (
        <>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: '16px', }}>
                {campId == 0 ? <>
                    <div style={{"display":'flex' , "justifyContent":'space-between'}}>
                        <h5>Campaign List</h5>
                        <Button variant="outlined"  sx={{ "font-family":'Poppins' , "borderColor":"#fff !important" , "color":'#fff' , "borderRadius":"5px" , "textTransform":"capitalize" , "background":'#FF8140 !important'}}>New Campaign</Button>
                    </div>
                    <CampaignsTable leadTablehead={leadTablehead} row={leadTablebody} setcampId={setcampId} />
                </> : <PulpyStepper setcampId={setcampId} />}
            </Paper>
        </>
    )
}

export default Campaign;