import React, { useState, useEffect } from 'react';
import { Camera, Scan, History, Upload, Info, HelpCircle } from 'lucide-react';
import Header from './components/Header';
import CameraComponent from './components/Camera';
import ScanResult from './components/ScanResult';
import ScanHistory from './components/ScanHistory';
import DeviceTypePrompt from './components/DeviceTypePrompt';
import RecyclingCenters from './components/RecyclingCenters';
import SimilarDevices from './components/SimilarDevices';
import { RecyclabilityResult, ScanHistory as ScanHistoryType } from './types';
import { analyzeImage } from './services/aiService';
import * as tf from '@tensorflow/tfjs';

function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<RecyclabilityResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');
  const [scanHistory, setScanHistory] = useState<ScanHistoryType[]>([]);
  const [deviceName, setDeviceName] = useState('');
  const [modelLoading, setModelLoading] = useState(true);
  const [showDevicePrompt, setShowDevicePrompt] = useState(false);
  const [pendingImageAnalysis, setPendingImageAnalysis] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>(undefined);

  // Initialize TensorFlow.js
  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js initialized');
        setModelLoading(false);
      } catch (error) {
        console.error('Failed to initialize TensorFlow.js:', error);
      }
    };

    initTensorFlow();
  }, []);

  const processImage = async (imageSrc: string, deviceType?: string) => {
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeImage(imageSrc, deviceType);
      setScanResult(result);
      
      // Add to history
      const newScan: ScanHistoryType = {
        id: Date.now().toString(),
        timestamp: new Date(),
        imageUrl: imageSrc,
        result: result,
        deviceName: deviceName || deviceType || 'Unknown Device'
      };
      
      setScanHistory(prev => [newScan, ...prev]);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
      setPendingImageAnalysis(null);
    }
  };

  const handleCapture = async (imageSrc: string) => {
    setShowCamera(false);
    setCapturedImage(imageSrc);
    setPendingImageAnalysis(imageSrc);
    setShowDevicePrompt(true);
  };

  const handleDeviceTypeSubmit = (deviceType: string) => {
    setShowDevicePrompt(false);
    if (pendingImageAnalysis) {
      setDeviceName(deviceType);
      processImage(pendingImageAnalysis, deviceType);
    }
  };

  const handleDeviceTypeSkip = () => {
    setShowDevicePrompt(false);
    if (pendingImageAnalysis) {
      processImage(pendingImageAnalysis);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        handleCapture(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectHistory = (scan: ScanHistoryType) => {
    setCapturedImage(scan.imageUrl);
    setScanResult(scan.result);
    setDeviceName(scan.deviceName || '');
    setActiveTab('scan');
  };

  const handleDeleteHistory = (id: string) => {
    setScanHistory(prev => prev.filter(scan => scan.id !== id));
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  // Try to get user location when the app loads
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-4">
              <Info size={20} className="text-gray-500 mr-2" />
              <p className="text-gray-700">Scan electronic devices to check their recyclability and get disposal instructions.</p>
            </div>
            
            {modelLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <p className="text-blue-700 text-sm">Loading AI model...</p>
                </div>
              </div>
            )}
            
            {capturedImage && (
              <div className="mb-4">
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured device" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setShowCamera(true)}
                      className="bg-white text-gray-800 rounded-full p-2"
                    >
                      <Camera size={24} />
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Device name (optional)"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCamera(true)}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                disabled={modelLoading}
              >
                <Camera size={20} className="mr-2" />
                <span>Scan Device</span>
              </button>
              
              <label className={`flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer ${modelLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Upload size={20} className="mr-2" />
                <span>Upload Image</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden"
                  disabled={modelLoading}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'scan' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('scan')}
            >
              <div className="flex items-center">
                <Scan size={20} className="mr-2" />
                <span>Scan Results</span>
              </div>
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('history')}
            >
              <div className="flex items-center">
                <History size={20} className="mr-2" />
                <span>History</span>
              </div>
            </button>
          </div>
        </div>
        
        {activeTab === 'scan' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ScanResult result={scanResult} isLoading={isAnalyzing} />
              
              {scanResult && deviceName && (
                <div className="mt-6">
                  <SimilarDevices deviceType={deviceName} />
                </div>
              )}
            </div>
            
            <div>
              <RecyclingCenters userLocation={userLocation} />
            </div>
          </div>
        ) : (
          <ScanHistory 
            history={scanHistory} 
            onSelect={handleSelectHistory} 
            onDelete={handleDeleteHistory} 
          />
        )}
      </main>
      
      {showCamera && (
        <CameraComponent 
          onCapture={handleCapture} 
          onClose={() => setShowCamera(false)} 
        />
      )}

      {showDevicePrompt && (
        <DeviceTypePrompt 
          onSubmit={handleDeviceTypeSubmit}
          onSkip={handleDeviceTypeSkip}
        />
      )}
    </div>
  );
}

export default App;