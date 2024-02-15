import { InputEntitiesField } from "./InputEntitiesFeild"
import { InputEntityField } from "./InputEntityFeild"
import { InputTextField } from "./InputTextField"

export function InputField({fieldName, fieldDef, fieldValue, setResult}) {
    switch(fieldDef.type) {
        case 'entity':
            return <InputEntityField {...{fieldName, fieldDef, fieldValue, setResult}}/>
        case 'entity[]':
            return <InputEntitiesField {...{fieldName, fieldDef, fieldValue, setResult}}/>
        default:
            return <InputTextField {...{fieldName, fieldDef, fieldValue, setResult}}/>
    }
}