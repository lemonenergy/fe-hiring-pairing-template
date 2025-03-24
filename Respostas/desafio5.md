# Desafio 5: Atualização da URL com Parâmetros de Consulta

## Alterações Realizadas

1. Adicionei a função `getInitialParams` para:
   - Ler parâmetros iniciais da URL quando a aplicação carrega
   - Obter o parâmetro `p` (página) da URL
   - Obter o parâmetro `s` (termo de pesquisa) da URL

2. Inicialização de estados com base nos parâmetros da URL:
   ```javascript
   const initialParams = getInitialParams()
   const [searchTerm, setSearchTerm] = useState(initialParams.search)
   const [currentPage, setCurrentPage] = useState(initialParams.page)
   ```

3. Adicionei um novo `useEffect` para atualizar a URL:
   ```javascript
   // Atualizar a URL quando a página ou o termo de pesquisa mudar
   useEffect(() => {
     if (typeof window !== 'undefined') {
       const params = new URLSearchParams()
       
       if (currentPage !== 1) {
         params.append('p', currentPage)
       }
       
       if (searchTerm.length > 2) {
         params.append('s', searchTerm)
       }
       
       const newUrl = params.toString() 
         ? `${window.location.pathname}?${params.toString()}` 
         : window.location.pathname
       
       window.history.pushState({}, '', newUrl)
     }
   }, [currentPage, searchTerm])
   ```

4. Melhorei a lógica do `handleSearchChange` para:
   - Só resetar para a página 1 se o termo de pesquisa realmente mudou
   - Manter comportamento atual de voltar para página anterior ao limpar

## Funcionamento

1. **URLs Geradas**:
   - Página 1, sem pesquisa: `/` (URL limpa)
   - Página 2, sem pesquisa: `/?p=2`
   - Página 1, com pesquisa "ric": `/?s=ric`
   - Página 2, com pesquisa "ric": `/?p=2&s=ric`

2. **Carregamento Inicial**:
   - Se a URL contiver parâmetros, a aplicação os usa para carregar o estado inicial
   - Exemplos: 
     - `/`: Carrega página 1, sem filtro
     - `/?p=3`: Carrega página 3, sem filtro
     - `/?s=morty`: Carrega página 1, filtrando por "morty"
     - `/?p=2&s=smith`: Carrega página 2, filtrando por "smith"

3. **Navegação pelo Histórico**:
   - Botões voltar/avançar do navegador funcionam, pois a URL é atualizada com `pushState`

## Observações

- Parâmetros na URL só são incluídos quando necessário (p não aparece se for 1, s não aparece se for vazio)
- A funcionalidade anterior de lembrar a página ao iniciar/finalizar pesquisa foi mantida
- A URL se atualiza automaticamente quando o usuário navega ou pesquisa