# Como enviar as melhorias ao autor original

**Autoria original e destino da proposta:** [Lenilson — SST](https://github.com/lenilsonr2009-lrac/SST).

## Opção indicada: fork e Pull Request

1. Apresente a proposta ao autor e combine a análise da contribuição.
2. No GitHub, entre em <https://github.com/lenilsonr2009-lrac/SST> e escolha **Fork**.
3. Use o PowerShell (substitua `SEU_USUARIO`):

```powershell
git clone https://github.com/SEU_USUARIO/SST.git
cd SST
git switch -c feat/sst-biblioteca-materiais
```

4. Descompacte o arquivo recebido e **copie o conteúdo da pasta `SST-main` para a pasta clonada**, substituindo os arquivos com o mesmo nome. **Não apague a pasta `.git`**.
5. Confira as mudanças antes de enviar:

```powershell
git status
git add index.html videos.html simulado.html biblioteca.html modern.css shared.js home.js calendario.js videos.js catalogo-videos.js simulado.js questoes.js biblioteca.js biblioteca-dados.js assets README.md MELHORIAS_COLABORATIVAS.md CONTRIBUICAO.md
git commit -m "feat: adiciona biblioteca SST com livros e leitor de PDF"
git push -u origin feat/sst-biblioteca-materiais
```

6. No fork, clique em **Contribute → Open pull request** e confirme destino `lenilsonr2009-lrac/SST`, branch `main`.
7. Peça a revisão dos conteúdos, links de vídeo, cores e questões. O autor decide sobre aprovação e mesclagem.

> Não faça `git push` diretamente para a branch principal do autor e não retire os créditos originais. Sem licença explícita no material recebido, combine com o titular as condições da proposta e publicação.

## Descrição sugerida do Pull Request

**Título:** `feat: biblioteca SST e melhorias educativas e de navegação`

**Mudanças:**
- Reintroduz os links de jornais, FDS/FISPQ, FIESP/SENAI, TST, G1 e atalhos preventivos.
- Segmenta conteúdo em página principal, catálogo de vídeos, simulado e biblioteca SST.
- Inclui 20 referências com autoria e fonte, filtros, capas ilustrativas, leitor de PDF e favoritos locais.
- Adiciona legenda colorida e filtros de risco associados às NRs, preservando as 38 entradas.
- Inclui calendário dinâmico de campanhas de saúde e prevenção.
- Acrescenta banco de 50 questões autorais com feedback e revisão final.
- Mantém créditos de Lenilson e arquivos históricos originais byte a byte.

**Revisões sugeridas:** confirmar acervo externo de vídeos e jornais, revisar conteúdo normativo, testar em celular, checar datas móveis, assegurar atribuições e termos de licença.
