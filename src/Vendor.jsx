import React, {useState} from "react";

import axios from "axios";


function Vendor(){
    const [config, setConfig] = useState({
        eventName: '',
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: '',
      });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setConfig((prevConfig) =>({...prevConfig, [name] : value}));
    }


    const validateForm = () => {
        const { eventName, totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity} = config;
    
        // Check if event name is empty
        if (!eventName) {
          alert('Event Name is required');
          return false;
        }
    
        // Check if total tickets is a positive integer
        if (!totalTickets || totalTickets <= 0) {
          alert('Total Tickets must be a positive number greater than zero');
          return false;
        }
    
        // Check if ticket release rate is a positive integer
        if (!ticketReleaseRate || ticketReleaseRate <= 0) {
          alert('Ticket Release Rate must be a positive number greater than zero');
          return false;
        }
    
        // Check if customer retrieval rate is a positive integer
        if (!customerRetrievalRate || customerRetrievalRate <= 0) {
          alert('Customer Retrieval Rate must be a positive number greater than zero');
          return false;
        }

        // Check if maximum ticket capacity is a positive integer
        if (!maxTicketCapacity || maxTicketCapacity <= 0) {
            alert('Maximun Ticket Capacity must be a positive number greater than zero');
            return false;
        }
    
        return true;
    };


    const saveconfiguration = async () => {
        if (!validateForm()) {
            return; 
        }

        try {
            const response = await axios.post ('http://localhost:8080/api/save', config);
            alert(response.data || 'Configuration saved successfully');
        }catch (error) {
            console. error ('Error saving configuration:', error);
            alert('Failed to save configuration');
        }
    }

    return(
        <div>

            <div className="vendor-container">
                <h2 style={{ color: "#333", marginBottom: "20px" }} >Vendor Configuration</h2>

                <input

                    style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}

                    className="vendor-input" 
                    type = "text"
                    name = "eventName"
                    placeholder="Event Name"
                    value={config.eventName}
                    onChange={handleChange} 
                />

                <input

                    style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}

                    className="vendor-input"
                    type="text"
                    name="totalTickets"
                    placeholder="Total Tickets"
                    value={config.totalTickets}
                    onChange={handleChange}
                />

                <input 

                    style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}

                    className="vendor-input"
                    type="text"
                    name="ticketReleaseRate"
                    placeholder="Ticket Release Rate"
                    value={config.ticketReleaseRate}
                    onChange={handleChange}
                />

                <input

                    style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}

                    className="vendor-input"
                    type="text"
                    name="customerRetrievalRate"
                    placeholder="Customer Retrieval Rate"
                    value={config.customerRetrievalRate}
                    onChange={handleChange}
                />

                <input

                    style={{ padding: "10px", fontSize: "16px", width: "100%", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}

                    className="vendor-input"
                    type="text"
                    name="maxTicketCapacity"
                    placeholder="Maximum Ticket Capacity"
                    value={config.maxTicketCapacity}
                    onChange={handleChange}
                />  

                <button 
                
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                
                onClick={saveconfiguration}>
                  Save Configuration  
                </button>

            </div>




        </div>
    );
}

export default Vendor;