import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-3 shadow-lg bg-primary text-white">
        <h1 className="fs-3 fw-bold text-stroke" style={{
    color: 'white',                  
    textShadow: "-2px -2px 0 #000,  2px -2px 0 #000, -2px 2px 0 #000,   2px 2px 0 #000" }}
>CAR Management System</h1>
      </div>
    </>
  );
}

export default Nav;
