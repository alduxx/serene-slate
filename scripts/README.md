# Scripts de Atualização de Conteúdo

## Atualização Rápida de Conteúdo (sem rebuild completo)

### 1. Gerar manifest dos arquivos markdown

```bash
node scripts/generate-manifest.js
```

Este script:
- Escaneia as pastas `public/conteudo/artigos/` e `public/conteudo/poesias/`
- Gera um arquivo `public/conteudo/manifest.json` com a lista de todos os arquivos
- É **muito rápido** (alguns milissegundos)

### 2. Atualizar conteúdo no servidor

Depois de adicionar ou modificar arquivos markdown:

```bash
# Gera o manifest
node scripts/generate-manifest.js

# Copia apenas o conteúdo para o servidor
sudo cp -r public/conteudo/* /var/www/aldomonteiro.com.br/conteudo/
```

Ou use o script combinado:

```bash
bash scripts/update-content.sh
```

## Build Completo (quando necessário)

Use o build completo apenas quando houver mudanças no código, componentes ou estilos:

```bash
npm run build
sudo rm -rf /var/www/aldomonteiro.com.br/*
sudo cp -r dist/* /var/www/aldomonteiro.com.br/
sudo systemctl reload nginx
```

## Como Funciona

O site agora carrega os arquivos markdown **dinamicamente em runtime** via fetch, ao invés de importá-los durante o build.

**Vantagens:**
- ✅ Atualizar conteúdo é instantâneo (sem rebuild)
- ✅ Adicionar novos artigos/poesias leva apenas alguns segundos
- ✅ Separação clara entre conteúdo e código

**Quando usar cada método:**

| Mudança | Comando | Tempo |
|---------|---------|-------|
| Novo artigo/poesia | `node scripts/generate-manifest.js` + copiar | ~5s |
| Editar artigo/poesia | apenas copiar | ~2s |
| Mudança no código/design | `npm run build` completo | ~1-2min |
