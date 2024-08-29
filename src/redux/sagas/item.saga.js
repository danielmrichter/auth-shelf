import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* deleteItem(action) {
    yield axios.delete(`/api/shelf/${action.payload}`)
    yield put({type:'GET_ITEMS'})
}

function* addItem (action) {
    try {
        console.log(action.payload)
    yield axios.post('/api/shelf', action.payload)
    yield put({type: 'GET_ITEMS'})
    } catch (error){
        console.log('Error sending item:', error)
    }
}

function* itemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem)
    yield takeLatest('ADD_ITEM', addItem)
}

export default itemSaga