import PageTitle from "../components/PageTitle"
import SearchForm from "../components/SearchForm"
import { useState } from "react"
import { getUserProfile } from "../services/githubApi"
import ProfileCard from "../components/ProfileCard"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    async function handleSearch(username) { // busca o perfil do usuário no Github
        setErrorMessage("") // limpa a mensagem de erro antes de iniciar a busca
        setProfile(null) // limpa o perfil antes de iniciar a busca
        setIsLoading(true) // ativa o estado de carregamento
     try {
        const data = await getUserProfile(username)
        setProfile(data) // atualiza o estado do perfil com os dados retornados pela API 
    } catch(error) {
        setErrorMessage(error.message) // armazena a mensagem de erro no estado para exibir para o usuário
    } finally {
        setIsLoading(false) // desativa o estado de carregamento
    }
}

function handleViewDetails(username) {
    //console.log("Ver detalhes do usuário:", username)
    navigate(`/profile/${username}`)
}

    return (
        <main>
            <PageTitle text="Buscador de perfis do Github" />
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            {errorMessage && <p>{errorMessage}</p>}
            <ProfileCard profile={profile} onViewDetails={handleViewDetails} />
        </main>
    )
}

export default HomePage