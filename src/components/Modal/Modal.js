import React from "react";
import './Modal.css';
import GlobeGrid from '../grid/globeGrid';
import ModelContent from './Modal_Content';
const Modal = ({ handleClose, show, data,name,program,gridData}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  let close ="< Go Back";
  return (
    <div className={showHideClassName}>
    <section className="modal-main">
        {program==='search'?<ModelContent name={name} data={data} width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}></ModelContent>:<GlobeGrid className='gridView' gridData={gridData} />}
        <button className="closeButton" onClick={handleClose}>{close}</button>
        </section>
    </div>
  );
};

export default Modal;
