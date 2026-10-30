# Design e ativos — página Robótica e EV3

## Leitura de design

- **Artefato:** página editorial/pedagógica para inserir no site estático Circuito de Decisões.
- **Público:** professores que precisam apresentar a robótica, o EV3 Education, a montagem da base e os quatro sensores a iniciantes.
- **Modo:** extensão do sistema existente, sem redesenhar o site e sem modificar qualquer arquivo local do autor.
- **Densidade:** média, com texto curto por seção, diagramas do fluxo, cartões comparáveis e instruções que podem ser consultadas durante uma aula.
- **Fidelidade:** alta ao cabeçalho, à navegação acessível, à paleta, às fontes, aos contêineres e aos padrões de mídia já presentes.

## Sistema visual

A folha `site.css` existente deve ser carregada primeiro; `robotica-ev3.css` só acrescenta estilos desta página. São reutilizados os tokens existentes: amarelo `#ffd43b`, azul `#173e70`, tinta `#1d232b`, papel `#faf9f5`, tons neutros e linhas `#d5dbe2`. A tipografia continua sendo Barlow para títulos e texto, com IBM Plex Mono para portas, rótulos e identificadores. O espaçamento segue múltiplos de 8 px; cartões usam cantos de 12 px e bordas claras, sem sombras pesadas.

A composição intercala blocos editoriais, um diagrama de entrada/processamento/saída, imagens reais do produto, procedimentos numerados, cartões de sensores e recursos. No celular, colunas e grade do fluxo passam a uma só coluna. O menu conserva foco, operação por teclado, clique e toque; os players carregam sob ação do visitante.

## Marca e ativos

- A marca do produto educacional é o SVG já existente do site: `assets/marca.svg`. Não se usa o logotipo LEGO como logotipo do guia.
- Fotografia/ilustração do produto: `assets/robotica-ev3/ev3-driving-base-curved-move.png`, obtida de uma lição oficial LEGO Education. Fonte indicada em `FONTES-e-CREDITOS.md`.
- Imagem do conjunto: `assets/robotica-ev3/ev3-education-core-set-capitulo6.jpg`, derivada da Figura 5 do capítulo 6 anexado; legenda da dissertação aponta LEGO Education (2013).
- Imagem do bloco e sensor de cor: `assets/robotica-ev3/ev3-brick-color-sensor-help.png`, da documentação LEGO EV3 Help Online.

As imagens de produto são representações reais, não desenhos de interface. A página as credita e alerta que o direito de redistribuição precisa ser confirmado ou os arquivos devem ser trocados por imagens autorais/licenciadas antes da publicação pública. O guia é independente e não se apresenta como produto oficial ou afiliado à LEGO.