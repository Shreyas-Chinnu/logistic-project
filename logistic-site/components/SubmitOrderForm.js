import React, { useState, useEffect } from 'react';

// const SubmitOrderForm = () => {
//   const [orders, setOrders] = useState([]);
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   const [weight, setWeight] = useState('');
//   const [error, setError] = useState('');

//   // Fetch all orders
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/orders');
//       const data = await response.json();
//       console.log('Fetched Orders:', data); // Add this for debugging
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };
  

//   // Create a new order
//   const handleCreateOrder = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ pickup, destination, weight }),
//       });
//       if (response.ok) {
//         fetchOrders();
//         setPickup('');
//         setDestination('');
//         setWeight('');
//       } else {
//         setError('Failed to create order.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server.');
//     }
//   };

//   // Delete an order
//   const handleDeleteOrder = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         fetchOrders();
//       } else {
//         setError('Failed to delete order.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server.');
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <form onSubmit={handleCreateOrder}>
//         <input type="text" placeholder="Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} required/>
//         <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required/>
//         <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
//         <button type="submit">Create Order</button>
//       </form>
//       <div>
//         {orders.map((order) => (
//           <div key={order._id}>
//             <p>{order.pickup}</p>
//             <p>{order.destination}</p>
//             <p>{order.weight} kg</p>
//             <p>{order.status}</p>
//             <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default SubmitOrderForm;

const SubmitOrderForm = () => {
  const [orders, setOrders] = useState([]);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      console.log('Fetched Orders:', data); // Debug log
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders from the server.');
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickup, destination, weight }),
      });
      if (response.ok) {
        fetchOrders(); // Refresh orders
        setPickup('');
        setDestination('');
        setWeight('');
      } else {
        setError('Failed to create order.');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to connect to the server.');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchOrders(); // Refresh orders
      } else {
        setError('Failed to delete order.');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      setError('Failed to connect to the server.');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateOrder}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Create Order</button>
      </form>
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
              <p>{order.pickup || 'N/A'}</p>
              <p>{order.destination || 'N/A'}</p>
              <p>{order.weight} kg</p>
              <p>{order.status || 'N/A'}</p>
              <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SubmitOrderForm;
