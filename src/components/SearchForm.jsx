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
        <form onSubmit={handleSubmit} className="search-form">
            <label htmlFor="search" className="search-form__label">Pesquisar usuário do Github</label>
            <div className="search-form__row">
                <Input
                    id="search"
                    type="text"
                    placeholder="Digite o nome do usuário"
                    value={searchTerm}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <Button id="search-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Buscando..." : "Buscar"}
                </Button>
            </div>
        </form>
    )
}

export default SearchForm