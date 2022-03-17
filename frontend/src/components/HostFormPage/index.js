import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots'
import './HostForm.css';

function HostFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState(0);
  const [hairDryer, setHairDryer] = useState(false);
  const [hotWater, setHotWater] = useState(false);
  const [hangers, setHangers] = useState(false);
  const [bedLinens, setBedLinens] = useState(false);
  const [iron, setIron] = useState(false);
  const [tv, setTv] = useState(false);
  const [heating, setHeating] = useState(false);
  const [smokeAlarm, setSmokeAlarm] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [image, setImage] = useState(null)

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
      image
    }

    if (address.length === 0) setAddressError('Please provide an address.')
    if (description.length === 0) setDescriptionError('Please provide a description.')
    if (pricePerNight <= 0) setPricePerNightError('Please provide a nightly price above 0.')

    let newSpot = await dispatch(createSpot(spot))

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
        <h2 className="host-form-header">Add your spot!</h2>
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
            // type="text"
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
              value={hairDryer}
              onChange={(e) => setHairDryer(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="hotWater">Hot Water</label>
            <input
              name="hotWater"
              type="checkbox"
              value={hotWater}
              onChange={(e) => setHotWater(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="hangers">Hangers</label>
            <input
              name="hangers"
              type="checkbox"
              value={hangers}
              onChange={(e) => setHangers(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="bedLinens">Bed Linens</label>
            <input
              name="bedLinens"
              type="checkbox"
              value={bedLinens}
              onChange={(e) => setBedLinens(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="iron">Iron</label>
            <input
              name="iron"
              type="checkbox"
              value={iron}
              onChange={(e) => setIron(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="tv">TV</label>
            <input
              name="tv"
              type="checkbox"
              value={tv}
              onChange={(e) => setTv(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="heating">Heating</label>
            <input
              name="heating"
              type="checkbox"
              value={heating}
              onChange={(e) => setHeating(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="smokeAlarm">Smoke Alarm</label>
            <input
              name="smokeAlarm"
              type="checkbox"
              value={smokeAlarm}
              onChange={(e) => setSmokeAlarm(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="wifi">Wifi</label>
            <input
              name="wifi"
              type="checkbox"
              value={wifi}
              onChange={(e) => setWifi(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="parking">Parking</label>
            <input
              name="parking"
              type="checkbox"
              value={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="checkbox"
            />
          </li>
          <li className="amenity">
            <label htmlFor="kitchen">Kitchen</label>
            <input
              name="kitchen"
              type="checkbox"
              value={kitchen}
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
        <button type="submit" id="register-button">Add your spot</button>
      </form>
    </div>
  );
}

export default HostFormPage;
