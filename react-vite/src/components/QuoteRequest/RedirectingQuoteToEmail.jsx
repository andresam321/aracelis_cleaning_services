import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSubmitQuote } from '../../redux/email';
import './CreateQuote.css';

const RedirectingQuoteToEmail = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    
    const [guest_email, setGuest_email] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone, setPhone] = useState('');
    const [full_address, setFull_address] = useState('');
    const [apt_suite, setApt_suite] = useState('');
    const [service_type, setService_type] = useState('');
    const [description, setDescription] = useState('');
    const [request_date, setRequest_Date] = useState('');
    const [cleaning_frequency, setCleaning_frequency] = useState('');

    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [bedrooms, setBedrooms] = useState(0);
    const [half_baths, setHalf_baths] = useState(0);
    const [full_baths, setFull_baths] = useState(0);
    const [square_footage, setSquare_footage] = useState(0);
    const [levels, setLevels] = useState(0);
    const [carpeted_rooms, setCarpeted_rooms] = useState(0);
    const [number_of_people, setNumber_of_people] = useState(0);
    const [number_of_pets, setNumber_of_pets] = useState(0);
    const [pets, setPets] = useState(false);

    
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const errorObj = {};

        
        if (!guest_email) errorObj.guest_email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(guest_email)) errorObj.guest_email = "Email is invalid";

        if (!phone) errorObj.phone = "Phone is required";
        else if (!/^\d{10}$/.test(phone)) errorObj.phone = "Phone must be 10 digits";

        if (!first_name) errorObj.first_name = "First name is required";
        if (!last_name) errorObj.last_name = "Last name is required";
        if (!full_address) errorObj.full_address = "Service address is required";
        if (!service_type) errorObj.service_type = "Service type is required";
        if (!description) errorObj.description = "Description is required";
        if (!request_date) errorObj.request_date = "Service date is required";
        if (!cleaning_frequency) errorObj.cleaning_frequency = "Cleaning frequency is required";

        
        if (bedrooms < 0) errorObj.bedrooms = "Bedrooms cannot be negative";
        if (half_baths < 0) errorObj.half_baths = "Half baths cannot be negative";
        if (full_baths < 0) errorObj.full_baths = "Full baths cannot be negative";
        if (square_footage < 0) errorObj.square_footage = "Square footage cannot be negative";
        if (levels < 0) errorObj.levels = "Levels cannot be negative";
        if (carpeted_rooms < 0) errorObj.carpeted_rooms = "Carpeted rooms cannot be negative";
        if (number_of_people < 0) errorObj.number_of_people = "Number of people cannot be negative";
        if (pets && number_of_pets <= 0) {
            errorObj.number_of_pets = "Number of pets must be greater than 0 if pets are present";
        }

        setErrors(errorObj);

        
        if (Object.keys(errorObj).length === 0) {
            const formData = new FormData();
            formData.append('guest_email', guest_email);
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('phone', phone);
            formData.append('full_address', full_address);
            formData.append('apt_suite', apt_suite);
            formData.append('service_type', service_type);
            formData.append('description', description);
            formData.append('request_date', request_date);
            formData.append('cleaning_frequency', cleaning_frequency);

            if (showAdditionalFields) {
                formData.append('bedrooms', bedrooms);
                formData.append('half_baths', half_baths);
                formData.append('full_baths', full_baths);
                formData.append('square_footage', square_footage);
                formData.append('levels', levels);
                formData.append('carpeted_rooms', carpeted_rooms);
                formData.append('number_of_people', number_of_people);
                formData.append('pets', pets ? 'true' : 'false');
                formData.append('number_of_pets', number_of_pets);
            }


            dispatch(thunkSubmitQuote(formData))
                .then(() => closeModal())
                .catch((error) => console.error('Error creating quote', error));
        }

        setFormSubmitted(true);
    };

    return (
        <div className="form-overlay" onClick={closeModal}>
            <form className="quote-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className="form-row">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={guest_email}
                        onChange={(e) => setGuest_email(e.target.value)}
                    />
                    {formSubmitted && errors.guest_email && <p className="error-text">{errors.guest_email}</p>}
                </div>

                <div className="form-row">
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {formSubmitted && errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                <div className="form-row">
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    {formSubmitted && errors.first_name && <p className="error-text">{errors.first_name}</p>}
                </div>

                <div className="form-row">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                    {formSubmitted && errors.last_name && <p className="error-text">{errors.last_name}</p>}
                </div>

                <div className="form-row">
                    <label>Service Address:</label>
                    <input
                        type="text"
                        value={full_address}
                        onChange={(e) => setFull_address(e.target.value)}
                    />
                    {formSubmitted && errors.full_address && <p className="error-text">{errors.full_address}</p>}
                </div>

                <div className="form-row">
                    <label>Apt/Suite:</label>
                    <input
                        type="text"
                        value={apt_suite}
                        onChange={(e) => setApt_suite(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <label>Service Type:</label>
                    <input
                        type="text"
                        value={service_type}
                        onChange={(e) => setService_type(e.target.value)}
                    />
                    {formSubmitted && errors.service_type && <p className="error-text">{errors.service_type}</p>}
                </div>

                <div className="form-row">
                    <label>Service Date:</label>
                    <input
                        type="date"
                        value={request_date}
                        onChange={(e) => setRequest_Date(e.target.value)}
                    />
                    {formSubmitted && errors.request_date && <p className="error-text">{errors.request_date}</p>}
                </div>

                <div className="form-row">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {formSubmitted && errors.description && <p className="error-text">{errors.description}</p>}
                </div>

                <div className="form-row">
                    <label htmlFor="cleaning_frequency">Cleaning Frequency:</label>
                    <select 
                        name="cleaning_frequency" 
                        id="cleaning_frequency" 
                        onChange={(e) => setCleaning_frequency(e.target.value)}
                        value={cleaning_frequency}
                    >
                        <option value="">Select Frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="one_time">One-Time</option>
                    </select>
                    {formSubmitted && errors.cleaning_frequency && <p className="error-text">{errors.cleaning_frequency}</p>}
                </div>

                
                {showAdditionalFields && (
                    <div className="additional-fields">
                        <div className="form-row">
                            <label>Bedrooms:</label>
                            <input
                                type="number"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                            />
                            {formSubmitted && errors.bedrooms && <p className="error-text">{errors.bedrooms}</p>}
                        </div>

                        <div className="form-row">
                            <label>Half Baths:</label>
                            <input
                                type="number"
                                value={half_baths}
                                onChange={(e) => setHalf_baths(e.target.value)}
                            />
                            {formSubmitted && errors.half_baths && <p className="error-text">{errors.half_baths}</p>}
                        </div>

                        <div className="form-row">
                            <label>Full Baths:</label>
                            <input
                                type="number"
                                value={full_baths}
                                onChange={(e) => setFull_baths(e.target.value)}
                            />
                            {formSubmitted && errors.full_baths && <p className="error-text">{errors.full_baths}</p>}
                        </div>

                        <div className="form-row">
                            <label>Square Footage:</label>
                            <input
                                type="number"
                                value={square_footage}
                                onChange={(e) => setSquare_footage(e.target.value)}
                            />
                            {formSubmitted && errors.square_footage && <p className="error-text">{errors.square_footage}</p>}
                        </div>

                        <div className="form-row">
                            <label>Levels:</label>
                            <input
                                type="number"
                                value={levels}
                                onChange={(e) => setLevels(e.target.value)}
                            />
                            {formSubmitted && errors.levels && <p className="error-text">{errors.levels}</p>}
                        </div>

                        <div className="form-row">
                            <label>Carpeted Rooms:</label>
                            <input
                                type="number"
                                value={carpeted_rooms}
                                onChange={(e) => setCarpeted_rooms(e.target.value)}
                            />
                            {formSubmitted && errors.carpeted_rooms && <p className="error-text">{errors.carpeted_rooms}</p>}
                        </div>

                        <div className="form-row">
                            <label>Number of People:</label>
                            <input
                                type="number"
                                value={number_of_people}
                                onChange={(e) => setNumber_of_people(e.target.value)}
                            />
                            {formSubmitted && errors.number_of_people && <p className="error-text">{errors.number_of_people}</p>}
                        </div>

                        <div className="form-row">
                            <label>Pets:</label>
                            <input
                                type="checkbox"
                                checked={pets}
                                onChange={(e) => setPets(e.target.checked)}
                            />
                        </div>

                        {pets && (
                            <div className="form-row">
                                <label>Number of Pets:</label>
                                <input
                                    type="number"
                                    value={number_of_pets}
                                    onChange={(e) => setNumber_of_pets(e.target.value)}
                                />
                                {formSubmitted && errors.number_of_pets && <p className="error-text">{errors.number_of_pets}</p>}
                            </div>
                        )}
                    </div>
                )}

                <button type="button" className="toggle-additional-fields" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
                    {showAdditionalFields ? 'Hide Additional Info' : 'Add More Info'}
                </button>

                <button type="submit" className="submit-quote-button">Create Quote</button>
            </form>
        </div>
    );
};

export default RedirectingQuoteToEmail;