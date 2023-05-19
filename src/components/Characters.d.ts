import React from "react";

export const CharacterCard: React.FC<{
  characater: {
    id: string;
    name: string;
    image: string;
    species: string;
    gender: string;
    status: string;
  };
}>;
