import React from "react";
import { SocialLinks } from "../../../../constants/social-links";
import { ItemsGrid } from "./ItemsGrid";

export const SocialNetworksTab = () => {
  const socialNetworks = SocialLinks.filter((item) => item.type === 'social-network');

  return (
    <ItemsGrid data={socialNetworks} />
  )
}
