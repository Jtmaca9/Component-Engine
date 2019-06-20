const React = require('react');

const StringInput = ({ name, props, updateProp }) => (
    <div>
        <strong>{name}:  </strong>
        <input
            value={props[name]}
            onChange={
                (evt) => updateProp(name, evt.target.value)
            } />
    </div>
);

module.exports = {
    StringInput,
};