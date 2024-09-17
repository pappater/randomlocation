import React, { useState, useEffect } from "react";
import { getRandomLocation } from "./helpers";
import Map from "./Map";
import { Menu, X, Moon, Sun, RefreshCw, ChevronDown } from "lucide-react";

const RandomLocationMap = () => {
  const [radius, setRadius] = useState<number>(5);
  const [customRadius, setCustomRadius] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [randomLocation, setRandomLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (userLocation && (customRadius || radius)) {
      generateRandomLocation();
    }
  }, [userLocation, radius, customRadius]);

  const generateRandomLocation = () => {
    if (userLocation) {
      const randomLoc = getRandomLocation(
        userLocation.lat,
        userLocation.lng,
        customRadius || radius
      );
      setRandomLocation(randomLoc);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"
      }`}
    >
      <header
        className={`p-4 flex justify-between items-center border-b ${
          isDarkMode ? "border-neutral-700" : "border-neutral-200"
        }`}
      >
        <h1 className="text-2xl font-bold">Random Location</h1>
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <select
              className={`appearance-none ${
                isDarkMode
                  ? "bg-neutral-800 border-neutral-600 text-white"
                  : "bg-white border-neutral-300 text-black"
              } border rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-blue-500`}
              value={radius}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "custom") {
                  setCustomRadius(5);
                } else {
                  setRadius(parseInt(value));
                  setCustomRadius(null);
                }
              }}
            >
              {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((r) => (
                <option key={r} value={r}>
                  {r} km
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
            <ChevronDown
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              size={16}
            />
          </div>
          {customRadius !== null && (
            <input
              type="number"
              placeholder="Custom radius (km)"
              value={customRadius || ""}
              onChange={(e) => setCustomRadius(Number(e.target.value))}
              className={`w-32 px-3 py-2 ${
                isDarkMode
                  ? "bg-neutral-800 border-neutral-600"
                  : "bg-white border-neutral-300"
              } border rounded-md text-sm focus:outline-none focus:border-blue-500`}
            />
          )}
          <input
            type="text"
            placeholder="Lat, Lng"
            className={`px-3 py-2 ${
              isDarkMode
                ? "bg-neutral-800 border-neutral-600"
                : "bg-white border-neutral-300"
            } border rounded-md text-sm focus:outline-none focus:border-blue-500`}
            onChange={(e) => {
              const [lat, lng] = e.target.value.split(",").map(Number);
              if (!isNaN(lat) && !isNaN(lng)) {
                setUserLocation({ lat, lng });
              }
            }}
          />
          <button
            onClick={generateRandomLocation}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            <RefreshCw size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-neutral-700" : "hover:bg-neutral-200"
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-full ${
              isDarkMode ? "hover:bg-neutral-700" : "hover:bg-neutral-200"
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className={`md:hidden p-4 border-b ${
            isDarkMode ? "border-neutral-700" : "border-neutral-200"
          }`}
        >
          <div className="mb-4">
            <label
              htmlFor="mobile-radius"
              className="block text-sm font-medium mb-1"
            >
              Radius (km)
            </label>
            <select
              id="mobile-radius"
              className={`w-full px-3 py-2 ${
                isDarkMode
                  ? "bg-neutral-800 border-neutral-600 text-white"
                  : "bg-white border-neutral-300 text-black"
              } rounded-md text-sm focus:outline-none focus:border-blue-500`}
              value={radius}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "custom") {
                  setCustomRadius(5);
                } else {
                  setRadius(parseInt(value));
                  setCustomRadius(null);
                }
              }}
            >
              {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((r) => (
                <option key={r} value={r}>
                  {r} km
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </div>
          {customRadius !== null && (
            <div className="mb-4">
              <label
                htmlFor="mobile-custom-radius"
                className="block text-sm font-medium mb-1"
              >
                Custom Radius (km)
              </label>
              <input
                id="mobile-custom-radius"
                type="number"
                value={customRadius || ""}
                onChange={(e) => setCustomRadius(Number(e.target.value))}
                className={`w-full px-3 py-2 ${
                  isDarkMode
                    ? "bg-neutral-800 border-neutral-600 text-white"
                    : "bg-white border-neutral-300 text-black"
                } rounded-md text-sm focus:outline-none focus:border-blue-500`}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="mobile-location"
              className="block text-sm font-medium mb-1"
            >
              Manual Location (Lat, Lng)
            </label>
            <input
              id="mobile-location"
              type="text"
              placeholder="Latitude, Longitude"
              className={`w-full px-3 py-2 ${
                isDarkMode
                  ? "bg-neutral-800 border-neutral-600 text-white"
                  : "bg-white border-neutral-300 text-black"
              } rounded-md text-sm focus:outline-none focus:border-blue-500`}
              onChange={(e) => {
                const [lat, lng] = e.target.value.split(",").map(Number);
                if (!isNaN(lat) && !isNaN(lng)) {
                  setUserLocation({ lat, lng });
                }
              }}
            />
          </div>
        </div>
      )}

      <main className="p-4">
        <p
          className={`mb-4 text-sm ${
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {randomLocation && (
            <div className="mb-4">
              <p className="text-sm mb-2">
                Lat: {randomLocation.lat.toFixed(6)}
                <span className="mx-2"> | </span>
                Lng: {randomLocation.lng.toFixed(6)}
                <span className="ml-2">
                  <a
                    href={`https://www.google.com/maps?q=${randomLocation.lat},${randomLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </span>
              </p>
            </div>
          )}
        </p>

        <div className="md:hidden mb-4">
          <button
            onClick={generateRandomLocation}
            className={`w-full px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            Reload Random Location
          </button>
        </div>

        <div className="h-[calc(100vh-220px)]">
          <Map
            lat={randomLocation?.lat || 0}
            lng={randomLocation?.lng || 0}
            isDarkMode={isDarkMode}
          />
        </div>
        <p
          className={`m-4 text-xs ${
            isDarkMode ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          This app generates a random location within the specified radius from
          your current location or a manually entered location.
        </p>
      </main>
    </div>
  );
};

export default RandomLocationMap;
