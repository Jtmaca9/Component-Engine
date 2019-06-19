const React = require('react');
const ReactDOM = require('react-dom');

const {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} = require('react-live');

const App = () => {
    const [data, setData] = React.useState('<strong>Component Engine Ready, start writing JSX</strong>');
    React.useEffect(() => {
        const handler = (e) => {
            setData(e.data);
        }
        window.addEventListener('message', handler);

        return () => window.removeEventListener('message', handler);
    }, []);

    return <LiveProvider code={data}>
        <LiveError />
        <LivePreview />
    </LiveProvider>
}

ReactDOM.render(<App />, document.getElementById('root'));

