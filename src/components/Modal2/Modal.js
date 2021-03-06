import React from "react";
import './Modal2.css';
import ModelContent from './Modal_Content';
const Modal = ({ handleClose, show, width,stateName,height}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  let alterStateName =stateName!==''?stateName[0].toUpperCase()+stateName.substring(1):'';
  let close ="< Go Back";
  return (
    <div className={showHideClassName}>
    <section className="modal-main">
        {show?<ModelContent stateName={alterStateName} width={width} height={height} />:null}
        <button className="closeButton" onClick={handleClose}>{close}</button>
        </section>
    </div>
  );
};

export default Modal;
