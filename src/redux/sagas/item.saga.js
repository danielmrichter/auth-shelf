import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* deleteItem(action) {
    yield axios.delete(`/api/item/${action.payload}`)
    yield put({type:'GET_ITEMS'})
}





function* itemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem)
}

export default itemSaga