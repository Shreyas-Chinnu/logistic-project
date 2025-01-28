// import React, { useState, useEffect } from 'react';

// const order = () => {
//   const [orders, setOrders] = useState([]);  // State for orders
//   const [newOrder, setNewOrder] = useState({ pickup: '', destination: '', weight: '' });
//   const [error, setError] = useState('');

//   // Fetch orders from backend
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/orders');
//       const data = await response.json();
//       console.log('Fetched Orders:', data); // Debug: See if orders are being fetched
//       setOrders(data);  // Update the state with fetched orders
//     } catch (error) {
//       setError('Error fetching orders.');
//       console.error('Error fetching orders:', error);
//     }
//   };

//   // Place a new order
//   const placeOrder = async () => {
//     if (!newOrder.pickup || !newOrder.destination || !newOrder.weight) {
//       setError('Please fill out all fields.');
//       return;
//     }
//     try {
//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newOrder),
//       });
//       if (response.ok) {
//         console.log('Order placed successfully!');
//         fetchOrders();  // Refetch orders after placing
//         setNewOrder({ pickup: '', destination: '', weight: '' });  // Reset the form
//       } else {
//         setError('Failed to place the order.');
//       }
//     } catch (error) {
//       setError('Failed to connect to the server.');
//       console.error('Error placing order:', error);
//     }
//   };

//   // Delete an order
//   const handleDeleteOrder = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         console.log('Order deleted successfully!');
//         fetchOrders();  // Refresh the orders after deletion
//       } else {
//         setError('Failed to delete order.');
//       }
//     } catch (error) {
//       setError('Failed to connect to the server.');
//       console.error('Error deleting order:', error);
//     }
//   };

//   // Fetch orders when the component mounts
//   useEffect(() => {
//     fetchOrders();
//   }, []);  // Empty dependency array means it will only run on component mount

//   return (
//     <div>
//       <h2>Manage Orders</h2>

//       {/* Create Order Form */}
//       <div>
//         <h3>Place Order</h3>
//         <input
//           type="text"
//           placeholder="Pickup Location"
//           value={newOrder.pickup}
//           onChange={(e) => setNewOrder({ ...newOrder, pickup: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Destination"
//           value={newOrder.destination}
//           onChange={(e) => setNewOrder({ ...newOrder, destination: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Package Weight (kg)"
//           value={newOrder.weight}
//           onChange={(e) => setNewOrder({ ...newOrder, weight: e.target.value })}
//         />
//         <button onClick={placeOrder}>Place Order</button>
//       </div>

//       {/* Order List */}
//       <div>
//         <h3>Order List</h3>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order._id}>
//               <p>Pickup: {order.pickup}</p>
//               <p>Destination: {order.destination}</p>
//               <p>Weight: {order.weight} kg</p>
//               <p>Status: {order.status}</p>
//               <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
//             </div>
//           ))
//         ) : (
//           <p>No orders placed yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default order;


// const placeOrder = async () => {
//   if (!newOrder.pickup || !newOrder.destination || !newOrder.weight) {
//     setError('Please fill out all fields.');
//     return;
//   }
//   try {
//     const response = await fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newOrder),
//     });

//     if (response.ok) {
//       const addedOrder = await response.json(); // Assume the backend returns the newly created order
//       console.log('Order placed successfully!', addedOrder);
      
//       // Update the orders state immediately
//       setOrders((prevOrders) => [...prevOrders, addedOrder]);

//       // Reset the form
//       setNewOrder({ pickup: '', destination: '', weight: '' });
//       setError('');
//     } else {
//       setError('Failed to place the order.');
//     }
//   } catch (error) {
//     setError('Failed to connect to the server.');
//     console.error('Error placing order:', error);
//   }
// };
// import React, { useState, useEffect } from "react";

// type OrderData = {
//   id?: string; // ID is optional for new orders (backend generates it)
//   pickup: string;
//   destination: string;
//   weight: number;
//   status: string;
// };

// const Orders = () => {
//   const [orders, setOrders] = useState<OrderData[]>([]);

//   // Fetch orders from backend on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/orders");
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched Orders:", data);
//           setOrders(data);
//         } else {
//           console.error("Failed to fetch orders");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Submit new order
//   const handleOrderSubmit = async (orderData: OrderData) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         const newOrder = await response.json(); // Get created order
//         console.log("New Order Created:", newOrder);

//         // Update orders state
//         setOrders((prevOrders) => [...prevOrders, newOrder]);
//       } else {
//         console.error("Failed to create order");
//       }
//     } catch (error) {
//       console.error("Error submitting order:", error);
//     }
//   };

//   // Delete order
//   const handleDelete = async (orderId: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Order deleted successfully!");
//         setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//       } else {
//         console.error("Failed to delete order");
//       }
//     } catch (error) {
//       console.error("Error deleting order:", error);
//     }
//   };

//   // Placeholder for edit functionality
//   const handleEdit = (order: OrderData) => {
//     console.log("Edit Order:", order);
//     // Add edit functionality as needed
//   };
// }



// import React, { useState, useEffect } from "react";

// type OrderData = {
//   id?: string; // Optional for new orders
//   pickup: string;
//   destination: string;
//   weight: number;
//   status: string;
// };

// const Orders = () => {
//   const [orders, setOrders] = useState<OrderData[]>([]);

//   // Fetch orders from backend on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/orders");
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched Orders:", data);
//           setOrders(data);
//         } else {
//           console.error("Failed to fetch orders");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Submit a new order
//   const handleOrderSubmit = async (orderData: OrderData) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         const newOrder = await response.json(); // New order created by backend
//         console.log("New Order Created:", newOrder);

//         // Update orders state to include the new order
//         setOrders((prevOrders) => [...prevOrders, newOrder]);
//       } else {
//         console.error("Failed to create order");
//       }
//     } catch (error) {
//       console.error("Error submitting order:", error);
//     }
//   };

//   // Delete an order
//   const handleDelete = async (orderId: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         console.log("Order deleted successfully!");
//         setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//       } else {
//         console.error("Failed to delete order");
//       }
//     } catch (error) {
//       console.error("Error deleting order:", error);
//     }
//   };
// }
// export default Orders;



import React, { useState, useEffect } from "react";

interface OrderData {
  id: number;
  pickup: string;
  destination: string;
  weight: number;
  status: string;
}

const ManageOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]); // State to manage orders

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders"); // Update with your backend API endpoint
      const data = await response.json();
      setOrders(data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch orders when the component loads
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order submission
  const handleOrderSubmit = async (orderData: Omit<OrderData, "id">) => {
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        fetchOrders(); // Refresh the order list after adding a new order
      } else {
        console.error("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchOrders(); // Refresh the order list after deleting an order
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
}
export default ManageOrders;