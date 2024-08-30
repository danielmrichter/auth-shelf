import { useState } from "react";
import { useDispatch } from "react-redux";

function ShelfForm () {
    const [image_url, setItemUrl] = useState('');
    const [description, setItemDesc] = useState('');
    const [file, setFile] = useState('')

    const dispatch = useDispatch();

    const addItem = (event) => {
        event.preventDefault();

        dispatch({type: 'ADD_ITEM', payload: { image_url: image_url, description: description, file: file }})

        setItemUrl('');
        setItemDesc('');
    }

return (
    <div>
        <h2>Add An Item To The Shelf</h2>
        <form onSubmit={addItem}>
            <input type="text" name="" placeholder="Item URL" value={image_url} onChange={e => setItemUrl(e.target.value)} />
            <input type="textbox" name="" placeholder="Item Description" value={description} onChange={e => setItemDesc(e.target.value)} />
            <input type="file" name="" onChange={e => setFile(e.target.files[0])} />
            <button type="submit">Add Item</button>
        </form>
    </div>
)
}
export default ShelfForm;