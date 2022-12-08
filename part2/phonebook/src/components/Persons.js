import personsService from "../services/persons";

const Persons = ({persons, setPersons}) => {
    const deletePerson = id => {
        personsService
            .remove(id)
            .then(removedPerson => {
                console.log(removedPerson);
                setPersons(persons.filter(p => p.id !== id))
            })
    }
    return (
        <ul>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => {
                        if (window.confirm(`Delete ${person.name}?`)) {
                            deletePerson(person.id)
                        }
                    }}>delete</button>
                </li>
            )}
        </ul>
    )
}

export default Persons;