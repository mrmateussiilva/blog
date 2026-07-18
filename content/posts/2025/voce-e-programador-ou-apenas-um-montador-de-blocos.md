+++
title = "Você é programador ou apenas um montador de blocos?"
date = "2025-03-27T09:00:18.095Z"
lastmod = "2025-03-27T09:00:18.091Z"
draft = false
slug = "voce-e-programador-ou-apenas-um-montador-de-blocos"
description = "Nos últimos anos, programar deixou de ser sobre resolver problemas e passou a ser um jogo de encaixar bibliotecas e frameworks. A nova geração de desenvolvedores acredita que ba..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/voce-e-programador-ou-apenas-um-montador-de-blocos"
+++
Nos últimos anos, programar deixou de ser sobre resolver problemas e passou a ser um jogo de encaixar bibliotecas e frameworks. A nova geração de desenvolvedores acredita que basta instalar meia dúzia de pacotes do NPM, importar tudo no código e pronto: temos um sistema funcionando. Mas será que isso é realmente programar?

## O vício em bibliotecas

Hoje em dia, para fazer qualquer coisa, tem sempre alguém sugerindo uma biblioteca:
- Precisa fazer uma requisição HTTP? *Instala Axios!*
- Precisa formatar uma data? *Instala Moment.js!* (mesmo ele estando obsoleto)
- Precisa somar dois números? *Tem uma lib no NPM pra isso!*

E o resultado? Projetos gigantes, com milhares de dependências, consumindo recursos de forma absurda e, pior ainda, cheios de vulnerabilidades de segurança porque ninguém sabe o que realmente está rodando por trás.

## A dependência cega em ferramentas

Não me entenda mal: bibliotecas e frameworks existem para acelerar o desenvolvimento e evitar retrabalho. O problema é quando o desenvolvedor se torna completamente dependente delas. Você já viu código assim?

```javascript
import _ from 'lodash';

const array = [1, 2, 3, 4, 5];
const firstElement = _.first(array);
console.log(firstElement);
```

Sério? Precisava importar o *Lodash* só para pegar o primeiro elemento de um array? Isso aqui faz a mesma coisa:

```javascript
const array = [1, 2, 3, 4, 5];
console.log(array[0]);
```

Menos código, menos dependências, menos problemas. Mas parece que muita gente desaprendeu a lógica de programação e só sabe copiar e colar código pronto sem entender o que está acontecendo.

## Quando tudo quebra

Outro grande problema desse vício em bibliotecas é que, quando algo dá errado, poucos sabem como resolver. O que acontece quando o NPM remove um pacote essencial? Ou quando uma atualização quebra o projeto inteiro porque ninguém sabia o que aquela dependência realmente fazia?

Quem não lembra do desastre do *left-pad*, onde um pacote de apenas 11 linhas foi removido do NPM e quebrou milhares de projetos pelo mundo? Isso aconteceu porque desenvolvedores estavam usando uma biblioteca para algo que poderia ser resolvido com uma simples função nativa.

## O que significa ser um programador de verdade?

Programar não é apenas montar blocos e colar bibliotecas no código. Programar é entender problemas, pensar em soluções eficientes e escrever código limpo e performático. Se a primeira coisa que você faz ao iniciar um projeto é procurar quais bibliotecas vai usar antes mesmo de entender os requisitos, você não está programando – está apenas montando um quebra-cabeça.

Então, da próxima vez que for instalar mais uma biblioteca para algo trivial, pare e pense: **será que eu realmente preciso disso?**

Porque no final do dia, a pergunta é simples: **você é um programador ou apenas um montador de blocos?**
