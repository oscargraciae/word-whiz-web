import React from "react";
import { FiX } from 'react-icons/fi'

interface ModalProps {
  children?: any
  isOpen: boolean
  onClose: any
}

interface ModalBodyProps {
  children?: any
}

interface ModalHeaderProps {
  children?: any
}

interface ModalFooterProps {
  children?: any
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* <div className='fixed inset-0 z-10 overflow-y-auto' aria-labelledby="modal-title" role="dialog" aria-modal="true"> */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center bg-transparent">
        {/* OVERLAY */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        {/* MODAL */}
        {/* <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> */}
        <div className="text-left w-[500px] transform bg-white rounded-lg shadow-xl">
          <div className="text-right">
            <button className="p-2 m-2 mb-0 rounded-full hover:bg-gray-100" onClick={onClose}><FiX /></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="px-6 py-4">
      <h3
        className="text-lg font-medium leading-6 text-gray-900"
        id="modal-title"
      >
        Deactivate account
      </h3>
    </div>
  );
};

export const ModalBody = ({ children }: ModalBodyProps) => {
  return (
    <div className="px-6 py-4">
      <div className="">
        <div className="mt-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Deactivate
      </button>
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Cancel
      </button>
    </div>
  );
};
