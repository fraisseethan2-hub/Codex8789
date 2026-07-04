import {readdirSync,readFileSync,statSync} from 'node:fs';import {join} from 'node:path';
const files=[];function walk(d){for(const f of readdirSync(d)){if(['.git','node_modules'].includes(f))continue;const p=join(d,f);statSync(p).isDirectory()?walk(p):files.push(p)}}walk('.');
const html=files.filter(f=>f.endsWith('.html'));if(html.length<10)throw new Error('Expected at least 10 HTML pages');
for(const f of html){const s=readFileSync(f,'utf8');for(const needle of ['<title>','meta name="description"','og:title','twitter:card'])if(!s.includes(needle))throw new Error(`${f} missing ${needle}`);}
for(const f of ['robots.txt','sitemap.xml','firebase.json'])readFileSync(f,'utf8');console.log(`Validated ${html.length} HTML pages plus robots, sitemap and Firebase config.`);
