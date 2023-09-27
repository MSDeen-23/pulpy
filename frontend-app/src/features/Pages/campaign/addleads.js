import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { createLeads } from "../../../app/main/service/ApiService/LeadsService";
import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TableHeaderPulpy from "../../../components/Tables/tableHeaderPulpy";
import TableBodyPulpy from "../../../components/Tables/tableBodyPulpy";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
};
const gray = {
    50: "#e9e9ea",
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#66B2FF",
    400: "#dee2e6",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#333333",
};
const Tab = styled(TabUnstyled)`
  color: black;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 400;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${gray[400]};
  }
  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${gray[200]};
    outline-offset: 2px;
  }
  &.${tabUnstyledClasses.selected} {
    background-color: ${gray[800]};
    color: ${gray[50]};
  }
  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
  padding: 12px 16px;
`;
const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${gray[50]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

function createData(title1, title2, title3) {
    return { title1, title2, title3 };
}

const leadTablehead =[ "#" , "Campaign Name" , "Creation Date" , ''];
const leadTablebody =[ createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),
createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt'),];


function AddLeads(props) {
    const [addLeadsModalOpen, setAddLeadsModalOpen] = React.useState(false);
    const [leadsListName, setLeadsListName] = React.useState("");
    const [leadsList, setLeadsList] = React.useState("");
    const handleOpen = () => setAddLeadsModalOpen(true);
    const handleClose = () => setAddLeadsModalOpen(false);
    const handleLeadsListNameChange = (event) =>
        setLeadsListName(event.target.value);
    const handleLeadsListChange = (event) => setLeadsList(event.target.value);

    function createLeadsClickHandler() {
        if (leadsListName && leadsList) {
            const createLeadsPayLoad = {
                leadsListName: leadsListName,
                listOfLeads: leadsList.split("\n"),
            };
            createLeads(createLeadsPayLoad)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success(response.data.message);
                        setAddLeadsModalOpen(false);
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
            console.log(createLeadsPayLoad);
        } else {
            if (!leadsList) toast.error("Leads List Name is mandatory");
            if (!leadsListName) toast.error("Leads List is mandatory");
        }
    }
    return (
        <>
            <section className="addLeads">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="campaign-widgets">
                                <div className="campaign-header"></div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="campaign-leads">
                                <div className="lead_title">
                                    <h5>List of Leads</h5>
                                </div>
                                <i className="addLeadsAnimated"></i>
                                <p>You currently no leads list</p>
                                <Button
                                    onClick={handleOpen}
                                    className="btn btn-primary btn-campaign"
                                >
                                    Add Leads
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-12">
                            {/* <TableHeaderPulpy/> */}
                            <TextField
                                id="search"
                                variant="outlined"
                                label="Search"
                                size="small"
                            />
                            <TableBodyPulpy leadTablehead={leadTablehead}  row={leadTablebody}/>
                        </div>
                        <Modal
                            open={addLeadsModalOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="ModalHeader">
                                    <Typography variant="h6" component="h2">
                                        Create a list of leads below
                                    </Typography>
                                </div>
                                <div className="ModalBody">
                                    <Typography sx={{ mt: 1 }}>Give your list a name</Typography>
                                    <TextField
                                        id="leadsListName"
                                        label="New York, 2-3 level connections, retail, CEO & CTO"
                                        variant="outlined"
                                        className="w-100 mt-3"
                                        size="small"
                                        onChange={handleLeadsListNameChange}
                                    />
                                    <Typography sx={{ mt: 2 }}>
                                        How would you like to add leads?
                                    </Typography>
                                    <Box>
                                        <TabsUnstyled defaultValue={0} className="mt-3">
                                            <TabsList>
                                                <Tab>Upload search</Tab>
                                                <Tab>List of leads</Tab>
                                            </TabsList>
                                            <TabPanel value={0}>
                                                <Typography sx={{ mt: 1 }} variant="caption">
                                                    Filter profiles in the LinkedIn search and paste the
                                                    URL below
                                                </Typography>
                                                <TextareaAutosize
                                                    id="leadsList"
                                                    aria-label="minimum height"
                                                    style={{
                                                        resize: "none",
                                                    }}
                                                    minRows={2}
                                                    maxRows={2}
                                                    variant="outlined"
                                                    className="w-100 mt-3"
                                                    onChange={handleLeadsListChange}
                                                />
                                            </TabPanel>
                                            <TabPanel value={1}>
                                                <Typography sx={{ mt: 1 }} variant="caption">
                                                    Add leads in a new line
                                                </Typography>
                                                <TextareaAutosize
                                                    id="leadsList"
                                                    aria-label="minimum height"
                                                    minRows={5}
                                                    maxRows={5}
                                                    variant="outlined"
                                                    className="w-100 mt-3"
                                                    onChange={handleLeadsListChange}
                                                />
                                            </TabPanel>
                                        </TabsUnstyled>
                                    </Box>
                                    <Button
                                        className="btn btn-secondary mt-4"
                                        onClick={createLeadsClickHandler}
                                    >
                                        Create a list
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AddLeads;