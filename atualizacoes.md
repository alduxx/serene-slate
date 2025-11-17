# Como atualizar

## Atualização RÁPIDA (apenas conteúdo markdown)

Se você apenas adicionou ou editou artigos/poesias:

```bash
cd ~/aldomonteiro.com.br
git pull

# Gera o manifest com a lista de arquivos
node scripts/generate-manifest.js

# Copia apenas o conteúdo
sudo cp -r public/conteudo/* /var/www/aldomonteiro.com.br/conteudo/
```

⚡ **Tempo: ~5 segundos** (ao invés de ~2 minutos)

## Atualização COMPLETA (código + conteúdo)

Se você mudou componentes, estilos ou código:

```bash
cd ~/aldomonteiro.com.br
git pull
npm ci
npm run build
sudo rm -rf /var/www/aldomonteiro.com.br/*
sudo cp -r dist/* /var/www/aldomonteiro.com.br/
sudo systemctl reload nginx
```

⏱️ **Tempo: ~2 minutos**

## Quando usar cada método?

| Você mudou... | Use |
|---------------|-----|
| Apenas artigos/poesias | Atualização RÁPIDA |
| Código, design, componentes | Atualização COMPLETA |
