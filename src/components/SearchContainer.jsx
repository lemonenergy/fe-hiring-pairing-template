import styled from "styled-components";
import Pagination from "./Pagination";
import { CharacterList } from "./Characters";

const SearchContainer = styled.div`
  padding: 32px;
  margin-bottom: 48px;

  > input {
    display: block;
    width: 100%;
    border-radius: 6px;
    padding: 16px 20px;
    margin-bottom: 32px;
    box-sizing: border-box;
  }

  ${Pagination} {
    margin-top: 32px;
  }

  ${CharacterList} {
    text-align: center;
  }
`;

export default SearchContainer;
