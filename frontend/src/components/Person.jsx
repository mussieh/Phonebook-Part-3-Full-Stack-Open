import personService from "../services/persons";

const Person = ({ person, onRemove }) => {
    return (
        <>
            <li>
                {person.name} {person.number}{" "}
                <button onClick={() => onRemove(person.id)}>Delete</button>
            </li>
        </>
    );
};

export default Person;
