import React, {useState} from "react";

import axios from "axios";

// Customer component to handle the ticketing system
function Customer () {

    // State hook to store form values 
    const [events, setEvents] = useState([]);
    const [customerName, setcustomerName] = useState("");
    const [systemStarted, setSystemStarted] = useState(false);
    
    // Function to start the system
    const handleStartSystem = async () => {
        if (!customerName) {
          alert("Please Enter the Customer Name");
          return;
        }

        try {
            const response = await axios.get ('http://localhost:8080/api/load');
            setEvents(response.data);
            setSystemStarted(true);
        }catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Function to stop the system
    const handleStopSystem = async () => {
        try{
            await axios.post('http://localhost:8080/api/stop');
            setSystemStarted(false);
            setEvents([]);
            alert("System Stopped");
        }catch (error) {
            console.error('Error starting system:', error);
        }

    };

    // Function to reserve a ticket for a given event
    const handleReserve = async (eventName) => {    
  
      try {
          const response = await axios.post('http://localhost:8080/api/retrieve', {
              customerName,
              eventName
          });
          
          if (response.status === 200) {
              // Refresh the events list to get updated ticket counts
              // const eventsResponse = await axios.get('http://localhost:8080/api/load');
              // setEvents(eventsResponse.data);

              const updatedEventsResponse = await axios.get('http://localhost:8080/api/load');
              setEvents(updatedEventsResponse.data);

              alert(`Reservation made for event ${eventName}. Remaining tickets: ${response.data.remainingTickets}`);
          }
      } catch (error) {
          console.error("Error reserving ticket:", error);
          alert(error.response?.data?.message || "Failed to reserve ticket");
      }
  };



    
    return (
        <div className="customer-container">

          <h2 style={{ color: "#333", marginBottom: "20px" }}>Customer Page</h2>
    
          <input 
            style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                marginBottom: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
            }}

            className="customer-input"
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
          />
    
          <button
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                marginRight: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: systemStarted ? "#ccc" : "#4CAF50",
                color: "#fff",
            }}


            className="customer-button"
            onClick={handleStartSystem}
            disabled={systemStarted}
          >
            Start System
          </button>
    
          <button
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                marginRight: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: systemStarted ? "#ccc" : "#4CAF50",
                color: "#fff",
            }}

            className="customer-button"
            onClick={handleStopSystem}
            disabled={!systemStarted}
          >
            Stop System
          </button>
    
          <h3 style={{ color: "#333", marginTop: "20px" }}>Available Events</h3>
    
          <div style={{ marginTop: "10px" }} className="event-list">

            {events.map((event) => (

              <div key={event.eventName} 
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "4px",
                marginBottom: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              >

                <h4 style={{ color: "#333", marginBottom: "5px" }} >{event.eventName}</h4>

                <p style={{ color: "#666" }} >Tickets Available: {event.totalTickets}</p>

                <button 
                style={{
                    padding: "8px 15px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#2196F3",
                    color: "#fff",
                }}
                
                onClick={() => handleReserve(event.eventName)}>

                  Reserve Ticket

                </button>
                
              </div>
            ))}
          </div>

        </div>
      );
}

export default Customer;