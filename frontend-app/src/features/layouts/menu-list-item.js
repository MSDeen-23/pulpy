import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatIcon from '@mui/icons-material/Chat';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {Link} from "react-router-dom";
import lg from '../../assets/images/chart-pie.svg'

export const mainListItems = (
    <div>
        <Link to="/dashboard">
            <ListItem button>
                <ListItemIcon>
                    <img src={lg} />
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
        </Link>
        <Link to="/campaign">
            <ListItem button>
                <ListItemIcon>
                    <CampaignIcon/>
                </ListItemIcon>
                <ListItemText primary="Campaigns"/>
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <ChatIcon/>
            </ListItemIcon>
            <ListItemText primary="Inbox"/>
        </ListItem>
        <Link to="/leads">
        <ListItem button>
            <ListItemIcon>
                <ReceiptIcon/>
            </ListItemIcon>
            <ListItemText primary="Leads"/>
        </ListItem>
        </Link>
        <Link to="/teamlist">
        <ListItem button>
            <ListItemIcon>
                <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary="Teams"/>
        </ListItem>
        </Link>
        <Link to="/settings">
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary="Settings"/>
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <ContactSupportIcon/>
            </ListItemIcon>
            <ListItemText primary="Contact Us"/>
        </ListItem>
    </div>
);

