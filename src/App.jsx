import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Select from 'react-select'

import './App.css';

const GenCards = ({ data, langFilter }) => {
  let filteredData = data;
  if (langFilter) {
    filteredData = data.filter((e) => (e.country.name === langFilter?.label));
  }

  return Array.from(Array(filteredData.length).keys()).map((_, i) => {
    return (
      <div key={`card-${i}`} className="flex h-48 w-64 shadow-lg bg-gray-800 m-10 rounded-xl items-center justify-items-center justify-center">
        <NavLink className="title text-white text-2xl" to={{
          pathname: "/player",
          state: { data: filteredData[i] }
        }}>{filteredData[i].name}</NavLink>
      </div>
    );
  })
}

const fetchIPTV = () => {
  const urlToFetch = "https://iptv-org.github.io/iptv/channels.json";
  return fetch(urlToFetch);
}

const extractsLangs = (data) => {
  return [...new Set(data.map((e) => e.country.name))].sort();
}

const App = () => {
  const [iptvData, setIptvData] = useState(null);
  const [langOptions, setLangOptions] = useState(null);
  const [langPicked, setLangPicked] = useState(null);

  useEffect(() => {
    if (!iptvData) {
      fetchIPTV().then((data) => data.json()).then((data) => {
        const extractedLangs = extractsLangs(data).map((e) => ({ value: e.toLowerCase(), label: e }));

        setIptvData(data);
        setLangOptions(extractedLangs);
        setLangPicked(extractedLangs[0]);
      });
    }
  });

  return (
    <div className="h-screen w-screen bg-gray-600">
      <div className="bg-gray-500 p-4 rounded-b-lg shadow-2xl">
        {langOptions &&
          <Select
            isSearchable={true}
            options={langOptions}
            onChange={(e) => { setLangPicked(e) }}
            value={langOptions[0]}
          />}
      </div>
      <div className="flex flex-wrap justify-center overflow-auto min:h-screen bg-gray-600">
        {iptvData && langPicked && <GenCards data={iptvData} langFilter={langPicked} />}
      </div>
    </div>
  );
}

export default App;
