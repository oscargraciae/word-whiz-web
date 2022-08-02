import React from "react";
import { FiPlus } from "react-icons/fi";
import { SocialLinks } from "../../../../constants/social-links";
import { ItemsGrid } from "./ItemsGrid";

export const PopularTab = () => {
  const popular = SocialLinks.filter((item) => item.isPopular);
  return (
    <ItemsGrid data={popular} />
  )
}
