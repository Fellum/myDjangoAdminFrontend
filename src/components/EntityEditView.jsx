import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom";
import { InputField } from "./InputField";

export function EntityEditView({entity}) {
    const value = useLoaderData();
    const navigate = useNavigate();
    const [entityToSave, setEntityToSave] = useState({});

    const onClick = event => {
        event.preventDefault()
        fetch(`http://localhost:3000${entity.baseUrl}/${value.id}`, {
            method: 'PATCH',
            cors: 'no-cors',
            body: JSON.stringify(entityToSave),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => navigate(entity.baseUrl));
    }

    const getEntryField = ([fieldName, fieldDef]) => 
        <InputField key={fieldName} fieldName={fieldName} fieldDef={fieldDef} fieldValue={value[fieldName]} setResult={setEntityToSave}/>

    return (<div>
        <form>
            {Object.entries(entity.fields).filter(([,fieldDef]) => fieldDef.editable).map(getEntryField)}
            <button onClick={onClick}>Save</button>
        </form>
    </div>)
}