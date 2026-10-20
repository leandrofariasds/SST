# Proposta de melhorias colaborativas v2 — SST

**Autoria do projeto original:** Lenilson (`lenilsonr2009-lrac`) — <https://github.com/lenilsonr2009-lrac/SST>.

## Escopo implementado

| Área | Melhoria |
|---|---|
| Estrutura | Separação de `index.html`, `videos.html` e `simulado.html` com links relativos e navegação consistente. |
| Atalhos originais | Jornais, G1, FDS/FISPQ, FIESP/SENAI, TST e "Direto ao Ponto" restaurados como seção de recursos. |
| Prevenção | Seção "O que temos que evitar?" com quatro casos ilustrados e detalhes de condutas seguras. |
| Normas | 38 resumos preservados, busca por NR, filtros por natureza normativa e riscos associados. |
| Cores | Legenda histórica do mapa de riscos: verde/físico, vermelho/químico, marrom/biológico, amarelo/ergonômico, azul/acidentes. |
| Calendário | Relógio local, meses navegáveis, campanhas por mês e dias educativos destacados. |
| Simulado | 50 questões autorais (10 por grupo), quatro alternativas, correção comentada, resultado final e revisão. |
| Vídeos | 100 registros herdados e três referências adicionais, em página dedicada, com player sob demanda. |
| Acessibilidade | Skip link, teclado, foco visível, labels, aria-live, menu responsivo, redução de movimentos. |
| Créditos | Todos os arquivos históricos do autor original mantidos byte a byte. |

## Limitações e precauções

- **Cores/NRs:** relação temática pedagógica, não taxonomia normativa oficial. Riscos podem se sobrepor.
- **Datas:** o calendário não cobre todos os eventos e muitas campanhas não constituem determinação de SST. Confirme datas móveis e materiais de campanhas em fontes oficiais.
- **FDS:** o documento do produto deve ser obtido da fonte emissora responsável; não presumir que ANVISA hospede todas as fichas.
- **Questões:** autorais e introdutórias; não reproduzem questões de concurso e não são certificação.
- **Vídeos:** disponibilidade e aderência dos links externos exigem auditoria editorial antes da publicação.
- **Licença/autoria:** não atribuída licença nova, autorização e revisão de PR cabem ao mantenedor original.

## Verificação técnica

- Arquivos JavaScript verificados com `node --check`.
- Verificação de HTML e links internos por parser, 38 NRs, 50 questões, cinco grupos e preservação do ZIP original.
- Não há dependência de backend; vídeos e sites externos dependem de internet.
- A execução gráfica automatizada no Chromium não esteve disponível no ambiente desta revisão; **o projeto deverá ser conferido visualmente no Chrome/Edge/Firefox e no celular antes da publicação**.

## V3 — Biblioteca SST (outubro/2026)

- Página `biblioteca.html` com 20 referências e filtros por temas, busca por título/autor e favoritos locais.
- Visualizador de PDF em `<dialog>` com iframe carregado apenas por ação do usuário; caso o autor bloqueie incorporação, link direto para a fonte permanece visível.
- Capas **ilustrativas**, sem cópia ou apropriação da capa editorial. Autores e instituições exibidos nas fichas.
- Links diretos confiáveis para UFSM, ESMPU, Fundacentro, MTE, eSocial e Clinimercês; sem redirecionamentos opacos do Google.
- Nav atualizado nas páginas originais da proposta V2, preservando os créditos do Lenilson.
- Conteúdo de obras antigas é apoio didático e não fonte normativa vigente.
