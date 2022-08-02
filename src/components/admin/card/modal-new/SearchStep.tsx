import React, { useState } from "react";
import { SocialLinks } from "../../../../constants/social-links";
import { ItemsGrid } from "./ItemsGrid";
import { ItemsTabs } from "./ItemsTabs";

export const SearchStep = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [resultSearch, setResaultSearch] = useState<any[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    const result = SocialLinks.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setResaultSearch(result)
  }

  return (
    <div className="py-3">
      <div className="py-3 mb-4 space-y-1">
        <input placeholder="Buscar por nombre" className="w-full px-3 py-2 text-sm border rounded-full outline-none" onChange={handleSearch} />
      </div>
      <div>
        { searchText.length > 0
          ? <ItemsGrid data={resultSearch} />
          : <ItemsTabs />
        }
      </div>
    </div>
  )
}
