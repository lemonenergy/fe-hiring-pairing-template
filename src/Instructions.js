import { useReducer, useState } from "react";
import styled from "styled-components";

const mainInstruction = (
  <>
    <p>
      Hoje nós vamos criar uma tela com funcionalidade de pesquisa, filtros e
      paginação para a{" "}
      <a
        href="https://rickandmortyapi.com/documentation"
        target="_blank"
        rel="noreferrer"
      >
        API do Rick and Morty
      </a>
      .
    </p>

    <ul>
      <li>🙋🏽 Pergunte quanto e o que quiser; </li>
      <li>💭 Verbalize seus pensamentos; </li>
      <li>
        ⏱ Não se preocupe com o tempo nem com quantas atividades conseguir
        realizar;
      </li>
      <li>
        👷‍♀️ Não é necessária a realização de testes automatizados, mas tente
        validar o máximo que conseguir, como se esta aplicação fosse para
        produção;
      </li>
      <li>📚 Você pode utilizar quantas libs quiser; </li>
      <li>🔍 Pode pesquisar o quanto quiser; </li>
    </ul>

    <p>
      A API é acessada através da url base:{" "}
      <code>https://rickandmortyapi.com/api</code>
    </p>
    <p>
      Durante nosso exercício só utilizaremos o endpoint{" "}
      <a
        href="https://rickandmortyapi.com/documentation/#character"
        target="_blank"
        rel="noreferrer"
      >
        /characters
      </a>{" "}
      e seus filtros.
    </p>
    <p>
      {" "}
      Durante nosso exercício, você só precisará alterar os arquivos{" "}
      <code>Search.js</code> e <code>components/Pagination</code>{" "}
    </p>
  </>
);
const showCharacters = (
  <>
    <span>
      Através de um requisição HTTP para o endpoint citado acima, obtenha a
      lista de dados dos personagens do Rick and Morty, as informações sobre
      paginação e os aprensente.
    </span>
    <ul>
      <li>
        Se a API retorna código 500, continue apresentando a mensagem "Nenhum
        personagem encontrado" na tela e utilize <code>console.log</code> para
        apresentar o erro
      </li>
      <li>
        Utilize a propriedade <code>info</code> da resposta da API para
        preencher a props <code>total</code> do componente{" "}
        <code>{"<Pagination />"}</code> com o número total de personagens para
        essa pesquisa.
      </li>

      <li>
        Para cada personagem, utilize o componente{" "}
        <code>{"<CharacterCard />"}</code> para apresentar seus dados.
        <code>{"<CharacterCard />"}</code> recebe apenas uma props{" "}
        <code>character</code> que é o objeto representando um personagem
        retornado pela API.
        <pre>
          {
            "<CharacterCard character={{ id: 1, name: 'Rick', gender: 'Male', status: 'alive' }}/>"
          }
        </pre>
      </li>
      <li>
        Para apresentar múltiplos <code>{"<CharacterCard />"}</code>, utilize o
        componente <code>{"<CharacterList />"}</code> da seguinte forma:
        <pre>
          {`<CharacterList>`}
          <br />
          &ensp;{`<CharacterCard />`}
          <br />
          &ensp;{`<CharacterCard />`}
          <br />
          &ensp;...
          <br />
          {`</CharacterList>`}
          <br />
        </pre>
      </li>
    </ul>
  </>
);
const searchByName = (
  <>
    <span>
      Implemente a pesquisa por nome utilizando os{" "}
      <a
        href="https://rickandmortyapi.com/documentation/#filter-characters"
        target="_blank"
        rel="noreferrer"
      >
        filtros
      </a>{" "}
      da API. Cada vez que o input de pesquisa for alterado, avalie a
      necessidade e faça uma nova requisição HTTP para API filtrando os
      resultados pelo nome inputado, de acordo com as regras abaixo:
    </span>
    <ul>
      <li>
        Se a API retornar qualquer status > 300, apresente a mensagem "Nenhum
        personagem encontrado :(" e imprima o erro no console;
      </li>
      <li>
        Quando o campo de pesquisa estiver vazio ou quando o seu valor tiver 2
        caracteres ou menos, apresente os resultados da API sem filtro algum;
      </li>
      <li>
        Quando o campo de pesquisa estiver preenchido com mais de 2 caracteres,
        apresente os resultados da API filtrados;
      </li>
      <li>
        O comportamento descrito acima também deve acontecer quando o usuário
        estiver apagando o campo de pesquisa;
      </li>
    </ul>
  </>
);
const paginationWithoutSearch = (
  <>
    <span>
      Implemente a funcionalidade de paginação utilizando o filtro de{" "}
      <a
        href="https://rickandmortyapi.com/documentation/#info-and-pagination"
        target="_blank"
        rel="noreferrer"
      >
        paginação
      </a>{" "}
      da API e o componente <code>{"<Pagination />"}</code>. Por enquanto,
      desconsidere o campo de pesquisa.
    </span>
    <ul>
      <li>
        Mantenha o mesmo comportamento dos exercícios anteriores para possíveis
        erros da API
      </li>
      <li>
        O componente <code>{"<Pagination />"}</code> não deve conter nenhuma
        lógica de negócio. Este é apenas um componente de visualização da
        interface de paginação e atualmente recebe as props:
        <ul>
          <li>
            <code>current</code> - página atual;
          </li>
          <li>
            <code>total</code> - total de páginas;
          </li>
        </ul>
        <p>
          Altere sua implementação para que o componente{" "}
          <code>{"<Search />"}</code> possa fazer uma nova requisição à API
          quando o usuário clicar nos botões "{"<<"}" e "{">>"}"
        </p>
      </li>
    </ul>
  </>
);
const paginationWithSearch = (
  <>
    <span>Integre o campo de pesquisa com a funcionalidade de paginação.</span>
    <ul>
      <li>
        Se o campo de pesquisa estiver preenchido com mais de 2 caracteres, a
        paginação deve representar o estado daquela pesquisa;
      </li>
      <li>
        Ao apagar o campo, deve-se apresentar a mesma página em que o usuário
        estava quando começou a digitar o campo.
      </li>
    </ul>
    <p>
      Exemplo, se o campo estiver vazio e eu navegar até a página 10 e depois
      escrever o termo "Morty" no campo de pesquisa, eu espero que seja
      apresentado a primeira página dos resultados da pesquisa deste termo e que
      eu possa navegar entre as páginas deste resultado através do componente{" "}
      <code>{"<Pagination />"}</code>.
    </p>
    <p>
      Se eu apagar o termo do input, quando o campo estiver preenchido com o
      termo "Mo", eu espero que seja apresentada a 10 página de todos os
      personagens
    </p>
  </>
);
const queryParams = (
  <>
    <span>
      Para qualquer alteração de página ou do campo de pesquisa, altere a URL
      para apresentar a o termo pesquisado e a página atual nos query params{" "}
      <code>s</code> e <code>p</code>, respectivamente.
    </span>
    <p>
      Ex: quando o usuário pesquisar a palavra "ric" e clicar até a página 2, a
      URL deve apresentar o seguinte sufixo: <code>?s=ric&p=2</code>.
    </p>
  </>
);
const searchViaUrl = (
  <>
    <span>Habilite a pesquisa via URL</span>
    <p>
      Ao entrar na página com os query params <code>p</code> e/ou <code>s</code>
      , apresentar os resultados referentes.
    </p>
    <ul>
      <li>
        Manter os mesmos comportamentos de erro, caso a API retorne erro para os
        valores dos query params
      </li>
    </ul>
  </>
);

const instructions = [
  showCharacters,
  searchByName,
  paginationWithoutSearch,
  paginationWithSearch,
  queryParams,
  searchViaUrl
];

const getCookie = () => {
  const [match] = document.cookie.match(/completed=.*(;|$)/) || [];

  if (!match) return 0;

  const [, value] = match.split("=").map((str) => str.trim().replace(";", ""));
  return Number(value);
};
const Container = styled.div`
  box-sizing: border-box;
  overflow: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  padding: 16px 32px;
  background-color: #fff;
  box-shadow: 0 -5px 4px rgba(0, 0, 0, 0.2);

  a {
    color: #005230;
  }

  pre,
  code {
    overflow: auto;
    color: #008059;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: #ededed;
    letter-spacing: 0.02rem;
  }

  > hr {
    margin: 32px 0;
  }

  > button {
    border: 0;
    background-color: transparent;
    padding: 0;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  > h3 {
    text-align: center;
  }

  > ul {
    list-style: none;
  }

  > ol,
  > ul {
    padding: 0 32px;

    > li {
      &:not(:last-child) {
        margin-bottom: 16px;
      }

      > label {
        > span {
          font-size: 1rem;
          cursor: pointer;
        }

        > ul {
          margin-top: 8px;
          > li {
            margin-bottom: 8px;
          }
        }

        > input {
          margin-right: 4px;
        }

        > input:checked ~ * {
          font-size: 0.5rem !important;
        }
      }
    }
  }
`;

const Instructions = () => {
  const [isOpen, toggle] = useReducer((st) => !st, false);
  const [completed, setCompleted] = useState(getCookie());

  const handleCheck = (ev) => {
    setCompleted((c) => {
      const comp = ev.target.checked ? c + 1 : c - 1;
      document.cookie = `completed=${comp}`;
      return comp;
    });
  };

  return (
    <Container>
      <button onClick={toggle}>Instruções</button>
      {isOpen && (
        <>
          {mainInstruction}
          <hr />
          <h3>Exercícios:</h3>
          <p>
            Ao finalizar uma das tarefas, clique no check para aparecer a
            próxima:
          </p>
          <ol>
            {instructions.slice(0, completed + 1).map((i, index) => (
              <li>
                <label id={`instruction-${i}`}>
                  <input
                    onChange={handleCheck}
                    type="checkbox"
                    htmlFor={`instruction-${i}`}
                    disabled={index < completed - 1}
                    checked={index < completed}
                  />
                  {i}
                </label>
              </li>
            ))}
          </ol>
          {instructions.length === completed && (
            <h3>Parabéns, você completou todas as atividades!!!! 🎉🍋</h3>
          )}
        </>
      )}
    </Container>
  );
};

export default Instructions;
