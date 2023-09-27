import React, {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import DateTimePicker from '@mui/lab/DateTimePicker';
import {InputLabel, Select} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getLeads} from "../../../app/main/service/ApiService/LeadsService";
import {getTemplates} from "../../../app/main/service/ApiService/TemplateService";
import {toast} from "react-toastify";
import {saveCampaign} from "../../../app/main/service/ApiService/CampaignService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

function SummarizeCampaign(props) {
    const selectedTemplate = useSelector((state) => state.campaign.selectedTemplate);
    const selectedLeadsList = useSelector((state) => state.campaign.selectedLeadsList);
    const [templateValue, setTemplateValue] = useState(selectedTemplate.selectedTemplateId ? selectedTemplate : '');
    const [leadsListValue, setLeadsListValue] = useState(selectedLeadsList.leadsListId ? selectedLeadsList : '');


    const [addCampaignModalOpen, setAddCampaignModal] = useState(false);
    const [campaignName, setCampaignName] = useState('');
    const handleOpen = () => setAddCampaignModal(true);
    const handleClose = () => setAddCampaignModal(false);
    const handleCampaignNameChange = (event) => setCampaignName(event.target.value);
    const [timeValue, setTimeValue] = useState(new Date());
    const handleTimeChange = (newValue) => {setTimeValue(newValue.toUTCString());};

    const [leadsListValues, setLeadsListValues] = useState();
    const [templateListValues,setTemplateListValues] = useState();

    useEffect(() => {
        getLeads().then((response) => {
            setLeadsListValues(response.data);
        })
        getTemplates().then((response)=>{
            setTemplateListValues(response.data);
        })
    }, []);


    const campaignCreateHandler = () => {
        if(leadsListValue===undefined || leadsListValue===""){
            toast.error("Select list of leads")
        }
        else if(templateValue===undefined || templateValue===""){
            toast.error("Select templates")
        }
        else if(campaignName===undefined||campaignName===""){
            toast.error("Give campaign a name");
        }
        else {
            let createCampaignPayload = {
                leadsListId:leadsListValue,
                templateId: templateValue,
                campaignName: campaignName,
                scheduledDateTime: timeValue,
            }
            saveCampaign(createCampaignPayload)
                .then((response)=>{
                    if(response.status===200){
                        toast.success(response.data.message);
                    }
                    setAddCampaignModal(false);
                })
                .catch((error)=>{
                    toast.error(error.response.data.message);
                    setAddCampaignModal(false);
                })

        }
        console.log(templateValue, leadsListValue, campaignName, timeValue);

    }

    const handleLeadsListChange  = (event) =>{
        setLeadsListValue(event.target.value);


    }

    const handleTemplateChange  = (event) =>{
        setTemplateValue(event.target.value);
    }

    return (
        <>
            <section className="addLeads">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="campaign-widgets">
                                <div className="campaign-header">

                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="campaign-leads">
                                <h6>Lists of Campaigns</h6>
                                <i className="addLeadsAnimated"></i>
                                <p>You currently no campaigns</p>
                                <Button onClick={handleOpen} className="btn btn-primary btn-campaign">Create
                                    Campaign</Button>
                            </div>
                        </div>
                        <Modal
                            open={addCampaignModalOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="ModalHeader">
                                    <Typography variant="h6" component="h2">
                                        Campaign
                                    </Typography>
                                </div>
                                <div className="ModalBody">
                                    <div>
                                        <FormControl fullWidth className="w-100 mt-3">
                                            <InputLabel id="demo-simple-select-helper-label">Leads List</InputLabel>
                                            <Select
                                                MenuProps={MenuProps}
                                                labelId="leadsList"
                                                id="leadsList"
                                                value={leadsListValue}
                                                label="Leads List"
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                onChange={handleLeadsListChange}
                                            >
                                                {leadsListValues && leadsListValues.map((value) => {
                                                    return (
                                                        <MenuItem value={value.id} >
                                                            {value.leadsListName}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                            <FormHelperText>Leads List Name</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div>
                                        <FormControl className="w-100 mt-5">
                                            <InputLabel id="demo-simple-select-helper-label">Template Name</InputLabel>
                                            <Select
                                                MenuProps={MenuProps}
                                                labelId="templatesList"
                                                id="leadsList"
                                                value={templateValue}
                                                label="Template Name"
                                                onChange={handleTemplateChange}
                                            >
                                                {templateListValues && templateListValues.map((value) => {
                                                    return (
                                                        <MenuItem value={value.id} >
                                                            {value.templateName}</MenuItem>
                                                    )
                                                })}

                                            </Select>
                                            <FormHelperText>Template Name</FormHelperText>
                                        </FormControl>
                                    </div>  

                                    <div>
                                        <TextField
                                            id="campaignName"
                                            label="Campaign Name"
                                            variant="outlined"
                                            className="w-100 mt-5"
                                            size="small"
                                            onChange={handleCampaignNameChange}
                                        />
                                    </div>
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                label="Schedule campaign"
                                                value={timeValue}
                                                onChange={handleTimeChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <Button className="btn btn-secondary mt-4" onClick={campaignCreateHandler}>
                                        Create Campaign</Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SummarizeCampaign;