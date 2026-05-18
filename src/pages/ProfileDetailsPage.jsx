import PageTitle from "../components/PageTitle";
import { useState, useEffect } from "react";
import { getUserProfile, getUserRepos } from "../services/githubApi";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

function ProfileDetailsPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Todas");

  const languageOptions = [
    "Todas",
    ...new Set(
      repos
        .map((repo) => repo.language)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    ),
  ];

  const filteredRepos =
    selectedLanguage === "Todas"
      ? repos
      : repos.filter((repo) => repo.language === selectedLanguage);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const [profileData, reposData] = await Promise.all([
          getUserProfile(username),
          getUserRepos(username),
        ]);

        setProfile(profileData);
        setRepos(reposData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [username]);

  function getLanguageClass(language) {
    const name = (language || "").toLowerCase();

    if (name === "javascript") return "repo-list__language--javascript";
    if (name === "typescript") return "repo-list__language--typescript";
    if (name === "python") return "repo-list__language--python";
    if (name === "java") return "repo-list__language--java";
    if (name === "css") return "repo-list__language--css";
    if (name === "html") return "repo-list__language--html";
    if (name === "go") return "repo-list__language--go";
    if (name === "c#") return "repo-list__language--csharp";
    if (name === "php") return "repo-list__language--php";

    return "repo-list__language--default";
  }

  return (
    <main className="page page-profile-details">
      <Button onClick={() => navigate(-1)} className="button--ghost">
        Voltar
      </Button>
      {isLoading && <p>Carregando...</p>}
      {errorMessage && <p className="message">Erro: {errorMessage}</p>}
      {profile && (
        <section className="profile-details">
          <PageTitle text={`Detalhes de ${profile.login}`} />
          <div className="profile-details__header">
            <img
              className="profile-details__avatar"
              src={profile.avatar_url}
              alt={"Avatar de " + profile.login}
            />
            <div>
              <p>
                <strong>Nome: </strong> {profile.name || "Não informado"}
              </p>
              <p>
                <strong>Bio: </strong> {profile.bio || "Não informado"}
              </p>
              <div className="profile-details__stats">
                <p className="profile-details__stat">
                  <strong>Seguidores:</strong> {profile.followers}
                </p>
                <p className="profile-details__stat">
                  <strong>Seguindo:</strong> {profile.following}
                </p>
              </div>
            </div>
          </div>
          <div className="repo-section">
            <h2 className="repo-section__title">Repositórios</h2>
            <div className="repo-filter">
              <label htmlFor="language-filter" className="repo-filter__label">
                Filtrar por linguagem
              </label>
              <select
                id="language-filter"
                className="repo-filter__select"
                value={selectedLanguage}
                onChange={(event) => setSelectedLanguage(event.target.value)}
              >
                {languageOptions.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            {repos.length === 0 ? (
              <p>Este usuário não tem repositórios públicos</p>
            ) : filteredRepos.length === 0 ? (
              <p>Nenhum repositório encontrado para esta linguagem.</p>
            ) : (
              <ul className="repo-list">
                {filteredRepos.map((repo) => {
                  const languageLabel = repo.language || "Não informada";
                  const languageClass = getLanguageClass(repo.language);

                  return (
                    <li className="repo-list__item" key={repo.id}>
                      <div className="repo-list__row">
                        <a
                          className="repo-list__link"
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {repo.name}
                        </a>
                        <span
                          className={[
                            "repo-list__language",
                            languageClass,
                          ].join(" ")}
                        >
                          {languageLabel}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProfileDetailsPage;
