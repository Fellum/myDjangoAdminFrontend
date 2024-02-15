import { useEffect, useState } from "react";
import { MultipleSelect } from "../MultipleSelect";

import entities from "../../entities";

export function InputEntitiesField({fieldName, fieldDef, fieldValue=[], setResult}) {
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
    return <MultipleSelect fieldName={fieldName} options={entityValues} selectedValues={fieldValue} setResult={onChange}/>
}
