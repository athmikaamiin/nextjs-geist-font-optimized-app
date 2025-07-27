import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Welcome to Health Report Manager
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Manage your medical reports, get clear explanations for medications, and track your family's health—all in one secure, easy-to-use platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Reports</h3>
          <p className="text-gray-600 mb-4">
            Easily upload your medical reports in PDF format with our drag-and-drop interface.
          </p>
          <Link to="/upload">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              Upload Report
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Management</h3>
          <p className="text-gray-600 mb-4">
            Keep track of your family members' health information and medical history.
          </p>
          <Link to="/family">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
              Manage Family
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Assistant</h3>
          <p className="text-gray-600 mb-4">
            Chat with our AI assistant to get explanations about medications and health questions.
          </p>
          <Link to="/chat">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium">
              Chat with Assistant
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Health Report Manager?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
            <p className="text-gray-600">Your health data is encrypted and stored securely with industry-standard protection.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Easy to Use</h4>
            <p className="text-gray-600">Intuitive interface designed for users of all ages and technical backgrounds.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h4>
            <p className="text-gray-600">Get clear explanations of medical terms and medication information.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Family-Focused</h4>
            <p className="text-gray-600">Manage health information for your entire family in one place.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
