import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector(store => store.shelf)

  useEffect(() => {
    fetchShelf()
  }, [])

  const fetchShelf = () => {
    dispatch({
      type: 'FETCH_SHELF'
    })
  } 

  console.log('shelf in component:', shelf);

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
          
        <tbody>
          {!shelf ? '' : shelf.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.description}</td>
                <td><img src={item.image_url} /></td>
              </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}

export default ShelfPage;
