import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import CreateRent from './components/CreateRent/CreateRent';
import RentItem from './components/RentItem/RentItem';
import axios from './axios';

function App() {

    const [bikes, setBikes] = useState([]);
    const [rentTime, setRentTime] = useState(0);
    const nameInput = useRef(null);
    const typeSelect = useRef(null);
    const priceInput = useRef(null);

    const loadBikes = () => {
        axios.get('/')
            .then((results) => {
                setBikes(results.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadBikes();
    }, []);

    const rentBike = async (bikeId) => {
        if (rentBike === 0 || !parseInt(rentTime)) {
            alert('Please, enter a valid rent time.');
            return;
        }

        await axios.put(`/${bikeId}`, { rented: true, rentTime: +rentTime });
        setRentTime(0);
        loadBikes();
    };

    const deleteBike = async (bikeId) => {
        await axios.delete(`/${bikeId}`);
        loadBikes();
    }

    const cancelRent = async (bikeId) => {
        await axios.put(`/${bikeId}`, { rented: false, rentTime: 0 });
        loadBikes()
    }

    const handleRentSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/', {
                name: nameInput.current.value,
                bikeType: typeSelect.current.value,
                rentPrice: priceInput.current.value,
            });

            if (response.data.status === 'success') {
                alert('Rent successfully created!');
                loadBikes();
            }
        } catch(e) {
            alert('Couldn\'t create a rent.');
        };
    }

    const availableBikes = bikes.filter((bike) => !bike.rented);
    const rentedBikes = bikes.filter((bike) => bike.rented);
    const rentPrice = rentedBikes.reduce((sum, bike) => sum += bike.rentPrice, 0).toFixed(2);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Awesome Bike Rental</h1>
                <section>
                    <h3>🤑 Create new rent</h3>
                    <CreateRent
                        handleSubmit={handleRentSubmit}
                        nameInput={nameInput}
                        typeSelect={typeSelect}
                        priceInput={priceInput}
                    />
                </section>
                <section>
                    <h3>🤩 Your rent ({rentedBikes.length}) (Total: ${rentPrice})</h3>
                    {rentedBikes.length > 0 ? rentedBikes.map((bike) => (
                        <RentItem
                            id={bike.id}
                            key={bike.id}
                            name={bike.name}
                            price={bike.rentPrice}
                            type={bike.bikeType}
                            rentTime={bike.rentTime}
                            rented={bike.rented}
                            actions={[
                                <Button variant="danger" onClick={() => cancelRent(bike.id)}>Cancel rent</Button>
                            ]}
                        />
                    )) : <p>There is no rented bikes.</p>}
                </section>
                <section>
                    <h3>🚲 Available bicycles ({availableBikes.length})</h3>
                    {availableBikes.length > 0 ? availableBikes.map((bike) => (
                        <RentItem
                            id={bike.id}
                            key={bike.id}
                            name={bike.name}
                            price={bike.rentPrice}
                            type={bike.bikeType}
                            actions={[
                                <FormControl
                                    placeholder="Rent Time"
                                    type="number"
                                    min={0}
                                    className="rent-time-control"
                                    onChange={(e) => setRentTime(e.target.value)}
                                />,
                                <Button variant="primary" key="rent" onClick={() => rentBike(bike.id)} className="action-btn">
                                    Rent
                                </Button>,
                                <Button variant="danger" key="delete" onClick={() => deleteBike(bike.id)}>
                                    Delete
                                </Button>
                            ]}
                        />
                    )) : <p>There is no available bikes for rent.</p>}
                </section>
            </header>
        </div>
    );
}

export default App;