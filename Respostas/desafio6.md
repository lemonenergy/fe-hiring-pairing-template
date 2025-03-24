# Desafio 6: Pesquisa via URL

## Alterações Realizadas

1. Renomeei a função `getInitialParams` para `getUrlParams` para melhor refletir seu propósito:
   - Extrair parâmetros da URL tanto na inicialização quanto durante a navegação
   - Função agora pode ser reutilizada em outros contextos

2. Adicionei suporte à navegação pelo histórico do navegador:
   ```javascript
   // Manipular eventos de navegação (botão voltar/avançar do navegador)
   useEffect(() => {
     const handlePopState = () => {
       const newParams = getUrlParams()
       setCurrentPage(newParams.page)
       setSearchTerm(newParams.search)
     }

     window.addEventListener('popstate', handlePopState)
     return () => {
       window.removeEventListener('popstate', handlePopState)
     }
   }, [])
   ```

3. Melhorei a lógica de inicialização para usar corretamente os parâmetros da URL:
   - Se houver um termo de pesquisa na URL, ele é exibido no campo de pesquisa
   - Se houver um número de página na URL, essa página é carregada automaticamente

## Funcionamento

1. **Pesquisa direta via URL**:
   - O usuário pode compartilhar uma URL com parâmetros de pesquisa e página
   - Exemplo: `/?p=2&s=rick` carrega automaticamente a página 2 com a pesquisa "rick"
   - A busca pela API é feita automaticamente com esses parâmetros

2. **Navegação pelo histórico**:
   - Os botões voltar/avançar do navegador funcionam corretamente
   - Ao navegar pelo histórico, tanto a pesquisa quanto a página são atualizadas
   - Exemplo: se o usuário navegou de `/?s=rick` para `/?s=morty`, ao clicar em voltar:
     - O campo de pesquisa muda para "rick"
     - Os resultados são atualizados automaticamente

3. **Carregamento inicial**:
   - Quando o usuário acessa a aplicação com uma URL que já contém parâmetros,
     esses parâmetros são usados para o estado inicial da aplicação

## Observações

- A aplicação agora funciona como uma verdadeira Single Page Application:
  - Estado sincronizado com a URL
  - URLs compartilháveis que preservam pesquisa e paginação
  - Navegação pelo histórico totalmente funcional
- A pesquisa via URL é particularmente útil para:
  - Compartilhar resultados específicos
  - Marcar pesquisas nos favoritos
  - Voltar para uma pesquisa anterior