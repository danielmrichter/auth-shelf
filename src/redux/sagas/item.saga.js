import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* deleteItem(action) {
  yield axios.delete(`/api/shelf/${action.payload}`)
  yield put({ type: "FETCH_SHELF" })
  yield put({ type: "FETCH_MY_SHELF" })
}

function* addItem(action) {
  try {
    console.log(action.payload);
    yield axios.post("/api/shelf", action.payload)
    yield put({ type: "FETCH_SHELF" })
    yield put({ type: "FETCH_MY_SHELF" })
  } catch (error) {
    console.log("Error sending item:", error)
  }
}
function* fetchShelf() {
  try {
    const shelfResponse = yield axios.get("/api/shelf");
    yield put({
      type: "SET_SHELF",
      payload: shelfResponse.data,
    });
  } catch (error) {
    console.log("User get shelf failed", error);
  }
}

function* fetchMyShelf(action) {
    try {
      const myShelfResponse = yield axios.get(`/api/shelf/${action.payload}`);
      yield put({
        type: "SET_MYSHELF",
        payload: myShelfResponse.data,
      });
    } catch (error) {
      console.log("User get shelf failed", error);
    }
  }

function* itemSaga() {
  yield takeLatest("DELETE_ITEM", deleteItem);
  yield takeLatest("ADD_ITEM", addItem);
  yield takeLatest("FETCH_SHELF", fetchShelf);
  yield takeLatest("FETCH_MY_SHELF", fetchMyShelf);
}

export default itemSaga;
