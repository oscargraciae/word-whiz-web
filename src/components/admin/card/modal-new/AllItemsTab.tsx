import React from "react";
import { SocialLinks } from "../../../../constants/social-links";
import { ItemsGrid } from "./ItemsGrid";

export const AllItemsTab = () => {
  const data = SocialLinks.filter((item) => item.hasUrl);
  return <ItemsGrid data={data} />
}
