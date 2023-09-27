import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

function SequenceDisplay(){

    return(
        <>
        <section>
           <div className="container-fluid">
             <div className="row">  
             <div className="col-md-12">
                 <div className="sequence-leads">
                     <Typography variant="body1">Select a sequence from one of our pre-build template or create custom one </Typography> 
                    <div className="container-fluid">
                      <div className="row mt-4">
                        <div className="col-md-3">
                         <Link className="sequence-logo">
                           <svg width="64" height="64" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M34.5002 15.3334H19.1668C17.0497 15.3334 15.3335 17.0496 15.3335 19.1667V34.5C15.3335 36.6171 17.0497 38.3334 19.1668 38.3334H34.5002C36.6173 38.3334 38.3335 36.6171 38.3335 34.5V19.1667C38.3335 17.0496 36.6173 15.3334 34.5002 15.3334Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M34.5002 53.6666H19.1668C17.0497 53.6666 15.3335 55.3829 15.3335 57.5V72.8333C15.3335 74.9504 17.0497 76.6666 19.1668 76.6666H34.5002C36.6173 76.6666 38.3335 74.9504 38.3335 72.8333V57.5C38.3335 55.3829 36.6173 53.6666 34.5002 53.6666Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M72.8332 53.6666H57.4998C55.3827 53.6666 53.6665 55.3829 53.6665 57.5V72.8333C53.6665 74.9504 55.3827 76.6666 57.4998 76.6666H72.8332C74.9503 76.6666 76.6665 74.9504 76.6665 72.8333V57.5C76.6665 55.3829 74.9503 53.6666 72.8332 53.6666Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M53.6665 26.8334H76.6665" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             <path d="M65.1665 15.3334V38.3334" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                             </svg>
                            </Link>
                            <div className="sequence-link">
                            <Typography  variant="body1">Lead Generation</Typography>
                            <Link >Preview</Link>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <Link className="sequence-logo">
                            <svg width="64" height="64" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M49.1168 64.3771L65.4123 69.2646M22.7358 26.5881L27.6233 42.876L22.7358 26.5881Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M44.7852 47.2151L66.8613 25.1389" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M21.0835 26.8334C24.2591 26.8334 26.8335 24.259 26.8335 21.0834C26.8335 17.9077 24.2591 15.3334 21.0835 15.3334C17.9079 15.3334 15.3335 17.9077 15.3335 21.0834C15.3335 24.259 17.9079 26.8334 21.0835 26.8334Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M70.9165 26.8334C74.0921 26.8334 76.6665 24.259 76.6665 21.0834C76.6665 17.9077 74.0921 15.3334 70.9165 15.3334C67.7409 15.3334 65.1665 17.9077 65.1665 21.0834C65.1665 24.259 67.7409 26.8334 70.9165 26.8334Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M70.9165 76.6666C74.0921 76.6666 76.6665 74.0923 76.6665 70.9166C76.6665 67.741 74.0921 65.1666 70.9165 65.1666C67.7409 65.1666 65.1665 67.741 65.1665 70.9166C65.1665 74.0923 67.7409 76.6666 70.9165 76.6666Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M32.5835 76.6666C42.1104 76.6666 49.8335 68.9435 49.8335 59.4166C49.8335 49.8897 42.1104 42.1666 32.5835 42.1666C23.0566 42.1666 15.3335 49.8897 15.3335 59.4166C15.3335 68.9435 23.0566 76.6666 32.5835 76.6666Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </Link>
                            <div className="sequence-link">
                              <Typography  variant="body1">Endorse My Skills</Typography>
                              <Link href="#">Preview</Link>
                            </div>                         
                        </div>
                        <div className="col-md-3">
                          <Link className="sequence-logo">
                            <svg width="64" height="64" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M34.4998 42.1667C42.9682 42.1667 49.8332 35.3017 49.8332 26.8333C49.8332 18.365 42.9682 11.5 34.4998 11.5C26.0315 11.5 19.1665 18.365 19.1665 26.8333C19.1665 35.3017 26.0315 42.1667 34.4998 42.1667Z" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M11.5 80.5V72.8333C11.5 68.7667 13.1155 64.8666 15.991 61.991C18.8666 59.1155 22.7667 57.5 26.8333 57.5H42.1667C46.2333 57.5 50.1334 59.1155 53.009 61.991C55.8845 64.8666 57.5 68.7667 57.5 72.8333V80.5" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M61.3335 11.9983C64.6318 12.8428 67.5551 14.761 69.6428 17.4505C71.7304 20.14 72.8636 23.4478 72.8636 26.8525C72.8636 30.2571 71.7304 33.5649 69.6428 36.2544C67.5551 38.9439 64.6318 40.8621 61.3335 41.7066" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M80.5 80.5001V72.8334C80.4805 69.4492 79.342 66.1665 77.2619 63.4969C75.1817 60.8274 72.2768 58.9211 69 58.0751" stroke="#252B3B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                            </Link>
                            <div className="sequence-link">
                              <Typography  variant="body1">Extras Profile Views</Typography>
                              <Link >Preview</Link>
                            </div>
                        </div>
                        <div className="col-md-3">
                          <Link className="sequence-logo">
                          <svg width="64" height="64" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23 34.5H46" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.3335 19.1666H30.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M23 19.1666V61.3333C23 62.35 23.4039 63.325 24.1228 64.0439C24.8416 64.7628 25.8167 65.1666 26.8333 65.1666H46" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M72.8333 26.8334H49.8333C47.7162 26.8334 46 28.5496 46 30.6667V38.3334C46 40.4505 47.7162 42.1667 49.8333 42.1667H72.8333C74.9504 42.1667 76.6667 40.4505 76.6667 38.3334V30.6667C76.6667 28.5496 74.9504 26.8334 72.8333 26.8334Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M72.8333 57.5H49.8333C47.7162 57.5 46 59.2162 46 61.3333V69C46 71.1171 47.7162 72.8333 49.8333 72.8333H72.8333C74.9504 72.8333 76.6667 71.1171 76.6667 69V61.3333C76.6667 59.2162 74.9504 57.5 72.8333 57.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> 
                          </Link>
                          <div className="sequence-link">
                            <Typography  variant="body1">Custom Campaign</Typography>
                            <Link>Preview</Link>
                          </div>  
                        </div>
                      </div>
                      <div className="row">
                          <div className="col-md-12">
                              <Button className="btn btn-primary">Select Template</Button>
                          </div>
                      </div>
                    </div>
              </div> 
           </div>
        </div>
           </div>
         </section>
        </>
    )
}

export default SequenceDisplay;