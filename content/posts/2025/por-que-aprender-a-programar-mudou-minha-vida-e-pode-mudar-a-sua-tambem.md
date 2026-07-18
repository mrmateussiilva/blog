+++
title = "Por que aprender a programar mudou minha vida (e pode mudar a sua também)"
date = "2025-11-24T14:44:55.437Z"
lastmod = "2025-11-24T14:44:55.432Z"
draft = false
slug = "por-que-aprender-a-programar-mudou-minha-vida-e-pode-mudar-a-sua-tambem"
description = "Introdução Olá pessoal, tudo certo? Recentemente um colega me perguntou se valia a pena aprender a programar e como isso poderia melhorar a vida dele. A maioria das pessoas acha..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/por-que-aprender-a-programar-mudou-minha-vida-e-pode-mudar-a-sua-tambem"
+++
## Introdução
Olá pessoal, tudo certo?

Recentemente um colega me perguntou se valia a pena aprender a programar e como isso poderia melhorar a vida dele.  
A maioria das pessoas acha que programar é só escrever código, ou hoje em dia, pedir pro ChatGPT cuspir o código pra você (e tá tudo bem fazer isso, desde que você saiba o que está fazendo).

Mas programar é outra coisa.  
Quando você aprende de verdade, você ganha um **superpoder**.

Falei pra ele:  
“Vou te contar um negócio que aconteceu comigo no meu antigo trabalho. Depois me diz o que acha.”  
Ele topou.

---

## Contexto
Eu trabalhava numa empresa que fazia painéis festivos, tecidos sublimados e essas coisas.  
Eu era o encarregado da produção — impressão do papel e depois sublimação na calandra.

O fluxo era sempre o mesmo:

- chegavam as fichas  
- abria a arte no Photoshop  
- conferia qualidade, medida, cor  
- escolhia a máquina  
- mandava imprimir  

Tínhamos 4 máquinas, com valores aproximados:

- Máquina 1 (papel): **40 m/h**  
- Máquina 2 (papel): **30 m/h**  
- Máquina 3 (papel): **5 m/h**  
- Máquina 4 (vinil): **7 m/h**  

E o processo era basicamente:  
conferir → mandar pra máquina → imprimir → sublimação.

Até aí tudo suave.

Mas tinha um problema sério:  
**num dia normal a gente só fazia 250 metros** somando tudo.  
Ridículo pra um turno de **9 horas**.

Meu colega já tava com cara de “mano, não tô entendendo nada”, e eu só falei:  
“Relaxa, vai fazer sentido.”

---

## O experimento que mudou tudo
Um dia eu pensei:  
“Vou testar uma coisa.”

Fiquei **1 hora só conferindo arte**, depois **20 minutos enviando tudo pras máquinas**.  
No mesmo dia fechamos **270 metros**.

No dia seguinte tirei um rapaz da calandra só pra me ajudar a conferir enquanto eu cuidava das máquinas.  
**320 metros.**

Sim, trabalhar em dois foi melhor do que sozinho.  
Mas tinha um problema: a máquina que exige dois operadores é o coração da produção.  
Se ela para, você joga dinheiro no lixo.  
E eu NÃO podia perder isso em hipótese alguma.

---

## A lógica que resolveu o caos
Setor precisava de 4 pessoas.  
Nós tínhamos 3.  
Contratar?

**Não comigo.**

Mesmo não programando ativamente na época, a mentalidade estava ali: **Dividir para Conquistar**.

Pensei no básico do básico:  
abrir a imagem e conferir o que precisa ser conferido.

E aí caiu a ficha:  
conferir é só pegar um valor e comparar com o valor correto.

- DPI → compara  
- medida → compara  
- cor → compara  
- tipo → compara  
- limite → compara  

Ou seja: **um monte de IF/ELSE humanos**.

---

## A automação começa
Fiz um script que:

1. baixava automaticamente as fichas do WhatsApp  
2. extraía o texto com OCR  
3. organizava tudo num JSON  
4. validava DPI, medida, tipo  
5. dizia qual máquina era melhor pra cada arte  

Uma tarefa que levava **5 minutos** virou **12–20 segundos**.

Eu ganhei tempo.  
O setor respirou.

---

## O problema das cores (e o nascimento da Safira)
Outro caos:  
**o vermelho de uma máquina era diferente do vermelho da outra.**

Aí pensei:  
“Vou criar um motor de tradução de cor.”

E assim nasceu a **Safira**.  
Eu gosto de pedras preciosas, então o nome caiu perfeito:  
precisão, pureza, estabilidade.

A Safira fazia:
- pegava todas as cores da arte  
- transformava cada cor em valor numérico  
- comparava com a tabela calibrada da máquina  
- ajustava o canal  
- devolvia a arte corrigida pro equipamento certo  

Era um arquivo Python chamado **safira_v3_final.py** numa pasta bagunçada.  
Zero glamour.  
Mas funcionava.

---

## O dia que a Safira provou que estava certa
Teve um dia que nunca esqueço.

Primeira produção de uma cliente nova.  
Ela escolheu umas cores… bem peculiares rsrs.  
E o pedido dava uns **50 metros**.

Botei a Safira pra rodar cedo.  
Ela apontou **problemas de cor** em várias áreas.

A Safira salvou pequenos recortes com as cores suspeitas.  
Imprimi o teste e mostrei **pro vendedor**.

Tava diferente. Bem diferente kkkkk.

O vendedor olhou e falou:  
“Pode produzir.”

E eu: “Ok então.”

Produzi tudo.

A cliente recebeu… e, claro:  
**reclamou da cor.**

Tivemos que repor parte do pedido.

E no fim eu ainda levei um mini puxão de orelha porque eu só mostrei o teste pro vendedor — e não pro chefe kkkkkk.  
A famosa situação:  
**você faz certo, mas faz certo do jeito errado.**

---

## Se eu tivesse ficado, dava pra ter feito muito mais
Essa parte é meio triste, meio revoltante.

Porque mesmo com tudo isso — Safira funcionando, conferência automatizada, produção fluindo —  
eu tive que sair da empresa.

E isso travou vários projetos que eu já tava planejando:

### 1. **Otimizador de arquivos**
Um pré-processador completo.

Ele ia checar DPI, formato, material, cores, redundância e já corrigir antes de chegar no setor.  
Igual o *pre-flight* das gráficas grandes.

### 2. **Otimização de desperdício de material**
Meu xodó.

Um algoritmo de encaixe pra colocar várias artes na mesma largura e reduzir desperdício.  
Economizaria **muito dinheiro** por mês.Isso em partes já funcionava pra maquina de vinil.
Dessa forma aqui:
![image](https://i.imgur.com/bnEAFjh.jpeg)

Eu tinha tudo desenhado no meu caderno.  
Mas a vida segue, e eu precisei sair.

---

## Moral da história
Mesmo sem ter concluído tudo, uma coisa ficou clara:

**Programar não é sobre código.  
É sobre enxergar o mundo como algo que você pode otimizar.**

É pegar um problema feio, repetitivo, chato, e dobrar ele até ficar simples.

O setor precisava de 4 pessoas.  
A empresa só tinha 3.  
Eu fiz a 4ª pessoa ser um script Python.

Ele nunca faltou.  
Nunca pediu aumento.  
Nunca errou cansado.  
Nunca atrasou.

Esse é o superpoder da programação.
