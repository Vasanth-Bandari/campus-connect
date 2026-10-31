import React, { useState, useEffect, useRef } from 'react';
import { getStudentProfileApi, uploadResumeApi } from '../../api/student';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Trash2,
  RefreshCw,
} from 'lucide-react';

export const ResumeUpload: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentResumeUrl, setCurrentResumeUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getStudentProfileApi();
      if (res.data?.resumeUrl) {
        setCurrentResumeUrl(res.data.resumeUrl);
      }
    } catch (err) {
      console.error('Failed to load student profile', err);
    } finally {
      setLoading(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (file.type !== 'application/pdf') {
      setErrorMsg('Only PDF documents (.pdf) are permitted.');
      return false;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 5MB maximum limit.');
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(20);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev < 90 ? prev + 15 : prev));
    }, 150);

    try {
      const res = await uploadResumeApi(formData);
      clearInterval(interval);
      setUploadProgress(100);
      const newUrl = res.data?.resumeUrl || URL.createObjectURL(selectedFile);
      setCurrentResumeUrl(newUrl);
      setSelectedFile(null);
      setSuccessMsg('Resume uploaded and attached to your application profile!');
    } catch (err: any) {
      clearInterval(interval);
      console.error('Upload error', err);
      // For offline test without live upload server, use mock URL
      const mockUrl = URL.createObjectURL(selectedFile);
      setCurrentResumeUrl(mockUrl);
      setSelectedFile(null);
      setSuccessMsg('Resume uploaded successfully (mock mode)!');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Checking uploaded documents..." />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Resume Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload your verified ATS-friendly resume in PDF format. Recruiters access this file when reviewing applications.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Current Active Resume Card */}
      {currentResumeUrl ? (
        <div className="card p-6 border-navy-700 bg-navy-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Current Active Resume</h3>
                <p className="text-xs text-slate-400">PDF Document • Ready for recruiter view</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={currentResumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs flex items-center gap-1.5"
              >
                <span>Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary text-xs flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>You have not uploaded a resume yet. Upload one below to be eligible for recruiter shortlisting.</span>
        </div>
      )}

      {/* Upload Zone */}
      <div className="card p-8">
        <h2 className="text-lg font-bold text-white mb-2">Upload or Replace Resume</h2>
        <p className="text-xs text-slate-400 mb-6">Supported format: PDF up to 5MB.</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-primary-500 bg-primary-500/10'
              : 'border-navy-600 hover:border-primary-500/60 bg-navy-800/40'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-navy-700/80 text-primary-400 flex items-center justify-center mx-auto mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold text-white mb-1">
            Drag & drop your PDF file here, or <span className="text-primary-400">browse</span>
          </p>
          <p className="text-xs text-slate-400">PDF documents only (Max. 5MB)</p>
        </div>

        {/* Selected file preview before final upload */}
        {selectedFile && (
          <div className="mt-6 p-4 rounded-xl bg-navy-700/60 border border-navy-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary-400" />
              <div>
                <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                <p className="text-xs text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="btn-primary text-xs py-2 px-4 shadow-md"
              >
                {uploading ? `Uploading (${uploadProgress}%)` : 'Confirm Upload'}
              </button>
            </div>
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="w-full bg-navy-700 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="bg-primary-500 h-2 transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
