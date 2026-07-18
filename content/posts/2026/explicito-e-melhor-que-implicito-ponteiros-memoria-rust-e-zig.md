+++
title = "Explícito é melhor que implícito: ponteiros, memória, Rust e Zig"
date = "2026-07-06T12:40:46.632Z"
lastmod = "2026-07-06T12:55:38.917Z"
draft = false
slug = "explicito-e-melhor-que-implicito-ponteiros-memoria-rust-e-zig"
description = "Nos últimos tempos eu venho trabalhando quase 100% com Python e tecnologias mais superficiais da web. API, framework, ORM, JSON, dashboard, componente, fila, integração, webhook..."
tags = ["tabnews"]
source_url = "https://www.tabnews.com.br/mateussiilva/explicito-e-melhor-que-implicito-ponteiros-memoria-rust-e-zig"
+++
Nos últimos tempos eu venho trabalhando quase 100% com Python e tecnologias mais superficiais da web.

API, framework, ORM, JSON, dashboard, componente, fila, integração, webhook.

Não estou reclamando.

Isso paga conta.  
Isso entrega produto.  
Isso resolve problema real.

Mas, em alguns momentos dos últimos dois anos, eu voltei a programar bastante em linguagens como C, C++, Zig e Rust.

E eu gosto muito dessas linguagens por um motivo simples:

elas não fingem que o computador é uma entidade mística rodando “regra de negócio” no éter.

Elas jogam na sua cara uma coisa que muita gente esquece:

**programa é dado em memória sendo manipulado.**

E se você vai falar de memória, uma hora vai ter que falar de ponteiro.

---

# A explicação seca

A explicação clássica é:

> “Ponteiro é uma variável que guarda o endereço de outra variável.”

Está certo.

Mas é aquele certo meio inútil.

É igual falar que motor é uma coisa que faz o carro andar.

Beleza, gênio.

Agora abre o capô.

A frase está correta, mas ela não passa o peso da coisa.

Porque ponteiro não é difícil só por causa da definição.

A definição é simples.

O problema é o que vem junto com ela.

---

# O estoque imundo da memória

Pensa em um estoque.

Não um estoque bonitinho de sistema SaaS, com dashboard limpo, gráfico colorido e botão arredondado.

Um estoque real.

Prateleira velha.  
Caixa torta.  
Etiqueta errada.  
Produto sumido.  
Gente mexendo onde não deveria.  
Alguém jurando que “ontem estava aqui”.

Cada caixa tem um conteúdo real dentro dela.

Essa caixa é o valor.

Pode ser um número, uma struct, um buffer, uma imagem, tanto faz.

O ponto é:

**o dado real está guardado em algum lugar.**

Agora imagina que você não quer carregar a caixa inteira para todo canto.

Você pega só uma etiqueta:

**Corredor 3, prateleira 2, caixa 17.**

Essa etiqueta não é a caixa.

Ela não tem o produto dentro.

Ela só diz onde o produto está.

Isso é um ponteiro.

Ponteiro não é o valor.

Ponteiro é o endereço do valor.

---

# O problema começa quando você confia demais

Até aqui parece simples.

E é.

O problema começa quando você lembra que computador não tem bom senso.

Se a etiqueta aponta para o lugar certo, beleza.  
Você chega no dado real.

Se a etiqueta aponta para o lugar errado, você acessa lixo.

Se a caixa já foi removida e você continua usando a etiqueta antiga, você tem um ponteiro pendurado.

Se a etiqueta está vazia, você tem um ponteiro nulo.

Se você escreve mais coisa do que cabe dentro da caixa, começa a invadir a caixa do lado.

Aí nasce aquele tipo de bug maravilhoso que não quebra agora, não quebra no teste, não quebra no deploy, mas explode três semanas depois em produção como se fosse vingança pessoal.

E é aqui que C e C++ começam a cobrar o preço.

---

# C e C++: poder bruto, risco bruto

Eu não acho C e C++ ruins naquele sentido simplista de internet.

Pelo contrário.

São linguagens absurdamente poderosas.

Você consegue controlar memória.  
Chegar perto do metal.  
Fazer coisa performática de verdade.  
Construir sistema operacional, banco de dados, runtime, engine, compilador.

Mas elas também te deixam fazer merda com uma liberdade quase poética.

Você pode dar `free` duas vezes.

Pode acessar memória depois de liberar.

Pode esquecer de liberar.

Pode escrever fora do buffer.

Pode passar ponteiro nulo.

Pode deixar ownership implícito espalhado em comentário velho, convenção verbal e fé.

E fé não escala.

C++ moderno melhorou muita coisa com RAII, `unique_ptr`, `shared_ptr`, referência, move semantics e várias ferramentas boas.

Quando bem usado, C++ moderno é outra conversa.

Mas a linguagem carrega décadas de compatibilidade, liberdade e armadilha.

Ela te deixa fazer certo.

Só que também te deixa fazer uma quantidade industrial de besteira sofisticada.

---

# Exemplo 1: usar memória depois de liberar

Em C, o compilador deixa você se enforcar.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *p = malloc(6);

    strcpy(p, "hello");

    free(p);

    printf("%s\n", p); // usando memória depois do free
}
```

O problema aqui é simples:

`p` ainda guarda um endereço, mas aquele pedaço de memória já foi devolvido.

A etiqueta continua na sua mão, mas a caixa não é mais sua.

Às vezes quebra.

Às vezes imprime.

Às vezes parece funcionar.

E é justamente isso que torna o bug desgraçado.

Em Rust, isso morre na compilação.

```rust
fn main() {
    let s = String::from("hello");

    drop(s);

    println!("{}", s); // erro: valor usado depois de ser movido
}
```

Rust não deixa você usar `s` depois do `drop`, porque `drop(s)` consome o valor.

A partir dali, `s` não é mais dono de nada.

Esse é o tipo de coisa que em C vira bomba-relógio.

Em Rust, vira erro antes do programa rodar.

Em Zig, a abordagem é outra.

Ele não tenta fingir que memória não existe.

Você pede memória para um allocator.  
Você usa.  
Você deixa explícito quando vai liberar.

```zig
const std = @import("std");

pub fn main() !void {
    const allocator = std.heap.page_allocator;

    const buf = try allocator.alloc(u8, 5);
    defer allocator.free(buf);

    @memcpy(buf, "hello");

    std.debug.print("{s}\n", .{buf});
}
```

Não tem mágica.

Você pediu memória.

Você recebeu um buffer.

Você deixou explícito que vai liberar com `defer`.

Quando o escopo acabar, limpa.

Zig não está tentando ser sua babá.

Ele só te dá uma forma decente de organizar a sujeira.

---

# Exemplo 2: ponteiro nulo

Em C, qualquer ponteiro pode ser nulo.

```c
#include <stdio.h>

void increment(int *p) {
    *p += 1; // se p for NULL, acabou a brincadeira
}

int main(void) {
    int *ptr = NULL;

    increment(ptr);
}
```

A função recebe um `int *`.

Mas nada no tipo diz se pode ser `NULL` ou não.

Você precisa ler documentação, comentário, convenção da equipe ou confiar na fé.

E fé não escala.

Em Zig, nulo precisa aparecer no tipo.

```zig
const std = @import("std");

fn increment(ptr: ?*i32) void {
    if (ptr) |p| {
        p.* += 1;
    } else {
        std.debug.print("ponteiro nulo\n", .{});
    }
}

pub fn main() void {
    var x: i32 = 10;

    increment(&x);
    increment(null);
}
```

Aqui fica bonito.

Em Zig, `*i32` é ponteiro normal.

Se pode ser nulo, você escreve `?*i32`.

Ou seja:

**o risco aparece no tipo.**

Isso conversa diretamente com uma das frases mais importantes do Zen of Python:

**explícito é melhor que implícito.**

Eu programo em Python há bastante tempo, e essa frase virou uma das principais para mim quando o assunto é programação.

E é justamente por isso que eu gosto tanto da filosofia do Zig.

Não é sobre ser “mais raiz”.

Não é sobre sofrer à toa.

É sobre deixar o custo, o risco e a responsabilidade visíveis.

---

# Exemplo 3: escrever mais do que cabe

Em C, ponteiro cru não carrega tamanho.

```c
#include <string.h>

void copy_name(char *dest) {
    strcpy(dest, "Mateus Silva"); // e se dest tiver só 5 bytes?
}

int main(void) {
    char buffer[5];

    copy_name(buffer);
}
```

Esse é o tipo de bug que resume bem o inferno.

A função recebeu um `char *`.

Mas `char *` sozinho não diz o tamanho do buffer.

Então a função escreve e torce.

Isso é uma das coisas mais perigosas do C tradicional:

passar endereço sem tamanho e esperar que todo mundo lembre o contrato invisível.

Em Zig, você pode trabalhar com slice.

```zig
const std = @import("std");

fn copyName(dest: []u8) !void {
    const name = "Mateus Silva";

    if (dest.len < name.len) {
        return error.BufferTooSmall;
    }

    @memcpy(dest[0..name.len], name);
}

pub fn main() !void {
    var buffer: [5]u8 = undefined;

    try copyName(buffer[0..]);
}
```

Aqui o parâmetro não é só um ponteiro solto.

É um slice: `[]u8`.

Slice em Zig carrega ponteiro e tamanho.

Então a função consegue perguntar:

```zig
dest.len
```

Isso muda o jogo.

Você para de passar uma etiqueta sem contexto e começa a passar uma etiqueta com o tamanho da caixa junto.

Ainda dá para fazer besteira?

Dá.

Mas a besteira fica menos invisível.

---

# Exemplo 4: liberar duas vezes

Em C, de novo, o compilador deixa.

```c
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof(int));

    free(p);
    free(p); // double free
}
```

Você liberou uma vez.

Depois liberou de novo.

O compilador não sabe, não se importa, não te ajuda.

O runtime pode detectar.

Pode quebrar.

Pode explodir de formas variadas.

C++ moderno resolve boa parte disso com RAII.

```cpp
#include <memory>
#include <iostream>

int main() {
    auto p = std::make_unique<int>(42);

    std::cout << *p << "\n";

} // memória liberada automaticamente aqui
```

Aqui entra um ponto justo:

**C++ moderno não é C com classe.**

Com RAII e `std::unique_ptr`, você evita muita burrada manual.

A memória é liberada quando o objeto sai de escopo.

O problema é que C++ ainda carrega ponteiro cru, compatibilidade, décadas de código antigo e várias formas de burlar a própria segurança.

C++ moderno te dá ferramentas boas.

Mas a linguagem ainda deixa uma porta aberta para você entrar com um galão de gasolina.

Rust vai por outro caminho:

```rust
fn main() {
    let p = Box::new(42);

    println!("{}", p);

} // Box libera a memória quando sai de escopo
```

O `Box` é dono daquele valor no heap.

Quando sai de escopo, libera.

Você não chama `free`.

Você não libera duas vezes.

E se tentar transferir o dono e usar depois, o compilador reclama.

```rust
fn main() {
    let p = Box::new(42);

    let q = p;

    println!("{}", q);
    println!("{}", p); // erro: p foi movido
}
```

Isso é ownership na prática.

Não é filosofia abstrata.

É o compilador dizendo:

essa memória agora tem outro dono, para de tentar mexer no que não é mais seu.

---

# Exemplo 5: duas partes tentando alterar a mesma coisa

Em C, você consegue ter vários ponteiros mutáveis para o mesmo lugar.

```c
#include <stdio.h>

int main(void) {
    int x = 10;

    int *a = &x;
    int *b = &x;

    *a += 1;
    *b += 1;

    printf("%d\n", x);
}
```

Nesse exemplo simples não parece grave.

Mas em código real, com threads, structs, callbacks e estado compartilhado, isso vira lama rápido.

Quem pode alterar?  
Quando pode alterar?  
Quem é dono?  
Quem só está olhando?

Em C, isso muitas vezes vira convenção verbal.

Em Rust, o compilador já entra na briga.

```rust
fn main() {
    let mut x = 10;

    let a = &mut x;
    let b = &mut x; // erro: segundo borrow mutável

    *a += 1;
    *b += 1;
}
```

Rust barra.

A regra é simples:

em determinado momento, você pode ter uma referência mutável ou várias referências imutáveis.

Mas não pode transformar o mesmo estado em um carnaval de ponteiro mutável.

O borrow checker é chato?

É.

No começo parece que o compilador está discutindo com você.

Mas, na maioria das vezes, ele está impedindo você de criar uma bomba que em C só estouraria de madrugada.

---

# Zig: explícito é melhor que implícito

Aqui entra o Zig.

E, sendo bem sincero, eu gosto muito da abordagem dele.

Eu programo em Python há bastante tempo, e no Zen of Python tem uma frase que virou uma das principais para mim quando o assunto é programação:

**explícito é melhor que implícito.**

E é justamente por isso que Zig me agrada tanto.

Não porque ele seja “mais difícil”.

Não porque ele seja “mais raiz”.

Não por fetiche de sofrer com linguagem de baixo nível.

Mas porque ele deixa as coisas na mesa.

Zig não tenta fingir que a máquina não existe.

Ele não tenta colocar uma cortina bonita na frente da memória.

Ele olha para C e fala mais ou menos:

“Vamos tirar a magia escondida e deixar tudo explícito.”

Alocador explícito.

Erro explícito.

Fluxo explícito.

Custo explícito.

Sem exceção invisível atravessando metade do programa.

Sem construtor fazendo coisa escondida nas suas costas.

Sem alocação surpresa onde você achava que só tinha uma função simples.

Você passa o allocator.

Você decide de onde a memória vem.

Você decide quando libera.

Você usa `defer` para limpar sem transformar o código em um cemitério de `free`.

Você trabalha com slices que carregam ponteiro e tamanho juntos.

Zig não tenta ser sua babá.

Ele não te impede de fazer burrada do mesmo jeito que Rust tenta impedir.

Mas ele deixa a burrada mais visível.

E, para mim, isso tem muito valor.

Porque o problema quase nunca é só a linguagem deixar você fazer besteira.

O problema é a linguagem deixar você fazer besteira sem perceber.

Eu prefiro quando a ferramenta mostra o custo.

Mostra a alocação.

Mostra o erro.

Mostra quem é responsável por limpar a sujeira.

Esse é o tipo de simplicidade que eu gosto.

Não é simplicidade de esconder complexidade.

É simplicidade de não mentir sobre ela.

---

# Zig também é divertido porque é uma merda de aprender

Tem outro ponto que eu gosto no Zig.

Ele é uma merda de aprender.

E eu falo isso como elogio.

Às vezes eu brinco com um dos meninos que eu treino aqui:

> “Eu gosto de Zig porque eu ainda não sei Zig.”

Parece piada, mas tem um fundo de verdade.

Tem coisa que é maravilhosa justamente enquanto você ainda está tentando entender.

Enquanto está brigando com o compilador, lendo documentação, errando coisa besta, apanhando de conceito simples e pensando:

“Como diabos isso funciona?”

Depois que você entende demais, sei lá, perde um pouco da graça.

Brincadeira.

Mais ou menos.

A verdade é que Zig é divertido porque ele te obriga a prestar atenção.

Ele não te dá aquela sensação de estar só montando peça pronta.

Você precisa pensar no allocator.

Precisa pensar no erro.

Precisa pensar no buffer.

Precisa pensar no tamanho.

Precisa pensar no custo.

Precisa pensar no que está acontecendo de verdade.

E eu gosto disso.

Não o tempo todo, claro.

Tem dia que você só quer fazer a porcaria funcionar e ir dormir.

Mas quando a ideia é estudar, entender a máquina e lembrar que programação não é só framework com nome bonito, Zig é muito gostoso.

Ele tem esse atrito bom.

Aquele atrito que irrita, mas ensina.

Aquele tipo de dificuldade que não parece burocracia gratuita.

Parece contato direto com o problema.

E talvez seja isso que me prenda tanto nessas linguagens mais cruas.

Elas não são confortáveis.

Mas elas têm verdade.

---

# Rust: não é minha filosofia preferida, mas é engenharia séria

Agora, preferir a abordagem do Zig não anula Rust.

Pelo contrário.

Eu tenho produto em produção feito em Rust porque, naquela ocasião, Rust era simplesmente a melhor escolha.

Era rápido o bastante para desenvolver.

Seguro o bastante para dormir melhor.

Performático o bastante para não virar uma porcaria cara de manter.

E com custo aceitável para colocar algo real rodando.

Essa é a parte que muita discussão de linguagem ignora.

Não existe linguagem perfeita.

Existe ferramenta adequada para o problema, para o prazo, para o orçamento e para o nível de risco que você aceita carregar.

Rust olha para vários problemas crônicos de C e C++ e fala:

“Não. Você não vai empurrar essa bomba para runtime se eu conseguir barrar em compilação.”

Rust força ownership.

Força borrowing.

Força lifetimes.

Força você a responder perguntas que em C muitas vezes ficam jogadas no ar:

Quem é dono dessa memória?

Quem pode alterar isso?

Essa referência ainda é válida?

Posso ter dois lugares modificando o mesmo dado ao mesmo tempo?

Esse dado vive tempo suficiente para ser usado aqui?

O borrow checker é chato?

É.

No começo parece que o compilador está discutindo com você.

Mas, na maioria das vezes, ele está impedindo você de fazer uma besteira que em C viraria um bug maldito de madrugada.

Rust não elimina toda complexidade.

Não faz milagre.

Não transforma programador ruim em engenheiro de kernel.

Mas ele pega uma classe inteira de problemas — use-after-free, double free, data race, referência inválida — e tenta matar antes do programa rodar.

Isso é brutal.

---

# Zig e Rust resolvem dores diferentes

Para mim, Zig e Rust resolvem dores diferentes com filosofias diferentes.

Zig aposta em explicitude.

Rust aposta em garantias.

Zig fala:

“Eu vou deixar claro o que está acontecendo.”

Rust fala:

“Eu vou impedir você de fazer certas besteiras.”

Eu, pessoalmente, gosto mais da filosofia do Zig.

Mas respeito muito a engenharia do Rust.

E uso Rust sem crise nenhuma quando ele é a melhor ferramenta para entregar algo seguro, rápido e com custo decente.

O problema é quando a discussão vira torcida organizada.

Aí fica burro.

Linguagem não é religião.

É ferramenta.

E ferramenta boa é a que resolve o problema real sem criar um problema maior depois.

---

# O ponto real: memória existe

No fundo, C, C++, Rust e Zig estão lidando com a mesma realidade:

**memória existe.**

Dado mora em algum lugar.

Passar uma cópia não é a mesma coisa que passar um endereço.

Alterar uma cópia não altera o original.

Alterar pelo ponteiro mexe no dado real.

E quando você começa a manipular endereço diretamente, você sai do playground confortável da programação web e entra em outro nível de responsabilidade.

Python esconde isso de você.

JavaScript também.

E tudo bem.

Eu trabalho com essas linguagens porque elas resolvem problema rápido.

Não tenho fetiche burro por sofrer à toa.

Mas descer para C, C++, Rust ou Zig de vez em quando te lembra que por trás do framework bonito existe uma máquina real, com memória real, limite real e custo real.

---

# Por que ponteiros importam

Ponteiro assusta porque ele remove a maquiagem.

Ele mostra que variável não é uma caixinha mágica.

Objeto não é uma entidade espiritual.

Referência não é conceito abstrato de palestra.

No fim, tem endereço.

Tem dado.

Tem memória.

Tem alguém responsável por não bagunçar tudo.

Ponteiros são um inferno necessário.

Não porque todo mundo precise usar ponteiro cru todos os dias.

Mas porque entender ponteiro muda a forma como você enxerga programação.

Você para de achar que software é só empilhar camada.

Você começa a entender o chão onde as camadas estão apoiadas.

E esse chão se chama memória.
