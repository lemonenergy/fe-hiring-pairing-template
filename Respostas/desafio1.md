# Desafio 1: Implementação da listagem de personagens

## Linha de raciocínio

1. Analisar os componentes existentes:
   - Temos um componente `CharacterCard` pronto para exibir os detalhes de um personagem
   - Precisamos modificar o componente `Search` para buscar e listar os personagens

2. Plano de implementação:
   - Importar o `CharacterCard` em `Search.jsx`
   - Adicionar estado para armazenar a lista de personagens
   - Fazer requisição à API `/character` para obter os personagens
   - Implementar tratamento de erros para códigos de status > 500
   - Renderizar os personagens usando o `CharacterCard` dentro de `CharacterList`

3. Etapas de validação:
   - Verificar se a requisição está sendo feita corretamente
   - Tratar erros de API conforme solicitado
   - Garantir que os dados estão sendo exibidos no formato esperado

## Solução implementada

1. **Adição de estados para gerenciar os dados:**
   ```jsx
   const [characters, setCharacters] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   ```

2. **Implementação da função de busca de personagens:**
   ```jsx
   useEffect(() => {
     const fetchCharacters = async () => {
       try {
         setLoading(true)
         const response = await fetch('https://rickandmortyapi.com/api/character')
         
         // Verificar se o status é maior que 500
         if (response.status >= 500) {
           throw new Error(`Erro no servidor: ${response.status}`)
         }
         
         if (!response.ok) {
           throw new Error(`Erro na requisição: ${response.status}`)
         }
         
         const data = await response.json()
         setCharacters(data.results)
         setError(null)
       } catch (err) {
         setError(err.message)
         setCharacters([])
       } finally {
         setLoading(false)
       }
     }

     fetchCharacters()
   }, [])
   ```

3. **Renderização condicional dos personagens:**
   ```jsx
   <CharacterList>
     {loading ? (
       <p>Carregando personagens...</p>
     ) : characters.length > 0 ? (
       characters.map(character => (
         <CharacterCard key={character.id} character={character} />
       ))
     ) : (
       <p>Nenhum personagem encontrado :( </p>
     )}
   </CharacterList>
   ```

4. **Tratamento de erros:**
   - Adicionei validação específica para erros com status code > 500 conforme solicitado
   - Exibo mensagem de erro para o usuário quando ocorre algum problema
   - Mantenho estado de loading para melhorar a experiência do usuário