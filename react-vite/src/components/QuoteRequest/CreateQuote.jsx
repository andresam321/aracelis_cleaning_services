import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateQuote } from '../../redux/quote_request';
import './CreateQuote.css';


const CreateQuote = () => {
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
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);
    const [number_of_pets, setNumber_of_pets] = useState(0);
    const [cleaning_frequency, setCleaning_frequency] = useState('');
    const [request_date,setRequest_Date] = useState("")
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    // Additional Fields
    const [bedrooms, setBedrooms] = useState(0);
    const [half_baths, setHalf_baths] = useState(0);
    const [full_baths, setFull_baths] = useState(0);
    const [square_footage, setSquare_footage] = useState(0);
    const [levels, setLevels] = useState(0);
    const [carpeted_rooms, setCarpeted_rooms] = useState(0);
    const [number_of_people, setNumber_of_people] = useState(0);
    const [pets, setPets] = useState(false);


    // const services = useSelector((state) => state.serviceReducer.allServices.id)



    // console.log("line37", services)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('guest_email', guest_email);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('phone', phone);
        formData.append('full_address', full_address);
        formData.append('apt_suite', apt_suite);
        formData.append('service_type', service_type);
        formData.append('description', description);

        if (showAdditionalFields) {
        // Include additional fields in formData if revealed
        formData.append('bedrooms', bedrooms);
        formData.append('half_baths', half_baths);
        formData.append('full_baths', full_baths);
        formData.append('square_footage', square_footage);
        formData.append('levels', levels);
        formData.append('carpeted_rooms', carpeted_rooms);
        formData.append('number_of_people', number_of_people);
        formData.append('pets', pets);
        formData.append('number_of_pets', number_of_pets);
        formData.append('cleaning_frequency', cleaning_frequency);
        }

        try {

        await dispatch(thunkCreateQuote(services,formData))
        closeModal();
        
        } catch (error) {
        console.error('Error creating quote', error);
        }
    };

    return (
        <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label>Email:</label>
                <input type="email" value={guest_email} onChange={(e) => setGuest_email(e.target.value)} required />
                
                <label>Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="form-row">
                <label>First Name:</label>
                <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required />
                
                <label>Last Name:</label>
                <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} required />
            </div>

            <div className="form-row">
                <label>Service Address:</label>
                <input type="text" value={full_address} onChange={(e) => setFull_address(e.target.value)} required />

                <label>Apt/Suite:</label>
                <input type="text" value={apt_suite} onChange={(e) => setApt_suite(e.target.value)} />
            </div>

            <div className="form-row">
                <label>Service Type:</label>
                <input type="text" value={service_type} onChange={(e) => setService_type(e.target.value)} required />
                
                <label>Service Date:</label>
                <input type="date" value={request_date} onChange={(e) => setRequest_Date(e.target.value)} required />
            </div>

            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

            <label htmlFor="cleaning_frequency">Cleaning Frequency:</label>
            <select 
                name="cleaning_frequency" 
                id="cleaning_frequency" 
                required 
                onChange={(e) => setCleaning_frequency(e.target.value)}
                value={cleaning_frequency}
            >
                <option value="">Select Frequency</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="one_time">One-Time</option>
            </select>

            {showAdditionalFields && (
                <div className="additional-fields">
                    <div className="form-row">
                        <label>Bedrooms:</label>
                        <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />

                        <label>Half Baths:</label>
                        <input type="number" value={half_baths} onChange={(e) => setHalf_baths(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label>Full Baths:</label>
                        <input type="number" value={full_baths} onChange={(e) => setFull_baths(e.target.value)} />

                        <label>Square Footage:</label>
                        <input type="number" value={square_footage} onChange={(e) => setSquare_footage(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label>Levels:</label>
                        <input type="number" value={levels} onChange={(e) => setLevels(e.target.value)} />

                        <label>Carpeted Rooms:</label>
                        <input type="number" value={carpeted_rooms} onChange={(e) => setCarpeted_rooms(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <label>Number of People:</label>
                        <input type="number" value={number_of_people} onChange={(e) => setNumber_of_people(e.target.value)} />

                        <label>Pets:</label>
                        <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} />
                    </div>

                    <label>Number of Pets:</label>
                    <input type="number" value={number_of_pets} onChange={(e) => setNumber_of_pets(e.target.value)} />
                </div>
            )}

            <button type="button" className="toggle-additional-fields" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
                {showAdditionalFields ? 'Hide Additional Info' : 'Add More Info'}
            </button>

            <button type="submit" className="submit-quote-button">Create Quote</button>
        </form>
    );
};

export default CreateQuote;