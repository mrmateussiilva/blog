+++
date = '2026-08-29T17:51:29-03:00'
draft = false
title = 'Quando os estados não batem: Bitcoin, lavagem e reconciliação de dados'

tags = [
'bitcoin',
'economia-do-crime',
'lavagem-de-dinheiro',
'blockchain',
'regulacao-economica',
'sistemas-distribuidos',
'reconciliacao-de-dados',
'state-estimation'
]

categories = [
'Economia',
'Tecnologia'
]
+++

Quando comecei a ler sobre lavagem por causa das matérias de teoria econômica do crime, uma coisa me chamou atenção: economistas já haviam formalizado boa parte do problema muito antes de Bitcoin existir.

Gary Becker publicou *Crime and Punishment: An Economic Approach* em 1968. A ideia relevante para mim nem é repetir a equação simplificada de “ganho menos punição esperada”; é perceber a mudança metodológica que Becker propõe. Crime também pode ser estudado como comportamento sujeito a incentivos.

Donato Masciandaro empurra isso especificamente para lavagem de dinheiro. Em *Money Laundering: the Economics of Regulation* e depois em *Economics of Money Laundering: A Primer*, ele trata lavagem como parte da infraestrutura econômica necessária para que receitas obtidas criminalmente possam voltar a produzir poder de compra utilizável.

Isso muda bastante minha forma de pensar no assunto.

Se alguém possui R$ 500 mil cuja origem não consegue justificar, o problema econômico não termina no momento em que ele recebe os R$ 500 mil. Existe um custo adicional para conseguir utilizar esse patrimônio sem aumentar demais a própria exposição.

Da perspectiva de um programador, entretanto, tem outra camada que eu acho ainda mais interessante.

Dinheiro circulando por uma economia moderna gera estado em vários sistemas.

Tem pedido no ERP, autorização no processador, settlement, movimentação bancária, lançamento contábil, documento fiscal, talvez evento de uso do produto e, se algum trecho passar por Bitcoin, UTXOs registrados publicamente.

E esses estados estão relacionados.

Martin Kleppmann tem um texto que gosto bastante chamado *Using logs to build a solid data infrastructure (or: why dual writes are a bad idea)*. O problema apresentado ali é conhecido de qualquer dev que já manteve mais de uma representação do mesmo dado: atualizar sistema A e sistema B separadamente é uma ótima maneira de descobrir, às três da manhã, que A diz uma coisa e B diz outra.

Kleppmann está falando de arquitetura de dados, obviamente, e não de lavagem. Mas a propriedade é útil aqui.

Suponha que um pagamento produza:

$$
e_1 = \mathrm{OrderCreated}
$$

$$
e_2 = \mathrm{PaymentAuthorized}
$$

$$
e_3 = \mathrm{PaymentCaptured}
$$

$$
e_4 = \mathrm{SettlementReceived}
$$

$$
e_5 = \mathrm{ProductActivated}
$$

O dashboard mostrando “R$ 499 vendidos” é uma projeção.

O estado da conta bancária é outra projeção.

O relatório do gateway é outra.

Martin Fowler descreve exatamente essa diferença quando fala de Event Sourcing: o estado atual pode ser reconstruído a partir dos eventos que o produziram.

Essa distinção é extremamente útil.

Se alguém possui acesso administrativo ao sistema de vendas, alterar:

```text
revenue_month = 50000
```

não cria os eventos que deveriam ter produzido aquele estado.

Isso é praticamente a diferença entre alterar uma materialized view e alterar o log que deveria originá-la.

E qualquer programador minimamente calejado sabe que essas coisas não são equivalentes.

Imagine o seguinte cenário:

```text
orders_db            R$ 50.200
payment_processor     R$ 4.870
bank_settlements      R$ 4.614
refunds                  R$ 256
active_customers             31
```

A primeira pergunta que me interessa não é se existe crime.

Quero saber qual sequência de eventos consegue produzir esses estados simultaneamente.

Talvez exista uma resposta absolutamente banal. Um contrato B2B de R$ 45 mil pago por transferência, por exemplo, desmontaria boa parte da suspeita imediatamente.

Adicionamos o evento que estava faltando e o sistema volta a fechar.

Isso é quase debugging financeiro.

Você tem observações contraditórias, formula uma hipótese sobre o estado que deveria tê-las produzido e tenta reconstruir a execução.

É aqui que encontrei uma conexão inesperada com outra área: state estimation em sistemas elétricos.

Operadores de redes elétricas não conhecem perfeitamente o estado inteiro da rede. Eles possuem medições imperfeitas de tensão, potência e outras variáveis e tentam reconstruir o estado mais provável.

Uma formulação clássica é:

$$
z = h(x) + e
$$

onde \(x\) é o estado desconhecido, \(z\) são as medições, \(h(x)\) relaciona aquele estado às medições esperadas e \(e\) representa erro.

No caso linear:

$$
z = Hx + e
$$

Uma estimativa por mínimos quadrados ponderados procura:

$$
\hat{x}
=
\operatorname*{arg\,min}_{x}
(z-Hx)^T W (z-Hx)
$$

O detalhe que achei particularmente foda é o que acontece depois.

Você olha os resíduos:

$$
r = z - H\hat{x}
$$

State estimation de sistemas elétricos possui literalmente um problema chamado **bad data detection**. Medições incompatíveis com o estado estimado podem ser detectadas analisando resíduos normalizados.

Não inventei essa analogia para deixar o artigo matemático. Existe uma área de engenharia usando essa família de técnicas há décadas para responder a uma pergunta estruturalmente parecida:

> dadas várias medições imperfeitas, qual estado explica melhor aquilo e quais observações estão destoando demais?

Trazer isso para dados financeiros exige bastante cuidado, porque comportamento econômico não obedece às mesmas leis físicas de uma rede elétrica. Ainda assim, a abstração é útil.

Eu poderia representar:

$$
z =
\begin{bmatrix}
z_{\mathrm{ERP}} \\
z_{\mathrm{gateway}} \\
z_{\mathrm{banco}} \\
z_{\mathrm{fiscal}} \\
z_{\mathrm{atividade}}
\end{bmatrix}
$$

e procurar um estado econômico \(\hat{x}\) capaz de explicar essas observações.

O peso \(W\) também deixa de ser detalhe matemático.

Ele é praticamente um modelo de confiança.

Se eu controlo completamente o ERP, mas não controlo o processador de pagamentos, existe uma trust boundary entre essas fontes.

Em software security isso importa pra caralho.

Dado fornecido pelo cliente não recebe a mesma confiança de dado produzido dentro de um enclave que você controla. Input vindo da internet não ganha confiança só porque chegou em JSON bonito.

Em análise financeira deveria existir raciocínio parecido.

Depois entra Bitcoin, e aqui vale abandonar outra simplificação comum.

Bitcoin não é tecnicamente uma rede de:

```text
wallet A -> wallet B
```

A unidade contábil relevante é o UTXO.

Uma transação consome outputs de transações anteriores e cria novos outputs:

$$
TX_i:
\{UTXO_1, UTXO_2, \ldots\}
\rightarrow
\{UTXO'_1, UTXO'_2, \ldots\}
$$

Isso produz uma estrutura muito mais interessante que uma simples tabela de transferências.

Os trabalhos de Reid e Harrigan e, principalmente, *A Fistful of Bitcoins*, de Meiklejohn et al., exploraram justamente o fato de que pseudonimato não destrói a topologia do sistema.

Meiklejohn e seus coautores resumiram uma característica do Bitcoin que considero essencial para essa discussão: a propriedade de o fluxo ser globalmente visível apesar de os participantes utilizarem pseudônimos.

A partir das transações é possível construir heurísticas de agrupamento.

E preciso ser cuidadoso com a palavra heurística.

Se duas chaves aparecem de determinada maneira numa transação, um algoritmo pode inferir controle comum sob determinados pressupostos. Isso não transforma a inferência em verdade matemática.

Wallet software muda.

CoinJoin existe.

Custodiantes existem.

Exchanges agregam usuários.

Heurísticas quebram.

Isso é exatamente como software de verdade funciona: o modelo é válido dentro dos seus invariantes. Quebre os pressupostos e você pode continuar recebendo uma resposta perfeitamente calculada e completamente errada.

Por isso uma análise decente deveria manter três coisas separadas:

```text
observed
inferred
identified
```

`observed` é aquilo que efetivamente consta no ledger ou em outra fonte.

`inferred` é uma conclusão obtida através de uma heurística.

`identified` exige evidência externa ligando aquela estrutura a alguma entidade conhecida.

Misturar essas três categorias seria um bug conceitual sério.

E isso ajuda a explicar por que gosto tanto da frase:

> “não sei quem controla esse vértice”

não significa

> “não existe informação sobre esse vértice”.

Existe uma porrada de informação estrutural.

Só não devemos inventar semântica que os dados não possuem.

Inclusive a FATF, quando publica indicadores relacionados a ativos virtuais, não trata uma simples utilização de criptomoeda como prova de lavagem. Ela olha para padrões transacionais incomuns, frequência sem justificativa econômica, perfil das partes e origem dos recursos.

Isso é muito mais próximo de anomaly detection contextual do que de:

```text
bitcoin == crime
```

O que também deveria ser óbvio.

Se eu fosse implementar um laboratório para esse artigo, eu nem começaria por machine learning.

Faria primeiro um event store sintético.

Algo como:

```text
events
├── OrderCreated
├── PaymentAuthorized
├── PaymentCaptured
├── SettlementReceived
├── RefundIssued
├── InvoiceIssued
├── AccountTransfer
└── UtxoObserved
```

Cada consumer construiria sua própria projeção:

```text
commerce_projection
bank_projection
tax_projection
blockchain_projection
```

Depois eu propositalmente introduziria inconsistências.

A parte interessante seria tentar reconstruir o estado econômico usando apenas as projeções disponíveis.

Isso aproxima bastante o experimento de um problema que existe em sistemas reais.

Eu poderia inclusive destruir uma projeção inteira e reconstruí-la a partir do log, exatamente como Fowler descreve em Event Sourcing.

Depois alteraria registros diretamente numa projeção e verificaria se o reconciliador percebe que aquele estado não consegue ser derivado dos eventos disponíveis.

Isso, pra mim, é uma implementação muito mais interessante do que baixar um CSV, rodar Isolation Forest e comemorar porque o notebook pintou três pontos de vermelho.

Qualquer idiota consegue chamar:

```python
model.fit(X)
```

A parte difícil é definir o que \(X\) significa.

Mais difícil ainda é saber quais invariantes você tem o direito de assumir.

É aí que economia, Bitcoin e programação finalmente começam a conversar de verdade.
