

"use client";
import React, { useState } from 'react';


export default function Steps() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      <div className="mb-2 text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
      
      <div className="w-full  bg-gray-200 rounded-full h-2">
        <div 
          className="bg-black h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}