import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import CustomButton from "../../components/CustomButton/CustomButton";
import { baseUrl } from "../../constants.js";
import { toast } from "react-toastify";

const Settings = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const options = countryList().getData();

  const handleChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/admin/settings`,
        {
          countries: selectedCountries.map((option) => option.label),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      console.log("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  // Fetch existing settings from the backend
  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/settings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      if (response.status === 200) {
        const countries = response.data.data.countries;
        setSelectedCountries(
          countries.map((country) => ({ value: country, label: country }))
        );
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div >
      <h2 className="text-2xl font-bold mb-4 bg-white p-4">Settings</h2>
      <div className=" p-4">
        <h3 className="text-lg font-semibold mb-2">Available Countries</h3>
        <Select
          isMulti
          name="countries"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
          value={selectedCountries}
        />
      </div>
      <CustomButton label="Save" onClick={handleSave} className=" m-4" />
    </div>
  );
};

export default Settings;
