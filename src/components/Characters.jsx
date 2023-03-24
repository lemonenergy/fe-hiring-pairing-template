import styled, { css } from "styled-components";

const Card = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 160px;
    padding: 16px;
    border: 1px solid #eee;
    flex: 0 0 20%;
    border-radius: 6px;

    img {
      width: 80%;
    }
  `
);

export const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

export const CharacterCard = ({ character }) => {
  if (!character || !character.name) return null;

  return (
    <Card>
      <img src={character?.image} alt={character.name} />
      <h4>{character.name}</h4>
      <div>
        <p>Status: {character.status}</p>
        <p>Gender: {character.gender}</p>
        <p>Species: {character.species}</p>
      </div>
    </Card>
  );
};
