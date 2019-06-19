const React = require('react');
const ReactDOM = require('react-dom');

document.addEventListener('message', (e) => {
    console.log('sdfsadfasdf', e);
    setData(e.data);
});

const {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} = require('react-live');

const App = () => {
    const [data, setData] = React.useState('<strong>Hello World lol!</strong>');
    React.useEffect(() => {
        const handler = (e) => {
            console.log('sdfsadfasdf', e);
            setData(e.data);
        }
        window.addEventListener('message', handler);
        // clean up
        return () => window.removeEventListener('message', handler);
    }, []);
    return <LiveProvider code={data}>
        <LiveError />
        <LivePreview />
    </LiveProvider>
}

ReactDOM.render(<App />, document.getElementById('root'));

