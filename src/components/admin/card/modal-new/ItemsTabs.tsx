import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { SocialLinks } from "../../../../constants/social-links";
import { FiPlus } from "react-icons/fi";
import { PopularTab } from "./PopularTab";
import { SocialNetworksTab } from "./SocialNetworksTab";
import { ContactTab } from "./ContactTab";
import { AllItemsTab } from "./AllItemsTab";

export const ItemsTabs = () => {
  return (
    <Tab.Group>
      <Tab.List className='text-sm'>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={`${selected ? 'border-blue-500' : ''} border-b-2 px-4 pb-3`}>Populares</button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={`${selected ? 'border-blue-500' : ''} border-b-2 px-4 pb-3`}>Redes sociales</button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={`${selected ? 'border-blue-500' : ''} border-b-2 px-4 pb-3`}>Datos de contacto</button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button className={`${selected ? 'border-blue-500' : ''} border-b-2 px-4 pb-3`}>Otros sitios web</button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className='pt-4 border-t-2'>
        <Tab.Panel>
          <PopularTab />
        </Tab.Panel>
        <Tab.Panel>
          <SocialNetworksTab />
        </Tab.Panel>
        <Tab.Panel>
          <ContactTab />
        </Tab.Panel>
        <Tab.Panel>
          <AllItemsTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

// const ButtonTab = ({ selected, text }: { selected: boolean, text: string }) => <button className={`${selected ? 'border-blue-500' : ''} border-b-2 px-4 pb-3`}>{text}</button>
