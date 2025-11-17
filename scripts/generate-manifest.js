import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';

async function generateManifest() {
  try {
    const artigosDir = 'public/conteudo/artigos';
    const poesiasDir = 'public/conteudo/poesias';
    
    const artigos = await readdir(artigosDir);
    const poesias = await readdir(poesiasDir);
    
    const manifest = {
      artigos: artigos.filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')),
      poesias: poesias.filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')),
      sobre: 'sobre'
    };
    
    await writeFile(
      'public/conteudo/manifest.json',
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('✅ Manifest gerado com sucesso!');
    console.log(`   Artigos: ${manifest.artigos.length}`);
    console.log(`   Poesias: ${manifest.poesias.length}`);
  } catch (error) {
    console.error('❌ Erro ao gerar manifest:', error);
    process.exit(1);
  }
}

generateManifest();
