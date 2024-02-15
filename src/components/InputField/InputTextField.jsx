import { useEffect, useRef } from "react"

export function InputTextField({fieldName, fieldValue='', setResult}) {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = fieldValue
    }, [fieldValue])

    const onChange = event => {
        setResult((prev) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }
    return (
        <div>
            <label htmlFor={fieldName}>{fieldName}</label>
            <input ref={inputRef} onChange={onChange} type="text" name={fieldName} id={fieldName} />
        </div>
    )
}
