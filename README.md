# SST
um site de segurança e saúde do trabalho com o intuito de ensinar de forma rápida, pratica e direto ao ponto

## SST em foco — evolução colaborativa

**Projeto e autoria original: [Lenilson — lenilsonr2009-lrac/SST](https://github.com/lenilsonr2009-lrac/SST).**

Esta pasta reúne uma proposta de melhorias **para análise e aprovação do autor original**. A identidade do projeto, os créditos e os arquivos históricos `javascript.js`, `style.css`, `videos-data.json` e `MELHORIAS.md` foram mantidos. A nova estrutura não indica transferência de autoria nem inclui licença nova.

### Novidades desta versão

- **Quatro páginas independentes:** `index.html` (início, NRs, calendário e recursos), `videos.html` (acervo de vídeos) e `simulado.html` (avaliação) e `biblioteca.html` (livros, apostilas e manuais).
- **Biblioteca SST:** 20 recursos publicados por instituições como UFSM, ESMPU, Fundacentro, MTE e eSocial; busca, temas, capas gráficas ilustrativas, favoritos no dispositivo e leitor de PDF quando permitido pelo servidor.
- **Atalhos restaurados:** 📰 Jornais (inclusive Jornal do Commercio de Recife), 📋 FDS/FISPQ, 🏭 FIESP/SENAI, ⚖️ TST, G1 e **👉 Direto ao Ponto**.
- **⚠️ O que temos que evitar?:** quatro situações ilustradas e orientações preventivas expansíveis.
- **NRs:** preservadas as 38 entradas do projeto anterior, inclusive entradas revogadas, com pesquisa, filtros de natureza normativa e novos filtros por tipo de risco associado.
- **Cores de riscos:** físico = verde, químico = vermelho, biológico = marrom, ergonômico = amarelo e acidentes = azul. Atenção: a legenda é uma **convenção educativa histórica do mapa de riscos**, e as associações das NRs a esses grupos são temáticas (não uma classificação oficial das normas).
- **Calendário:** exibe data, mês e hora locais; permite navegar entre meses e consultar campanhas de conscientização e datas pontuais (por exemplo, Outubro Rosa, 10/10 — saúde mental e segurança e saúde nas escolas, 28/04 — SST, 27/11 — técnico de segurança do trabalho).
- **Simulado:** 50 questões autorais e comentadas, com quatro alternativas, embaralhamento da ordem, feedback imediato, indicador de progresso, tempo de realização, pontuação por tema e revisão das questões erradas.
- **Vídeos:** 100 registros do projeto original mantidos, além de três referências externas identificadas; filtros, pesquisa e reprodução sob demanda.
- **Interface:** responsiva, HTML semântico, botões acessíveis, indicação do foco, tema claro/escuro e preferência por movimento reduzido. Usa CSS local e opcionalmente Bootstrap por CDN.

### Como utilizar

1. Extraia o ZIP preservando a estrutura de pastas.
2. Abra **`index.html`** no Chrome, Firefox ou Edge.
3. Clique em **Biblioteca** para acessar `biblioteca.html`, com materiais online; clique em **Vídeos** para abrir `videos.html` ou **Simulado** para abrir `simulado.html`.
4. Use os filtros de risco na seção **Normas**; as cores ajudam a estudar, mas não substituem avaliação técnica.
5. Para ver o calendário, escolha **Calendário**. Data e hora são obtidas **do relógio do seu dispositivo** (sem envio para servidores).

O conteúdo local, o calendário, a pesquisa e o simulado funcionam sem internet, sem XAMPP e sem banco de dados. Vídeos hospedados no YouTube, PDFs remotos, notícias, links externos e o Bootstrap por CDN precisam de conexão.

### Arquivos

```text
SST-main/
├── index.html                 # Página inicial, calendário, riscos, notícias e NRs
├── videos.html                # Página de vídeos
├── simulado.html              # Página do simulado completo
├── biblioteca.html            # Biblioteca e leitor de PDF
├── modern.css                 # Layout responsivo e estados acessíveis
├── biblioteca-dados.js        # Links e metadados institucionais
├── biblioteca.js              # Pesquisa, filtros, favoritos e leitor
├── shared.js                  # Menu e tema compartilhados nas três páginas
├── home.js                    # Pesquisa de NRs e hierarquia de controles
├── calendario.js              # Campanhas, calendário e relógio local
├── videos.js                  # Filtros e reprodutor de vídeos
├── catalogo-videos.js        # Catálogo herdado e três referências novas
├── simulado.js                # Navegação, correção, pontuação e revisão
├── questoes.js                # Banco de 50 questões autorais
├── assets/                   # SVGs informativos e favicon
├── javascript.js             # Arquivo do autor, preservado sem modificação
├── style.css                 # Arquivo do autor, preservado sem modificação
├── videos-data.json          # Acervo original, preservado sem modificação
├── MELHORIAS.md              # Histórico original, preservado sem modificação
├── MELHORIAS_COLABORATIVAS.md
└── CONTRIBUICAO.md            # Como propor um Pull Request
```

### Fontes e responsabilidade

- [Ministério do Trabalho e Emprego — NRs](https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/normas-regulamentadoras-nrs).
- [Ministério da Saúde — calendário de outubro](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/calendario/saude/outubro).
- [Ministério da Saúde — dia 28 de abril](https://bvsms.saude.gov.br/garantir-ambientes-de-trabalho-saudaveis-e-bem-estar-psicossocial-28-4-dia-mundial-da-seguranca-e-saude-no-trabalho-dia-nacional-em-memoria-das-vitimas-de-acidentes-e-d/).
- [Fundacentro — Técnico de Segurança do Trabalho (27/11)](https://www.gov.br/fundacentro/pt-br/comunicacao/noticias/noticias/2008/11/dia-do-tecnico-de-seguranca-do-trabalho).
- Legenda de riscos de uso histórico: físico/verde, químico/vermelho, biológico/marrom, ergonômico/amarelo e acidente/azul; a NR 5 atual permite outras técnicas de registro da percepção de riscos.
- O link **ANVISA** que existia no projeto original foi mantido, mas não deve ser apresentado como repositório universal de FDS. Solicite o documento atualizado diretamente ao fabricante/fornecedor.
- Vídeos externos permanecem atribuídos aos canais de publicação. O catálogo herdado **não foi auditado vídeo por vídeo** quanto à disponibilidade, atualidade normativa ou direitos de incorporação.

Os textos resumidos e os exercícios têm finalidade **educativa**; não substituem normas vigentes, análises de risco, cursos obrigatórios, procedimentos de emergência nem orientações de profissionais habilitados.

### Contribuir com o original

Consulte [`CONTRIBUICAO.md`](CONTRIBUICAO.md) para abrir um **fork**, criar uma **branch** e enviar um **Pull Request** para revisão do Lenilson, preservando o histórico e os créditos do projeto. Verifique as condições de uso com o titular, pois não consta licença no ZIP original.

### Biblioteca: links e direitos autorais

A página `biblioteca.html` **não hospeda PDFs de terceiros** nem reproduz suas capas oficiais. Os livros são acessados nos sites das instituições; as capas são representações gráficas criadas para esta interface. O leitor abre URLs HTTPS em um diálogo, sujeito a bloqueios de incorporação (X-Frame-Options, CSP) e à conexão com a internet. Nestes casos, o botão **Abrir PDF ↗** continua disponível. Favoritos são armazenados apenas localmente no navegador.

Os links opacos do Google (`google.com/goto`) fornecidos como atalhos legados não foram usados como links de download. Materiais de título não confirmado foram substituídos por **alternativas educativas claramente identificadas**. Verifique o catálogo institucional e o texto vigente das normas antes de utilizar apostilas antigas.
