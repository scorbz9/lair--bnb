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
  const [errors, setErrors] = useState([]);

  //   if (sessionUser) return (
  //     <Redirect to="/" />
  //   );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

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
      kitchen
    }

    let newSpot = await dispatch(createSpot(spot))

    if (newSpot) {
      history.push(`/spots`)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price Per Night
        <input
          type="text"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          required
        />
      </label>
      <ul>
        Amenities
        <li>
          <label htmlFor="hairDryer">Hair Dryer</label>
          <input
            name="hairDryer"
            type="checkbox"
            value={hairDryer}
            onChange={(e) => setHairDryer(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="hotWater">Hot Water</label>
          <input
            name="hotWater"
            type="checkbox"
            value={hotWater}
            onChange={(e) => setHotWater(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="hangers">Hangers</label>
          <input
            name="hangers"
            type="checkbox"
            value={hangers}
            onChange={(e) => setHangers(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="bedLinens">Bed Linens</label>
          <input
            name="bedLinens"
            type="checkbox"
            value={bedLinens}
            onChange={(e) => setBedLinens(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="iron">Iron</label>
          <input
            name="iron"
            type="checkbox"
            value={iron}
            onChange={(e) => setIron(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="tv">TV</label>
          <input
            name="tv"
            type="checkbox"
            value={tv}
            onChange={(e) => setTv(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="heating">Heating</label>
          <input
            name="heating"
            type="checkbox"
            value={heating}
            onChange={(e) => setHeating(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="smokeAlarm">Smoke Alarm</label>
          <input
            name="smokeAlarm"
            type="checkbox"
            value={smokeAlarm}
            onChange={(e) => setSmokeAlarm(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="wifi">Wifi</label>
          <input
            name="wifi"
            type="checkbox"
            value={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="parking">Parking</label>
          <input
            name="parking"
            type="checkbox"
            value={parking}
            onChange={(e) => setParking(e.target.checked)}
          />
        </li>
        <li>
          <label htmlFor="kitchen">Kitchen</label>
          <input
            name="kitchen"
            type="checkbox"
            value={kitchen}
            onChange={(e) => setKitchen(e.target.checked)}
          />
        </li>
      </ul>
      <button type="submit">Register your spot</button>
    </form>
  );
}

export default HostFormPage;
