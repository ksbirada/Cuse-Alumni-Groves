import React, { useState } from "react";

import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";

function AccountItem(props) {


  return (
    <div className="d-flex align-items-center my-5">
      <div>
        <Hashicon value={props.id} size={50} />
      </div>
      <div className="mx-3 fw-bold">
        <Link
          to="/newsfeed/profile"
          className="text-decoration-none text-dark"
        >
          {props.firstName + " " + props.lastName}
        </Link>
        <div>Email: {props.email}</div>
        <div>User Type: {props.userType}</div>
      </div>
    </div>
  );
}

export default AccountItem;