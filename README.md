# Buscador de Perfis GitHub

Aplicação React para buscar perfis públicos do GitHub e visualizar detalhes do usuário com lista de repositórios.

## Propósito da aplicação

Este projeto foi criado para:

1. Permitir busca de usuários do GitHub por nome de usuário.
2. Exibir um resumo do perfil encontrado na página inicial.
3. Navegar para uma página de detalhes com informações do perfil e repositórios públicos.

## Tecnologias utilizadas

- React 19
- React Router DOM 7
- Vite 8
- CSS tradicional (arquivos `src/index.css` e `src/App.css`)
- ESLint para qualidade de código

## Como instalar e executar

### Pré-requisitos

- Node.js 18+ (recomendado LTS)
- npm

### Passos

1. Instalar dependências:

```bash
npm install
```

1. Rodar em modo de desenvolvimento:

```bash
npm run dev
```

1. Gerar build de produção:

```bash
npm run build
```

1. Visualizar build localmente:

```bash
npm run preview
```

## Como a navegação funciona

A navegação é feita com `react-router-dom` em `src/App.jsx`:

- `/` renderiza a `HomePage`.
- `/profile/:username` renderiza a `ProfileDetailsPage`.

Fluxo:

1. Na página inicial, o usuário digita o username e dispara a busca.
2. Após retorno da API, o `ProfileCard` mostra os dados resumidos.
3. Ao clicar em "Ver detalhes" (ou no card), ocorre navegação para `/profile/<username>`.
4. A página de detalhes usa o parâmetro de rota para buscar perfil + repositórios.

## Estrutura de pastas (resumo)

```text
src/
  assets/                # Recursos estáticos
  components/            # Componentes reutilizáveis de UI
    Button.jsx
    Input.jsx
    PageTitle.jsx
    ProfileCard.jsx
    SearchForm.jsx
  pages/                 # Páginas de rota
    HomePage.jsx
    ProfileDetailsPage.jsx
  services/              # Integração com API externa
    githubApi.js
  App.css                # Estilos principais da aplicação
  index.css              # Estilos globais e variáveis CSS
  App.jsx                # Definição das rotas
  main.jsx               # Bootstrap da aplicação (BrowserRouter)
```

## Principais componentes

### PageTitle

Responsabilidade:

- Exibir o título principal de uma seção/página.

Props:

- `text` (string): texto do título.

Exemplo de uso:

```jsx
<PageTitle text="Buscador de perfis do Github" />
```

### SearchForm

Responsabilidade:

- Controlar o campo de busca.
- Disparar a ação de busca no submit.
- Exibir estado de carregamento no botão.

Props:

- `isLoading` (boolean): desabilita os controles durante a busca e altera o texto do botão.
- `onSearch` (function): callback chamado com o username digitado.

Exemplo de uso:

```jsx
<SearchForm
  isLoading={isLoading}
  onSearch={(username) => handleSearch(username)}
/>
```

### ProfileCard

Responsabilidade:

- Exibir resumo do perfil retornado pela API.
- Permitir navegação para os detalhes do usuário.
- Não renderizar nada quando `profile` for nulo.

Props:

- `profile` (object | null): objeto de perfil do GitHub.
- `onViewDetails` (function): callback para abrir a página de detalhes.

Exemplo de uso:

```jsx
<ProfileCard
  profile={profile}
  onViewDetails={(username) => navigate(`/profile/${username}`)}
/>
```

### Button

Responsabilidade:

- Renderizar botão reutilizável com estilo base e suporte a variações por classe.

Props:

- `children` (ReactNode): conteúdo interno do botão.
- `onClick` (function): evento de clique.
- `type` (`"button" | "submit" | "reset"`): tipo do botão (padrão: `"button"`).
- `disabled` (boolean): desabilita interação.
- `className` (string): classes extras para variação visual.
- `...rest`: demais atributos HTML válidos.

Exemplo de uso:

```jsx
<Button type="submit" disabled={isLoading}>
  {isLoading ? "Buscando..." : "Buscar"}
</Button>

<Button className="button--ghost" onClick={() => navigate(-1)}>
  Voltar
</Button>
```

## Integração com API GitHub

As chamadas ficam em `src/services/githubApi.js`:

- `getUserProfile(username)` busca dados do usuário.
- `getUserRepos(username)` busca repositórios públicos.

A aplicação trata erros comuns (como perfil não encontrado) e exibe mensagens na interface.
