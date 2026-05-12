import Button from "./Button";
import Input from "./Input";
import { useState } from "react";

function SearchForm({isLoading, onSearch}) {
    const [searchTerm, setSearchTerm] = useState(''); 
    function handleInputChange(event) { // função a ser chamada quando o usuário digitar
        setSearchTerm(event.target.value); // pegamos o valor do input e atualizamos o estado searchTerm
    }

    function handleSubmit(event) {
        event.preventDefault(); // previnir comportamento de reload da página
        //console.log('Buscando perfil do Github para:', searchTerm)
        onSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="search">Pesquisar usuário do Github</label>
            <Input id="search" type="text" placeholder="Digite o nome do usuário" value={searchTerm} onChange={ handleInputChange } disabled={isLoading} />
            <Button id="search-button" disabled={isLoading}>{isLoading ? "Buscando..." : "Buscar"}</Button>
        </form>
    )
}

export default SearchForm