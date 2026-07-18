+++
title = "Funções Puras: O que São e Por Que Você Deve se Importar?"
date = "2025-02-07T23:33:23.032Z"
lastmod = "2025-02-07T23:42:21.349Z"
draft = false
slug = "funcoes-puras-o-que-sao-e-por-que-voce-deve-se-importar"
description = "Introdução Se você está iniciando sua jornada na programação, já deve ter ouvido falar de diversas técnicas e paradigmas. Mas um conceito essencial que muitos cursos ignoram é o..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/funcoes-puras-o-que-sao-e-por-que-voce-deve-se-importar"
+++
# Introdução

Se você está iniciando sua jornada na programação, já deve ter ouvido falar de diversas técnicas e paradigmas. Mas um conceito essencial que muitos cursos ignoram é o das funções puras. Vamos explorar o que são e por que elas são tão importantes.


## O que é uma função pura?
- Uma função pura é uma função que segue duas regras fundamentais:

- Determinismo: Sempre retorna o mesmo resultado para as mesmas entradas. 

- Sem efeitos colaterais: Não altera variáveis globais, arquivos, banco de dados ou qualquer outra estrutura fora do seu escopo. 

Isso significa que funções puras tornam o código mais previsível, testável e modular.

## O Problema com o Ensino de Programação

A maioria dos cursos de programação foca em ensinar sintaxe e frameworks populares sem abordar conceitos fundamentais. Isso cria uma geração de programadores que sabem "fazer funcionar", mas não compreendem como e por que algo funciona.

O mercado educacional prioriza atalhos e soluções rápidas para vender cursos que prometem transformar iniciantes em "desenvolvedores" em poucos meses. No entanto, sem um entendimento sólido de fundamentos como programação funcional, imutabilidade e pureza de funções, esses programadores acabam dependendo excessivamente de ferramentas e enfrentam dificuldades para resolver problemas complexos.

É preciso questionar esse modelo de ensino. O aprendizado real exige tempo, estudo e compreensão profunda dos princípios que tornam o código sustentável a longo prazo.

## Exemplo de Função Pura em Python

```python
# Esta função pura soma dois números e retorna o resultado
def soma(a, b):
    return a + b

print(soma(2, 3))  # Sempre retorna 5
print(soma(2, 3))  # Sempre retorna 5
```
A função `soma` sempre retorna o mesmo valor para as mesmas entradas e não modifica nada fora dela. Isso a torna pura.

## Exemplo de Função Impura

Agora, um exemplo de função impura:


```python
total = 0

def somar_impuro(a):
    global total
    total += a
    return total

print(somar_impuro(2))  # Retorna 2
print(somar_impuro(3))  # Retorna 5 (depende do estado anterior!)
```
Essa função altera uma variável global, tornando seu comportamento imprevisível.

## Benefícios das Funções Puras

- Fácil de testar 
- Mais previsível 
- Facilita concorrência e paralelismo 
- Código mais limpo e organizado 


Se você deseja crescer como programador, vá além dos cursos tradicionais. Busque entender os fundamentos, leia materiais acadêmicos e explore linguagens que priorizam esses conceitos, como Haskell e Lisp. Esse conhecimento será um diferencial na sua carreira!


## Only truths

Leia mais,estude mais e para de acreditar que você vai virar programador em 1 mês,
não assista essas "imersões","bootcamp" ou qualquer porcaria que vendedor de curso fala, foque em construir uma base sólida em algoritmos estrutura de dados com uma base boa nisso você aprende qualquer ferramenta que exista.

Obrigado por ler até aqui e até semana que vem.
