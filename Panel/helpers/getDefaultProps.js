
const getDefaultProps = (props) => {
    let defaultProps = {};

    props.forEach((prop) => {
        defaultProps[prop.name] = prop.default;
    });

    return defaultProps;
}

module.exports = getDefaultProps;