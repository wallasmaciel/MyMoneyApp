import React from "react";

export default props => (
    <button type="button" className={ `btn btn-${props.type}` } onClick={ props.click }>
        <i className={ `fa fa-${props.icon}` }></i>
    </button>
);