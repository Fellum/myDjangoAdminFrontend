import { useState } from "react"
import { InputField } from "./InputField";
import { useNavigate } from "react-router-dom";

export function EntityCreateView({entity}) {
    const navigate = useNavigate()
    const [entityToSave, setEntityToSave] = useState({});

    const onClick = event => {
        event.preventDefault()
        fetch(`http://localhost:3000${entity.baseUrl}`, {
            method: 'POST',
            cors: 'no-cors',
            body: JSON.stringify(entityToSave),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => navigate(entity.baseUrl));
    }

    const getEntryField = ([fieldName, fieldDef]) => 
        <InputField key={fieldName} fieldName={fieldName} fieldDef={fieldDef} setResult={setEntityToSave}/>

    return (<div>
        <form>
            {Object.entries(entity.fields).filter(([,fieldDef]) => fieldDef.editable).map(getEntryField)}
            <button onClick={onClick}>Create</button>
        </form>
    </div>)
}