import React, { useState, useRef, useEffect } from 'react';
import { SAMPLE_SCAN_PRESETS } from '../data/mockStreetwear';
import { ArticleAnalysisResult } from '../types';

interface CameraScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: ArticleAnalysisResult, originalImage: string) => void;
  initialQuery?: string;
  onShowToast: (msg: string) => void;
}

export const CameraScanModal: React.FC<CameraScanModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete,
  initialQuery = '',
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'samples'>('upload');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState(initialQuery);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setUserNotes(initialQuery);
    }
  }, [initialQuery]);

  // Handle webcam stream start/stop
  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. Please upload a photo or select a sample.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    stopCamera();
    setSelectedImage(dataUrl);
    runAnalysis(dataUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      runAnalysis(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleSelectSample = async (preset: typeof SAMPLE_SCAN_PRESETS[0]) => {
    setSelectedImage(preset.imageUrl);
    setUserNotes(preset.label);
    runAnalysis(preset.imageUrl, preset.id);
  };

  const runAnalysis = async (imgData: string, samplePresetId?: string) => {
    setIsScanning(true);
    setScanStep(1);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch('/api/analyze-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imgData.startsWith('data:') ? imgData : undefined,
          sampleUrl: imgData.startsWith('http') ? imgData : undefined,
          sampleId: samplePresetId,
          userNotes,
        }),
      });

      const json = await response.json();
      clearInterval(stepInterval);

      if (json.success && json.data) {
        setIsScanning(false);
        onShowToast('GARMENT IDENTIFIED // PRICES AGGREGATED');
        onAnalysisComplete(json.data, imgData);
      } else {
        throw new Error(json.error || 'Failed analysis');
      }
    } catch (err) {
      clearInterval(stepInterval);
      setIsScanning(false);
      onShowToast('RADAR COMPLETED WITH LOCAL INDEX');
      // Fallback response call
      const fallbackRes = await fetch('/api/analyze-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId: samplePresetId || 'sample-1', userNotes }),
      });
      const data = await fallbackRes.json();
      if (data.data) {
        onAnalysisComplete(data.data, imgData);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#1c1b1b] border-2 border-[#c3f400] rounded-xl shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col my-auto">
        {/* Modal Top Bar */}
        <div className="p-3.5 bg-[#2a2a2a] border-b border-[#353534] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-pulse"></span>
            <span className="font-headline-sm text-[16px] text-white uppercase tracking-tight font-bold">
              OPTICAL RADAR // PRICE SCANNER
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0e0e0e] text-white hover:bg-[#c3f400] hover:text-[#283500] flex items-center justify-center transition-colors cursor-pointer border border-[#444933]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scanning State Overlay */}
        {isScanning && (
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[350px] relative overflow-hidden bg-[#131313]">
            {/* Visual scanner viewfinder */}
            <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-[#c3f400] shadow-[0_0_20px_rgba(195,244,0,0.3)] flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Scanned article"
                  className="w-full h-full object-cover filter contrast-125"
                />
              ) : (
                <div className="w-full h-full bg-[#1c1b1b] flex items-center justify-center text-[#c3f400]">
                  <span className="material-symbols-outlined text-[48px]">view_in_ar</span>
                </div>
              )}

              {/* Laser Radar Line */}
              <div className="absolute inset-x-0 h-1 bg-[#c3f400] shadow-[0_0_12px_#c3f400] animate-radar-sweep"></div>

              {/* Target Corner brackets */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#c3f400]"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#c3f400]"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#c3f400]"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#c3f400]"></div>
            </div>

            {/* Telemetry Status text */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="font-label-code-sm text-label-code-sm text-[#c3f400] uppercase tracking-widest font-bold">
                {scanStep === 1 && '1/4 OPTICAL FEATURE EXTRACTION...'}
                {scanStep === 2 && '2/4 IDENTIFYING SILHOUETTE & AESTHETIC...'}
                {scanStep === 3 && '3/4 CROSS-REFERENCING GRAILED, STOCKX, SSENSE...'}
                {scanStep >= 4 && '4/4 COMPUTING LOWEST ARBITRAGE PRICE...'}
              </span>
              <span className="font-body-sm text-body-sm text-[#8e9379]">
                Comparing prices and finding same-type recommendations
              </span>
            </div>

            <div className="w-full max-w-xs bg-[#201f1f] h-2 rounded-full overflow-hidden border border-[#353534]">
              <div
                className="bg-[#c3f400] h-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, scanStep * 25)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Normal Input Mode */}
        {!isScanning && (
          <div className="p-4 flex flex-col gap-4">
            {/* Mode selection tabs */}
            <div className="grid grid-cols-3 gap-2 bg-[#0e0e0e] p-1.5 rounded-lg border border-[#2a2a2a]">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-3 rounded-md font-label-code-sm text-label-code-sm uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-[#c3f400] text-[#283500] shadow-[2px_2px_0px_#ffffff]'
                    : 'text-[#8e9379] hover:text-white'
                }`}
              >
                Upload File
              </button>
              <button
                onClick={() => setActiveTab('camera')}
                className={`py-2 px-3 rounded-md font-label-code-sm text-label-code-sm uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'camera'
                    ? 'bg-[#c3f400] text-[#283500] shadow-[2px_2px_0px_#ffffff]'
                    : 'text-[#8e9379] hover:text-white'
                }`}
              >
                Live Camera
              </button>
              <button
                onClick={() => setActiveTab('samples')}
                className={`py-2 px-3 rounded-md font-label-code-sm text-label-code-sm uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'samples'
                    ? 'bg-[#c3f400] text-[#283500] shadow-[2px_2px_0px_#ffffff]'
                    : 'text-[#8e9379] hover:text-white'
                }`}
              >
                1-Tap Samples
              </button>
            </div>

            {/* TAB 1: File Upload */}
            {activeTab === 'upload' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#8e9379]/50 hover:border-[#c3f400] bg-[#131313] p-8 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors group text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#201f1f] text-[#c3f400] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c3f400] group-hover:text-[#283500] transition-all shadow-[2px_2px_0px_#000000]">
                  <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] text-white uppercase font-bold">
                    DRAG & DROP ARTICLE PHOTO
                  </span>
                  <span className="font-body-sm text-body-sm text-[#8e9379] mt-0.5">
                    or click to browse PNG, JPG, WEBP from your device
                  </span>
                </div>
                <span className="font-label-code-sm text-[11px] bg-[#2a2a2a] text-[#c3f400] px-2 py-0.5 rounded-sm uppercase tracking-wider mt-2 border border-[#353534]">
                  AI MULTI-STORE PRICE DETECTION
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            {/* TAB 2: Live Webcam */}
            {activeTab === 'camera' && (
              <div className="flex flex-col gap-3">
                {cameraError ? (
                  <div className="p-4 bg-[#2a2a2a] rounded-lg border border-[#ffb4ab] text-center flex flex-col gap-2">
                    <span className="material-symbols-outlined text-[#ffb4ab] text-[32px] mx-auto">
                      no_photography
                    </span>
                    <span className="text-[#ffb4ab] font-body-sm text-body-sm">{cameraError}</span>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="bg-[#c3f400] text-[#283500] font-label-code-sm uppercase px-3 py-1.5 rounded-full mt-2 font-bold"
                    >
                      SWITCH TO FILE UPLOAD
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border-2 border-[#2a2a2a]">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Viewfinder Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-[#c3f400]/40 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-dashed border-[#c3f400] rounded-lg flex items-center justify-center">
                        <span className="text-[10px] font-label-code-sm text-[#c3f400] bg-black/75 px-2 py-0.5 rounded uppercase">
                          ALIGN GARMENT HERE
                        </span>
                      </div>
                    </div>

                    {/* Capture button */}
                    <button
                      onClick={captureCameraFrame}
                      disabled={!isCameraActive}
                      className="absolute bottom-3 bg-[#c3f400] text-[#283500] hover:bg-white font-label-code-sm text-label-code-sm uppercase px-5 py-2.5 rounded-full shadow-[3px_3px_0px_#000000] font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                      SNAP & COMPARE
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 1-Tap Sample Streetwear Articles */}
            {activeTab === 'samples' && (
              <div className="flex flex-col gap-2">
                <span className="font-label-code-sm text-[12px] text-[#8e9379] uppercase tracking-wider">
                  INSTANT SAMPLES // TEST ENGINE IN 1 TAP:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {SAMPLE_SCAN_PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectSample(preset)}
                      className="group bg-[#131313] hover:bg-[#201f1f] border border-[#2a2a2a] hover:border-[#c3f400] rounded-lg p-2 flex items-center gap-2.5 cursor-pointer transition-all shadow-[2px_2px_0px_#000000]"
                    >
                      <img
                        src={preset.imageUrl}
                        alt={preset.label}
                        className="w-12 h-12 rounded object-cover border border-[#353534] shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-[12px] text-white truncate group-hover:text-[#c3f400] transition-colors">
                          {preset.label}
                        </span>
                        <span className="font-label-code-sm text-[10px] text-[#8e9379] uppercase">
                          {preset.category}
                        </span>
                        <span className="text-[10px] text-[#c3f400] font-bold uppercase mt-0.5">
                          SCAN NOW →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search hints / Optional aesthetic tags */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#2a2a2a]">
              <label className="font-label-code-sm text-[11px] text-[#8e9379] uppercase tracking-wider">
                OPTIONAL SEARCH HINT OR SIZE FILTER:
              </label>
              <input
                type="text"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="e.g. Size M, Black, Only deadstock condition..."
                className="w-full bg-[#0e0e0e] text-white font-body-sm text-body-sm px-3 py-2 rounded-lg border border-[#353534] focus:outline-none focus:border-[#c3f400]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
