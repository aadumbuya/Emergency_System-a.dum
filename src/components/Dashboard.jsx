import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '2022-10', count: 1 },
  { month: '2022-12', count: 2 },
  { month: '2023-11', count: 1 },
  { month: '2023-12', count: 1 },
  { month: '2024-1', count: 3 },
  { month: '2024-2', count: 2 },
  { month: '2024-3', count: 1 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [selectedRescueTeams, setSelectedRescueTeams] = useState({
    af: false,
    ambulance: false,
    fireBrigade: false,
    police: false
  });

  const [accidentDetails, setAccidentDetails] = useState({
    address: 'Manipal Teaching Hospital, #045654, Pokhara',
    longitude: '83.996045826365622',
    latitude: '28.2067562999999996',
    severity: 'Moderate',
    severityPercentage: '65',
    date: new Date().toISOString()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccidentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
          <div className="text-xl font-bold mb-8">VCD</div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-2 bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>All Datas</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Rescue Team Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4">Rescue Team</h2>
            <div className="flex space-x-4">
              {Object.entries(selectedRescueTeams).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setSelectedRescueTeams(prev => ({
                      ...prev,
                      [key]: !prev[key]
                    }))}
                    className="form-checkbox"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Accident Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-lg font-semibold mb-4">Accident Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={accidentDetails.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={accidentDetails.longitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={accidentDetails.latitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <input
                  type="text"
                  name="severity"
                  value={accidentDetails.severity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity Percentage</label>
                <input
                  type="text"
                  name="severityPercentage"
                  value={accidentDetails.severityPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={accidentDetails.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Accidents Overview (Per month)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;