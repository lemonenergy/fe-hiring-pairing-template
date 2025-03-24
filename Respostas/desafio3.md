# Desafio 3: Implementação da Paginação

## Alterações Realizadas

1. Adicionei estados para gerenciar a paginação:
   - `currentPage`: Armazena a página atual (iniciando em 1)
   - `totalPages`: Armazena o número total de páginas disponíveis

2. Modifiquei a função `fetchCharacters` para:
   - Construir a URL com o parâmetro de página: `?page=${currentPage}`
   - Extrair e armazenar o número total de páginas da API: `data.info.pages`
   - Desconsidera o campo de pesquisa, conforme solicitado

3. Implementei o manipulador de eventos para mudança de página:
   ```javascript
   const handlePageChange = (newPage) => {
     setCurrentPage(newPage)
   }
   ```

4. Atualizei o componente `Pagination` para:
   - Receber o prop `onPageChange`
   - Implementar funções para avançar e retroceder páginas
   - Chamar a função `onPageChange` com a nova página quando os botões são clicados

5. Conectei o componente `Pagination` com os estados:
   ```jsx
   <Pagination 
     current={currentPage} 
     pages={totalPages} 
     onPageChange={handlePageChange}
   />
   ```

## Funcionamento

- Quando o usuário clica no botão "<<", a página anterior é carregada
- Quando o usuário clica no botão ">>", a próxima página é carregada
- Os botões são desabilitados quando não há páginas anteriores ou próximas
- A API é chamada automaticamente com o parâmetro de página quando `currentPage` muda
- O contador de página atual/total é exibido no formato "1/42"

## Observações

- A paginação funciona independentemente do termo de pesquisa (conforme solicitado)
- O estado da página é mantido até que uma nova solicitação seja feita
- Tratamento de erros adequado é mantido para todos os cenários