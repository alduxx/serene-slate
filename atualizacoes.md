# Como atualizar 

```bash
cd ~/aldomonteiro.com.br
git pull
npm ci
npm run build
sudo rm -rf /var/www/aldomonteiro.com.br/*
sudo cp -r dist/* /var/www/aldomonteiro.com.br/
sudo systemctl reload nginx
```
