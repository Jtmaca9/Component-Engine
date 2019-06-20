const React = require('react');
const { default: styled } = require('styled-components');

const { StringInput } = require('./Inputs');

const Container = styled.div`
    width: 100vw;
    padding: 10px;
    margin-top: 50px;
    min-height: 50px;
    border: 2px solid white;
`;

const PropsEditor = ({ props, setProps, propControls }) => {

    function updateProp(name, value) {
        setProps(
            Object.assign(
                {},
                props,
                { [name]: value }
            )
        )
    }

    return (
        <Container>
            <h1><u>Props Editor</u></h1>
            {propControls.map(({ name, type }) => {
                if (type === 'string') {
                    return (
                        <StringInput
                            name={name}
                            props={props}
                            updateProp={updateProp} />
                    )
                }
                return null;
            })}
        </Container>
    )
}

module.exports = PropsEditor;