'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  Bike, 
  AlertTriangle,
  RefreshCcw,
  PenTool,
  Calendar,
  User,
  Check
} from 'lucide-react';
import SignatureCanvas, { SignatureCanvasRef } from '@/components/SignatureCanvas';
import WaiverDocument from '@/components/WaiverDocument';
import { Language, waiverContent, getNextLanguage } from '@/lib/waiver-content';

const LOGO_URL = "https://images.squarespace-cdn.com/content/v1/5622cd82e4b0501d40689558/cdab4aef-0027-40b7-9737-e2f893586a6a/Hopes_Corner_Logo_Green.png?format=500w";

// Generate a unique document ID
const generateDocumentId = () => {
  return `WVR-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

export default function WaiverForm() {
  const [language, setLanguage] = useState<Language>('en');
  const [participantName, setParticipantName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{name?: string; signature?: string; agreement?: string}>({});
  const [documentId, setDocumentId] = useState('');
  
  const signatureRef = useRef<SignatureCanvasRef>(null);
  const waiverDocRef = useRef<HTMLDivElement>(null);
  const content = waiverContent[language];

  const handleLanguageSwitch = () => {
    setLanguage(getNextLanguage(language));
  };

  const handleSignatureChange = useCallback((hasSig: boolean, dataUrl: string) => {
    setHasSignature(hasSig);
    setSignatureData(dataUrl);
    if (hasSig) {
      setErrors(prev => ({ ...prev, signature: undefined }));
    }
  }, []);

  const handleClearSignature = () => {
    signatureRef.current?.clear();
    setHasSignature(false);
    setSignatureData('');
  };

  const capitalizeWords = (str: string): string => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleNameBlur = () => {
    setParticipantName(capitalizeWords(participantName));
  };

  const validateForm = (): boolean => {
    const newErrors: {name?: string; signature?: string; agreement?: string} = {};
    
    if (!participantName.trim()) {
      newErrors.name = content.requiredField;
    }
    
    if (!hasSignature) {
      newErrors.signature = content.pleaseSign;
    }
    
    if (!agreed) {
      newErrors.agreement = content.pleaseAgree;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const timestamp = new Date().toISOString();
      const dateStr = new Date().toISOString().slice(0, 10);
      
      // Generate a unique document ID for this submission
      const newDocumentId = generateDocumentId();
      setDocumentId(newDocumentId);
      
      // Wait for the document component to render with the new ID
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Generate the waiver document screenshot
      let waiverDocumentData = '';
      if (waiverDocRef.current) {
        try {
          const canvas = await html2canvas(waiverDocRef.current, {
            scale: 2, // Higher resolution for better quality
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
          });
          waiverDocumentData = canvas.toDataURL('image/png', 1.0);
        } catch (err) {
          console.error('Error generating waiver document screenshot:', err);
        }
      }
      
      const response = await fetch('/api/submit-waiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantName,
          language,
          signatureData,
          timestamp,
          date: dateStr,
          waiverDocumentData,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Waiver submitted:', result);
        setIsSubmitted(true);
      } else {
        console.error('Submission failed:', result.error);
        // Still show success to user - data may not have been stored but waiver was acknowledged
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Still show success to user in case of network issues
      setIsSubmitted(true);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleSubmitAnother = () => {
    setParticipantName('');
    setAgreed(false);
    setHasSignature(false);
    setSignatureData('');
    setIsSubmitted(false);
    setErrors({});
    setDocumentId('');
    signatureRef.current?.clear();
  };

  const currentDate = new Date().toLocaleDateString(
    language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'zh-CN',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  // Generate timestamp for the waiver document preview
  const currentTimestamp = new Date().toISOString();

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-800 p-8 text-center">
              <div className="bg-white rounded-lg p-4 inline-block mb-4 shadow-md">
                <Image 
                  src={LOGO_URL}
                  alt="Hope's Corner Logo"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-xl font-semibold text-white mb-1">{content.logoText1}</h1>
              <p className="text-slate-300 text-sm font-medium tracking-wide">{content.logoSubtext}</p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-3">
                  {content.successMessage}
                </h2>
                <p className="text-slate-500 mb-6 text-sm">
                  {participantName} — {currentDate}
                </p>
                <button
                  onClick={handleSubmitAnother}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <RefreshCcw className="w-4 h-4" />
                  {content.submitAnother}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-slate-800 p-6 md:p-8 relative">
            <button
              onClick={handleLanguageSwitch}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-slate-200 text-sm font-medium transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              {content.switchButton}
            </button>
            
            <div className="text-center pt-2">
              <div className="bg-white rounded-lg p-4 inline-block mb-4 shadow-md">
                <Image 
                  src={LOGO_URL}
                  alt="Hope's Corner Logo"
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain"
                  unoptimized
                />
              </div>
              <h1 className="text-xl font-semibold text-white mb-1">{content.logoText1}</h1>
              <p className="text-slate-300 text-sm font-medium tracking-wide">{content.logoSubtext}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <h2 className="text-xl font-semibold text-slate-800 text-center mb-8 leading-snug">
              {content.title}
            </h2>

            <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed">
              <p className="mb-5 text-sm">{content.intro}</p>

              <ol className="space-y-3 list-decimal pl-5 text-sm">
                <li>{content.points[0]}</li>
                <li>{content.points[1]}</li>
                <li>
                  {content.points[2]}
                  <ol className="mt-2 space-y-1.5 list-[lower-alpha] pl-4">
                    {content.subPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ol>
                </li>
              </ol>

              <hr className="my-6 border-slate-200" />

              <p className="mb-3 text-sm">{content.volunteerClause}</p>
              <p className="mb-3 text-sm">{content.indemnifyClause}</p>
              <p className="mb-5 text-sm">{content.releaseClause}</p>

              <div className="bg-amber-50/70 border-l-3 border-amber-500 rounded-r-lg p-4 mb-6">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 font-medium text-xs leading-relaxed">
                    {content.finalAgreement}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                {/* Agreement Checkbox */}
                <div className="mb-5">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          if (e.target.checked) {
                            setErrors(prev => ({ ...prev, agreement: undefined }));
                          }
                        }}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        agreed 
                          ? 'bg-teal-600 border-teal-600' 
                          : 'bg-white border-slate-300 group-hover:border-slate-400'
                      }`}>
                        {agreed && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {content.agreementCheck}
                    </span>
                  </label>
                  {errors.agreement && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.agreement}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 font-medium text-sm mb-2">
                      <User className="w-4 h-4 text-slate-400" />
                      {content.printNameLabel}
                    </label>
                    <input
                      type="text"
                      value={participantName}
                      onChange={(e) => {
                        setParticipantName(e.target.value);
                        if (e.target.value.trim()) {
                          setErrors(prev => ({ ...prev, name: undefined }));
                        }
                      }}
                      onBlur={handleNameBlur}
                      placeholder="Enter your full name"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                        errors.name 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-slate-200 focus:border-teal-500 hover:border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Date Display */}
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 font-medium text-sm mb-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {content.dateLabel}
                    </label>
                    <div className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm">
                      {currentDate}
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="mt-5">
                  <label className="flex items-center gap-2 text-slate-700 font-medium text-sm mb-2">
                    <PenTool className="w-4 h-4 text-slate-400" />
                    {content.signatureLabel}
                  </label>
                  
                  <div className={`bg-white border border-dashed rounded-lg p-3 transition-all duration-200 ${
                    errors.signature ? 'border-red-400' : 'border-slate-300 hover:border-slate-400'
                  }`}>
                    <SignatureCanvas 
                      ref={signatureRef}
                      onSignatureChange={handleSignatureChange}
                    />
                    
                    <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleClearSignature}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md text-sm transition-colors duration-200"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {content.clearSignature}
                      </button>
                      
                      {hasSignature && (
                        <span className="flex items-center gap-1.5 text-teal-600 font-medium text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          {content.signatureCaptured}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-400 text-xs mt-2.5 text-center">
                      ✍️ {content.signatureHint}
                    </p>
                  </div>
                  
                  {errors.signature && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.signature}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium py-3 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Bike className="w-4 h-4" />
                        {content.submitButton}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-slate-400 text-xs py-4 border-t border-slate-100">
            Hope&apos;s Corner, Inc. Bicycle Program Waiver
          </div>
        </div>
      </div>

      {/* Hidden Waiver Document for Screenshot Capture */}
      <WaiverDocument
        ref={waiverDocRef}
        participantName={participantName}
        language={language}
        signatureDataUrl={signatureData}
        timestamp={currentTimestamp}
        agreed={agreed}
        documentId={documentId}
      />
    </div>
  );
}
