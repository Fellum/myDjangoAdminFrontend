import { useEffect, useState } from "react"
import entities from "../entities"
import { SingleSelect } from "./SingleSelect"
import { MultipleSelect } from "./MultipleSelect"

function InputTextField({fieldName, setResult}) {
    const onChange = event => {
        setResult((prev) => ({
            ...prev,
            [fieldName]: event.target.value
        }))
    }
    return (
        <div>
            <label htmlFor={fieldName}>{fieldName}</label>
            <input onChange={onChange} type="text" name={fieldName} id={fieldName} />
        </div>
    )
}

function InputEntityField({fieldName, fieldDef, setResult}) {
    const [entityValues, setEntityValues] = useState([]);

    const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
    useEffect(() => {
        fetch('http://localhost:3000' + foundEntity.baseUrl, {
            method: 'GET',
            cors: 'no-cors',
        }).then(res => res.json())
        .then(res => res.values.map(entrie => ({value: entrie.id, text: entrie[foundEntity.infoView.defaultField]})))
        .then(setEntityValues)
    }, []);
    const onChange = value => {
        setResult((prev) => ({
            ...prev,
            [fieldName + 'Id']: value
        }))
    }
    return <SingleSelect fieldName={fieldName} options={entityValues} setResult={onChange}/>
}

function InputEntitiesField({fieldName, fieldDef, setResult}) {
    const [entityValues, setEntityValues] = useState([]);

    const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
    useEffect(() => {
        fetch('http://localhost:3000' + foundEntity.baseUrl, {
            method: 'GET',
            cors: 'no-cors',
        }).then(res => res.json())
        .then(res => res.values.map(entrie => ({value: entrie.id, text: entrie[foundEntity.infoView.defaultField]})))
        .then(setEntityValues)
    }, []);
    const onChange = values => {
        setResult((prev) => ({
            ...prev,
            [fieldDef.idsName]: values
        }))
    }
    return <MultipleSelect fieldName={fieldName} options={entityValues} setResult={onChange}/>
}

function InputField({fieldName, fieldDef, setResult}) {
    switch(fieldDef.type) {
        case 'entity':
            return <InputEntityField {...{fieldName, fieldDef, setResult}}/>
        case 'entity[]':
            return <InputEntitiesField {...{fieldName, fieldDef, setResult}}/>
        default:
            return <InputTextField {...{fieldName, fieldDef, setResult}}/>
    }
}

export function EntityCreateView({entity}) {
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
        });
    }

    const getEntryField = ([fieldName, fieldDef]) => 
        <InputField fieldName={fieldName} fieldDef={fieldDef} setResult={setEntityToSave}/>

    return (<div>
        <form>
            {Object.entries(entity.fields).filter(([,fieldDef]) => fieldDef.editable).map(getEntryField)}
            <button onClick={onClick}>Create</button>
        </form>
    </div>)
}