const Filter = ({ text, onTextChange }) => {
    return (
        <div>
            filter shown with{" "}
            <input
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
            />
        </div>
    );
};

export default Filter;
