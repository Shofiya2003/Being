import React from "react";


export default function AuthButtons(props) {
  return <div className="auth_button login_boxes flex">
      {props.icon}
      <p className="text-[#343434]">Login with {props.medium}</p>
      
  </div>;
}