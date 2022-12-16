import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsServices from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        personsServices
            .getAll()
            .then(allPersons => setPersons(allPersons))
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        const index = persons.findIndex(person => newName === person.name);
        if (index !== -1) {
            const answer = window.confirm(`${newName} is already added to phonebook, replace the old with a new one?`);
            if (answer) {
                personsServices
                    .update(persons[index].id, {...persons[index], number: newNumber})
                    .then(updatedUser => {
                        setPersons(persons.map((p, i) => i === index ? updatedUser : p));
                        setNewName("");
                        setNewNumber("");
                        setMessage(`Number updated ${updatedUser.name}`);
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000);
                    })
                    .catch(error => {
                        setPersons(persons.filter(p => p.id !== persons[index].id));
                        setNewName("");
                        setNewNumber("");
                        setError(true);
                        setMessage(`Information of ${persons[index].name} has already been removed from server`);
                        setTimeout(() => {
                            setMessage(null);
                            setError(false);
                        }, 5000)
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            personsServices
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewNumber("");
                    setNewName("");
                    setMessage(`Added ${returnedPerson.name}`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000);
                })
                .catch(error => {
                    setError(true);
                    setMessage(error.response.data.error);
                    setTimeout(() => {
                        setMessage(null);
                        setError(false);
                    }, 5000);
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value);
    }
    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error={error} />
            <Filter value={filter} onChange={handleFilter} />

            <h3>Add a new person</h3>
            <PersonForm
                onSubmit={addPerson}
                nameValue={newName}
                nameOnChange={handleNameChange}
                numberValue={newNumber}
                numberOnChange={handlePhoneChange}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow} setPersons={setPersons} />
        </div>
    )
}

export default App