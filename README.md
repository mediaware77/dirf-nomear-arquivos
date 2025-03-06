# PDF Folder Selector

Uma aplicação web simples e elegante para selecionar e listar arquivos PDF de uma pasta local.

## Características

- Interface moderna e intuitiva
- Modo escuro/claro
- Seleção de pasta local
- Listagem automática de arquivos PDF
- Design responsivo

## Requisitos

- Navegador moderno que suporte a File System Access API (Chrome, Edge, etc.)
- Servidor web local para execução

## Instalação

1. Clone o repositório ou baixe os arquivos
2. Configure um servidor web local. Você pode usar qualquer uma das seguintes opções:

   - Python:
     ```bash
     python -m http.server 8000
     ```
   - Node.js (com http-server):
     ```bash
     npx http-server
     ```
   - PHP:
     ```bash
     php -S localhost:8000
     ```

3. Acesse a aplicação através de http://localhost:8000 (ou a porta que você configurou)

## Como Usar

1. Abra a aplicação no navegador através do endereço local (ex: http://localhost:8000)
2. Clique no botão "Escolher pasta"
3. Selecione a pasta que contém seus arquivos PDF
4. Os arquivos PDF serão listados automaticamente na interface

## Modo Escuro

A aplicação possui um modo escuro que pode ser ativado através do toggle no canto superior direito da tela. A preferência é salva automaticamente para futuras visitas.

## Notas Importantes

- A aplicação deve ser executada através de um servidor web local (http://localhost) ou HTTPS para funcionar corretamente
- O acesso aos arquivos é feito de forma segura através da File System Access API
- Nenhum arquivo é enviado para servidores externos

## Suporte a Navegadores

- Google Chrome (recomendado)
- Microsoft Edge
- Outros navegadores baseados em Chromium

## Limitações

- A File System Access API pode não estar disponível em todos os navegadores
- Necessário executar em ambiente seguro (localhost ou HTTPS)

## Licença

Este projeto está sob a licença MIT.
