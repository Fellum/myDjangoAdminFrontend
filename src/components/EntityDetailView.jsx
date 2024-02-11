import { useLoaderData } from 'react-router-dom';
import entities from '../entities';

export function EntityDetailView({entity}) {

    const value = useLoaderData();
    const getEntryField = (row, fieldName, fieldDef) => {
        switch (fieldDef.type) {
            case 'entity': {
                const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
                const infoViewDefaultField = foundEntity.infoView.defaultField || 'id';

                return <p key={fieldName}>{fieldName}: <a href={`${foundEntity.baseUrl}/${row[fieldName].id}`}>{row[fieldName][infoViewDefaultField]}</a></p>
            }
            case 'entity[]': {
                const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
                const infoViewDefaultField = foundEntity.infoView.defaultField || 'id';
                return (
                    <p key={fieldName}>
                        {fieldName}: 
                        {row[fieldName].map(item => <a key={item.id} href={`${foundEntity.baseUrl}/${item.id}`}>{item[infoViewDefaultField]},</a>)}
                    </p>
                )
            }
            default:
                return <p key={fieldName}>{fieldName}: {row[fieldName].toString()}</p>
        }
    }

    return (<div>
        {Object.entries(entity.fields).map(([fieldName, fieldDef]) => getEntryField(value, fieldName, fieldDef))}
    </div>)
}