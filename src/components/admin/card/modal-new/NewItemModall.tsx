import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  NewItemProvider,
  useNewItemContext,
} from "../../../../context/NewItemContext";
import { ItemFormStep } from "./ItemFormStep";
import { SearchStep } from "./SearchStep";

interface NewItemModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NewItemModal = ({ isOpen, setIsOpen }: NewItemModal) => {
  const [step, setStep] = useState(1);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[600px] p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Añadir elemento
                </Dialog.Title>
                <NewItemProvider setStep={setStep} step={step}>
                  { step === 1 ? <SearchStep /> : <ItemFormStep /> }
                </NewItemProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
