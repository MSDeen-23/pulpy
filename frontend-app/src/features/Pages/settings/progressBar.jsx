import React from 'react'

const ProgressBar = ({progressStyle,fillerStyle , percentage}) => {
    return ( <div 
        style={{
            ...progressStyle
        }}
        >
            <div className="filler" style={{
                        ...fillerStyle,
                }}>
                    <span>{percentage}</span>
                </div>

        </div>  );
}

export default ProgressBar