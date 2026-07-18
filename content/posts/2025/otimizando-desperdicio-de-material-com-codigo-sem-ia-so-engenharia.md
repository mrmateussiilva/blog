+++
title = "Otimizando desperdício de material com código (sem IA, só engenharia)"
date = "2025-12-29T15:04:55.321Z"
lastmod = "2025-12-29T15:12:08.692Z"
draft = false
slug = "otimizando-desperdicio-de-material-com-codigo-sem-ia-so-engenharia"
description = "Olá pessoal, tudo bem? No meu último post sobre automação — esse aqui: Por que aprender a programar mudou minha vida e pode mudar a sua também — eu mencionei rapidamente um algo..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/otimizando-desperdicio-de-material-com-codigo-sem-ia-so-engenharia"
+++
Olá pessoal, tudo bem?

No meu último post sobre automação — esse aqui:
[Por que aprender a programar mudou minha vida e pode mudar a sua também](https://www.tabnews.com.br/mateussiilva/por-que-aprender-a-programar-mudou-minha-vida-e-pode-mudar-a-sua-tambem?referrer=grok.com) — eu mencionei rapidamente um algoritmo que eu estava desenvolvendo para **otimização de desperdício de material**.

Em algum momento, enquanto escrevia e trabalhando nisso tudo, ficou claro pra mim que a parte mais interessante não era o código em si, mas o efeito que ele causava no mundo real. Este texto existe pra registrar essa ideia, as decisões técnicas por trás dela e o que acontece quando programação deixa de ser teoria.

Antes de entrar na parte técnica, alguns pontos importantes:

* Vou usar **valores fictícios** para representar os dados
* A **taxa de economia é real**

---

## Contexto da história

A ideia surgiu de forma totalmente casual.

Estava conversando com meu chefe sobre custos: papel, adesivo, tinta… Ele comentou que queria testar um novo fornecedor, porque os preços estavam altos. Em tom de brincadeira, soltou aquela frase clássica:

> “Custo é igual unha: sempre tem que cortar.”

A conversa terminou ali, cada um voltou ao trabalho.

Mas aquilo ficou na minha cabeça.

No fim do expediente, parei alguns minutos pra processar os números que ele tinha comentado:

* Papel: **R$ 2,00 / m²**
* Adesivo: **R$ 10,00 / m²**

> Não vou falar de tinta hoje. Tinta é um problema à parte, bem mais chato de medir e otimizar.
> Eu resolvi isso também, mas merece um post só pra ele 

---

## O tamanho do problema

O que mais me chamou atenção foi o adesivo.

A cada **50 metros de adesivo usados**, cerca de **12 metros iam direto para o lixo**.

Fazendo a conta:

* 50m × R$10,00 = **R$500,00**
* 12m desperdiçados × R$10,00 = **R$120,00**

Ou seja:

> **A cada R$500,00 gastos, R$120,00 eram literalmente jogados fora.**

Isso é **24% de desperdício**.

E o pior: isso não acontecia por descuido ou má vontade. Era consequência direta da forma como os trabalhos chegavam e precisavam ser produzidos.

Eu já vinha coletando alguns dados sobre desperdício, mas quem trabalha em produção sabe como é:
equipe enxuta, prazo apertado, cliente esperando. Desperdício acaba ficando em segundo plano.

---

## Por que o desperdício acontecia?

Na prática, enfrentávamos dois cenários bem claros.

### Cenário 1: o trabalho urgente isolado

* 08:30 — vendedor libera um totem
* Tamanho: **30 × 30 cm**
* Prazo: precisa estar pronto às **11:00**
* Tempo disponível: **2h30**

Nossa bobina de adesivo tem **1 metro de largura**.

Para produzir um adesivo de 30 cm, automaticamente **70 cm de material útil eram desperdiçados**.

A taxa de aproveitamento?
**30%.**

Mas com prazo apertado, você pega o material que já está na máquina e produz. Não dá pra esperar juntar com outros trabalhos ou reorganizar tudo.

---

### Cenário 2: o quebra-cabeça diário (o mais comum)

Agora imagina isso acontecendo dezenas de vezes por dia.

Chegam **30 totens de tamanhos diferentes**.
Você tem **10 minutos, no máximo**, para:

* Olhar todas as medidas
* Tentar encaixar da melhor forma possível
* Aproveitar os espaços vazios
* Minimizar o desperdício

É tipo jogar Tetris, só que:

* Contra o relógio
* Com peças todas diferentes
* E cada erro custa dinheiro real

Fazer isso manualmente, sob pressão, com o setor inteiro esperando, é simplesmente impossível de fazer de forma ótima.
Você faz o melhor que dá — e segue o jogo.

---

## A solução

A ideia era simples (na teoria):

> Criar um algoritmo que organizasse automaticamente essas imagens, tentando minimizar o desperdício.

---

### Por que não usei IA?

Dois motivos bem práticos:

1. **Custo** — não podia gerar despesas extras com esse projeto
2. **Performance** — usar IA para encaixar polígonos disformes seria computacionalmente caro e lento

Então segui outro caminho:
**múltiplas tentativas aleatórias**.

É literalmente jogar Tetris várias vezes seguidas e ficar com o melhor resultado.

---

### Como funciona na prática

Imagine os mesmos **30 polígonos**, em uma bobina de **1 metro de largura**.

**Tentativa 1**

* Organização aleatória
* Arquivo final: **1m × 4m**
* Material usado: **4m²**

**Tentativa 2**

* Nova organização
* Arquivo final: **1m × 3,4m**
* Economia: **0,6m² (15%)**

**Tentativa 3**

* Outra organização
* Arquivo final: **1m × 3,1m**
* Economia: **0,9m² (22,5%)**

O algoritmo roda **dezenas ou centenas dessas tentativas** em poucos minutos e escolhe automaticamente a melhor.

O que antes levava **10 minutos de estresse manual** agora leva **segundos ou minutos**, com resultados consistentemente melhores.

---

### A taxa de otimização

A taxa de otimização vai de **0 a 7**:

* **Nível 0** — praticamente sem otimização (~40s)
* **Nível 3** — otimização intermediária (~2min)
* **Nível 7** — otimização agressiva (~6min)

É um trade-off direto:
**tempo de processamento vs economia de material**.

---

## A parte técnica

Apesar de parecer simples no papel, implementar isso foi tudo menos trivial.

### Linguagem: Rust + Python

O primeiro desafio foi performance.

Python puro simplesmente não aguentaria o volume de operações necessárias.

A solução foi criar uma biblioteca de manipulação de imagens em **Rust**, exposta para Python usando **PyO3**.

```rust
#[pyclass]
pub struct FenrirImage {
    width: u32,
    height: u32,
    buffer: DynamicImage,
}

#[pymethods]
impl FenrirImage {
    pub fn crop(&mut self, x: u32, y: u32, w: u32, h: u32) -> PyResult<Self> {
        self.validate_rect(x, y, w, h)?;
        let cropped = self.buffer.crop_imm(x, y, w, h);
        let normalized = FenrirImage::normalize_dynamic(cropped);
        // ...
    }

    pub fn rotate_90(&mut self) -> PyResult<()> {
        let rotated = self.buffer.rotate90();
        self.set_from_dynamic(rotated);
        Ok(())
    }
}
```

Esse tipo de operação acontece **centenas de vezes por tentativa**.
Se isso fosse Python puro, o algoritmo simplesmente não seria viável.

---

### Sobre os polígonos

Cada imagem é transformada em um **polígono não convencional**, baseado no traçado real da imagem — não apenas quadrados ou círculos.

Esse polígono não é perfeito (e nem precisa ser), mas é bom o suficiente para:

* Cálculo de área
* Detecção de colisão
* Cache de resultados

Muitas imagens se repetem ao longo das produções, então esse cache faz muita diferença.

---

### Técnicas usadas no algoritmo

Esse problema é uma variação prática do **2D Bin Packing Problem**, que é NP-difícil.
Ou seja: não existe solução perfeita rápida — só soluções cada vez melhores.

* Estruturas de dados espaciais
* Paralelismo
* Caching inteligente
* Recursividade com backtracking

---

## Os resultados

**Mês 1 — sem script**

* Produção: 240 totens
* Material usado: 210m
* Custo: **R$2.100**

**Mês 2 — otimização nível 3**

* Produção: 250 totens
* Material usado: 205m
* Economia: **R$50**

**Mês 3 — otimização nível 5**

* Material usado: 190m
* Economia: **R$200**

**Mês 4 — otimização nível 7**

* Material usado: 170m
* Economia: **R$400 por mês**

---

## Conclusão

Programar só por programar é legal.

Mas criar algo que **impacta diretamente o trabalho das pessoas**, reduz desperdício e melhora processos reais é outra história.

Eu nunca cheguei no meu chefe dizendo:
“Olha, economizamos X reais por causa disso.”

Ele tinha coisas mais importantes para se preocupar.
Meu trabalho era resolver problemas — e explicar só se alguém perguntasse.

Talvez ele nem tenha percebido conscientemente que estávamos produzindo mais, com menos desperdício.

Mas é exatamente isso que programação é — e sempre vai ser.

Resolver problemas reais, de forma silenciosa, mensurável e eficiente.

E sim: esse “script” acabou virando um módulo conectado diretamente à **Safira**, que eu mencionei no último post.

---

### Observações

Estou com alguns projetos atrasados (pra variar) e, por isso, ainda não disponibilizei a lib feita em Rust nem o script em Python no meu GitHub.

Quero melhorar a estrutura e a organização antes, porque hoje está uma bagunça honesta.

Durante o tempo em que trabalhei nessa empresa, fiz muitas automações e projetos parecidos com esse. Pretendo falar de vários deles nos próximos posts.

Obrigado por ler até aqui — e até a próxima.
