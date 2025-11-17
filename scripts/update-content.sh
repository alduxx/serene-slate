#!/bin/bash

# Script para atualizar apenas o conteúdo markdown sem rebuild completo
echo "🔄 Atualizando conteúdo markdown..."

# Gerar o manifest
echo "📝 Gerando manifest..."
node scripts/generate-manifest.js

# Copiar para o servidor (ajuste os caminhos conforme necessário)
echo "📤 Copiando arquivos para o servidor..."
sudo cp -r public/conteudo/* /var/www/aldomonteiro.com.br/conteudo/

echo "✅ Conteúdo atualizado com sucesso!"
echo ""
echo "⚠️  Nota: Se você adicionou novos arquivos markdown, execute 'npm run build:content' primeiro"
