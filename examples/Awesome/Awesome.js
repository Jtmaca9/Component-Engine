const Header = styled.div`
    color: red;
`;

const Awesome = () => {
    const [click, setClick] = useState(0);
    return (
        <Header onClick={() => setClick(click + 1)}>
            {props.hello}
            {click}
        </Header>
    );
}
