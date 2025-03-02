import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink, ChevronDown, ChevronUp, Phone } from 'lucide-react';

interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone?: string;
  website?: string;
}

interface RecyclingCentersProps {
  userLocation?: { lat: number; lng: number };
}

const RecyclingCenters: React.FC<RecyclingCentersProps> = ({ userLocation }) => {
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [expandedCenter, setExpandedCenter] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyCenters(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    if (centers.length > 0) {
      setAnimateIn(true);
    }
  }, [centers]);

  const requestLocationPermission = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission(true);
        fetchNearbyCenters({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (err) => {
        console.error('Error getting location:', err);
        setLocationPermission(false);
        setError('Unable to access your location. Please enable location services.');
        setLoading(false);
      }
    );
  };

  const fetchNearbyCenters = async (location: { lat: number; lng: number }) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to a backend service
      // that would query a database or external API for recycling centers
      // For demo purposes, we'll use mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for recycling centers
      const mockCenters: RecyclingCenter[] = [
        {
          id: '1',
          name: 'EcoRecycle Center',
          address: '123 Green St, Anytown',
          distance: '1.2 miles',
          phone: '(555) 123-4567',
          website: 'https://example.com/ecorecycle'
        },
        {
          id: '2',
          name: 'City E-Waste Facility',
          address: '456 Tech Blvd, Anytown',
          distance: '2.5 miles',
          phone: '(555) 987-6543'
        },
        {
          id: '3',
          name: 'GreenTech Recyclers',
          address: '789 Circuit Ave, Anytown',
          distance: '3.8 miles',
          website: 'https://example.com/greentech'
        },
        {
          id: '4',
          name: 'Electronics Disposal Center',
          address: '101 Disposal Rd, Anytown',
          distance: '5.2 miles',
          phone: '(555) 456-7890',
          website: 'https://example.com/edisposal'
        }
      ];
      
      setCenters(mockCenters);
      setError(null);
    } catch (err) {
      console.error('Error fetching recycling centers:', err);
      setError('Failed to fetch nearby recycling centers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?daddr=${encodedAddress}`, '_blank');
  };

  const toggleExpand = (id: string) => {
    setExpandedCenter(expandedCenter === id ? null : id);
  };

  const callPhone = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^\d]/g, '')}`;
  };

  if (locationPermission === null) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin size={20} className="mr-2 text-green-600" />
          Find Nearby Recycling Centers
        </h2>
        <p className="text-gray-600 mb-4">
          We can help you find e-waste recycling centers near your location.
        </p>
        <button
          onClick={requestLocationPermission}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
        >
          <Navigation size={18} className="mr-2" />
          Use My Location
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin size={20} className="mr-2 text-green-600" />
          Find Nearby Recycling Centers
        </h2>
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 animate-pulse">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={requestLocationPermission}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors transform hover:scale-105 transition-transform duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin size={20} className="mr-2 text-green-600" />
        Nearby Recycling Centers
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {centers.map((center, index) => (
            <div 
              key={center.id} 
              className={`border rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
                expandedCenter === center.id ? 'bg-gray-50 shadow-md' : 'hover:bg-gray-50'
              } ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(center.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{center.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{center.address}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{center.distance}</span>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 ${expandedCenter === center.id ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedCenter === center.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 space-y-3">
                  {center.phone && (
                    <button
                      onClick={() => callPhone(center.phone!)}
                      className="w-full bg-gray-100 text-gray-800 text-sm py-2 px-3 rounded hover:bg-gray-200 transition-colors flex items-center justify-center"
                    >
                      <Phone size={14} className="mr-2" />
                      {center.phone}
                    </button>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openDirections(center.address)}
                      className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                    >
                      <Navigation size={14} className="mr-1" />
                      Directions
                    </button>
                    {center.website && (
                      <a
                        href={center.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded hover:bg-gray-300 transition-colors flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecyclingCenters;