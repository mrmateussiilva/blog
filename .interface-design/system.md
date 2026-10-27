# Sistema visual do blog

## Direção e sensação

- Editorial, técnico e direto, com a calma de um arquivo pessoal de engenharia.
- O leitor deve conseguir percorrer a cronologia rapidamente e reconhecer cada texto como uma unidade coesa.
- Conceitos do domínio: diário técnico, arquivo cronológico, ensaio, código, aprendizado e memória.
- Mundo de cor: papel branco, tinta quase preta, grafite, cinza de anotação, azul de link e superfícies neutras do modo escuro.
- Assinatura: arquivo de posts agrupado por ano e mês, com cabeçalho cronológico e contagem alinhada à direita.
- Evitar cards elevados, sombras decorativas, excesso de cor e espaçamento uniforme entre todos os níveis.

## Profundidade e superfícies

- Estratégia: somente bordas e mudanças neutras de superfície; não usar sombras nos itens editoriais.
- Manter o fundo do conteúdo no mesmo plano da página.
- Divisórias devem ser finas e discretas, usando as cores semânticas do Hextra: `gray-200` no tema claro e `neutral-800` no escuro.
- Tags podem usar uma superfície neutra baixa para se distinguirem sem competir com o título.

## Espaçamento

- Unidade-base: `4px`.
- Micro: `4–8px` entre elementos diretamente relacionados.
- Componente: `12–24px` dentro de cabeçalhos e itens.
- Seção: `44–56px` entre grupos mensais.
- A proximidade comunica hierarquia: título, metadados e resumo ficam próximos; posts e meses recebem separações progressivamente maiores.
- Não combinar `gap` da lista com padding equivalente no item quando isso duplicar visualmente a distância.

## Hierarquia tipográfica

- Preservar a família tipográfica do tema Hextra para manter consistência e desempenho.
- Título do post é o foco: `20px`, peso `600`, entrelinha `28px`, tracking levemente fechado e cor primária de texto.
- Ano: `24px`, peso `600`, tracking fechado.
- Mês: `18px`, peso normal e cor secundária.
- Data e metadados: `14px`, peso normal e cor secundária.
- Tags: `12px`, peso normal, superfície neutra.
- Resumo: `16px`, entrelinha `28px`, cor secundária.
- Priorizar peso, contraste e espaço antes de aumentar tamanhos.

## Padrões de componentes

### Arquivo mensal de posts

- Contêiner `.posts-archive`: grid vertical com `56px` entre meses no desktop e `44px` no mobile.
- Cabeçalho `.posts-month-heading`: ano, mês e contagem na mesma linha; `12px` entre ano e mês; contagem empurrada para a direita.
- Item `.post-list-item`: `24px` de padding vertical no desktop e `20px` no mobile.
- Primeiro item: reduzir o padding superior para `20px` no desktop e `16px` no mobile, mantendo-o ligado ao cabeçalho.
- Último item: sem padding inferior e sem borda inferior, para não criar distância artificial antes do próximo mês.
- Contagens devem respeitar singular e plural: `1 post`, `2 posts`.

## Responsividade e implementação

- Ponto de ajuste editorial: `640px` (`40rem`).
- Em telas pequenas, preservar a hierarquia e reduzir apenas os espaços entre itens e seções.
- Usar classes semânticas no `assets/css/custom.css` para padrões específicos do blog.
- Não depender de novas classes utilitárias do Tailwind sem confirmar que existem no CSS compilado de produção do tema.
- Validar alterações visuais em desktop e mobile, nos temas claro e escuro quando cores ou superfícies forem modificadas.
