import { useState, useEffect, useRef } from 'react'
import { CharacterList, CharacterCard } from './components/Characters'
import Pagination from './components/Pagination'
import SearchContainer from './components/SearchContainer'

const Search = () => {
  // Obter parâmetros iniciais da URL
  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return {
        page: parseInt(params.get('p')) || 1,
        search: params.get('s') || ''
      }
    }
    return { page: 1, search: '' }
  }
  
  const initialParams = getInitialParams()
  
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState(initialParams.search)
  const [currentPage, setCurrentPage] = useState(initialParams.page)
  const [totalPages, setTotalPages] = useState(0)
  const [lastSearchPage, setLastSearchPage] = useState(1)

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

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        
        // Construir URL baseada no termo de pesquisa e página atual
        let url = 'https://rickandmortyapi.com/api/character'
        const params = new URLSearchParams()
        
        // Adicionar página atual aos parâmetros
        params.append('page', currentPage)
        
        // Adicionar filtro de nome se tiver mais de 2 caracteres
        if (searchTerm.length > 2) {
          params.append('name', searchTerm)
        }
        
        url += `?${params.toString()}`
        
        const response = await fetch(url)
        
        // Verificar se o status é maior que 500
        if (response.status >= 500) {
          throw new Error(`Erro no servidor: ${response.status}`)
        }
        
        // Verificar outros tipos de erro
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Nenhum personagem encontrado com esse nome`)
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
        setTotalPages(0)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [currentPage, searchTerm])

  const handleSearchChange = (e) => {
    const value = e.target.value
    
    // Se começar a digitar, salva a página atual para poder voltar a ela
    if (searchTerm.length <= 2 && value.length > 2) {
      setLastSearchPage(currentPage)
    }
    
    // Se apagar tudo, volta para a página que estava antes da pesquisa
    if (searchTerm.length > 2 && value.length <= 2) {
      setCurrentPage(lastSearchPage)
    } else if (value.length > 2 && searchTerm !== value) {
      // Reset para primeira página quando faz uma nova pesquisa
      setCurrentPage(1)
    }
    
    setSearchTerm(value)
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
