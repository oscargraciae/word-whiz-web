import React from "react";
import { FiPlus } from "react-icons/fi";
import { useNewItemContext } from "../../../../context/NewItemContext";
import { Loading } from "../../../general/Loading";

type ItemProp = {
  icon: React.ReactNode;
  title: string;
  background: string;
}

interface ItemGridProps {
  data: ItemProp[];
}

export const ItemsGrid = ({ data }: ItemGridProps) => {
  const { handleSelctedItem } = useNewItemContext()
  return (
    <div className="h-[360px] overflow-y-auto scro">
      <div className="grid grid-cols-2 gap-2 px-0">
        {!data && <Loading />}
        {data.map((item, index) => {
          return (
            <div key={index} className="flex items-center px-0 py-3 pr-3 border rounded-2xl hover:border-indigo-200" onClick={() => handleSelctedItem(item)}>
              <div
                style={{ backgroundColor: item.background }}
                className="flex items-center justify-center w-12 h-12 mx-3 text-white bg-blue-600 rounded-2xl"
              >
                {item.icon}
              </div>
              <div className="flex-auto">{item.title}</div>
              <div><FiPlus /></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
