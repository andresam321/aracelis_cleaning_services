import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { thunkGetClientQuotes } from '../../redux/quote_request'
import "./ClientQuotes.css"

const ClientQuotes = () => {

const dispatch = useDispatch()

const clientQuotes = useSelector((state) => Object.values(state.quoteRequestReducer.clientQuotes || [])).flat()

console.log("line11", clientQuotes)



useEffect(() => {
    dispatch(thunkGetClientQuotes());
}, [dispatch]);


  return (
  <div className="quote-item-container">
      <h2>My Quotes</h2>
      <div>
        {clientQuotes.length > 0 ? (
          clientQuotes?.map((quote) => (
            <div key={quote.id} className="quote-item">
              <div className="left-side">
                <p>Apt/Suite: {quote.apt_suite || 'N/A'}</p>
                <p>Bedrooms: {quote.bedrooms}</p>
                <p>Carpeted Rooms: {quote.carpeted_rooms}</p>
                <p>Cleaning Frequency: {quote.cleaning_frequency || 'N/A'}</p>
                <p>Description: {quote.description || 'N/A'}</p>
                <p>Client Name: {quote.first_name} {quote.last_name}</p>
                <p>Full Address: {quote.full_address || 'N/A'}</p>
                <p>Phone: {quote.phone || 'N/A'}</p>
              </div>
              <div className="right-side">
                <p>Full Baths: {quote.full_baths}</p>
                <p>Half Baths: {quote.half_baths}</p>
                <p>Levels: {quote.levels}</p>
                <p>Number of People: {quote.number_of_people}</p>
                <p>Number of Pets: {quote.number_of_pets}</p>
                <p>Pets: {quote.pets ? 'Yes' : 'No'}</p>
                <p>Quoted Price: ${quote.quoted_price}</p>
                <p>Request Date: {quote.request_date}</p>
                <p>Service Type: {quote.service_type || 'N/A'}</p>
                <p>Square Footage: {quote.square_footage} sq. ft.</p>
                <p>Status: {quote.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No quotes available.</p>
        )}
      </div>
    </div>
  );
};



export default ClientQuotes