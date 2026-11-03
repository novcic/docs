import React, {useState,useRef,useEffect} from 'react';
import Link from '@docusaurus/Link';
import entries from '../../search-index.json';
export default function SearchBar(){
  const [query,setQuery]=useState(''),[open,setOpen]=useState(false);const root=useRef(null);
  useEffect(()=>{const close=e=>{if(!root.current?.contains(e.target))setOpen(false);};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);},[]);
  const words=query.toLowerCase().trim().split(/\s+/);const results=query.trim()?entries.filter(x=>words.every(w=>(x.title+' '+x.text).toLowerCase().includes(w))).slice(0,10):[];
  return <div className="doc-search" ref={root} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);}}><input aria-label="Search documentation" placeholder="Search documentation" value={query} onFocus={()=>setOpen(true)} onChange={e=>{setQuery(e.target.value);setOpen(true);}}/>{open&&query&&<div className="search-results" role="region" aria-label="Search results">{results.map(x=><Link key={x.url} to={x.url} onClick={()=>setOpen(false)}>{x.title}<small>{x.section}</small></Link>)}{!results.length&&<p>No matching pages. Try an endpoint or field name.</p>}</div>}</div>;
}
