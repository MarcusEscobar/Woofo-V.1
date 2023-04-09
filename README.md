# betta_woofo
repositório para upload e códigos iniciais do projeto woofo.

(escrito dia 08/04/2023)
Etapa inicial:
backend --> python, framework --> Flask*
                                       '-->*(Iicialmento o framework seria o DJango, 
                                             porem devida a alta complexidade dos multiplos arquivos craidos pelo Djando 
                                             o framework foi mudado para Flask)
Descrição do desenvolvimento:

  Inicialmente temos apenas um aquivo .py (app.py), que utilida do Flask para criar e gerenciar as URLs, a sintaxe do Flask é bem simples e pode ser entendiada facilmente, diferente do Django que necessitava se multiplos arquivos para a criação e gerenciamento das páginas.
  Cada URL criada pelo faz trabalha simultaneamente com um arquivo .html, dessa forma o framework fica responsavel por gerar o servidor local, e renderizar as páginas HTML.
  Por enquanto temos 3 paginas, uma inicial, denominada Home, que é acessada diretamente pelo link do servidor gerado pelo Flask, a seginda aba é um teste de imagens tendo 2 imagens upadas, uma em fortado .JPG e outra .PNG, inicialmete o Flask não apresenta dificuldades quanto ao formato do arquivo, porem talvez tenhamos dificuldade de upar multiplas fotos para a craição de um feed, mas é preocupação para as próximas etápas do projeto. E por fim a terceira aba é um texte de texto, de como o Flask e o HTML trabalham juntos para a aparição de textos em tela.
