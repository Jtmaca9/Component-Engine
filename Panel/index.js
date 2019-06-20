const React = require('react');
const ReactDOM = require('react-dom');
const {
    LiveProvider,
    LiveError,
    LivePreview,
} = require('react-live');
const { default: styled } = require('styled-components');

const getDefaultProps = require('./helpers/getDefaultProps');
const Knobs = require('./Knobs/Knobs');

const App = () => {
    const [component, setComponent] = React.useState('<strong>Component Engine Ready, start writing JSX</strong>');
    const [componentSpec, setComponentSpec] = React.useState(null);
    React.useEffect(() => {
        const handler = ({ data }) => {
            const componentData = data.component;
            const componentSpecData = data.componentSpec;
            if (componentData) setComponent(componentData);
            if (componentSpecData) setComponentSpec(componentSpecData);
        }
        window.addEventListener('message', handler);

        return () => window.removeEventListener('message', handler);
    }, []);

    return componentSpec ? (
        <Component
            component={component}
            setComponentSpec={setComponentSpec}
            componentSpec={componentSpec} />
    ) : 'Click into a file to get started!'; 
}

const Component = ({ component, componentSpec }) => {
    const [props, setProps] = React.useState(getDefaultProps(componentSpec.props));
    return (
        <div>
            <LiveProvider code={component} scope={{ props, styled }} noInline={true}>
                <LivePreview />
                <LiveError />
            </LiveProvider>
            <Knobs
                propControls={componentSpec.props}
                props={props}
                setProps={setProps} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

