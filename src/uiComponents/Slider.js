import React from "react";

const Slider = (props) => {
    return (
        <div className="">
            <p>{props.title}</p>
            <p className="gradient">{props.subtitle} {props.unit}</p>
            <div className="range__input">
              <label>
                <p>{props.min}</p>
                <p>{props.max}</p>
              </label>
              <input type="range" onChange={props.onChange} />
            </div>
          </div>
    );
}

export default Slider;