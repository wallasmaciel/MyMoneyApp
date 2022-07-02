import React from 'react';

export default props => (
    <select { ...props.input }
        className='form-control'
        placeholder={ props.placeholder }
        readOnly={ props.readOnly }>
        { props.children }
    </select>
);