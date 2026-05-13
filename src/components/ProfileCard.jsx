import Button from "./Button"

function ProfileCard({ profile, onViewDetails }) {
    if(!profile) {
        return null;
    }

    return (
        <article
            className="profile-card"
            onClick={() => onViewDetails(profile.login)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    onViewDetails(profile.login)
                }
            }}
        >
            <img className="profile-card__avatar" src={profile.avatar_url} alt={`Avatar de ${profile.login}`} />
            <h2 className="profile-card__name">{profile.name || 'Nome não informado'}</h2>
            <p className="profile-card__text">
                <strong>Usuário:</strong> { profile.login }
            </p>
            <p className="profile-card__text">
                <strong>Repositórios públicos:</strong> { profile.public_repos }
            </p>
            <Button
                onClick={(event) => {
                    event.stopPropagation()
                    onViewDetails(profile.login)
                }}
            >
                Ver detalhes
            </Button>
        </article>
    )
}

export default ProfileCard