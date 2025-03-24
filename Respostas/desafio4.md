# Desafio 4: Integração entre Pesquisa e Paginação

## Alterações Realizadas

1. Adicionei um novo estado para controle:
   - `lastSearchPage`: Armazena a página em que o usuário estava antes de iniciar uma pesquisa

2. Modifiquei a função `fetchCharacters` para:
   - Usar `URLSearchParams` para construir a query string de forma organizada
   - Incluir parâmetros de página E pesquisa quando necessário
   - Zerar o contador de páginas quando ocorre um erro (para evitar paginação em dados inexistentes)

3. Reimplementei o manipulador de eventos do campo de pesquisa:
   ```javascript
   const handleSearchChange = (e) => {
     const value = e.target.value
     
     // Se começar a digitar, salva a página atual para poder voltar a ela
     if (searchTerm.length <= 2 && value.length > 2) {
       setLastSearchPage(currentPage)
     }
     
     // Se apagar tudo, volta para a página que estava antes da pesquisa
     if (searchTerm.length > 2 && value.length <= 2) {
       setCurrentPage(lastSearchPage)
     } else if (value.length > 2) {
       // Reset para primeira página quando faz uma nova pesquisa
       setCurrentPage(1)
     }
     
     setSearchTerm(value)
   }
   ```

4. Adicionei lógica que:
   - Quando o usuário começa a digitar (passa de 2 para 3+ caracteres): salva a página atual
   - Quando faz nova pesquisa: reseta para página 1
   - Quando apaga o campo (volta para 2 ou menos caracteres): retorna à página original

## Funcionamento

- **Cenário 1**: Usuário na página 10, começa a digitar uma pesquisa
  - Sistema salva que estava na página 10
  - Resultados filtrados são mostrados a partir da página 1
  - Usuário navega para outras páginas dos resultados filtrados
  
- **Cenário 2**: Usuário apaga o termo de pesquisa
  - Sistema volta para a página 10 (onde estava originalmente)
  - Exibe todos os personagens sem filtro

## Observações

- A aplicação mantém um histórico da última página visualizada antes da pesquisa
- A paginação é sensível ao contexto (mostra o número correto de páginas para cada pesquisa)
- Interação natural: novas pesquisas começam na página 1, mas ao limpar voltamos onde estávamos