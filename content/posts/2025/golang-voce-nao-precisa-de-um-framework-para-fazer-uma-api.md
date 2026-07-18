+++
title = "Golang: simples e funcional"
date = "2025-03-24T09:37:12.259Z"
lastmod = "2025-03-24T09:41:14.472Z"
draft = false
slug = "golang-voce-nao-precisa-de-um-framework-para-fazer-uma-api"
description = "Golang: Você Não Precisa de Um Framework Para Fazer Uma API Se você precisa de um framework gigantesco só para subir uma API, você não sabe programar. Sabe qual é o maior proble..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/golang-voce-nao-precisa-de-um-framework-para-fazer-uma-api"
+++
# Golang: Você Não Precisa de Um Framework Para Fazer Uma API  

Se você precisa de um framework gigantesco só para subir uma API, **você não sabe programar.**  

Sabe qual é o maior problema dos devs de hoje? **Eles não sabem o básico.** Pergunta pra um "senior" de Node ou Python como funciona uma requisição HTTP de verdade. **Ele não sabe.** O cara depende de um framework como se fosse um assistente de vida, sem entender o que está acontecendo por baixo.  

Aí entra **Golang**. Você quer rodar uma API? **"net/http"** já resolve 90% dos casos. Sem gambiarra, sem "mágica", sem precisar instalar 50 dependências só pra dar um 200 OK.  

```go
package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
```


Pronto, seu servidor HTTP rodando sem frescura.

Enquanto isso, no mundo Node.js:

Express,

Middleware de CORS,

Body parser,

ORM desnecessário,

E mais 200 pacotes npm que vão quebrar na próxima atualização.

Go entrega o que você precisa e só. Se quer algo mais robusto, usa Fiber ou Echo, mas não porque precisa, e sim porque escolheu otimizar. A verdade é que a maioria dos devs não sabe fazer nada sem um framework segurando a mão deles.

Se você ainda acha que precisa de um framework só pra fazer um CRUD, acorda. O que você precisa é entender HTTP, TCP, concorrência e performance. Go te força a aprender isso. Por isso ele é foda.

Se você não quer aprender, tudo bem. O mercado vai escolher quem quer.
