import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [filterText, setFilterText] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const shouldShowErrorMessage = !!errorMessage;

    const shouldShowSuccessMessage = !!successMessage;

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const addPerson = (e) => {
        e.preventDefault();
        if (persons.filter((person) => person.name.includes(newName)).length) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const personToUpdate = persons.find(
                    (person) => person.name === newName
                );
                const updatedPerson = {
                    ...personToUpdate,
                    number: newPhoneNumber,
                };

                personService
                    .update(updatedPerson.id, updatedPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id === updatedPerson.id
                                    ? returnedPerson
                                    : person
                            )
                        );
                        setSuccessMessage(
                            `Successfully Changed ${newName}'s number`
                        );
                        setTimeout(() => setSuccessMessage(""), 5000);
                        setNewName("");
                        setNewPhoneNumber("");
                    })
                    .catch((error) => {
                        setErrorMessage(
                            `Information of ${newName} has already been removed from server`
                        );
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
            }
            return;
        }
        const personObj = {
            name: newName,
            number: newPhoneNumber,
        };
        personService.create(personObj).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setSuccessMessage(`Successfully Added ${newName}`);
            setTimeout(() => setSuccessMessage(""), 5000);
            setNewName("");
            setNewPhoneNumber("");
        });
    };

    const removePerson = (id) => {
        personService.remove(id).then(() => {
            setPersons(persons.filter((person) => person.id !== id));
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification
                visibility={shouldShowSuccessMessage || shouldShowErrorMessage}
                isSuccessMessage={shouldShowSuccessMessage}
                message={
                    shouldShowSuccessMessage ? successMessage : errorMessage
                }
            />
            <Filter text={filterText} onTextChange={setFilterText} />
            <h2>add a new</h2>
            <PersonForm
                name={newName}
                onNameChange={setNewName}
                number={newPhoneNumber}
                onNumberChange={setNewPhoneNumber}
                onAddPerson={addPerson}
            />
            <h2>Numbers</h2>
            <Persons onRemove={removePerson} persons={filteredPersons} />
        </div>
    );
};

export default App;
