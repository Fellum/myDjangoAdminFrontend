import { useLoaderData } from 'react-router-dom';
import entities from '../entities';

function TableRow({row, entity}) {
    const getTableField = (row, fieldName, fieldDef) => {
        switch (fieldDef.type) {
            case 'entity': {
                const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
                const infoViewDefaultField = foundEntity.infoView.defaultField || 'id';

                return <td key={fieldName}><a href={`${foundEntity.baseUrl}/${row[fieldName].id}`}>{row[fieldName][infoViewDefaultField]}</a></td>
            }
            case 'entity[]': {
                const foundEntity = entities.find(entity => entity.name === fieldDef.entity);
                const infoViewDefaultField = foundEntity.infoView.defaultField || 'id';
                return (
                    <td key={fieldName}>
                        {row[fieldName].map(item => <a key={item.id} href={`${foundEntity.baseUrl}/${item.id}`}>{item[infoViewDefaultField]}</a>)}
                    </td>
                )
            }
            default:
                return <td key={fieldName}>{row[fieldName].toString()}</td>
        }
    }
    return (
        <tr>
            {
                Object.entries(entity.fields).map(([fieldName, fieldDef]) => getTableField(row, fieldName, fieldDef))
            }
            <td><a href={`${entity.baseUrl}/${row.id}`}>Details</a></td>
        </tr>
    )
}

export function EntityListView({entity}) {

    const {values: rows} = useLoaderData();
    return (<div>
        <h3>{entity.name} list view</h3>
        <a href={`/${entity.plural.toLowerCase()}/create`}>Create</a>
        <table>
            <thead>
                <tr>
                    {Object.keys(entity.fields).map(fieldName => <th key={fieldName}>{fieldName}</th>)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => <TableRow key={row.id} row={row} entity={entity} />)}
            </tbody>
        </table>
    </div>)
}