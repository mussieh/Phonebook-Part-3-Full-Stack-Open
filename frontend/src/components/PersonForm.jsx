const PersonForm = ({
    name,
    onNameChange,
    number,
    onNumberChange,
    onAddPerson,
}) => {
    return (
        <form>
            <div>
                name:{" "}
                <input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </div>
            <div>
                number:{" "}
                <input
                    value={number}
                    onChange={(e) => onNumberChange(e.target.value)}
                />
            </div>
            <div>
                <button onClick={onAddPerson} type="submit">
                    add
                </button>
            </div>
        </form>
    );
};

export default PersonForm;
