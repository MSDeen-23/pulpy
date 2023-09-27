/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Background,
    removeElements,
    Controls,
    isNode,
} from "react-flow-renderer";
import dagre from "dagre";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MessageIcon from "@mui/icons-material/Message";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import "./dnd.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageDrawer from '../drawer/message-drawer'
import TimelineDrawer from "../drawer/timeline-drawer";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { campaignTemplateActions, campaignActions } from "../../state/index"
import { setTime } from "../../state/action-creators/campaignTemplateAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { saveTemplate } from "../../app/main/service/ApiService/TemplateService";
import { toast } from "react-toastify";


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
};



const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],

        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.primary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const TemplateSequence = () => {
    const messageValue = useSelector((state) => state.campaignTemplate.message);
    useEffect(() => {
        setMessageButtonClicked(messageButtonClicked => !messageButtonClicked);
        messageSubmittedHandler(messageValue)
    }, [messageValue]);

    const timeValue = useSelector(state => state.campaignTemplate.time)
    useEffect(() => {
            setTimeButtonClicked(timeButtonClicked => !timeButtonClicked);
            timeSubmittedHandler(timeValue)
        },
        [timeValue]);

    const dispatch = useDispatch();
    const { setMessage, setTime } = bindActionCreators(campaignTemplateActions, dispatch);
    const { setTemplate } = bindActionCreators(campaignActions, dispatch);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedNode, setSelectedNode] = useState(1);
    const [selectedMessageNode, setSelectedMessageNode] = useState(0);
    const [selectedTimeNode, setSelectedTimeNode] = useState(0);
    const [messageButtonClicked, setMessageButtonClicked] = useState(true);
    const [timeButtonClicked, setTimeButtonClicked] = useState(true);
    const [addCampaignModalOpen, setAddCampaignModalOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [instanceflow, setinstanceflow] = useState();
    const handleTemplateNameChange = (event) => setTemplateName(event.target.value);

    const open = Boolean(anchorEl);
    const position = { x: 450, y: 200 };
    const edgeType = "smoothstep";

    const handleClick = (event) => {
        setSelectedNode(event.currentTarget.id);
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const getLayoutedElements = (elements, direction = "TB") => {
        const isHorizontal = direction === "LR";
        dagreGraph.setGraph({ rankdir: direction });
        elements.forEach((el) => {
            if (isNode(el)) {
                dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
            } else {
                dagreGraph.setEdge(el.source, el.target);
            }
        });

        dagre.layout(dagreGraph);

        return elements.map((el) => {
            if (isNode(el)) {
                const nodeWithPosition = dagreGraph.node(el.id);
                el.targetPosition = isHorizontal ? "left" : "top";
                el.sourcePosition = isHorizontal ? "right" : "bottom";
                el.position = {
                    x: nodeWithPosition.x + nodeWidth,
                    y: nodeWithPosition.y - nodeHeight / 2,
                };
            }
            // setTimeout(() => instanceflow.fitView(), 100)
            // setTimeout(() => instanceflow.zoomTo(1 , 1000), 100)
            return el;
        });

    };

    const messageButtonHandler = (event) => {
        const selectedId = event.currentTarget.id;
        let message = "";
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === selectedId) {

                message = nodes[i].data.messsageContent !== undefined ? nodes[i].data.messsageContent : "";
                break;
            }
        }
        setMessage({ content: message, id: selectedId })
        setMessageButtonClicked(messageButtonClicked => !messageButtonClicked)

    }
    const setTimeButtonClickedHandler = (event) => {
        const id = event.currentTarget.id;
        let timeUnit = "";
        let timeValue = "";
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === id) {
                timeUnit = nodes[i].data.timeUnit !== undefined ? nodes[i].data.timeUnit : "";
                timeValue = nodes[i].data.timeValue !== undefined ? nodes[i].data.timeValue : "";
                break;
            }
        }
        console.log(event.currentTarget);
        setTime({ id, timeUnit, timeValue })
        setSelectedTimeNode(event.currentTarget.id);
        setTimeButtonClicked(timeButtonClicked => !timeButtonClicked)
    }



    const MessageActionButton = (index) => (
        <div>
            <Button
                id={index}
                onClick={messageButtonHandler}
                startIcon={<MessageIcon />}
                variant="outlined"
                className="w-100 btn btn-primary"
            >
                Message
            </Button>
        </div>
    )

    const TimeActionButton = (index, timeUnit, timeValue) => (
        <div>
            <Button
                id={index}
                onClick={setTimeButtonClickedHandler}
                startIcon={<AccessTimeIcon />}
                variant="outlined"
                className="w-100 btn btn-white"
            >
                {timeUnit + " " + timeValue}
            </Button>
        </div>
    )

    const messageSubmittedHandler = (value) => {

        console.log(value);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === value.id) {
                nodes[i].data.messsageContent = value.content;
                break;
            }
        }
        console.log(nodes);
    }

    const timeSubmittedHandler = (value) => {
        console.log(value);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id === value.id) {
                nodes[i].data.label = TimeActionButton(nodes[i].id, value.timeUnit, value.timeValue);
                nodes[i].data.timeUnit = value.timeUnit;
                nodes[i].data.timeValue = value.timeValue;
                nodes[i].data.type = "MESSAGE";
                break;
            }
        }
        const layoutedElements = getLayoutedElements(nodes);
        setElements(layoutedElements);
        console.log(nodes);
        setAnchorEl(null);
        console.log(nodes);
    }

    const removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }
    const ShowOrHideMessageDrawer = (props) => {
        if (messageButtonClicked === true) {
            console.log(selectedMessageNode);
            return (
                <div>
                    <MessageDrawer>
                    </MessageDrawer>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    const ShowOrHideTimeLineDrawer = () => {
        if (timeButtonClicked === true) {
            return (
                <div>
                    <TimelineDrawer>
                    </TimelineDrawer>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    const addActionButton = (index) => (
        <Button
            id={index}
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            className="btn btn-primary w-100"
        >
            ADD ACTION
        </Button>
    );
    const [nodes] = useState([
        {
            id: "1",
            type: "input",
            data: {
                label: addActionButton(1),
            },
            position
        },
    ]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLoad =(instance) =>{
        setinstanceflow(instance)
        setTimeout(() => instance.fitView(), 0)
        setTimeout(() => instance.zoomTo(1 , 100), 1000)
    }
    const onConnect = (params) =>

        setElements((els) =>
            addEdge({ ...params, type: "smoothstep", animated: true }, els)
        );
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const layoutedElements = getLayoutedElements(nodes);
    const [elements, setElements] = useState(layoutedElements);

    const connectMenuItemClickHandler = () => {
        let node = selectedNode.toString();
        let node1Upper = (selectedNode + 1).toString();
        let node2Upper = (selectedNode + 2).toString();
        console.log(node);
        console.log(selectedNode);
        console.log(nodes);
        removeByAttr(nodes, 'id', node);
        nodes.push({
            id: node,
            data: {
                label: (
                    <button className="reactFlowBtn btn btn-primary">
                        <ConnectWithoutContactIcon color="primary" fontSize="small" />{" "}
                        Connect
                    </button>
                ),
                type: "CONNECT"
            },
            position,
        });
        nodes.push(
            {
                id: node + "a",
                data: {
                    label: TimeActionButton(node + "a", "1", "Day"),
                    type: "CONNECT",
                    timeUnit: "1",
                    timeValue: "Day"

                },
                position,
            },
            {
                id: node + "b",
                data: {
                    label: TimeActionButton(node + "b", "1", "Hours"),
                    type: "CONNECT",
                    timeUnit: "1",
                    timeValue: "Hour"
                },
                position,
            },

            {
                id: node1Upper,
                data: {
                    label: addActionButton(node1Upper),
                },
                position,
            },

            {
                id: node2Upper,
                data: {
                    label: addActionButton(node2Upper),
                },
                position,
            },
            {
                id: `e${node}-${node}a`,
                source: `${node}`,
                target: `${node}a`,
                type: "smoothstep",
            },
            {
                id: `e${node}-${node}b`,
                source: `${node}`,
                target: `${node}b`,
                type: "smoothstep",
                label: "Accepted",
            },
            {
                id: `e${node}a-2`,
                source: `${node}a`,
                target: `${node1Upper}`,
                type: edgeType,
                animated: true,
                label: "Still not accepted",
            },
            {
                id: `e${node}b-3`,
                source: `${node}b`,
                target: `${node2Upper}`,
                animated: true,
                type: "smoothstep",
            }
        );
        console.log(nodes);
        const layoutedElements = getLayoutedElements(nodes);
        setElements(layoutedElements);
        console.log(nodes);
        setAnchorEl(null);
        console.log("Test");


        setTimeout(() => instanceflow.fitView(), 100)
        if(nodes.length < 33){
            setTimeout(() => instanceflow.zoomTo(1 , 100), 100)
        }

    };

    const messageMenuHandler = () => {
        let node = selectedNode.toString();
        let node1Upper = (selectedNode + 1).toString();
        let node2Upper = (selectedNode + 2).toString();
        console.log(node);
        console.log(selectedNode);
        console.log(nodes);
        removeByAttr(nodes, 'id', node);
        nodes.push({
            id: node,
            data: {
                label: MessageActionButton(node),
                type: "MESSAGE"
            },
            position,
        });
        nodes.push(
            {
                id: node + "a",
                data: {
                    label: TimeActionButton(node + "a", "1", "Day"),
                    type: "MESSAGE",
                    timeUnit: "1",
                    timeValue: "Day"
                },
                position,
            },
            {
                id: node + "b",
                data: {
                    label: TimeActionButton(node + "b", "1", "Hour"),
                    type: "MESSAGE",
                    timeUnit: "1",
                    timeValue: "Hour"
                },
                position,
            },
            {
                id: node1Upper,
                data: {
                    label: addActionButton(node1Upper),
                },
                position,
            },

            {
                id: node2Upper,
                data: {
                    label: addActionButton(node2Upper),
                },
                position,
            },
            {
                id: `e${node}-${node}a`,
                source: `${node}`,
                target: `${node}a`,
                type: "smoothstep",
            },
            {
                id: `e${node}-${node}b`,
                source: `${node}`,
                target: `${node}b`,
                type: "smoothstep",
                label: "Replied",
            },
            {
                id: `e${node}a-2`,
                source: `${node}a`,
                target: `${node1Upper}`,
                type: edgeType,
                animated: true,
                label: "Still not replied",
            },
            {
                id: `e${node}b-3`,
                source: `${node}b`,
                target: `${node2Upper}`,
                animated: true,
                type: "smoothstep",
            }
        );
        console.log(nodes);
        const layoutedElements = getLayoutedElements(nodes);
        setElements(layoutedElements);
        console.log(nodes);
        setAnchorEl(null);

        setTimeout(() => instanceflow.fitView(), 100)
        if(nodes.length < 33){
            setTimeout(() => instanceflow.zoomTo(1 , 100), 100)
        }
    };

    const endMenuHandler = () => {
        let node = selectedNode.toString();
        removeByAttr(nodes, 'id', node);
        nodes.push({
            id: node,
            data: {
                label: (
                    <button className="reactFlowBtn btn btn-secondary w-100">
                        <StopCircleIcon color="primary" fontSize="small" /> End
                    </button>
                ),
                type: "END"
            },
            position,
        });
        const layoutedElements = getLayoutedElements(nodes);
        setElements(layoutedElements);
        console.log(nodes);
        setAnchorEl(null);
        setTimeout(() => instanceflow.fitView(), 100)
        if(nodes.length < 33){
            setTimeout(() => instanceflow.zoomTo(1 , 100), 100)
        }
    };

    const submitTemplateClickHandler = () => {
        const templatePayload = {
            templateName: templateName,
            templateStepData: JSON.stringify(nodes)
        }
        saveTemplate(templatePayload)
            .then((response) => {
                if (response.status === 200) {
                    let templatePayload = {
                        selectedTemplateId: response.data.templateId,
                        selectedTemplateName: response.data.templateName
                    }
                    setTemplate(templatePayload);
                    toast.success(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
        setAddCampaignModalOpen(!addCampaignModalOpen)
        setTimeout(() => instanceflow.fitView(), 100)
        if(nodes.length < 33){
            setTimeout(() => instanceflow.zoomTo(1 , 100), 100)
        }
    }




    return (
        <>
            <div className="layoutflow">
                <div>
                    <ShowOrHideMessageDrawer />

                </div>
                <div>
                    <ShowOrHideTimeLineDrawer />
                </div>
                <div>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={connectMenuItemClickHandler} disableRipple>
                            <ConnectWithoutContactIcon />
                            Connect
                        </MenuItem>
                        <MenuItem onClick={messageMenuHandler} disableRipple>
                            <MessageIcon />
                            Message
                        </MenuItem>
                        <MenuItem onClick={endMenuHandler} disableRipple>
                            <StopCircleIcon />
                            End
                        </MenuItem>
                    </StyledMenu>
                </div>
                <ReactFlowProvider>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        connectionLineType="smoothstep"
                    />
                    <Controls />
                    <Background />
                </ReactFlowProvider>


            </div>

            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-primary float-right" onClick={() => setAddCampaignModalOpen(!addCampaignModalOpen)}>
                        Done
                    </button>
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
                            Template
                        </Typography>
                    </div>
                    <div className="ModalBody">
                        <Typography sx={{ mt: 1 }}>
                            Give your template a name
                        </Typography>
                        <TextField
                            id="templateName"
                            label="New York, 2-3 level connections, retail, CEO & CTO"
                            variant="outlined"
                            className="w-100 mt-3"
                            size="small"
                            onChange={handleTemplateNameChange}
                        />
                    </div>
                    <div>
                        <Button
                            className="btn btn-secondary mt-4 float-right"
                            onClick={submitTemplateClickHandler}
                        >
                            Save template
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default TemplateSequence;
