const React = require('react');
const ReactDOM = require('react-dom');

const {
    LiveProvider,
    LiveError,
    LivePreview,
} = require('react-live');


const App = () => {
    const [component, setComponent] = React.useState('<strong>Component Engine Ready, start writing JSX</strong>');
    const [componentSpec, setComponentSpec] = React.useState({});
    React.useEffect(() => {
        const handler = (e) => {
            const data = e.data;
            const componentData = data.component;
            const componentSpecData = data.componentSpec;
            if (componentData) setComponent(componentData);
            if (componentSpecData) setComponentSpec(componentSpecData);
        }
        window.addEventListener('message', handler);

        return () => window.removeEventListener('message', handler);
    }, []);

    return <Component component={component} componentSpec={componentSpec} />;
}

const Component = ({ component, componentSpec }) => {
    const examples = componentSpec.examples;
    const example0 = examples && examples[0];
    const props = example0 && example0.propObject;
    return <LiveProvider code={component} scope={{ props }}>
        <LivePreview />
        <LiveError />
    </LiveProvider>;
}

ReactDOM.render(<App />, document.getElementById('root'));

