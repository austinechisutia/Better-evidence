export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <button className="px-6 py-2 bg-gray-300 rounded-lg text-gray-700 hover:text-gray-900 font-medium">
          Back
        </button>
        
        
        
        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 font-medium">
          Next Step
        </button>
      </div>
      <button className="text-gray-600 hover:text-gray-800 text-sm justify-center text-center items-center mt-4 w-full">
         Save & Finish later
        </button>
    </footer>
  );
}