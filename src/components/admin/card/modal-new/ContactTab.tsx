import React from "react";
import { SocialLinks } from "../../../../constants/social-links";
import { ItemsGrid } from "./ItemsGrid";

export const ContactTab = () => {
  const popular = SocialLinks.filter((item) => item.type === 'contact');
  return <ItemsGrid data={popular} />
}
