"use client";

import { useState } from "react";
interface Order {
  id: number;
  pickup: string;
  destination: string;
  weight: number;
  status: string;
}

export default function LogisticsApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activePage, setActivePage] = useState("home"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState<{ id: number; pickup: string; destination: string; weight: number; status: string }[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<{ trackingNumber: string; latitude: number; longitude: number } | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [trackingID, setTrackingID] = useState(""); // ID for tracking input
  const [trackingOrder, setTrackingOrder] = useState<number | null>(null); // Order being tracked
  const [error, setError] = useState<string | null>(null); // Error message for tracking


      function handleDelete(orderId: number): void {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        }

  interface OrderData {
    pickup: string;
    destination: string;
    weight: number;
    status: string;
  }

  const handleOrderSubmit = async (orderData: OrderData): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error placing order:', error.message);
      } else {
        console.error('Error placing order:', error);
      }
    }
  };
  
  const renderPageContent = () => {
    switch (activePage) {
  case "home":
  return (
    <div className="p-6">
      <div className="relative w-full h-[100vh] bg-cover bg-center" style={{ backgroundImage: "url('/Images/BG.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">
            Welcome to TRL Logistics
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-4 text-center mb-6">
            Trust, Reliability, and Excellence Delivered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 transition" onClick={() => setActivePage("contact")}>
              Get a Quote
            </button>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 transition" onClick={() => setActivePage("TRACK")}>
              Track Consignment
            </button>
            <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 transition" onClick={() => setActivePage("PickupRequest")}>
              Pickup Request
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 bg-white py-12 px-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          About TRL Logistics
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          At TRL Logistics, we are committed to providing world-class logistics
          solutions. With a track record of delivering excellence, we cater to
          businesses and individuals with reliable and timely services. Our
          expertise spans across domestic and international logistics, making
          us a trusted name in the industry.
        </p>
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Parcel Delivery",
              description: "Reliable and efficient parcel delivery services to your doorstep.",
              icon: "/Images/parcel.jpg",
            },
            {
              title: "Freight Services",
              description: "Seamless freight solutions for businesses of all sizes.",
              icon: "/Images/Frieght Services.jpg",
            },
            {
              title: "Warehousing",
              description: "Secure and modern storage facilities for your goods.",
              icon: "/Images/Warehouse.jpg",
            },
          ].map((service, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              /* eslint-disable @next/next/no-img-element */
              <img
                src={service.icon}
                alt={service.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 bg-blue-50 py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "John Doe",
              feedback:
                "TRL Logistics provided exceptional service and ensured my parcels were delivered on time. Highly recommended!",
            },
            {
              name: "Jane Smith",
              feedback:
                "The team at TRL Logistics went above and beyond to ensure our freight was handled professionally. Amazing experience!",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <h3 className="mt-4 font-bold text-blue-600">- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ label: "Shipments Delivered", count: 1200 }, { label: "Happy Clients", count: 300 }, { label: "Countries Served", count: 5 }].map((stat, index) => (
          <div key={index} className="text-center bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-4xl font-bold text-blue-600">
              {stat.count.toLocaleString()}
            </h2>
            <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 bg-gray-100 py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Have questions? Need assistance? Contact our team today.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600" onClick={() => setActivePage("contact")}> Contact Us </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onClick={() => setActivePage("services")}> View Our Services </button>
        </div>
      </div>
    </div>
    </div>
  );
        case "about":
  return (
    <div className="p-6">
      <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/Images/About-us.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white text-center">
            About TRL Logistics
          </h1>
          <p className="text-xl text-gray-200 mt-4 text-center">
            Trust, Reliability, and Excellence in Logistics.
          </p>
        </div>
      </div>
      <div className="mt-10 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          Our Journey
        </h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          At TRL Logistics, we are driven by a passion for innovation and a commitment to customer satisfaction. Here's how we grew over the years.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { year: 2010, description: "Founded to simplify global logistics." },
            { year: 2015, description: "Expanded to serve 30+ countries." },
            { year: 2020, description: "Achieved 50,000 successful shipments." },
          ].map((event, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
              <div className="bg-blue-600 w-16 h-16 flex items-center justify-center text-white font-bold text-2xl rounded-full mx-auto">
                {event.year}
              </div>
              <p className="text-lg text-center mt-4">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 bg-gray-50 py-12 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          Our Vision & Mission
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Vision
            </h3>
            <p className="text-lg text-gray-700 mt-4">
              To be the global leader in logistics solutions, providing unmatched trust and reliability to businesses and individuals worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Mission
            </h3>
            <p className="text-lg text-gray-700 mt-4">
              To ensure timely and secure delivery of goods through innovation, technology, and customer-focused service.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 py-12 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">Why Choose TRL Logistics?</h2>
        <p className="text-lg mt-4">
          With over a decade of experience, TRL Logistics combines expertise, cutting-edge technology, and a customer-first approach to redefine logistics.
        </p>
      </div>
    </div>
  );
      case "services":
  return (
    <div className="p-6">
      <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/Images/Our Services.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white text-center">
            Our Services
          </h1>
          <p className="text-xl text-gray-200 mt-4 text-center">
            Delivering Excellence, Every Step of the Way.
          </p>
        </div>
      </div>
      <div className="mt-12 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-blue-600 text-center">
          Comprehensive Logistics Solutions
        </h2>
        <p className="text-lg text-gray-700 mt-4 text-center">
          Explore our range of services tailored to meet your logistics and supply chain needs.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Freight Transportation",
              description:
                "Efficient and reliable freight solutions to keep your business moving.",
              icon: "🚚",
            },
            {
              title: "Warehousing Solutions",
              description:
                "Secure, scalable, and flexible storage for all types of goods.",
              icon: "📦",
            },
            {
              title: "Customs Brokerage",
              description:
                "Simplifying customs clearance to ensure smooth global operations.",
              icon: "🛃",
            },
            {
              title: "Supply Chain Solutions",
              description:
                "Streamlined, end-to-end supply chain management tailored for your success.",
              icon: "🔗",
            },
            {
              title: "Last Mile Delivery",
              description:
                "Reliable last-mile delivery for seamless customer experiences.",
              icon: "📍",
            },
            {
              title: "E-commerce Logistics",
              description:
                "Custom solutions for e-commerce businesses to reach their customers quickly.",
              icon: "🛒",
            },
          ].map((service, index) => (
            <div key={index} className="p-6 border rounded-lg shadow hover:shadow-lg transition bg-gray-50">
              <div className="text-5xl text-blue-600 text-center">{service.icon}</div>
              <h2 className="mt-4 text-xl font-bold text-gray-800 text-center">
                {service.title}
              </h2>
              <p className="mt-2 text-gray-700 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 bg-blue-600 py-12 text-white text-center">
        <h2 className="text-4xl font-bold">
          Need Reliable Logistics Support?
        </h2>
        <p className="text-lg mt-4">
          Partner with TRL Logistics for solutions that drive your success.
        </p>
        <button onClick={() => setIsOrderFormOpen(true)} className="mt-6 bg-green-500 px-6 py-3 rounded text-lg font-semibold">
          Place an Order
        </button>
      </div>
      {isOrderFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Place an Order</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const orderData: OrderData = {
                pickup: form.pickup.value,
                destination: form.destination.value,
                weight: parseFloat(form.weight.value),
                status: "Pending",
              };
              handleOrderSubmit(orderData);
            }}>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Pickup Location
                </label>
                <input type="text" name="pickup" placeholder="Enter pickup location" required className="border p-2 rounded w-full mb-4"/>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Destination
                </label>
                <input type="text" name="destination" placeholder="Enter destination" required className="border p-2 rounded w-full mb-4"/>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Package Weight (kg)
                </label>
                <input type="number" name="weight" placeholder="Enter weight" required className="border p-2 rounded w-full mb-4"/>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsOrderFormOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-16 px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-blue-600">Order History</h2>
        {orders.length > 0 ? (
          <table className="w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Order ID</th>
                <th className="border p-3 text-left">Pickup</th>
                <th className="border p-3 text-left">Destination</th>
                <th className="border p-3 text-left">Weight (kg)</th>
                <th className="border p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-gray-700">
                  <td className="border p-3">{order.id}</td>
                  <td className="border p-3">{order.pickup}</td>
                  <td className="border p-3">{order.destination}</td>
                  <td className="border p-3">{order.weight} kg</td>
                  <td className="border p-3">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-gray-600">No orders placed yet.</p>
        )}
      </div>
    </div>
  );
  case "contact":
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 animate-fadeIn">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-xl animate-slideUp">
          We're here to assist you. Please fill out the form below, and our team will get back to you as soon as possible.
        </p>
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6 animate-fadeIn delay-500" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium mb-2 text-gray-800">
              Your Name
            </label>
            <input type="text" id="name" placeholder="Enter your name" required className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium mb-2 text-gray-800">
              Your Email
            </label>
            <input type="email" id="email" placeholder="Enter your email" required className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg font-medium mb-2 text-gray-800">
              Your Message
            </label>
            <textarea id="message" placeholder="Write your message" rows={5} required className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:-translate-y-1 hover:scale-105 animate-bounce-on-hover">
            Submit
          </button>
        </form>
      </div>
    );  
  case "orders":
        function handleEdit(order: { id: number; pickup: string; destination: string; weight: number; status: string; }): void {
          setCurrentOrder(order);
          setIsOrderFormOpen(true);
        }
    return (
    //   <div className="p-6">
    //   <h1 className="text-4xl font-bold text-blue-600 animate-fadeIn">Manage Orders</h1>
    //   <form
    //     className="mt-6 space-y-4 animate-slideUp delay-300"
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       const form = e.target as HTMLFormElement;
    //       const orderData: OrderData = {
    //         pickup: form.pickup.value,
    //         destination: form.destination.value,
    //         weight: parseFloat(form.weight.value),
    //         status: "Pending",
    //       };
    //       handleOrderSubmit(orderData);
    //       form.reset(); // Clear form after submission
    //     }}
    //   >
    //     <div>
    //       <label className="block text-lg font-medium">Pickup Location:</label>
    //       <input
    //         type="text"
    //         name="pickup"
    //         placeholder="Enter pickup location"
    //         required
    //         className="border p-2 rounded w-full"
    //       />
    //     </div>
    //     <div>
    //       <label className="block text-lg font-medium">Destination:</label>
    //       <input
    //         type="text"
    //         name="destination"
    //         placeholder="Enter destination"
    //         required
    //         className="border p-2 rounded w-full"
    //       />
    //     </div>
    //     <div>
    //       <label className="block text-lg font-medium">Package Weight (kg):</label>
    //       <input
    //         type="number"
    //         name="weight"
    //         placeholder="Enter weight"
    //         required
    //         className="border p-2 rounded w-full"
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="bg-green-500 text-white px-4 py-2 rounded transform transition-transform hover:scale-105 hover:-translate-y-1"
    //     >
    //       Place Order
    //     </button>
    //   </form>
    //   <div className="mt-10 animate-fadeIn delay-500">
    //     <h2 className="text-2xl font-bold">Order List</h2>
    //     {orders.length > 0 ? (
    //       <table className="w-full mt-4 border-collapse border border-gray-300 animate-slideUp">
    //         <thead>
    //           <tr className="bg-gray-100">
    //             <th className="border p-2">Order ID</th>
    //             <th className="border p-2">Pickup</th>
    //             <th className="border p-2">Destination</th>
    //             <th className="border p-2">Weight</th>
    //             <th className="border p-2">Status</th>
    //             <th className="border p-2">Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {orders.map((order) => (
    //             <tr key={order.id} className="text-center">
    //               <td className="border p-2">{order.id}</td>
    //               <td className="border p-2">{order.pickup}</td>
    //               <td className="border p-2">{order.destination}</td>
    //               <td className="border p-2">{order.weight} kg</td>
    //               <td className="border p-2">{order.status}</td>
    //               <td className="border p-2 space-x-2">
    //                 <button
    //                   onClick={() => handleEdit(order)}
    //                   className="bg-yellow-500 text-white px-4 py-2 rounded"
    //                 >
    //                   Edit
    //                 </button>
    //                 <button
    //                   onClick={() => handleDelete(order.id!)}
    //                   className="bg-red-500 text-white px-4 py-2 rounded"
    //                 >
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <p className="mt-4 text-gray-600">No orders placed yet.</p>
    //     )}
    //   </div>
    // </div>
    <div className="p-6">
    <h1 className="text-4xl font-bold text-blue-600 animate-fadeIn">
      Manage Orders
    </h1>
    <form
      className="mt-6 space-y-4 animate-slideUp delay-300"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const orderData = {
          pickup: form.pickup.value,
          destination: form.destination.value,
          weight: parseFloat(form.weight.value),
          status: "Pending",
        };
        handleOrderSubmit(orderData);
        form.reset(); // Reset the form after submission
      }}
    >
      <div>
        <label className="block text-lg font-medium">Pickup Location:</label>
        <input
          type="text"
          name="pickup"
          placeholder="Enter pickup location"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Destination:</label>
        <input
          type="text"
          name="destination"
          placeholder="Enter destination"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">
          Package Weight (kg):
        </label>
        <input
          type="number"
          name="weight"
          placeholder="Enter weight"
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded transform transition-transform hover:scale-105 hover:-translate-y-1"
      >
        Place Order
      </button>
    </form>

    <div className="mt-10 animate-fadeIn delay-500">
      <h2 className="text-2xl font-bold">Order List</h2>
      {orders.length > 0 ? (
        <table className="w-full mt-4 border-collapse border border-gray-300 animate-slideUp">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Pickup</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Weight</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.pickup}</td>
                <td className="border p-2">{order.destination}</td>
                <td className="border p-2">{order.weight} kg</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-gray-600">No orders placed yet.</p>
      )}
    </div>
  </div>
    );  
        case "PickupRequest":
          return (
            <div className="container">
              <header className="header">
                <h1>TRL - Trust, Reliable, Logistics</h1>
              </header>
              <div className="notice">
                <h2>Important Notice: Advance Payment Alert</h2>
                <p>
                  We have been made aware of fraudulent activities where individuals are
                  demanding advance payments in the name of TRL Logistics.
                </p>
                <p className="alert">
                  <strong>Please be informed:</strong> Our authorized executives will
                  <strong> never request advance payments.</strong> Payments are only
                  required <strong>after consignment booking.</strong>
                </p>
                <p>
                  For any concerns or clarifications, please reach out to our official
                  contact channels.
                </p>
              </div>
              <form className="form" onSubmit={(e) => { e.preventDefault(); // Prevent page refresh
                  const newOrder = {
                    id: Date.now(), // Generate unique ID as a number
                    gst: (e.target as HTMLFormElement).gst.value || "N/A",
                    contactName: (e.target as HTMLFormElement).contactName.value,
                    email: (e.target as HTMLFormElement).email.value,
                    phone: (e.target as HTMLFormElement).phone.value,
                    pickup: `${(e.target as HTMLFormElement).address.value}, ${(e.target as HTMLFormElement).city.value} (${(e.target as HTMLFormElement).origin.value})`,
                    destination: "To Be Assigned", // Destination unknown at pickup request
                    weight: (e.target as HTMLFormElement).weight.value,
                    description: (e.target as HTMLFormElement).description.value,
                    status: "Pending", // Default status for new requests
                  };
                  setOrders((prevOrders) => [...prevOrders, newOrder]); // Add new order
                  setActivePage("orders"); // Redirect to orders page
                }}
              >
                <h2>Pickup Request Form</h2>
                <label htmlFor="gst">GST Number (optional)</label>
                <input type="text" id="gst" name="gst" placeholder="Enter GST Number" />
                <label htmlFor="contactName">Contact Person Name</label>
                <input type="text" id="contactName" name="contactName" placeholder="Enter Contact Person Name" required/>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter Email Address" required/>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" required/>
                <label htmlFor="origin">Origin Pincode</label>
                <input type="text" id="origin" name="origin" placeholder="Enter Origin Pincode" required/>
                <label htmlFor="address">Pickup Street Address</label>
                <textarea id="address" name="address" placeholder="Enter Pickup Street Address" required></textarea>
                <label htmlFor="city">Pickup City Name</label>
                <input type="text" id="city" name="city" placeholder="Enter Pickup City Name" required/>
                <label htmlFor="weight">Approx Weight (kg)</label>
                <input type="number" id="weight" name="weight" placeholder="Enter Approx Weight" required/>
                <label htmlFor="description">Parcel Description</label>
                <textarea id="description" name="description" placeholder="Enter Parcel Description" required></textarea>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
                  Submit Request
                </button>
              </form>
            </div>
          );
          case "TRACK":
            return (
              <div className="p-6">
                <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                  Track Your Consignment
                </h1>
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const order = orders.find((o: Order) => o.id === Number(trackingID));
                      if (order) {
                        setTrackingOrder(order.id);
                        setError(null);
                      } else {
                        setTrackingOrder(null);
                        setError("Order not found. Please check the Order ID.");
                      }
                    }}
                    className="space-y-4"
                  >
                    <label className="block text-lg font-medium text-gray-700">
                      Enter Order ID:
                    </label>
                    <input type="text" placeholder="Enter your Order ID" value={trackingID} onChange={(e) => setTrackingID(e.target.value)} required className="border p-2 rounded w-full"/>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600">
                      Track Consignment
                    </button>
                  </form>

                  {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

                  {trackingOrder && (
                    <div className="mt-8 bg-gray-100 p-6 rounded shadow">
                      <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        Order Details
                      </h2>
                      <p className="text-gray-700">
                        <strong>Order ID:</strong> {trackingID}
                      </p>
                      <p className="text-gray-700">
                        <strong>Pickup Location:</strong> {orders.find(order => order.id === trackingOrder)?.pickup}
                      </p>
                      <p className="text-gray-700">
                        <strong>Destination:</strong> {orders.find(order => order.id === trackingOrder)?.destination}
                      </p>
                      <p className="text-gray-700">
                        <strong>Weight:</strong> {orders.find(order => order.id === trackingOrder)?.weight} kg
                      </p>
                      <p className="text-gray-700">
                        <strong>Status:</strong> {orders.find(order => order.id === trackingOrder)?.status}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
      default:
        return <p>Page not found</p>;
    }
  };
  return (
    <div className="h-screen">
      {trackingInfo && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Live Tracking</h2>
          <p>
            Tracking Number: <strong>{trackingInfo.trackingNumber}</strong>
          </p>
          <p>
            Current Location: Latitude {trackingInfo.latitude.toFixed(4)}, Longitude{" "}
            {trackingInfo.longitude.toFixed(4)}
          </p>
          <button onClick={() => setTrackingInfo(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    )}
    {!isLoggedIn ? (
      <div className="flex justify-center items-center h-full">
        {activePage === "login" ? ( 
          <div className="border p-6 rounded shadow-lg">
            <center>
              <h2 className="text-2xl font-bold mb-4">Login</h2>
            </center>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (username && password) {
                  setIsLoggedIn(true);
                } else {
                  alert("Please enter valid credentials!");
                }
              }}
            >
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded w-full mb-4"/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded w-full mb-4"/>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Login
              </button>
            </form>
            <br />
            <button onClick={() => setActivePage("sign-up")} className="bg-green-500 text-black px-4 py-2 rounded w-full">
              Sign-Up
            </button>
          </div>
          
        ) : (
          <div className="border p-6 rounded shadow-lg">
            <center>
              <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
            </center>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newUsername && newPassword && newPassword === confirmPassword) {
                  alert("Sign-up successful! Please log in.");
                  setActivePage("login");
                } else if (newPassword !== confirmPassword) {
                  alert("Passwords do not match!");
                } else {
                  alert("Please fill all fields!");
                }
              }}
            >
              <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="border p-2 rounded w-full mb-4"/>
              <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border p-2 rounded w-full mb-4"/>
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border p-2 rounded w-full mb-4"/>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
                Sign-Up
              </button>
            </form>
            <br />
            <button onClick={() => setActivePage("login")} className="bg-gray-500 text-white px-4 py-2 rounded w-full">
              Back to Login
            </button>
          </div>
        )}
      </div>
) : (     
        <div className="flex h-full">
          {isSidebarOpen && (
            <nav className="bg-gray-800 text-white p-4 transition-transform duration-300" style={{ width: "240px" }}>
              <button onClick={() => setIsSidebarOpen(false)} className="bg-red-500 text-white px-2 py-1 mb-4 rounded">
              /* eslint-disable @next/next/no-img-element */
               <img src="/Images/MenuIcon.jpeg" alt="menu bar" height={10} width={30}></img>
              </button>
              <h2 className="text-lg font-bold mb-4">TRL Logistics</h2>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setActivePage("home")} className={`hover:underline ${ activePage === "home" ? "font-bold" : ""}`}>
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage("about")} className={`hover:underline ${activePage === "about" ? "font-bold" : ""}`}>
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage("services")}className={`hover:underline ${activePage === "services" ? "font-bold" : ""}`}>
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage("contact")}className={`hover:underline ${activePage === "contact" ? "font-bold" : ""}`}>
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage("orders")}className={`hover:underline ${activePage === "orders" ? "font-bold" : ""}`}>
                    Orders 
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePage("PickupRequest")}className={`hover:underline ${activePage === "PickupRequest" ? "font-bold" : ""}`}>
                    Pickup Request 
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsLoggedIn(false)} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          )}
          <div className={`flex-1 p-6 transition-all duration-300 ${ isSidebarOpen ? "ml-[240px]" : "ml-0"}`}>
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="bg-blue-500 text-white px-2 py-1 rounded">
              /* eslint-disable @next/next/no-img-element */
              <img src="/Images/MenuIcon.jpeg" alt="menu bar" height={10} width={30}></img>
              </button>
            )}
            {renderPageContent()}
              <footer className="bg-gray-800 text-gray-200 p-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-white">TRL Logistics</h2>
                  <p className="mt-2 text-sm">
                    Trust Reliable Logistics - delivering excellence in freight transportation, warehousing, and supply chain solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <ul className="mt-2 space-y-2">
                    <li><a href="/home" className="hover:underline">Home</a></li>
                    <li><a href="/services" className="hover:underline">Services</a></li>
                    <li><a href="/about" className="hover:underline">About Us</a></li>
                    <button onClick={() => setActivePage("contact")}className={`hover:underline ${activePage === "contact" ? "font-bold" : ""}`}> Contact Us </button>
                  </ul>
                </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                    <ul className="mt-2 space-y-2">
                      <li><span className="font-bold">Phone:</span> +91 12345 67890</li>
                      <li><span className="font-bold">Email:</span> support@trllogistics.com</li>
                      <li><span className="font-bold">Address:</span> Bengaluru, India</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
                  &copy; {new Date().getFullYear()} TRL Logistics. All Rights Reserved. Designed with passion by Shreyas M.
                </div>
              </footer>
                        </div>
                      </div>
                    )}
                  </div>
                );
};
function setCurrentOrder(order: { id: number; pickup: string; destination: string; weight: number; status: string; }) {
  // Assuming setCurrentOrder is used to set the current order for editing
  setOrders((prevOrders) =>
    prevOrders.map((o) => (o.id === order.id ? order : o))
  );
}
const setOrders = (updateFunction: (prevOrders: Order[]) => Order[]) => {
  setOrders((prevOrders) => updateFunction(prevOrders));
};

