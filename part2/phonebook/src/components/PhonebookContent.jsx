const PhonebookEntry = ({ personName, number, onDeleteClick }) => (
    <div>
        <p>{personName} {`(${number})`}</p>
        <button onClick={onDeleteClick}>delete</button>
    </div>
)

const PhonebookContent = ({ persons, newNameFilter, onDelete }) => (
    <>
        {persons.filter(person => person.name.toLowerCase().includes(newNameFilter.toLowerCase()))
            .map(person => (
                <PhonebookEntry
                    key={person.id}
                    personName={person.name}
                    number={person.number}
                    onDeleteClick={() => onDelete(person.name, person.id)}
                />
            ))}
    </>
)

export default PhonebookContent