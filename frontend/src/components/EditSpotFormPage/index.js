import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSpot } from '../../store/spots'

import './EditSpotForm.css';

function EditSpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const spotId = parseInt(useParams().spotId);
    const spots = useSelector(state => state.spotsState.entries);
    let spot = spots.find(spot => spot.id === spotId)

    if (spot) localStorage.setItem('spot', JSON.stringify(spot))

    if (!spot) {
        spot = JSON.parse(localStorage.getItem('spot'))
    }

    const [address, setAddress] = useState(spot?.address);
    const [description, setDescription] = useState(spot?.description);
    const [pricePerNight, setPricePerNight] = useState(spot?.pricePerNight);
    const [hairDryer, setHairDryer] = useState(spot?.Amenities[0].hairDryer);
    const [hotWater, setHotWater] = useState(spot?.Amenities[0].hotWater);
    const [hangers, setHangers] = useState(spot?.Amenities[0].hangers);
    const [bedLinens, setBedLinens] = useState(spot?.Amenities[0].bedLinens);
    const [iron, setIron] = useState(spot?.Amenities[0].iron);
    const [tv, setTv] = useState(spot?.Amenities[0].tv);
    const [heating, setHeating] = useState(spot?.Amenities[0].heating);
    const [smokeAlarm, setSmokeAlarm] = useState(spot?.Amenities[0].smokeAlarm);
    const [wifi, setWifi] = useState(spot?.Amenities[0].wifi);
    const [parking, setParking] = useState(spot?.Amenities[0].parking);
    const [kitchen, setKitchen] = useState(spot?.Amenities[0].kitchen);
    const [image, setImage] = useState(spot?.Images[0].imgURL)

    const [addressError, setAddressError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [pricePerNightError, setPricePerNightError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAddressError('');
        setDescriptionError('');
        setPricePerNightError('');

        const spot = {
            userId: sessionUser.id,
            address,
            description,
            pricePerNight: parseInt(pricePerNight, 10),
            hairDryer,
            hotWater,
            hangers,
            bedLinens,
            iron,
            tv,
            heating,
            smokeAlarm,
            wifi,
            parking,
            kitchen,
            spotId,
            image
        }

        if (address.length === 0) setAddressError('Please provide an address.')
        if (description.length === 0) setDescriptionError('Please provide a description.')
        if (pricePerNight <= 0) setPricePerNightError('Please provide a nightly price above 0.')

        let newSpot = await dispatch(editSpot(spot))

        if (newSpot) {
            history.push(`/spots`)
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return (
        <div className="host-form-container">
            <form className="host-form" onSubmit={handleSubmit}>
                <h2 className="host-form-header">Edit your spot!</h2>
                <p className="error">{addressError}</p>
                <label className="section">
                    Address*
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="host-form-text-input"
                        autoComplete='off'
                    />
                </label>
                <p className="error">{descriptionError}</p>
                <label className="section">
                    Description*
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description-input"
                        className="host-form-text-input"
                        autoComplete='off'
                    />
                </label>
                <p className="error">{pricePerNightError}</p>
                <label className="section">
                    Price Per Night*
                    <input
                        type="text"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                        id="price-input"
                        className="host-form-text-input"
                        autoComplete='off'
                    />
                </label>
                <h2 id="amenities-label">Amenities</h2>
                <ul id="amenities">
                    <li className="amenity">
                        <label htmlFor="hairDryer">Hair Dryer</label>
                        <input
                            name="hairDryer"
                            type="checkbox"
                            checked={hairDryer === true}
                            onChange={(e) => setHairDryer(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="hotWater">Hot Water</label>
                        <input
                            name="hotWater"
                            type="checkbox"
                            checked={hotWater === true}
                            onChange={(e) => setHotWater(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="hangers">Hangers</label>
                        <input
                            name="hangers"
                            type="checkbox"
                            checked={hangers === true}
                            onChange={(e) => setHangers(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="bedLinens">Bed Linens</label>
                        <input
                            name="bedLinens"
                            type="checkbox"
                            checked={bedLinens === true}
                            onChange={(e) => setBedLinens(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="iron">Iron</label>
                        <input
                            name="iron"
                            type="checkbox"
                            checked={iron === true}
                            onChange={(e) => setIron(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="tv">TV</label>
                        <input
                            name="tv"
                            type="checkbox"
                            checked={tv === true}
                            onChange={(e) => setTv(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="heating">Heating</label>
                        <input
                            name="heating"
                            type="checkbox"
                            checked={heating === true}
                            onChange={(e) => setHeating(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="smokeAlarm">Smoke Alarm</label>
                        <input
                            name="smokeAlarm"
                            type="checkbox"
                            checked={smokeAlarm === true}
                            onChange={(e) => setSmokeAlarm(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="wifi">Wifi</label>
                        <input
                            name="wifi"
                            type="checkbox"
                            checked={wifi === true}
                            onChange={(e) => setWifi(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="parking">Parking</label>
                        <input
                            name="parking"
                            type="checkbox"
                            checked={parking === true}
                            onChange={(e) => setParking(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                    <li className="amenity">
                        <label htmlFor="kitchen">Kitchen</label>
                        <input
                            name="kitchen"
                            type="checkbox"
                            checked={kitchen === true}
                            onChange={(e) => setKitchen(e.target.checked)}
                            className="checkbox"
                        />
                    </li>
                </ul>
                <h2 id="amenities-label">Upload a photo</h2>
          <label htmlFor="upload-photo-button" className="section" id="upload-photo">Choose a file</label>
            <input
              type="file"
              onChange={updateFile}
              id="upload-photo-button"
            />
            {image ? <div id="staged-upload">{image.name}</div> : <div id="staged-upload">No file chosen</div>}
                <button type="submit" id="register-button">Edit your spot</button>
            </form>
        </div>
    );
}

export default EditSpotFormPage;
