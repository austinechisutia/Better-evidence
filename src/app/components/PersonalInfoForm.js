'use client';

import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import React, { useCallback, useState, useEffect } from 'react';
import 'survey-core/survey-core.css';

const surveyJSON = {
  title: "Personal Information",
  // 1. REMOVE BUILT-IN PROGRESS BAR SETTINGS
  // showProgressBar: "top",  <-- Removed
  // progressBarType: "buttons", <-- Removed
  
  showCompletedPage: false,
  showNavigationButtons: false,
  pages: [{
    name: "personalInfo",
    elements: [
      { type: "panel", name: "namePanel", elements: [
          { type: "text", name: "firstName", title: "First Name", placeholder: "Enter your first name", isRequired: true },
          { type: "text", name: "lastName", title: "Last Name", placeholder: "Enter your first name", isRequired: true }
        ], questionsOrder: "row"
      },
      { type: "dropdown", name: "titleDegree", title: "Title/Degree", placeholder: "Select your title/degree",
        choices: [ "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Bachelor's Degree", "Master's Degree", "PhD", "Other" ]
      },
      { type: "radiogroup", name: "gender", title: "Gender",
        choices: [ { value: "male", text: "Male" }, { value: "female", text: "Female" }, { value: "prefer-not-to-say", text: "Prefer not to say" } ],
        colCount: 3
      },
      { type: "text", name: "email", title: "Email Address", isRequired: true, inputType: "email", validators: [{ type: "email" }] },
      { type: "text", name: "phone", title: "Phone Number", placeholder: "123 456 7890", inputType: "tel" },
      { type: "boolean", name: "whatsappUpdates", title: "Receive Updates on WhatsApp", labelTrue: "Yes", labelFalse: "No", defaultValue: false, colCount: 2 },
      { type: "text", name: "whatsappNumber", title: "WhatsApp Number", placeholder: "123 456 7890", inputType: "tel" }
    ]
  },
  // Second page to demonstrate progress bar and navigation
  {
      name: "addressInfo",
      elements: [
          { type: "text", name: "streetAddress", title: "Street Address", isRequired: true },
          { type: "text", name: "city", title: "City", isRequired: true },
          { type: "text", name: "zipCode", title: "Zip Code", isRequired: true }
      ]
  },
  // Third page
  {
      name: "confirmation",
      elements: [
          { type: "comment", name: "comments", title: "Any additional comments?" }
      ]
  }
]
};

export default function PersonalInfoForm() {
  const [currentPage, setCurrentPage] = useState(0); // State for force re-rendering on page change
  const survey = new Model(surveyJSON);

  // Initialize the state based on the survey model
  const totalSteps = survey.pageCount;
  const currentStep = survey.currentPageNo + 1; // 1-based index
  const progress = ((currentStep / totalSteps) * 100);

  // 2. USE useEffect to subscribe to page changes and update the state
  useEffect(() => {
    const pageChangeHandler = () => {
      // Force an update to re-calculate currentStep and progress
      setCurrentPage(survey.currentPageNo); 
    };

    // Use onCurrentPageChanged to track page changes
    survey.onCurrentPageChanged.add(pageChangeHandler);
    
    // Cleanup function
    return () => {
      survey.onCurrentPageChanged.remove(pageChangeHandler);
    };
  }, [survey]);


  // Apply theme
  survey.applyTheme({
    cssVariables: {
      "--primary": "#000000",
      "--primary-light": "#404040",
      "--background": "#ffffff",
      "--background-dim": "#f5f5f5",
      "--foreground": "#000000",
      "--base-unit": "8px"
    }
  });

  // Completion Handler
  survey.onComplete.add((sender) => {
    console.log("Survey results: ", sender.data);
    alert("Survey Completed! Check console for data.");
  });

  // Navigation handlers
  const goBack = useCallback(() => {
    if (survey.isCurrentPageFirst) return;
    survey.prevPage();
    // No need to manually update state here, useEffect handles it
  }, [survey]);

  const goNext = useCallback(() => {
    survey.nextPage();
    // No need to manually update state here, useEffect handles it
  }, [survey]);

  // Derived state based on the model (re-calculates when 'currentPage' state updates)
  const showBackButton = !survey.isCurrentPageFirst;
  const isLastPage = survey.isCurrentPageLast;
  
  // Re-calculate derived values using the current model state
  const displayedCurrentStep = survey.currentPageNo + 1;
  const displayedProgress = ((displayedCurrentStep / totalSteps) * 100);


  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* 3. CUSTOM PROGRESS BAR */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="mb-2 text-sm text-gray-600">
          Step {displayedCurrentStep} of {totalSteps}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${displayedProgress}%` }}
          />
        </div>
      </div>
      
      <Survey model={survey} />
      
      {/* CUSTOM FOOTER */}
      <footer className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            className={`px-6 py-2 rounded-lg text-gray-700 font-medium ${
                showBackButton
                  ? 'bg-gray-300 hover:text-gray-900'
                  : 'bg-gray-100 cursor-not-allowed text-gray-400'
            }`}
            onClick={goBack}
            disabled={!showBackButton}
          >
            Back
          </button>
          
          <button 
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 font-medium"
            onClick={goNext}
          >
            {isLastPage ? "Finish" : "Next Step"}
          </button>
        </div>
        <button className="text-gray-600 hover:text-gray-800 text-sm justify-center text-center items-center mt-4 w-full">
          Save & Finish later
        </button>
      </footer>
    </div>
  );
}