# Blog Minimalista com Hugo

Este é um blog estático simples, rápido e focado em performance, construído com [Hugo](https://gohugo.io/).

## Estrutura do Projeto

*   `content/`: Contém os arquivos Markdown (posts e páginas).
*   `layouts/`: Templates HTML personalizados (sem necessidade de temas externos complexos).
*   `static/`: Arquivos estáticos (CSS, imagens).
*   `hugo.toml`: Arquivo de configuração.

## Como Executar Localmente

Certifique-se de ter o [Hugo instalado](https://gohugo.io/installation/).

1.  Abra o terminal na pasta do projeto:
    ```bash
    cd /home/mateus/Projetcs/Pessoais/blog
    ```

2.  Inicie o servidor de desenvolvimento:
    ```bash
    hugo server
    ```

3.  Acesse `http://localhost:1313` no seu navegador.

## Como Criar Novo Conteúdo

Para criar um novo post:

```bash
hugo new content posts/novo-post.md
```

## Build para Produção

Para gerar os arquivos estáticos para deploy (pasta `public/`):

```bash
hugo --minify
```

## Deploy

Este projeto está pronto para ser hospedado em:
*   **Netlify**: Basta conectar o repositório e configurar o build command como `hugo --minify` e publish directory como `public`.
*   **Vercel**: Detecta automaticamente projetos Hugo.
*   **GitHub Pages**: Use a GitHub Action padrão para Hugo.
