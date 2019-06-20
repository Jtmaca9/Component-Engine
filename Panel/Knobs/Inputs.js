const React = require('react');

const StringInput = ({ control, props, updateProps }) => (
    <div>
        <strong>{control.name}:  </strong>
        <input
            value={props[control.name]}
            onChange={
                (e) => updateProps(e, control)
            } />
    </div>
);

module.exports = {
    StringInput,
};