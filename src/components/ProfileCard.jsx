import Button from "./Button"

function ProfileCard({ profile, onViewDetails }) {
    if(!profile) {
        return null;
    }

    return (
        <div onClick={() => onViewDetails(profile.login)} style={{cursor:'pointer'}}>
            <img src={profile.avatar_url} alt={`Avatar de ${profile.login}`} />
            <h2>{profile.name || 'Nome não informado'}</h2>
            <p>
                <strong>Usuário:</strong> { profile.login }
            </p>
            <p>
                <strong>Repositórios públicos:</strong> { profile.public_repos }
            </p>
            <Button onClick={() => onViewDetails(profile.login)}>Ver detalhes</Button>
        </div>
    )
}

export default ProfileCard