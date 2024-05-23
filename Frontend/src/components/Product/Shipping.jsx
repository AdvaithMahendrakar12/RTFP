import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../reducers/cartSlice";
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';    
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>

      <CheckoutSteps activeStep={0} />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl text-center font-semibold mb-6">
            Shipping Details
          </h2>

          <form className="space-y-4" onSubmit={shippingSubmit}>
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <HomeIcon className="mr-3" />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <LocationCityIcon className="mr-3" />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <PinDropIcon className="mr-3" />
              <input
                type="number"
                placeholder="Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <PhoneIcon className="mr-3" />
              <input
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <PublicIcon className="mr-3" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                required
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <TransferWithinAStationIcon className="mr-3" />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                  required
                >
                  <option value="">State</option>
                  {State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                disabled={!state}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
