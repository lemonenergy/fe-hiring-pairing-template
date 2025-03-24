# Desafio 2: Implementação da Pesquisa por Nome

## Alterações Realizadas

1. Adicionei um estado `searchTerm` para armazenar o valor do campo de pesquisa
2. Implementei a lógica que:
   - Não aplica filtro quando o campo está vazio ou com menos de 3 caracteres
   - Aplica filtro `?name=` quando o termo de pesquisa tem mais de 2 caracteres
3. Adicionei tratamento específico para erro 404 (quando nenhum personagem é encontrado)
4. Conectei o input de pesquisa ao estado com `value` e `onChange`
5. A URL da API é construída dinamicamente com base no termo de pesquisa
6. Utilizei `encodeURIComponent` para garantir que caracteres especiais sejam tratados corretamente

## Código Implementado

```jsx
// Armazenamento do termo de pesquisa
const [searchTerm, setSearchTerm] = useState('')

// Construção da URL com base no termo de pesquisa
let url = 'https://rickandmortyapi.com/api/character'
if (searchTerm.length > 2) {
  url += `?name=${encodeURIComponent(searchTerm)}`
}

// Tratamento de erros específicos
if (!response.ok) {
  if (response.status === 404) {
    throw new Error(`Nenhum personagem encontrado com esse nome`)
  } else {
    throw new Error(`Erro na requisição: ${response.status}`)
  }
}

// Manipulador do input de pesquisa
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value)
}

// Conectando o input ao estado
<input 
  placeholder="Pesquisa por nome" 
  value={searchTerm}
  onChange={handleSearchChange}
/>
```

## Observações

- A pesquisa é disparada automaticamente à medida que o usuário digita, graças ao useEffect dependente de `searchTerm`
- A mensagem de erro é mais específica quando nenhum personagem é encontrado
- Mantive a limpeza do array de personagens quando ocorrem erros