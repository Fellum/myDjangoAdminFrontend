import { useEffect, useState } from "react";
import { SingleSelect } from "./SingleSelect";

export function MultipleSelect({fieldName, options, setResult}) {
    const [currentItem, setCurrentItem] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])
    
    useEffect(() => setCurrentItem(options[0]), [options])
    useEffect(() => {
        setResult(selectedItems.map(item => item.value))
    }, [selectedItems])

    const onItemChange = value => {
        const item = options.find(i => i.value == value);
        setCurrentItem(item);
    }
    const onAddItem = (event) => {
        event.preventDefault()
        setSelectedItems(prev => [...prev, currentItem])
    }
    const onRemoveItemGen = index => (event) => {
        event.preventDefault()
        setSelectedItems(prev => {
            prev.splice(index, 1)
            return [...prev];
        });
    }
    return (
        <div>
            <div>
                <SingleSelect fieldName={fieldName} options={options} setResult={onItemChange}/>
                <button onClick={onAddItem}>Add</button>
            </div>
            <div>
                {selectedItems.map((item, index) => <div key={index}>
                    <p style={{display: 'inline-block'}}>{item.text}</p>
                    <button  onClick={onRemoveItemGen(index)}>Remove</button>
                </div>)}
            </div>
        </div>
    )
}