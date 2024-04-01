import Person from "./Person";

const Persons = ({ persons, onRemove }) => {
    return (
        <ul style={{ listStyle: "none", padding: 0 }}>
            {persons.map((person) => (
                <Person onRemove={onRemove} key={person.name} person={person} />
            ))}
        </ul>
    );
};

export default Persons;
