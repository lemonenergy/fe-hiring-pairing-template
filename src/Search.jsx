import { CharacterList } from "./components/Characters";
import Pagination from "./components/Pagination";
import SearchContainer from "./components/SearchContainer";

const Search = () => {
  return (
    <SearchContainer>
      <h1>Rick and Morty</h1>
      <input placeholder="Pesquisa por nome" />
      <CharacterList>
        <p>Nenhum personagem encontrado :( </p>
      </CharacterList>
      <Pagination />
    </SearchContainer>
  );
};

export default Search;
