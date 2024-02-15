import { useEffect, useState } from "react";
import { SingleSelect } from "../SingleSelect";

import entities from "../../entities";


export function InputEntityField({fieldName, fieldDef, fieldValue='', setResult}) {
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
    return <SingleSelect fieldName={fieldName} options={entityValues} value={fieldValue} setResult={onChange}/>
}
