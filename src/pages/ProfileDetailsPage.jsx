import PageTitle from "../components/PageTitle"
import { useState, useEffect } from "react"
import { getUserProfile, getUserRepos} from "../services/githubApi"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/Button";

function ProfileDetailsPage() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const [profileData, reposData] = await Promise.all([
                    getUserProfile(username),
                    getUserRepos(username)
                ]);

                setProfile(profileData)
                setRepos(reposData)
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [username])

    return (
        <main className="page page-profile-details">
        <Button onClick={() => navigate(-1)} className="button--ghost">Voltar</Button>
        {isLoading && <p>Carregando...</p>}
        {errorMessage && <p className="message">Erro: {errorMessage}</p>}
        {profile && (
            <section className="profile-details">
            <PageTitle text={`Detalhes de ${profile.login}`} />
            <div className="profile-details__header">
                <img className="profile-details__avatar" src={profile.avatar_url} alt={'Avatar de '+ profile.login} />
                <div>
                    <p><strong>Nome: </strong> {profile.name || 'Não informado'}</p>
                    <p><strong>Bio: </strong> {profile.bio || 'Não informado'}</p>
                    <div className="profile-details__stats">
                        <p className="profile-details__stat"><strong>Seguidores:</strong> {profile.followers}</p>
                        <p className="profile-details__stat"><strong>Seguindo:</strong> {profile.following}</p>
                    </div>
                </div>
            </div>
            <div className="repo-section">
            <h2 className="repo-section__title">Repositórios</h2>
            {repos.length === 0 ? (<p>Este usuário não tem repositórios públicos</p> ) : (
                <ul className="repo-list">
                    {repos.map((repo) => (
                        <li className="repo-list__item" key={repo.id}>
                            <a className="repo-list__link" href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                        </li>
                    ))}
                </ul>
            )}
            </div>
            </section>
        )}
        </main>
    )
}

export default ProfileDetailsPage;