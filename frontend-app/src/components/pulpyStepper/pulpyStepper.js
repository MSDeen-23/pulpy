import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TemplateSequence from '../pulpyflowchart/pulpyFlowChart';
import AddLeads from '../../features/Pages/campaign/addleads'
import SummarizeCampaign from "../../features/Pages/campaign/summarizeCampaign";
import {StepLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import launch from '../../assets/images/launch.png'
const steps = ['Add Leads', 'Create a sequence', 'Summarize and Launch'];


export function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };


    const handleStep = (step) => () => {
        console.log(step);
        setActiveStep(step);
    };
    const handleNextStep = (step)=>{
        console.log(step);
        setActiveStep(step);
    }

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    const pulpyTheme = createTheme({
        components: {
            MuiStepIcon: {
                styleOverrides: {
                    root: {
                        '&active': {
                            backgroundColor: '#3730A3',
                            color: '#3730A3'
                        },
                    },
                },
            },
        },
    });
    const RenderElements = (props) => {

        if (props.value === 0) {
            return (<AddLeads handleStep={handleNextStep} currentStep ={props.value}/>)
        } else if (props.value === 1) {
            return (<TemplateSequence/>)
        } else {
            return (<SummarizeCampaign/>)
        }


    }
    return (
        <ThemeProvider theme={pulpyTheme}>
            <Box sx={{width: '100%'}}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div>
                                <RenderElements value={activeStep}/>
                            </div>

                        </React.Fragment>
                    )}
                </div>
            </Box>
        </ThemeProvider>
    );
}

function GeekStepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ['Add Leads', 'Create a sequence', 'Summarize and Launch'];
    function getStepContent (step){
        switch (step) {
            case 0:
                return(
                    <AddLeads/>
                )
            case 1:
                return(
                    <TemplateSequence/>
                )
                break;
            case 2:
                return(
                    <SummarizeCampaign/>
                )
                break;
            default:
                break;
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        props.setcampId(0);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}  >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>

                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <Paper square elevation={0} >
                     <div className='campaign_final'>
                         <img src={launch} />
                     </div>
                     <div className='campaign_final'>
                     <Button variant="outlined" onClick={handleReset}  sx={{ "font-family":'Poppins' , "borderColor":"#fff !important" , "color":'#fff' , "borderRadius":"5px" , "textTransform":"capitalize" , "background":'#FF8140 !important'}}>  Back to Campaign</Button>
                     </div>                   
                </Paper>
            ):(
                <>
                    <Typography>{getStepContent(activeStep)}</Typography>
                    <div className='btnWrapper'>
                        <div className='dFlex jcSpacebetween'>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className="btn btn-white"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                className="btn btn-primary"
                            >
                                {activeStep === steps.length - 1 ? 'Launch' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Box>
    );
}
export default GeekStepper;