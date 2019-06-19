export default ({ hello, pets = [] }) => <div>Hello {hello}, {pets.join()}</div>
