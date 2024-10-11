import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateQuote from '../QuoteRequest/CreateQuote';
import { thunkGetAllServices } from '../../redux/service';

import "./service.css";

const Services = () => {
  const dispatch = useDispatch();

  const allServices = useSelector((state) => Object.values(state?.serviceReducer?.allServices || []));
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    dispatch(thunkGetAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (allServices.length > 0 && !selectedServiceId) {
      setSelectedServiceId(allServices[0].id);
    }
  }, [allServices, selectedServiceId]);

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  const selectedService = allServices.find(service => service.id === selectedServiceId);

  if (!allServices || allServices.length === 0) {
    return <p>No services available at the moment.</p>;
  }

  return (
    <div className="services-page">
      <aside className="service-sidebar">
        <h2>Services</h2>
        <ul>
          {allServices.map((service) => (
            <li key={service.id} onClick={() => handleServiceClick(service.id)} className={selectedServiceId === service.id ? 'active' : ''}>
              {service.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="service-details-container">
        {selectedService && (
          <div className="service-details">
            {selectedService.image_url && (
              <img src={selectedService.image_url} alt={selectedService.name} className="service-image" />
            )}
            <div className="service-info">
              <h1>{selectedService.name}</h1>
              <p>Price: To Be Determined</p>
              <p>Description: {selectedService.description}</p>
              <p>Estimated Duration: {selectedService.estimated_duration}</p>
              <button className="quote-button"> <OpenModalButton
                buttonText={"Request A Quote"}
                modalComponent={<CreateQuote serviceId={selectedService.id}/>}
            /></button>
            </div>
            {/* <OpenModalButton
                buttonText={"Request A Quote"}
                className="view-details-button"
                modalComponent={<CreateQuote/>}
            /> */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;