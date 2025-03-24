import { useState, useEffect } from 'react'
import { CharacterList, CharacterCard } from './components/Characters'
import Pagination from './components/Pagination'
import SearchContainer from './components/SearchContainer'

const Search = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        
        // Construir URL baseada na página atual (desconsidera searchTerm conforme solicitado)
        const url = `https://rickandmortyapi.com/api/character?page=${currentPage}`
        
        const response = await fetch(url)
        
        // Verificar se o status é maior que 500
        if (response.status >= 500) {
          throw new Error(`Erro no servidor: ${response.status}`)
        }
        
        // Verificar outros tipos de erro
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Nenhum personagem encontrado`)
          } else {
            throw new Error(`Erro na requisição: ${response.status}`)
          }
        }
        
        const data = await response.json()
        setCharacters(data.results)
        setTotalPages(data.info.pages)
        setError(null)
      } catch (err) {
        setError(err.message)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [currentPage])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <SearchContainer>
      <h1>Rick and Morty</h1>
      <input 
        placeholder="Pesquisa por nome" 
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
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
      
      <Pagination 
        current={currentPage} 
        pages={totalPages} 
        onPageChange={handlePageChange}
      />
    </SearchContainer>
  )
}

export default Search
