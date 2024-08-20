import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div>
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Open'} Menu
      </button>

      <motion.div 
        className="fixed top-0 left-0 h-full w-72 bg-gray-800 text-white shadow-lg z-10"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        {/* Sidebar Content */}
        <div className="p-6">
          <div className="text-lg font-bold py-4 border-b border-gray-700">
            Hello, sign in
          </div>

          <div className="py-4">
            <h3 className="text-md font-bold text-gray-400">Digital Content & Devices</h3>
            <ul className="mt-2">
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Amazon Music <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Kindle E-readers & Books <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Amazon Appstore <span>›</span>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h3 className="text-md font-bold text-gray-400">Shop by Department</h3>
            <ul className="mt-2">
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Electronics <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Computers <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Smart Home <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Arts & Crafts <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                See all <span>›</span>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h3 className="text-md font-bold text-gray-400">Programs & Features</h3>
            <ul className="mt-2">
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Gift Cards <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Shop By Interest <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Amazon Live <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                International Shopping <span>›</span>
              </li>
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                See all <span>›</span>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h3 className="text-md font-bold text-gray-400">Help & Settings</h3>
            <ul className="mt-2">
              <li className="py-2 hover:bg-gray-700 px-2 rounded flex justify-between items-center">
                Your Account <span>›</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-0" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
