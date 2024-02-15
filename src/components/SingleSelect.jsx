export function SingleSelect({fieldName, options, value, setResult}) {
    const onChange = event => {
        setResult(event.target.value)
    }
    return (
        <div style={{display: 'inline-block'}}>
            <label htmlFor={fieldName}>{fieldName}</label>
            <select onChange={onChange} name={fieldName} id={fieldName} value={value?.id}>
                {options.map(option => <option key={option.value} value={option.value}>
                    {option.text}
                </option>)}
            </select>
        </div>
    )
}