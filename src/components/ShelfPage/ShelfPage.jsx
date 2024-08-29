import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ShelfForm from "../ShelfForm/ShelfForm";
import DeleteItemButton from "../DeleteItemButton/DeleteItemButton.jsx";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((store) => store.shelf);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    dispatch({
      type: "FETCH_SHELF",
    });
  };

  console.log("shelf in component:", shelf);

  return (
    <div>
      {user.id && <ShelfForm />}
      <div className="container">
        <h2>Shelf</h2>
        <p>All of the available items can be seen here.</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!shelf
              ? ""
              : shelf.map((item) => {
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

export default ShelfPage;
