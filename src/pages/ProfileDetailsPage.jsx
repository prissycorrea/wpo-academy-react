import PageTitle from "../components/PageTitle"
import { useState, useEffect } from "react"
import { getUserProfile, getUserRepos} from "../services/githubApi"
import { useNavigate, useParams } from "react-router-dom"

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
                setErrorMessage(error);
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [username])

    return (
        <main>
            <PageTitle text={`Detalhes de ${profile.login}`} />
            <img src={profile.avatar_url} alt={'Avatar de '+ profile.login} />
            <p><strong>Nome: </strong> {profile.name || 'Não informado'}</p>
            <p><strong>Bio: </strong> {profile.bio || 'Não informado'}</p>
            <p><strong>Seguidores: </strong> {profile.followers}</p>
            <p><strong>Seguindo: </strong> {profile.following}</p>
            <h2>Repositórios</h2>
            {repos.length === 0 ? (<p>Este usuário não tem repositórios públicos</p> ) : (
                <ul>
                    {repos.map((repo) => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="self">{repo.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}

export default ProfileDetailsPage;