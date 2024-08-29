import { useDispatch } from "react-redux"

export default function DeleteItemButton({id}){
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch({type: 'DELETE_ITEM', payload: id})
    }
    return(
        <button onClick={handleDelete}>
            Delete Item
        </button>
    )
}