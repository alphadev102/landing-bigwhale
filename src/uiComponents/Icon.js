import React from "react";

const Icon = (props) => {
    return (
        <div className="icon" style={{width: props.width, height: props.height}}>
            <div>
                <img src={props.img} alt="image" />
            </div>
        </div>
    );
}

export const SmallIcon = (props) => {
    return (
        <div className="icon" style={{width: props.width, height: props.height}}>
            <div>
                <img src={props.img} alt="image" style={{width:"48px", height:"48px"}}/>
            </div>
        </div>
    );
}

export default Icon;