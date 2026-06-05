// 极简本地静态服务器：node _serve.cjs  然后浏览器开 http://localhost:8080/
const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname, port=8080;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css'};
http.createServer((req,res)=>{
  let f=decodeURIComponent(req.url.split('?')[0]); if(f==='/')f='/index.html';
  const fp=path.join(root,f);
  fs.readFile(fp,(e,buf)=>{
    if(e){res.writeHead(404);return res.end('404');}
    res.writeHead(200,{'Content-Type':mime[path.extname(fp)]||'application/octet-stream'});
    res.end(buf);
  });
}).listen(port,()=>console.log('Serving at http://localhost:'+port+'/  (Ctrl+C 停止)'));
