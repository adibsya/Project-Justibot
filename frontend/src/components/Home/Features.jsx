import React from 'react'
import { Button } from "flowbite-react"
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Features = () => {
  return (
    <div className="flex flex-col items-center mx-auto py-60 bg-onPrimary">
      <h2 className="text-3xl font-bold mb-10 text-onSurface">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="max-w-xs py-5 px-10 bg-surface shadow-lg">
          <img src={assets.feature_chatbot} alt="chatbot" className='w-[45px] mb-4' />
          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            AI-Powered Chatbot
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Get instant answers to your legal questions with our AI-powered chatbot. Available 24/7 to assist you.
          </p>
          <Link to="/chatbot">
            <Button className='bg-secondary text-onPrimary flex items-center'>
              Learn More
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="max-w-xs py-5 px-10 bg-surface shadow-lg">
          <img src={assets.feature_document} alt="document" className='w-[45px] mb-4' />
          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            Document Assistance
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Receive guidance on legal documents, contracts, and forms. Our service ensures your documents are in order.
          </p>
          <Link to="/document">
            <Button className='bg-secondary text-onPrimary flex items-center'>
              Learn More
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="max-w-xs py-5 px-10 bg-surface shadow-lg">
          <img src={assets.feature_lawyer} alt="lawyer" className='w-[45px] mb-4' />
          <h5 className="text-lg font-bold tracking-tight text-onSurface mb-2">
            Connect with Lawyers
          </h5>
          <p className="font-light text-sm text-textSecondary mb-10">
            Connect with qualified lawyers for personalized legal advice and representation. Get the help you need.
          </p>
          <Link to="/lawyer">
            <Button className='bg-secondary text-onPrimary flex items-center'>
              Learn More
              <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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