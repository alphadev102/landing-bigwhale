import React from "react";
import ReactModal from "react-modal";

import styled from "styled-components";

const CustomReactModal = styled(ReactModal)`
    transition: opacity .6s;
    background: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    animation: njhE7fRL .35s ease-in-out;
    animation-fill-mode: forwards;
    
`

// CustomReactModal.setAppElement('#overlay-connect-wallet');

export default function Modal(props) {
  // const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen
  const delayedOnClose = () => {
    console.log("Fading out...");
    setIsOpen(false);
    setTimeout(() => {
      console.log("Closing now!");
      props.onClose();
    }, 500);
  };

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  React.useEffect(() => {
    return () => {
      clearTimeout(delayedOnClose);
    };
  }, []);

  return (
    <div >
      <CustomReactModal
        isOpen={isOpen}
        onRequestClose={delayedOnClose}
        closeTimeoutMS={500}
      >
        {/* <button onClick={delayedOnClose}>Close Modal</button> */}
        {props.children}
      </CustomReactModal>
    </div>
  );
}
