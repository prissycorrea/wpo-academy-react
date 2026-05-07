export async function getUserProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if(response.status === 404) {
        throw new Error('Perfil não encontrado')
    }

    if(!response.ok) {
        throw new Error('Não foi possível buscar o perfil. Tente novamente.')
    }

    return response.json()
}