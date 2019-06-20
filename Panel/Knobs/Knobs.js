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

const Knobs = ({ props, setProps, propControls }) => {

    function updateProps(e, control) {
        setProps(
            Object.assign(
                {},
                props,
                { [control.name]: e.target.value }
            )
        )
    }

    return (
        <Container>
            <h1><u>Knobs</u></h1>
            {propControls.map((control) => {
                if (control.type === 'string') {
                    return (
                        <StringInput
                            control={control}
                            props={props}
                            updateProps={updateProps} />
                    )
                }
                return null;
            })}
        </Container>
    )
}

module.exports = Knobs;