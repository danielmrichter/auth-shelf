import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* deleteItem(action) {
  yield axios.delete(`/api/shelf/${action.payload}`);
  yield put({ type: "GET_ITEMS" });
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



function* addItem(action) {
  try {
    console.log(action.payload);
    // yield axios.post("/api/shelf", action.payload);
    yield put({ type: "GET_ITEMS" });
  } catch (error) {
    console.log("Error sending item:", error);
  }
}



// function* upload(action) {
//   const file = action.payload.file
//   console.log('file is:', file);
//   try {
//       const data = new FormData();
//       data.append('file', file);
//       data.append('description', 'tacoCat')
//       console.log('This is data:', data);
//       // const obj = {
//       //   description: 'tacoCAT',
//       //   data: data
//       // }
//       yield axios.post("/api/upload", data);
//       // yield put({ type: "GET_ITEMS" });
//   } catch (error) {
//       console.log("Error sending file:", error);
//   }
// }



function* itemSaga() {
  yield takeLatest("DELETE_ITEM", deleteItem);
  yield takeLatest("ADD_ITEM", addItem);
  yield takeLatest("FETCH_SHELF", fetchShelf);
  // yield takeLatest("ADD_ITEM", upload);
}

export default itemSaga;
