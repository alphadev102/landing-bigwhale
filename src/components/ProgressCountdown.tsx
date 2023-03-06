import React from 'react';
import styled from 'styled-components';
import Countdown, {CountdownRenderProps} from 'react-countdown';

interface ProgressCountdownProps {
  
  deadline: Date;
}


const ProgressCountdown: React.FC<ProgressCountdownProps> = ({deadline}) => {
  
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const {days, hours, minutes, seconds} = countdownProps;
    const d = String(days);
    const h = String(hours);
    const m = String(minutes);
    const s = String(seconds);
    if(Number(d) > 0) {
      return (    
        <div className="timeText">
           <div className="gradient_line">
              <span className="text">{d.padStart(2, '0')}</span>
              <label>Days</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">{h.padStart(2, '0')}</span>
              <label>Hours</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">{m.padStart(2, '0')}</span>
              <label>Minutes</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">{s.padStart(2, '0')}</span>
              <label>Seconds</label>
            </div>
        
       
          </div>   
      );
    } else {
      return (     
        <div className="timeText">
            <div className="gradient_line">
              <span className="text">{h.padStart(2, '0')}</span>
              <label>Hours</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">{m.padStart(2, '0')}</span>
              <label>Minutes</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">{s.padStart(2, '0')}</span>
              <label>Seconds</label>
            </div>
        
          </div> 
      )
    }
  };
  return (
    // <Card>
    <div>
      {/* <StyledDesc>{description}</StyledDesc> */}
       { 
        deadline ?
          <Countdown  key={new Date().getTime()} date={deadline} renderer={countdownRenderer} />
          : 
          <div className="timeText">
            <div className="gradient_line">
              <span className="text">00</span>
              <label>Hours</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">00</span>
              <label>Minutes</label>
            </div>
            <div className="dots">
              <p ></p>
              <p ></p>
            </div>
            <div className="gradient_line">
              <span className="text">00</span>
              <label>Seconds</label>
            </div>
        
          </div> 
        }
      
    </div>
    // </Card>
  );
};

export default ProgressCountdown;
