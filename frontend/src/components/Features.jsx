import React from 'react'
import { Button } from "flowbite-react"
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Features = () => {
  return (
    <div className="flex justify-center mx-auto py-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="max-w-sm py-7 px-5 bg-white shadow-lg">
          <img src={assets.feature_chatbot} alt="chatbot" className='w-[55px] mb-4' />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            AI-Powered Chatbot
          </h5>
          <p className="font-normal text-gray-700 mb-10">
            Get instant answers to your legal questions with our AI-powered chatbot. Available 24/7 to assist you.
          </p>
          <Link to="/chatbot">
            <Button className='bg-[#B9AB99] text-black'>
              Learn More
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="max-w-sm py-7 px-5 bg-white shadow-lg">
          <img src={assets.feature_document} alt="document" className='w-[55px] mb-4' />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            Document Assistance
          </h5>
          <p className="font-normal text-gray-700 mb-10">
            Receive guidance on legal documents, contracts, and forms. Our service ensures your documents are in order.
          </p>
          <Link to="/document">
            <Button className='bg-[#B9AB99] text-black'>
              Learn More
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="max-w-sm py-7 px-5 bg-white shadow-lg">
          <img src={assets.feature_lawyer} alt="lawyer" className='w-[55px] mb-4' />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
            Connect with Lawyers
          </h5>
          <p className="font-normal text-gray-700 mb-10">
            Connect with qualified lawyers for personalized legal advice and representation. Get the help you need.
          </p>
          <Link to="/lawyer">
            <Button className='bg-[#B9AB99] text-black'>
              Learn More
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Features