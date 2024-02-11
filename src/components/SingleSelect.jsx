export function SingleSelect({fieldName, options, setResult}) {
    const onChange = event => {
        setResult(event.target.value)
    }
    return (
        <div style={{display: 'inline-block'}}>
            <label htmlFor={fieldName}>{fieldName}</label>
            <select onChange={onChange} name={fieldName} id={fieldName}>
                {options.map(option => <option key={option.value} value={option.value}>
                    {option.text}
                </option>)}
            </select>
        </div>
    )
}