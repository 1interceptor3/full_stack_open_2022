const Filter = ({value, onChange}) => {
    return (
        <p>filter shown with <input type="text" value={value} onChange={onChange}/></p>
    )
}

export default Filter;