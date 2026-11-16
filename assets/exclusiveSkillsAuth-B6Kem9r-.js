import{i as g}from"./index-CZCfxsrv.js";const p="wh_verified_buyers_v5790",l="wh_active_buyer_session_v5790",m="WHITEHAT-VIP-2026";function y(e){const t=e.trim().toLowerCase();let s=0;for(let r=0;r<t.length;r++)s=(s<<5)-s+t.charCodeAt(r),s|=0;return`VIP-${Math.abs(s).toString(36).toUpperCase().slice(0,5).padEnd(5,"9")}`}function u(){try{const e=localStorage.getItem(p);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t}}catch(e){console.error("Failed to read verified buyers:",e)}return[]}function h(e){try{localStorage.setItem(p,JSON.stringify(e)),window.dispatchEvent(new Event("wh_buyers_updated"))}catch(t){console.error("Failed to save verified buyers:",t)}}function f(e,t,s){const i=t.trim().toLowerCase(),r=e.trim()||"Verified Member",o=u(),a=o.findIndex(v=>v.email.toLowerCase()===i),d=y(i),c=new Date().toISOString();let n;return a!==-1?(n={...o[a],name:r,purchasedService:s||o[a].purchasedService,status:"ACTIVE",lastAccessedAt:c},o[a]=n):(n={id:`buyer_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,email:i,name:r,purchasedService:s||"Advanced VA & Freelancer Skill Mastery Package",accessKey:d,status:"ACTIVE",createdAt:c,lastAccessedAt:c},o.unshift(n)),h(o),w(n.email,n.accessKey),n}function w(e,t){try{const s=JSON.stringify({email:e.trim().toLowerCase(),accessKey:(t||"").trim().toUpperCase(),timestamp:Date.now()});sessionStorage.setItem(l,s),localStorage.setItem(l,s),window.dispatchEvent(new Event("wh_buyer_session_changed"))}catch(s){console.error("Failed to set active buyer session:",s)}}function I(){try{sessionStorage.removeItem(l),localStorage.removeItem(l),window.dispatchEvent(new Event("wh_buyer_session_changed"))}catch{}}function S(){try{const e=sessionStorage.getItem(l)||localStorage.getItem(l);if(!e)return null;const t=JSON.parse(e);if(t&&typeof t.email=="string"&&t.email.includes("@"))return{email:t.email.toLowerCase().trim(),accessKey:(t.accessKey||"").toUpperCase().trim()}}catch{}return null}function C(e,t){if(g())return{allowed:!0,isAdminBypass:!0,buyer:{id:"admin_master",email:"admin@teamwhitehatdev.github.io",name:"Administrator / Developer",purchasedService:"All-Access Master Vault (Admin)",accessKey:m,status:"ACTIVE",createdAt:new Date().toISOString()}};const s=S(),i=(e??s?.email??"").trim().toLowerCase(),r=(t??s?.accessKey??"").trim().toUpperCase();if(!i||!i.includes("@"))return{allowed:!1,reason:"Please enter the verified email address used when purchasing or inquiring on /services."};const a=u().find(c=>c.email.toLowerCase()===i);if(a)return a.status==="REVOKED"?{allowed:!1,reason:"Access for this email address has been revoked by the administrator."}:{allowed:!0,buyer:a};const d=y(i);return r&&(r===d||r===m)?{allowed:!0,buyer:f(i.split("@")[0],i,"Verified Email Passkey Access")}:{allowed:!1,reason:"This email is not registered as a verified service buyer yet. Please purchase or submit a service package order on /#/services first, or enter the VIP Passkey sent to your email."}}function V(e){const t=u().map(s=>s.id===e?{...s,status:s.status==="ACTIVE"?"REVOKED":"ACTIVE"}:s);return h(t),t}function k(e){const t=u().filter(s=>s.id!==e);return h(t),t}function E(e,t){const s=e.trim().toLowerCase(),i=t||y(s);return`${typeof window<"u"&&window.location.origin?window.location.origin+window.location.pathname.replace(/\/$/,""):"https://teamwhitehatdev.github.io"}/#/exclusive-skills?email=${encodeURIComponent(s)}&key=${encodeURIComponent(i)}`}function _(e){const t=E(e.email,e.accessKey),s=`Your Exclusive VIP Access Link & Passkey — ${e.purchasedService} | Team WhiteHat Dev`,i=`Hi ${e.name},

Thank you for purchasing / booking "${e.purchasedService}" with Team WhiteHat Dev!

Your email address (${e.email}) is now authorized to access our Exclusive VA & Freelancer Advanced Skills Mastery Vault.

==================================================
1. DIRECT EXCLUSIVE ACCESS LINK (1-CLICK LOGIN):
${t}

2. YOUR VERIFIED CREDENTIALS:
• Registered Email: ${e.email}
• VIP Access Passkey: ${e.accessKey}
• Backup Master Passkey: ${m}
==================================================

Inside the Exclusive Skills Vault (/#/exclusive-skills), you now have full access to:
• Real-Time VA & Freelancer Profit, Retainer & ROI Simulator
• 8 Advanced Mastery Curriculum Tracks (Executive Ops, Make.com/n8n AI Webhooks, Prompt Engineering, Loom Audit Client Closing, SMM Algorithm Math, Technical GEO/SEO, Shopify/CRM Ops, and Micro-Agency Scaling)
• 20+ Copy-Paste SOPs, Client Contracts, Discovery Call Scripts & Webhook JSON Blueprints

If you have any questions or want to schedule your 1-on-1 workflow review, simply reply to this email.

Best regards,
Team WhiteHat Dev
https://teamwhitehatdev.github.io`;return`mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(i)}`}export{u as a,_ as b,I as c,k as d,E as g,f as r,w as s,V as t,C as v};
