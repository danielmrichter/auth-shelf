import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ShelfForm from "../ShelfForm/ShelfForm";
import DeleteItemButton from "../DeleteItemButton/DeleteItemButton.jsx";

function MyShelfPage() {
  const dispatch = useDispatch();
  const myShelf = useSelector((store) => store.myShelf);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchMyShelf();
  }, []);

  const fetchMyShelf = () => {
    dispatch({
      type: "FETCH_MY_SHELF",
    });
  };

  console.log("shelf in component:", myShelf);

  return (
    <div>
      <ShelfForm />
      <div className="container">
        <h2>My Shelf</h2>
        <p>Your Items are shown here!</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {!myShelf
              ? ""
              : myShelf.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>
                        <img src={item.image_url} />
                      </td>
                      <td>
                        {item.user_id === user.id && (
                          <DeleteItemButton id={item.id} />
                        )}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyShelfPage;