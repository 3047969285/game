var Is=Object.defineProperty;var Us=(o,t,e)=>t in o?Is(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var B=(o,t,e)=>Us(o,typeof t!="symbol"?t+"":t,e);import{a as Lt,m as Ie,P as Bs,b as Un}from"./humanVisual-CL1TIIx_.js";import{j as Eo,V as C,F as Gs,H as fo,U as mo,N as po,J as re,L as Ue,K as Vo,b as ct,S as Ho,C as Bn,f as it,aF as Re,D as ft,a2 as wt,aT as Ve,r as O,aU as d0,aB as Ws,aC as Os,aV as Ls,a as Et,av as pt,o as Z,g as Rt,_ as $o,i as mt,P as St,G as xt,M as gt,Q as He,E as jo,c as K,s as Vt,R as Gn,l as $e,n as Wn,aW as Vs,aX as On,a1 as Hs,I as Ln,aY as $s,ak as It,aE as ne,aZ as ke,a_ as me,a$ as ee,b0 as js,$ as Ys,d as w0,b1 as Ks,b2 as Xs,b3 as Zs,b4 as qs,b5 as Qs,b6 as Js,b7 as ta,ae as ea,b8 as oa,b9 as na,ba as sa,bb as go,bc as vo,bd as N0,be as I0,bf as aa,bg as ia,bh as ra,bi as ca,bj as U0,a9 as la,al as ua,W as xe,X as _e,aA as wo,az as Vn,Y as Yo,Z as Ko,a3 as m0,T as Pt,u as B0,bk as ha,a6 as fa,bl as da,bm as ma,a8 as lo,bn as pa,bo as xa,e as ga,bp as va,bq as wa,br as Ma,a5 as ya}from"./index-Cy_oy2o-.js";const eo=new C;function Bt(o,t,e,n,s,a){const i=2*Math.PI*s/4,r=Math.max(a-2*s,0),c=Math.PI/4;eo.copy(t),eo[n]=0,eo.normalize();const l=.5*i/(i+r),h=1-eo.angleTo(o)/c;return Math.sign(eo[e])===1?h*l:r/(i+r)+l+l*(1-h)}class pe extends Eo{constructor(t=1,e=1,n=1,s=2,a=.1){const i=s*2+1;if(a=Math.min(t/2,e/2,n/2,a),super(1,1,1,i,i,i),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:a},i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const c=new C,l=new C,h=new C(t,e,n).divideScalar(2).subScalar(a),d=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,u=d.length/6,g=new C,v=.5/i;for(let M=0,f=0;M<d.length;M+=3,f+=2)switch(c.fromArray(d,M),l.copy(c),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),d[M+0]=h.x*Math.sign(c.x)+l.x*a,d[M+1]=h.y*Math.sign(c.y)+l.y*a,d[M+2]=h.z*Math.sign(c.z)+l.z*a,p[M+0]=l.x,p[M+1]=l.y,p[M+2]=l.z,Math.floor(M/u)){case 0:g.set(1,0,0),m[f+0]=Bt(g,l,"z","y",a,n),m[f+1]=1-Bt(g,l,"y","z",a,e);break;case 1:g.set(-1,0,0),m[f+0]=1-Bt(g,l,"z","y",a,n),m[f+1]=1-Bt(g,l,"y","z",a,e);break;case 2:g.set(0,1,0),m[f+0]=1-Bt(g,l,"x","z",a,t),m[f+1]=Bt(g,l,"z","x",a,n);break;case 3:g.set(0,-1,0),m[f+0]=1-Bt(g,l,"x","z",a,t),m[f+1]=1-Bt(g,l,"z","x",a,n);break;case 4:g.set(0,0,1),m[f+0]=1-Bt(g,l,"x","y",a,t),m[f+1]=1-Bt(g,l,"y","x",a,e);break;case 5:g.set(0,0,-1),m[f+0]=Bt(g,l,"x","y",a,t),m[f+1]=1-Bt(g,l,"y","x",a,e);break}}static fromJSON(t){return new pe(t.width,t.height,t.depth,t.segments,t.radius)}}const M0=["masonry","brick","plaster","paving","wood","tiles","metal","concrete"],ba={masonry:2.4,brick:1.2,plaster:1.6,paving:1.8,wood:1.6,tiles:1.2,metal:1,concrete:2};function Hn(o){return M0.indexOf(o)}const $n=.65,jn=.87,Yn=.66;function ka(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const ut=(o,t,e)=>{const n=(e-o)/(t-o);return n<=0?0:n>=1?1:n*n*(3-2*n)},Ot=(o,t,e)=>o+(t-o)*e,Sa=o=>o<0?0:o>1?1:o;function J(o,t,e,n,s,a=.5){const i=new Float32Array(o*o);let r=1,c=0;const l=new Int32Array(o),h=new Int32Array(o),d=new Float32Array(o);for(let m=0;m<s;m++){const u=e<<m,g=n<<m;if(u>o/2||g>o/2)break;const v=new Float32Array(u*g);for(let f=0;f<v.length;f++)v[f]=t();for(let f=0;f<o;f++){const x=f*u/o,w=Math.floor(x),y=x-w;l[f]=w%u,h[f]=(w+1)%u,d[f]=y*y*(3-2*y)}const M=new Float32Array(u);for(let f=0;f<o;f++){const x=f*g/o,w=Math.floor(x),y=x-w,k=y*y*(3-2*y),S=w%g*u,b=(w+1)%g*u;for(let T=0;T<u;T++)M[T]=v[S+T]+(v[b+T]-v[S+T])*k;const A=f*o;for(let T=0;T<o;T++){const P=M[l[T]];i[A+T]+=r*(P+(M[h[T]]-P)*d[T])}}c+=r,r*=a}if(c===0)throw new Error("noiseField: cells exceed size");const p=1/c;for(let m=0;m<i.length;m++)i[m]*=p;return i}function Aa(o){const t=o*o;return{S:o,mask:o-1,s:o/512,H:new Float32Array(t),R:new Float32Array(t).fill(1),G:new Float32Array(t).fill(1),B:new Float32Array(t).fill(1),F:new Float32Array(t).fill(Yn),A:new Float32Array(t).fill(1)}}function G0(o,t,e,n,s){const a=o-1,i=Math.ceil(n),r=Math.round(t),c=Math.round(e);for(let l=-i;l<=i;l++)for(let h=-i;h<=i;h++){const d=Math.sqrt(h*h+l*l)/n;d>=1||s((c+l&a)*o+(r+h&a),1-d)}}function y0(o,t,e){const n=o-1,s=o/512,a=new Int32Array(e.rows+1);{const w=[];let y=0;for(let S=0;S<e.rows;S++){const b=1+(t()-.5)*2*e.rowJitter;w.push(b),y+=b}let k=0;for(let S=0;S<e.rows;S++)a[S]=Math.round(k/y*o),k+=w[S];a[e.rows]=o}const i=new Int16Array(o);for(let w=0;w<e.rows;w++)for(let y=a[w];y<a[w+1];y++)i[y]=w;const r=[],c=new Int32Array(e.rows),l=new Int32Array(e.rows+1),h=new Uint16Array(e.rows*o);let d=0;for(let w=0;w<e.rows;w++){const y=Math.max(1,e.perRow+(e.perRowVar?(t()*3|0)-1:0)),k=[];let S=0;for(let T=0;T<y;T++){const P=1+(t()-.5)*2*e.widthJitter;k.push(P),S+=P}const b=new Int32Array(y+1);let A=0;for(let T=0;T<y;T++)b[T]=Math.round(A/S*o),A+=k[T];b[y]=o,r.push(b),c[w]=e.offset==="random"?Math.floor(t()*o):e.offset==="half"?(w&1)*Math.round(o/y/2):0;for(let T=0;T<y;T++)for(let P=b[T];P<b[T+1];P++)h[w*o+P]=T;l[w]=d,d+=y}l[e.rows]=d;const p=J(o,t,6,6,3),m=e.warp*s*2.6,u=o/3|0,g=o/5|0,v=new Float32Array(o*o),M=new Int32Array(o*o),f=new Float32Array(o*o),x=new Float32Array(o*o);for(let w=0;w<o;w++)for(let y=0;y<o;y++){const k=w*o+y,S=(y+(p[k]-.5)*m|0)&n,b=(w+(p[(w+u&n)*o+(y+g&n)]-.5)*m|0)&n,A=i[b],T=S-c[A]&n,P=h[A*o+T],R=r[A],_=R[P],D=R[P+1],F=a[A],E=a[A+1],N=Math.min(T-_,D-1-T,b-F,E-1-b)+.5;v[k]=N,M[k]=l[A]+P,f[k]=(T-_+.5)/(D-_),x[k]=(b-F+.5)/(E-F)}return{d:v,id:M,fu:f,fv:x,total:d}}function Ta(o,t){const e=o.S,n=o.s,s=y0(e,t,{rows:6,rowJitter:.3,perRow:3,perRowVar:!0,widthJitter:.45,offset:"random",warp:4.5}),a=J(e,t,3,3,3),i=J(e,t,10,10,3),r=J(e,t,e/4,e/4,2),c=J(e,t,4,4,3),l=new Float32Array(s.total),h=new Float32Array(s.total),d=new Float32Array(s.total),p=new Float32Array(s.total*2);for(let u=0;u<s.total;u++)l[u]=(.78+t()*.42)*(t()<.1?.8:1),h[u]=.5+t()*.3,d[u]=(t()-.5)*.1,p[u*2]=(t()-.5)*.16,p[u*2+1]=(t()-.5)*.16;const m=Math.max(2,5*n);for(let u=0;u<e*e;u++){const g=s.d[u],v=s.id[u],M=s.fu[u],f=s.fv[u],x=ut(m*.55,m*.55+8*n,g),w=1-ut(m*.45,m*1.25,g),y=Math.sin(Math.PI*M)*Math.sin(Math.PI*f),k=h[v]*(.82+.26*a[u])+y*.1+(M-.5)*p[v*2]+(f-.5)*p[v*2+1]+(i[u]-.5)*.16+(r[u]-.5)*.08;o.H[u]=Ot(.04+(r[u]-.5)*.05,k,x);let S=l[v]*(.88+.28*i[u])*(.9+.2*c[u])*(.84+.16*ut(m,m+12*n,g));S*=.94+.12*r[u];const b=1.04*(.82+.34*r[u]);S=Ot(S,b,w);const A=d[v]*(1-w);o.R[u]=S*(1+A+w*.03),o.G[u]=S*(1+A*.3),o.B[u]=S*(1-A*.9-w*.07),o.F[u]=Ot(.6+(i[u]-.5)*.3,.95,w),o.A[u]=1-w*.35}}function Pa(o,t){const e=o.S,n=o.s,s=y0(e,t,{rows:16,rowJitter:0,perRow:6,perRowVar:!1,widthJitter:0,offset:"half",warp:.8}),a=J(e,t,8,8,3),i=J(e,t,e/4,e/4,2),r=J(e,t,5,5,3),c=new Float32Array(s.total),l=new Float32Array(s.total),h=new Float32Array(s.total);for(let p=0;p<s.total;p++)c[p]=(.82+t()*.3)*(t()<.08?.72:1)*(t()<.05?1.12:1),l[p]=t()-.5,h[p]=.76+t()*.12;const d=Math.max(2,4*n);for(let p=0;p<e*e;p++){const m=s.d[p],u=s.id[p],g=ut(d*.5,d+2.6*n,m),v=1-ut(d*.4,d*1.15,m),M=(i[p]-.5)*.07;o.H[p]=Ot(.06+M*.4,h[u]+M+(a[p]-.5)*.06,g);let f=c[u]*(.9+.2*a[p])*(.92+.16*i[p])*(.94+.12*r[p]);f*=.9+.1*ut(d,d+6*n,m);const x=1.3*(.84+.32*i[p]);f=Ot(f,x,v);const w=l[u]*(1-v);o.R[p]=f*(1+w*.16+v*.04),o.G[p]=f*(1-w*.04+v*.14),o.B[p]=f*(1-w*.3+v*.2),o.F[p]=Ot(.74+(i[p]-.5)*.2,.96,v),o.A[p]=1-v*.4}}function Ra(o,t){const e=o.S,n=o.s,s=y0(e,t,{rows:3,rowJitter:.04,perRow:3,perRowVar:!1,widthJitter:.05,offset:"random",warp:1.6}),a=J(e,t,3,3,3),i=J(e,t,12,12,3),r=J(e,t,e/4,e/4,2),c=J(e,t,5,5,4),l=new Float32Array(s.total),h=new Float32Array(s.total),d=new Float32Array(s.total),p=new Float32Array(s.total*2);for(let u=0;u<s.total;u++)l[u]=.86+t()*.26,h[u]=(t()-.5)*.08,d[u]=.62+t()*.16,p[u*2]=(t()-.5)*.1,p[u*2+1]=(t()-.5)*.1;const m=Math.max(2,4.5*n);for(let u=0;u<e*e;u++){const g=s.d[u],v=s.id[u],M=ut(m*.5,m+4*n,g),f=1-ut(m*.4,m*1.2,g),x=c[u],w=d[v]+(s.fu[u]-.5)*p[v*2]+(s.fv[u]-.5)*p[v*2+1]-x*.12+(i[u]-.5)*.08+(r[u]-.5)*.05;o.H[u]=Ot(.05+(r[u]-.5)*.06,w,M);let y=l[v]*(.9+.2*a[u])*(.9+.2*i[u])*(.95+.1*r[u]);y*=.88+.12*ut(m,m+8*n,g),y=Ot(y,.78*(.8+.4*r[u]),f);const k=h[v]*(1-f);o.R[u]=y*(1+k+f*.04),o.G[u]=y*(1+k*.2+f*.02),o.B[u]=y*(1-k*.8-f*.06),o.F[u]=Ot(.68+(x-.5)*.3,.96,f),o.A[u]=1-f*.4}}function _a(o,t){const e=o.S,n=o.s,s=o.mask,a=J(e,t,3,3,5),i=J(e,t,12,12,3),r=J(e,t,e/2,e/2,1),c=J(e,t,5,5,3),l=J(e,t,6,6,4),h=J(e,t,24,24,3),d=new Float32Array(e*e),p=(u,g,v,M,f)=>{for(let x=0;x<M;x++){v+=(t()-.5)*.5,u+=Math.cos(v),g+=Math.sin(v);const w=Math.round(u)&s,y=Math.round(g)&s,k=1-x/M*.5,S=y*e+w;d[S]<k&&(d[S]=k);const b=y*e+(w+1&s),A=(y+1&s)*e+w;d[b]=Math.max(d[b],k*.35),d[A]=Math.max(d[A],k*.35),f<2&&t()<.0035&&p(u,g,v+(t()<.5?-1:1)*(.5+t()*.6),M*.45,f+1)}},m=1;for(let u=0;u<m;u++)p(t()*e,t()*e,t()*Math.PI*2,(110+t()*150)*n,0);for(let u=0;u<e*e;u++){const g=ut(.8,.84,l[u]+(h[u]-.5)*.3),v=g*(1-ut(.8,1,g)),M=(r[u]-.5)*2+(t()-.5)*.9,f=d[u],x=.62+(c[u]-.5)*.18+M*.03-g*.2-f*.3+v*.04;o.H[u]=x;let w=(.95+.1*a[u])*(.96+.08*i[u])*(1+M*.035);w=Ot(w,w*.94,g),w*=1-f*.18,o.R[u]=w*(1+g*.01),o.G[u]=w*(1-g*.04),o.B[u]=w*(1-g*.12),o.F[u]=Ot(.84+(i[u]-.5)*.14,.98,g),o.A[u]=1-f*.3-g*.1}}function Da(o,t){const e=o.S,n=o.s,s=o.mask,a=10,i=new Int32Array(a+1);{const S=[];let b=0;for(let T=0;T<a;T++){const P=.88+t()*.24;S.push(P),b+=P}let A=0;for(let T=0;T<a;T++)i[T]=Math.round(A/b*e),A+=S[T];i[a]=e}const r=new Int16Array(e);for(let S=0;S<a;S++)for(let b=i[S];b<i[S+1];b++)r[b]=S;const c=new Int32Array(a),l=new Int32Array(a),h=new Float32Array(a*2),d=new Float32Array(a*2),p=new Float32Array(a*2),m=new Float32Array(a*2);for(let S=0;S<a;S++){c[S]=Math.floor(t()*e),l[S]=c[S]+Math.round(e*(.38+t()*.24))&s;for(let b=0;b<2;b++)h[S*2+b]=.8+t()*.4,d[S*2+b]=t()-.5,p[S*2+b]=2.5+t()*3.5,m[S*2+b]=t()*6.28}const u=J(e,t,2,32,3),g=J(e,t,6,6,3),v=J(e,t,12,e/2,1),M=J(e,t,4,4,3),f=new Float32Array(e*e),x=[];for(let S=0;S<3;S++)x.push({x:t()*e,y:t()*e,r:(13+t()*9)*n});for(const S of x){const b=Math.ceil(S.r*2.6);for(let A=-b;A<=b;A++)for(let T=-b;T<=b;T++){const P=Math.sqrt(T/1.7*(T/1.7)+A*A)/S.r;if(P>2.6)continue;const R=(Math.round(S.y+A)&s)*e+(Math.round(S.x+T)&s);f[R]+=Math.sign(A||1)*10*n*Math.exp(-P*P*.9)*(P<.2?P/.2:1)}}const w=new Float32Array(e*e).fill(1),y=new Float32Array(e*e);for(const S of x){const b=Math.ceil(S.r*1.2);for(let A=-b;A<=b;A++)for(let T=-b;T<=b;T++){const P=Math.sqrt(T/1.7*(T/1.7)+A*A)/S.r;if(P>=1.1)continue;const R=(Math.round(S.y+A)&s)*e+(Math.round(S.x+T)&s),_=.5+.5*Math.cos(P*16),D=1-ut(.6,1.1,P);w[R]*=1-D*(.5-.18*_),y[R]+=D*(.06+.04*_)-ut(.2,.5,P)*(1-ut(.5,1,P))*.03}}const k=Math.PI*2;for(let S=0;S<e;S++){const b=r[S],A=i[b],T=i[b+1]-A,P=S-A,R=Math.min(P,T-1-P)+.5,_=1-ut(.3*n,2.8*n,R);for(let D=0;D<e;D++){const F=S*e+D,N=(S+(f[F]|0)&s)*e+D,L=Math.abs(D-c[b]),U=Math.abs(D-l[b]),V=Math.min(L,e-L,U,e-U)+.5,W=1-ut(.3*n,2.2*n,V),j=(D-c[b]&s)<(l[b]-c[b]&s)?0:1,H=b*2+j,tt=u[N],ht=g[N],dt=.5+.5*Math.sin(((P+f[F])/T*p[H]+ht*1.7+tt*1.1)*k+m[H]),q=ut(.56,.78,v[N]);let et=h[H]*(.78+.3*tt+.2*dt)*(.92+.16*M[F])*w[F];et*=1-q*.22;const rt=Math.max(_,W);et*=1-rt*.55;const nt=d[H];o.R[F]=et*(1+nt*.12),o.G[F]=et*(1+nt*.03),o.B[F]=et*(1-nt*.16),o.H[F]=(.72+dt*.05-q*.05+(tt-.5)*.04+y[F])*(1-rt*.85),o.F[F]=.7+(tt-.5)*.16+q*.16+rt*.2,o.A[F]=1-rt*.5-q*.12}}}function Ca(o,t){const e=o.S,n=o.s,s=o.mask,a=6,i=5,r=J(e,t,4,4,2),c=J(e,t,10,10,3),l=J(e,t,e/4,e/4,2),h=J(e,t,4,4,4),d=new Float32Array(a*i),p=new Float32Array(a*i),m=new Float32Array(a*i),u=new Float32Array(a*i);for(let M=0;M<d.length;M++)d[M]=.8+t()*.36,p[M]=t()-.5,m[M]=(t()-.5)*.14,u[M]=t();const g=2.4*n*2.6,v=Math.PI;for(let M=0;M<e;M++)for(let f=0;f<e;f++){const x=M*e+f,w=f+(r[x]-.5)*g,k=(M+(r[(M+83&s)*e+(f+171&s)]-.5)*g)/e*i;let S=Math.floor(k);const b=k-S;S=(S%i+i)%i;const A=w/e*a+.5*(S&1),T=Math.floor(A),P=A-T,R=(T%a+a)%a,_=S*a+R,D=Math.sqrt(Math.sin(v*P)),F=.5+.5*b*(.4+.6*b),E=1-ut(.9,1,b)*.12,N=D*F*E*.9+m[_]*(b-.5)+(l[x]-.5)*.04+(c[x]-.5)*.05;o.H[x]=N;const L=ut(0,.22,b),U=1-ut(.02,.18,Math.min(P,1-P));let V=d[_]*(.88+.12*L)*(.92+.16*c[x])*(.94+.12*l[x])*(1-.18*ut(.55,.8,h[x]));V*=1+.12*ut(.93,1,b),V*=1-U*.22;const W=p[_];o.R[x]=V*(1+W*.1),o.G[x]=V*(1-W*.01),o.B[x]=V*(1-W*.14),o.F[x]=.62+u[_]*.16+(l[x]-.5)*.1+U*.2,o.A[x]=(.6+.4*L)*(1-U*.25)}}function za(o,t){const e=o.S,n=o.s,s=o.mask,a=J(e,t,2,e/8,3),i=J(e,t,1,e/4,2),r=J(e,t,3,3,3),c=J(e,t,4,4,5),l=J(e,t,24,24,3),h=J(e,t,e/2,e/2,1),d=new Float32Array(e*e),p=new Float32Array(e*e),m=Math.round(70*n*Math.max(1,n));for(let u=0;u<m;u++){let g=t()*e,v=t()*e;const M=t()<.7?(t()-.5)*.5:t()*Math.PI*2,f=(14+t()*t()*130)*n,x=t()<.15,w=.3+t()*.5,y=Math.cos(M),k=Math.sin(M),S=x?p:d;for(let b=0;b<f;b+=.6){g+=y*.6,v+=k*.6;const A=(Math.round(v)&s)*e+(Math.round(g)&s),T=1-Math.abs(b/f-.5)*1.1;S[A]<w*T&&(S[A]=w*T)}}for(let u=0;u<e*e;u++){const g=(a[u]-.5)*1.4+(i[u]-.5)*.8,v=ut(.56,.8,c[u]+(l[u]-.5)*.28)*(.6+.4*l[u]),M=d[u],f=p[u];let x=(1+g*.2)*(.94+.12*r[u])*(1+(h[u]-.5)*.06);x*=1+M*.38-f*.3,x=Ot(x,x*.8,v),o.R[u]=x*(1+v*.07),o.G[u]=x*(1-v*0),o.B[u]=x*(1-v*.14),o.H[u]=.6+g*.03+(r[u]-.5)*.12-M*.12-f*.18+v*.04,o.F[u]=.5+g*.14+M*.18+v*.42+(h[u]-.5)*.06,o.A[u]=1-v*.12-f*.1}}function Fa(o,t){const e=o.S,n=o.s,s=J(e,t,3,3,4),a=J(e,t,14,14,3),i=J(e,t,e/2,e/2,1),r=J(e,t,10,2,3),c=new Float32Array(e*e),l=new Float32Array(e*e),h=Math.round(260*n*n);for(let u=0;u<h;u++){const g=(.9+t()*t()*3.6)*n,v=.4+t()*.6;G0(e,t()*e,t()*e,Math.max(1.2,g),(M,f)=>{const x=v*Math.min(1,f*1.8);c[M]<x&&(c[M]=x),l[M]=Math.max(l[M],x)})}const d=e/2,p=new Float32Array(e*e);for(let u=0;u<2;u++)for(let g=0;g<2;g++)for(const[v,M]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])G0(e,g*d+v*d,u*d+M*d,5*n,(f,x)=>{const w=Math.min(1,x*1.6);p[f]<w&&(p[f]=w)});const m=[1,.96,1.04,.98];for(let u=0;u<e;u++){const g=Math.min(u%d,d-u%d);for(let v=0;v<e;v++){const M=u*e+v,f=Math.min(v%d,d-v%d),x=1-ut(.2*n,2.4*n,Math.min(f,g)+.5),w=m[(v>=d?1:0)+(u>=d?2:0)],y=(i[M]-.5)*2,k=c[M],S=p[M],b=.68+(a[M]-.5)*.1+y*.035-k*.5-x*.45-S*.55;o.H[M]=b;let A=w*(.9+.2*s[M])*(.94+.12*a[M])*(.86+.28*r[M])*(1+y*.05);A*=1-k*.42-x*.2-S*.5,o.R[M]=A*1.01,o.G[M]=A,o.B[M]=A*.985,o.F[M]=.8+(a[M]-.5)*.18+k*.12,o.A[M]=1-k*.5-x*.25-S*.5}}}const Ea={masonry:{normal:3.2,ao:2.4,aoRadius:9},brick:{normal:3,ao:2.2,aoRadius:6},plaster:{normal:2,ao:1.4,aoRadius:5},paving:{normal:3,ao:2.2,aoRadius:8},wood:{normal:2.2,ao:1.8,aoRadius:4},tiles:{normal:4.6,ao:2.4,aoRadius:9},metal:{normal:1.6,ao:1.2,aoRadius:3},concrete:{normal:2.2,ao:1.8,aoRadius:5}};function Na(o,t,e){const n=new Float32Array(t*t),s=new Float32Array(t*t),a=t-1,r=1/(2*e+1);for(let c=0;c<t;c++){const l=c*t;let h=0;for(let d=-e;d<=e;d++)h+=o[l+(d&a)];for(let d=0;d<t;d++)n[l+d]=h*r,h+=o[l+(d+e+1&a)]-o[l+(d-e&a)]}for(let c=0;c<t;c++){let l=0;for(let h=-e;h<=e;h++)l+=n[(h&a)*t+c];for(let h=0;h<t;h++)s[h*t+c]=l*r,l+=n[(h+e+1&a)*t+c]-n[(h-e&a)*t+c]}return s}function Ia(o,t){const e=o.S,n=e*e,s=Ea[t],a=o.mask,i=w=>w<=0?0:w>=1?255:w*255+.5|0;let r=0;for(let w=0;w<n;w++)r+=o.R[w]*.3+o.G[w]*.59+o.B[w]*.11;const c=$n/(r/n),l=Na(o.H,e,Math.max(2,Math.round(s.aoRadius*o.s))),h=new Float32Array(n);let d=0;for(let w=0;w<n;w++){const y=l[w]-o.H[w],k=Sa(1-Math.max(0,y)*s.ao*3.2+Math.max(0,-y)*.25)*o.A[w];h[w]=k<.35?.35:k,d+=h[w]}const p=d/n,m=Math.log(jn)/Math.log(Math.min(.99,Math.max(.3,p))),u=new Uint8Array(1025);for(let w=0;w<=1024;w++)u[w]=i(Math.pow(w/1024,m));const g=new Uint8Array(n*4),v=new Uint8Array(n*4),M=new Uint8Array(n),f=o.H,x=s.normal;for(let w=0;w<e;w++){const y=(w-1&a)*e,k=w*e,S=(w+1&a)*e;for(let b=0;b<e;b++){const A=b-1&a,T=b+1&a,P=f[y+T]+2*f[k+T]+f[S+T]-f[y+A]-2*f[k+A]-f[S+A],R=f[S+A]+2*f[S+b]+f[S+T]-f[y+A]-2*f[y+b]-f[y+T],_=-P*x/8,D=-R*x/8,F=1/Math.sqrt(_*_+D*D+1),E=k+b,N=E*4;g[N]=i(o.R[E]*c),g[N+1]=i(o.G[E]*c),g[N+2]=i(o.B[E]*c),g[N+3]=u[h[E]*1024+.5|0],v[N]=i(_*F*.5+.5),v[N+1]=i(D*F*.5+.5),v[N+2]=i(F*.5+.5),v[N+3]=i(o.F[E]),M[E]=i(f[E])}}return{size:e,albedo:g,normal:v,height:M}}const Ua={masonry:Ta,brick:Pa,plaster:_a,paving:Ra,wood:Da,tiles:Ca,metal:za,concrete:Fa};function Ba(o,t,e){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const n=ka(e*7919+Hn(o)*104729+1),s=Aa(t);return Ua[o](s,n),Ia(s,o)}const Ga=20260616;let b0="high",Xt;function I1(o){Xt||(b0=o)}function Wa(){return Xt?Xt.quality:b0}function W0(o,t,e){const n=t*t*4,s=new Uint8Array(n*o.length);o.forEach((i,r)=>s.set(i,r*n));const a=new Gs(s,t,t,o.length);return a.format=fo,a.type=mo,a.colorSpace=po,a.wrapS=a.wrapT=re,a.magFilter=Ue,a.minFilter=Vo,a.generateMipmaps=!0,a.anisotropy=e,a.userData.shared=!0,a.needsUpdate=!0,a}function Oa(o=b0,t=4){if(Xt)return Xt;const e=o==="low"?256:512,n=typeof performance<"u"?performance.now():Date.now(),s=[],a=[];for(const l of M0){const h=Ba(l,e,Ga);s.push(h.albedo),a.push(h.normal)}const i=W0(s,e,t),r=W0(a,e,t),c=(typeof performance<"u"?performance.now():Date.now())-n;return Xt={quality:o,size:e,albedo:i,normal:r,generationMs:c,dispose(){i.dispose(),r.dispose()}},Xt}function U1(){Xt==null||Xt.dispose(),Xt=void 0}const Be="aKitBase";function No(o){var s;if(o.getAttribute(Be))return;const t=o.getAttribute("position");if(!t)return;o.boundingBox||o.computeBoundingBox();const e=(s=o.boundingBox)==null?void 0:s.min.y;if(e===void 0||!Number.isFinite(e))return;const n=new Float32Array(t.count*2);for(let a=0;a<t.count;a++)n[a*2]=e,n[a*2+1]=1;o.setAttribute(Be,new ct(n,2))}function Kn(o){return o.userData.kitKind!==void 0}const La={masonry:{grime:1,streak:.8,wear:.85,edgeRough:.08},brick:{grime:1,streak:.7,wear:.8,edgeRough:.06},plaster:{grime:1,streak:1,wear:.55,edgeRough:.1},paving:{grime:.5,streak:0,wear:.7,edgeRough:.06},wood:{grime:.7,streak:.4,wear:.9,edgeRough:.06},tiles:{grime:.35,streak:.2,wear:.6,edgeRough:.06},metal:{grime:.4,streak:.35,wear:1,edgeRough:-.28},concrete:{grime:1,streak:1,wear:.5,edgeRough:.06}},Me=o=>o.toFixed(3),Va=`
attribute vec2 aKitBase;
varying vec3 vKitWorld;
varying float vKitH;
`,Ha=`
{
  vec4 kLocal = vec4(transformed, 1.0);
  vec4 kBase = vec4(0.0, aKitBase.x, 0.0, 1.0);
  #ifdef USE_BATCHING
    kLocal = batchingMatrix * kLocal;
    kBase = batchingMatrix * kBase;
  #endif
  #ifdef USE_INSTANCING
    kLocal = instanceMatrix * kLocal;
    kBase = instanceMatrix * kBase;
  #endif
  vKitWorld = (modelMatrix * kLocal).xyz;
  // no base attribute (aKitBase.y == 0): skip the wall-base grime
  vKitH = aKitBase.y > 0.5 ? vKitWorld.y - (modelMatrix * kBase).y : 100.0;
}
`,$a=`
varying vec3 vKitWorld;
varying float vKitH;
uniform highp sampler2DArray uKitAlb;
uniform highp sampler2DArray uKitNrm;
uniform float uKitGrime;
uniform float uKitWear;
float kHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float kNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(kHash(i), kHash(i + vec2(1.0, 0.0)), f.x), mix(kHash(i + vec2(0.0, 1.0)), kHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
`;function ja(o,t){const e=Hn(o).toFixed(1),s=`
  vec3 kN = inverseTransformDirection(normal, viewMatrix);
  vec3 kAbs = abs(kN);
  float kDist = length(vViewPosition);
  vec3 kP = vKitWorld * ${(1/ba[o]).toFixed(5)};
`,a=t?`
  // low quality: top + one dominant side (two planes)
  float kWy = pow(kAbs.y, 4.0);
  float kWs = pow(max(kAbs.x, kAbs.z), 4.0);
  float kWt = kWy / (kWy + kWs + 1e-5);
  bool kSX = kAbs.x > kAbs.z;
  vec3 kUT = vec3(kP.xz + vec2(0.61, 0.29), ${e});
  vec3 kUS = vec3((kSX ? kP.zy + vec2(0.17, 0.43) : kP.xy + vec2(0.83, 0.07)), ${e});
  vec4 kAT = texture(uKitAlb, kUT);
  vec4 kAS = texture(uKitAlb, kUS);
  vec4 kNT = texture(uKitNrm, kUT);
  vec4 kNS = texture(uKitNrm, kUS);
  vec4 kA = mix(kAS, kAT, kWt);
  vec3 kt = kNT.xyz * 2.0 - 1.0;
  vec3 ks = kNS.xyz * 2.0 - 1.0;
  vec3 kTw = vec3(kt.xy + kN.xz, abs(kt.z) * kN.y).xzy;
  vec3 kSw = kSX ? vec3(ks.xy + kN.zy, abs(ks.z) * kN.x).zyx : vec3(ks.xy + kN.xy, abs(ks.z) * kN.z);
  vec3 kBn = normalize(kTw * kWt + kSw * (1.0 - kWt));
  float kRg = mix(kNS.a, kNT.a, kWt);
`:`
  vec3 kW = pow(kAbs, vec3(4.0));
  kW /= (kW.x + kW.y + kW.z + 1e-5);
  vec3 kUX = vec3(kP.zy + vec2(0.17, 0.43), ${e});
  vec3 kUY = vec3(kP.xz + vec2(0.61, 0.29), ${e});
  vec3 kUZ = vec3(kP.xy + vec2(0.83, 0.07), ${e});
  vec4 kA = texture(uKitAlb, kUX) * kW.x + texture(uKitAlb, kUY) * kW.y + texture(uKitAlb, kUZ) * kW.z;
  vec4 kNx = texture(uKitNrm, kUX);
  vec4 kNy = texture(uKitNrm, kUY);
  vec4 kNz = texture(uKitNrm, kUZ);
  vec3 tx = kNx.xyz * 2.0 - 1.0;
  vec3 ty = kNy.xyz * 2.0 - 1.0;
  vec3 tz = kNz.xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + kN.zy, abs(tx.z) * kN.x);
  ty = vec3(ty.xy + kN.xz, abs(ty.z) * kN.y);
  tz = vec3(tz.xy + kN.xy, abs(tz.z) * kN.z);
  vec3 kBn = normalize(tx.zyx * kW.x + ty.xzy * kW.y + tz.xyz * kW.z);
  float kRg = kNx.a * kW.x + kNy.a * kW.y + kNz.a * kW.z;
`;return s+a}function Ya(o,t){const e=La[o];return`
{
${ja(o,t)}
  // edge curvature (1/m) = normal change rate / world position change rate, distance independent; fades out far away
  float kCurv = length(fwidth(kN)) / max(length(fwidth(vKitWorld)), 1e-5);
  float kEdge = smoothstep(7.0, 22.0, kCurv) * (1.0 - smoothstep(18.0, 60.0, kDist)) * uKitWear * ${Me(e.wear)};

  // color: modulation around the material color; AO is applied after aomap_fragment
  diffuseColor.rgb *= kA.rgb * ${Me(1/$n)};
  kAo = kA.a;
  roughnessFactor = clamp(roughnessFactor * kRg * ${Me(1/Yn)}, 0.04, 1.0);

  // normal: relaxes to the geometric normal with distance
  float kNF = 1.0 - 0.7 * smoothstep(30.0, 100.0, kDist);
  normal = normalize((viewMatrix * vec4(normalize(mix(kN, kBn, kNF)), 0.0)).xyz);

  // wall-base grime: vertical faces within 0-1.2 m of the object's lowest point get darker and browner, broken up by noise
  float kWall = 1.0 - smoothstep(0.55, 0.88, kAbs.y);
  float kHu = vKitWorld.x * kAbs.z + vKitWorld.z * kAbs.x;
  float kBreak = kNoise(vec2(kHu * 2.3, vKitWorld.y * 1.1 + 3.0));
  float kG = (1.0 - smoothstep(0.0, 1.15 * (0.45 + 0.9 * kBreak), vKitH)) * kWall * uKitGrime * ${Me(e.grime)};
  kG = clamp(kG, 0.0, 1.0);
  diffuseColor.rgb *= mix(vec3(1.0), vec3(0.5, 0.43, 0.35), kG * 0.8);
  roughnessFactor = mix(roughnessFactor, max(roughnessFactor, 0.9), kG * 0.6);
  kAo *= 1.0 - 0.25 * kG * (1.0 - smoothstep(0.0, 0.35, vKitH));
${t||e.streak<=0?"":`
  // vertical rain streaks
  float kS1 = kNoise(vec2(kHu * 8.0, vKitWorld.y * 0.5));
  float kS2 = kNoise(vec2(kHu * 1.4 + 7.0, vKitWorld.y * 0.12));
  float kStr = smoothstep(0.64, 0.9, kS1) * smoothstep(0.4, 0.75, kS2) * kWall * uKitGrime * ${Me(e.streak)} * smoothstep(0.3, 1.6, vKitH);
  diffuseColor.rgb *= 1.0 - kStr * vec3(0.26, 0.24, 0.2);
`}
  // edge wear: brighter, less saturated exposed material
  float kLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 kChip = mix(diffuseColor.rgb, vec3(kLum), 0.35) * 1.28 + 0.012;
  diffuseColor.rgb = mix(diffuseColor.rgb, kChip, kEdge * 0.85);
  roughnessFactor = clamp(roughnessFactor + kEdge * ${Me(e.edgeRough)}, 0.04, 1.0);
}
`}const Ka=`
{
  // normalized by the texture's mean AO so flat areas keep their brightness and only cavities darken
  float kAoN = min(kAo * ${Me(1/jn)}, 1.06);
  reflectedLight.indirectDiffuse *= kAoN;
  reflectedLight.indirectSpecular *= mix(1.0, kAoN, 0.6);
  reflectedLight.directDiffuse *= mix(1.0, kAoN, 0.35);
}
`;function Dt(o,t,e={}){const n=o.userData.kitUniforms;if(n){e.grime!==void 0&&(n.grime.value=e.grime),e.wear!==void 0&&(n.wear.value=e.wear);return}const s={grime:{value:e.grime??1},wear:{value:e.wear??1}};o.userData.kitUniforms=s,o.userData.kitKind=t;const a=o.onBeforeCompile,i=o.onBeforeRender,r=o.customProgramCacheKey();o.onBeforeCompile=(c,l)=>{a.call(o,c,l);const h=Oa(),d=h.quality==="low";c.uniforms.uKitAlb={value:h.albedo},c.uniforms.uKitNrm={value:h.normal},c.uniforms.uKitGrime=s.grime,c.uniforms.uKitWear=s.wear,c.vertexShader=c.vertexShader.replace("#include <common>",`#include <common>
${Va}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Ha}`),c.fragmentShader=c.fragmentShader.replace("#include <common>",`#include <common>
${$a}`).replace("#include <color_fragment>",`#include <color_fragment>
float kAo = 1.0;`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${Ya(t,d)}`).replace("#include <aomap_fragment>",`#include <aomap_fragment>
${Ka}`)},o.onBeforeRender=(c,l,h,d,p,m)=>{i.call(o,c,l,h,d,p,m),d.getAttribute(Be)||No(d)},o.customProgramCacheKey=()=>`kit-v2-${t}-${Wa()}+${r}`,o.needsUpdate=!0}const O0={h:0,s:0,l:0};function Xa(o,t){if(o.type!=="MeshStandardMaterial"||o.userData.shared||o.map||o.normalMap||o.bumpMap||o.roughnessMap||o.metalnessMap||o.aoMap||o.alphaMap||o.emissiveMap||o.displacementMap||o.lightMap||o.vertexColors||o.transparent||o.opacity<1||o.alphaTest>0||o.wireframe)return null;const e=o.emissive;if(o.emissiveIntensity*Math.max(e.r,e.g,e.b)>.04)return null;const n=t??o.userData.surfaceKind;if(n&&M0.includes(n))return n;if(o.metalness>.5)return"metal";o.color.getHSL(O0,Ho);const{h:s,s:a,l:i}=O0;if(i>.86||i<.1||a>.62)return null;if(a<.08)return i>=.62?"concrete":i>=.18?"masonry":null;if(!(s<.17||s>=.95))return s>=.17&&s<.46&&a>.1||s>=.46&&a>.15?null:i>=.62?"concrete":i>=.18?"masonry":null;if(o.roughness>=.95&&a>=.2||o.roughness>=.99&&a>=.08)return null;if(i>=.6)return"plaster";if(a>.5&&s>=.065&&s<.17)return null;if(a>=.28&&(s<.065||s>=.95)){if(i>=.42)return"tiles";if(s<.04||s>=.95)return"brick"}return a>=.1?i>=.14?"wood":null:i>=.18?"masonry":null}function Za(o,t=5.5){o.onBeforeCompile=e=>{e.vertexShader=`varying vec3 vCobWorld;
`+e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vCobWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=`
      varying vec3 vCobWorld;
      float cHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      vec3 cVor(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        float d1 = 8.0, d2 = 8.0, id = 0.0;
        for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
          vec2 g = vec2(float(x), float(y));
          vec2 o = vec2(cHash(i + g), cHash(i + g + 19.3));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < d1) { d2 = d1; d1 = d; id = cHash(i + g + 7.7); }
          else if (d < d2) { d2 = d; }
        }
        return vec3(sqrt(d1), sqrt(d2), id);
      }
      float cDome(vec2 p) { vec3 v = cVor(p); return smoothstep(0.0, 0.3, v.y - v.x); }
    `+e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float cGap = 0.0;
         {
           vec3 v = cVor(vCobWorld.xz * ${t.toFixed(2)});
           float edge = v.y - v.x;
           cGap = 1.0 - smoothstep(0.03, 0.16, edge);
           diffuseColor.rgb *= (0.78 + v.z * 0.42) * (1.0 - cGap * 0.5);
         }`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
 roughnessFactor = mix(roughnessFactor, 1.0, cGap);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float cFade = 1.0 - smoothstep(20.0, 70.0, length(vViewPosition));
           if (cFade > 0.01) {
             vec2 q = vCobWorld.xz * ${t.toFixed(2)};
             const float cE = 0.03;
             float h0 = cDome(q);
             vec2 gr = vec2(cDome(q + vec2(cE, 0.0)) - h0, cDome(q + vec2(0.0, cE)) - h0) / cE;
             vec3 gv = mat3(viewMatrix) * vec3(gr.x, 0.0, gr.y);
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * 0.09 * cFade);
           }
         }`)},o.customProgramCacheKey=()=>`cobble-${t}`,o.needsUpdate=!0}const L0=new WeakSet,qa=`
varying vec3 vGrainWorld;
float gHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float gNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(gHash(i), gHash(i + vec3(1, 0, 0)), f.x), mix(gHash(i + vec3(0, 1, 0)), gHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(gHash(i + vec3(0, 0, 1)), gHash(i + vec3(1, 0, 1)), f.x), mix(gHash(i + vec3(0, 1, 1)), gHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
// 大尺度明暗斑驳（低频，远处也稳定）
float gGrain(vec3 p) {
  return gNoise(p * 1.7) * 0.6 + gNoise(p * 6.5) * 0.4;
}
// 表面起伏高度（取解析梯度，避免 dFdx 产生 2x2 像素马赛克）
float gBump(vec3 p) {
  return gNoise(p * 5.0) * 0.6 + gNoise(p * 17.0) * 0.4;
}
`;function Qa(o,t){for(let e=o;e;e=e.parent){if(e.name==="scene-person"||e.userData.noSurface)return!0;if(e===t)break}return!1}function B1(o,t=1){o.traverse(e=>{const n=e;if(!n.isMesh)return;const s=Qa(n,o),a=Array.isArray(n.material)?n.material:[n.material];for(const i of a){if(i.type!=="MeshStandardMaterial")continue;const r=i;if(Kn(r)){No(n.geometry);continue}if(L0.has(i)||r.map||r.normalMap||r.bumpMap||r.vertexColors||r.transparent||r.emissiveIntensity>.25&&r.emissive.getHex()!==0)continue;const c=s?null:Xa(r,n.userData.surfaceKind??void 0);if(c){Dt(r,c,{grime:t,wear:t}),No(n.geometry);continue}L0.add(i);const l=r.onBeforeCompile;r.onBeforeCompile=(d,p)=>{l==null||l.call(r,d,p),d.vertexShader=`varying vec3 vGrainWorld;
`+d.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
           vec4 gLocal = vec4(transformed, 1.0);
           #ifdef USE_INSTANCING
             gLocal = instanceMatrix * gLocal;
           #endif
           vGrainWorld = (modelMatrix * gLocal).xyz;`),d.fragmentShader=qa+d.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
             float gTone = gGrain(vGrainWorld);
             diffuseColor.rgb *= 1.0 + (gTone - 0.5) * ${(.1*t).toFixed(2)};`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
             roughnessFactor = clamp(roughnessFactor + (gTone - 0.5) * 0.22, 0.05, 1.0);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
             {
               // 像素覆盖面积越大（越远）凹凸越弱，避免远处闪烁
               float gFade = 1.0 - smoothstep(0.02, 0.12, length(fwidth(vGrainWorld)));
               const float gE = 0.012;
               vec3 gW = vGrainWorld;
               float gB0 = gBump(gW);
               vec3 gGradW = vec3(
                 gBump(gW + vec3(gE, 0.0, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, gE, 0.0)) - gB0,
                 gBump(gW + vec3(0.0, 0.0, gE)) - gB0) / gE;
               vec3 gGradV = mat3(viewMatrix) * gGradW;
               gGradV -= normal * dot(gGradV, normal);
               normal = normalize(normal - gGradV * ${(.05*t).toFixed(3)} * gFade);
             }`)};const h=r.customProgramCacheKey();r.customProgramCacheKey=()=>`grain+${h}`,r.needsUpdate=!0}})}function Ja(o,t){return new Re({color:o,emissive:o,emissiveIntensity:t,metalness:.15,roughness:.08,clearcoat:1,clearcoatRoughness:.05,reflectivity:1,transparent:!0,opacity:.92,side:ft})}function G1(o,t=.82){return new it({color:o,roughness:t,metalness:.06,envMapIntensity:.4})}function W1(o){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d"),s=n.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return s.addColorStop(0,o),s.addColorStop(.4,"rgba(255,220,140,0.35)"),s.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=s,n.fillRect(0,0,64,64),new Bn(e)}function O1(){return new it({color:4871528,roughness:.45,metalness:.85})}function L1(o){return new Re({color:o,emissive:o,emissiveIntensity:1.4,roughness:.04,metalness:0,transparent:!0,opacity:.82,clearcoat:1})}const Qt={broadleaf:0,broadleafDark:1,conifer:2,shrub:3};function ti(o){const t=o%2,e=Math.floor(o/2);return[t*.5,e*.5,t*.5+.5,e*.5+.5]}function Xn(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function de(o,t,e){let n=Math.imul(o,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041)|0;return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}function Io(o){return o*o*(3-2*o)}function Wt(o,t,e){const n=Math.min(1,Math.max(0,(e-o)/(t-o)));return n*n*(3-2*n)}function V0(o,t,e){const n=Math.floor(o),s=Math.floor(t),a=Io(o-n),i=Io(t-s),r=de(n,s,e),c=de(n+1,s,e),l=de(n,s+1,e),h=de(n+1,s+1,e);return r+(c-r)*a+(l-r)*i+(r-c-l+h)*a*i}function uo(o,t){return(o%t+t)%t}const H0=new Map;function _t(o,t,e,n,s){const a=(e*1024+n)*8192+(s&8191);let i=H0.get(a);if(!i){i=new Float32Array(e*n);for(let x=0;x<n;x++)for(let w=0;w<e;w++)i[x*e+w]=de(w,x,s);H0.set(a,i)}const r=Math.floor(o),c=Math.floor(t),l=Io(o-r),h=Io(t-c),d=uo(r,e),p=d+1===e?0:d+1,m=uo(c,n)*e,u=(m+e)%(e*n),g=i[m+d],v=i[m+p],M=i[u+d],f=i[u+p];return g+(v-g)*l+(M-g)*h+(g-v-M+f)*l*h}let ue=0,he=0,fe=0;function Zn(o,t,e){o=o-Math.floor(o);const n=Math.floor(o*6),s=o*6-n,a=e*(1-t),i=e*(1-s*t),r=e*(1-(1-s)*t);switch(n%6){case 0:ue=e,he=r,fe=a;break;case 1:ue=i,he=e,fe=a;break;case 2:ue=a,he=e,fe=r;break;case 3:ue=a,he=i,fe=e;break;case 4:ue=r,he=a,fe=e;break;default:ue=e,he=a,fe=i;break}}function ei(o){const t=o*o;return{size:o,r:new Float32Array(t),g:new Float32Array(t),b:new Float32Array(t),a:new Float32Array(t),h:new Float32Array(t).fill(.5)}}function qn(o,t,e,n,s,a,i){const r=o.a[t];if(r<=0){o.r[t]=e,o.g[t]=n,o.b[t]=s,o.a[t]=a,o.h[t]=i;return}const c=a+r*(1-a),l=a/c,h=1-l;o.r[t]=o.r[t]*h+e*l,o.g[t]=o.g[t]*h+n*l,o.b[t]=o.b[t]*h+s*l,o.a[t]=c,o.h[t]=o.h[t]*h+i*l}function Uo(o,t,e,n,s,a,i,r,c,l,h,d,p,m){const{B:u,ox:g,oy:v,S:M,m:f}=o,x=Math.max(a,i)+1,w=Math.max(f,Math.floor(Math.min(t,n)-x)),y=Math.min(M-f-1,Math.ceil(Math.max(t,n)+x)),k=Math.max(f,Math.floor(Math.min(e,s)-x)),S=Math.min(M-f-1,Math.ceil(Math.max(e,s)+x)),b=n-t,A=s-e,T=b*b+A*A||1e-6;for(let P=k;P<=S;P++){const R=(v+P)*u.size+g;for(let _=w;_<=y;_++){const D=_+.5-t,F=P+.5-e;let E=(D*b+F*A)/T;E=E<0?0:E>1?1:E;const N=D-b*E,L=F-A*E,U=a+(i-a)*E,V=N*N+L*L,W=U+1;if(V>W*W)continue;const j=Math.sqrt(V)-U,H=j<=-.5?1:j>=.5?0:.5-j;if(H<=.003)continue;const tt=1-Math.min(1,Math.abs(j+U*.5)/(U+.5))*.35;Zn(r+(h-r)*E,c+(d-c)*E,(l+(p-l)*E)*tt*(.92+.16*m)),qn(u,R+_,ue,he,fe,H,.62-Math.min(1,Math.abs(j)/(U+.5))*.2)}}}function oi(o,t){const{B:e,ox:n,oy:s,S:a,m:i}=o,r=Math.cos(t.ang),c=Math.sin(t.ang),l=t.x,h=t.y,d=l+r*t.len,p=h+c*t.len,m=t.wid+2,u=Math.max(i,Math.floor(Math.min(l,d)-m)),g=Math.min(a-i-1,Math.ceil(Math.max(l,d)+m)),v=Math.max(i,Math.floor(Math.min(h,p)-m)),M=Math.min(a-i-1,Math.ceil(Math.max(h,p)+m)),f=Math.max(5,Math.round(t.len/11)),x=1/t.len,w=.5+t.len*.0035;for(let y=v;y<=M;y++){const k=(s+y)*e.size+n;for(let S=u;S<=g;S++){const b=S+.5-l,A=y+.5-h,T=b*r+A*c;if(T<0||T>t.len)continue;const P=T*x,R=-b*c+A*r,_=R<0?-R:R;let D=t.wid*Math.pow(Math.max(0,Math.sin(Math.PI*Math.pow(P,t.shapeExp))),.78);if(D*=1+t.serr*(Math.abs(Math.sin(P*f*Math.PI))-.5),D<.4)continue;const F=D-_+.5;if(F<=.003)continue;const E=F>=1?1:F,N=_/D,L=V0(S*.045,y*.045,t.seed),U=V0(S*.19,y*.19,t.seed+5);let V=t.val*(.8+.3*P)*(.86+.26*L)*(.94+.1*U);V*=1-.24*Wt(.76,1,N),V*=1+.12*t.fold*(R/D);let W=t.sat*(1-.18*P);const j=t.hue-.028*P+.03*(L-.5),H=Wt(w+.9,w*.4,_)*(1-.5*P),tt=(T-_*.82)/t.veinGap,ht=tt-Math.floor(tt),dt=(ht<.5?ht:1-ht)*t.veinGap*.8,q=Wt(1.3,.25,dt)*Math.pow(Math.max(0,1-N),.7)*Wt(.06,.2,P)*Wt(1,.8,P);let et=Math.max(H,q*.85);t.back&&(V*=1.16,W*=.62,et*=1.35),V*=1+.3*et,W*=1-.38*et,Zn(j,W,Math.min(1,V));const rt=.55+.2*(1-N*N)*(t.back?.6:1)-et*(t.back?-.1:.16);qn(e,k+S,ue,he,fe,E,rt)}}}function Qn(o,t,e,n,s,a,i){const r=t+Math.max(2,o*.012),c=o-2*r,l=Math.max(1e-6,s-e),h=Math.max(1e-6,a-n),d=Math.min(c/l,c/h,i);return{scale:d,ox:o/2-(e+s)/2*d,oy:o/2-(n+a)/2*d}}function e0(o,t){const e=Xn(o.seed),n=o.S,s=[],a=[],i=t.dark?.285+e()*.03:.235+e()*.04,r=(v,M,f,x,w)=>{const y=i+(e()-.5)*(t.dark?.04:.09)+(e()>.88&&!t.dark?-.04:0),k=(t.dark?.5:.42)+e()*.12,S=(t.dark?.27:t.round?.5:.46)+e()*.14;s.push({leaf:{x:v.x,y:v.y,ang:M,len:f,wid:f*x,hue:y,sat:k,val:S,serr:t.round?.04:.08,shapeExp:t.round?.8+e()*.2:.62+e()*.25,back:e()>.74,fold:e()*2-1,veinGap:Math.max(6,f*(t.round?.2:.16)),seed:Math.floor(e()*99999),petiole:w}})};if(t.round){const v=5+Math.floor(e()*2);for(let M=0;M<v;M++){const f=Math.PI/2+(M-(v-1)/2)*.5+(e()-.5)*.15,x=.55+e()*.25,w=(e()-.5)*.5,y=[],k=P=>f+w*P;let S=0,b=0;for(let P=0;P<=8;P++){y.push({x:S,y:b});const R=k(P/8);S+=Math.cos(R)*(x/8),b+=Math.sin(R)*(x/8)}a.push({pts:y,r0:.01});const A=3+Math.floor(e()*3);for(let P=0;P<A;P++){const R=.3+.7*(P/A)+e()*.05,_=Math.min(8,Math.floor(R*8)),D=y[_],F=P%2===0?1:-1;r(D,k(R)+F*(.7+e()*.5),(.2+e()*.12)*(1.1-.3*R),.55+e()*.12,.012)}const T=y[8];r(T,k(1)+(e()-.5)*.4,.26+e()*.08,.6,0)}}else{const v=8+Math.floor(e()*7),M=(e()-.5)*.35,f=[];for(let y=0;y<=12;y++){const k=y/12;f.push({x:M*k*k,y:k})}a.push({pts:f,r0:.014});const x=y=>({p:{x:M*y*y,y},dir:Math.atan2(1,2*M*y)});for(let y=0;y<v;y++){const k=.2+.72*(y/Math.max(1,v-1))+(e()-.5)*.03,{p:S,dir:b}=x(k),A=y%2===0?1:-1,T=.75+e()*.5+(1-k)*.25,P=(.4-.1*k)*(.8+e()*.34);r(S,b+A*T,P,.3+e()*.12,.03)}const w=x(1);r(w.p,w.dir+(e()-.5)*.2,.42*(.9+e()*.2),.34,0)}let c=1/0,l=1/0,h=-1/0,d=-1/0;const p=(v,M)=>{v<c&&(c=v),v>h&&(h=v),M<l&&(l=M),M>d&&(d=M)};for(const{leaf:v}of s){const M=Math.cos(v.ang),f=Math.sin(v.ang);p(v.x,v.y),p(v.x+M*v.len,v.y+f*v.len);for(const x of[.3,.45])for(const w of[-1,1])p(v.x+M*v.len*x-f*v.wid*w,v.y+f*v.len*x+M*v.wid*w)}for(const v of a)for(const M of v.pts)p(M.x,M.y);p(0,-.04);const m=Qn(n,o.m,c,l,h,d,n*.97),u=v=>({x:v.x*m.scale+m.ox,y:v.y*m.scale+m.oy});for(const v of a)for(let M=0;M<v.pts.length-1;M++){const f=u(v.pts[M]),x=u(v.pts[M+1]),w=M/(v.pts.length-1),y=Math.max(1.1,v.r0*m.scale*(1-w*.55)),k=Math.max(.8,v.r0*m.scale*(1-(w+1/(v.pts.length-1))*.55));Uo(o,f.x,f.y,x.x,x.y,y,k,.085,.45,.28,.1,.4,.36,e())}const g=s.map((v,M)=>M).sort(()=>e()-.5);for(const v of g){const M=s[v].leaf,f=u({x:M.x,y:M.y}),x=M.len*m.scale,w={...M,x:f.x,y:f.y,len:x,wid:M.wid*m.scale};if(M.petiole>0){const y=M.petiole*m.scale;Uo(o,f.x,f.y,f.x+Math.cos(M.ang)*y,f.y+Math.sin(M.ang)*y,1.1,.8,.11,.42,.3,.14,.4,.4,e()),w.x+=Math.cos(M.ang)*y*.9,w.y+=Math.sin(M.ang)*y*.9}oi(o,w)}}function ni(o,t,e,n,s,a,i,r,c,l){const h=t+Math.cos(n)*s,d=e+Math.sin(n)*s;Uo(o,t,e,h,d,a,a*.45,i,r,c*.72,i-.02,r*.9,c*1.12,l)}function si(o,t){const e=Xn(t),n=o.S,s=(e()-.5)*.08,a=f=>({x:s*f*f,y:f}),i=[],r=[];r.push({a:a(0),b:a(1),r0:.0105,r1:.003});const c=15,l=(f,x,w)=>{const y=f.length-1;for(let k=0;k<y;k++)for(const S of[0,.34,.67]){const b=f[k],A=f[k+1],T=(k+S)/y,P=b.x+(A.x-b.x)*S,R=b.y+(A.y-b.y)*S,_=x[k];for(const D of[-1,1]){const F=T>w,E=_+D*(.62+e()*.3),N=.1*(1-.4*T)*(.82+e()*.36)*(F?.8:1);i.push({x:P,y:R,ang:E,len:N,hue:F?.22+e()*.04:.37+e()*.04,sat:F?.5:.46+e()*.12,val:F?.58+e()*.08:.36+e()*.12,r:e()})}}};for(let f=0;f<c;f++){const x=.08+.84*(f/(c-1)),w=a(x);for(const y of[-1,1]){const k=.5*Math.pow(1-x*.8,.85)*(.88+e()*.24),S=Math.PI/2-y*(1.08-x*.2+(e()-.5)*.12),b=[w],A=[];let T=w.x,P=w.y;const R=6;for(let _=0;_<R;_++){const D=S+y*(_/R)*.55;A.push(D),T+=Math.cos(D)*(k/R),P+=Math.sin(D)*(k/R),b.push({x:T,y:P})}for(let _=0;_<R;_++)r.push({a:b[_],b:b[_+1],r0:.0055*(1-_/R*.5),r1:.0055*(1-(_+1)/R*.5)});l(b,A,.78);for(let _=0;_<4;_++)i.push({x:T,y:P,ang:A[R-1]+(_-1.5)*.28,len:.06*(.85+e()*.3),hue:.23+e()*.04,sat:.5,val:.58,r:e()})}}{const f=[],x=[];for(let y=0;y<=14;y++)f.push(a(.15+y/14*.85));for(let y=0;y<14;y++)x.push(Math.atan2(f[y+1].y-f[y].y,f[y+1].x-f[y].x));l(f,x,.7);const w=a(1);for(let y=0;y<6;y++)i.push({x:w.x,y:w.y,ang:Math.PI/2+(y-2.5)*.34,len:.07,hue:.23,sat:.5,val:.6,r:e()})}let h=1/0,d=1/0,p=-1/0,m=-1/0;const u=(f,x)=>{f<h&&(h=f),f>p&&(p=f),x<d&&(d=x),x>m&&(m=x)};for(const f of i)u(f.x,f.y),u(f.x+Math.cos(f.ang)*f.len,f.y+Math.sin(f.ang)*f.len);for(const f of r)u(f.a.x,f.a.y),u(f.b.x,f.b.y);u(0,-.03);const g=Qn(n,o.m,h,d,p,m,n*.97),v=f=>({x:f.x*g.scale+g.ox,y:f.y*g.scale+g.oy}),M=Math.max(.9,n*.0034);for(const f of r){const x=v(f.a),w=v(f.b);Uo(o,x.x,x.y,w.x,w.y,Math.max(.9,f.r0*g.scale),Math.max(.8,f.r1*g.scale),.07,.5,.27,.075,.45,.32,e())}i.sort(()=>e()-.5);for(const f of i){const x=v(f);ni(o,x.x,x.y,f.ang,f.len*g.scale,M,f.hue,f.sat,f.val,f.r)}}function Jn(o,t,e,n,s){const a=new Uint8Array(e*e*4),i=new Int32Array(e),r=new Int32Array(e);for(let c=0;c<e;c++)i[c]=s?(c+e-1)%e:Math.max(0,c-1),r[c]=s?(c+1)%e:Math.min(e-1,c+1);for(let c=0;c<e;c++){const l=(s?(c+e-1)%e:Math.max(0,c-1))*e,h=c*e,d=(s?(c+1)%e:Math.min(e-1,c+1))*e;for(let p=0;p<e;p++){const m=h+p,u=m*4;if(t&&t[m]<.02){a[u]=128,a[u+1]=128,a[u+2]=255,a[u+3]=255;continue}const g=i[p],v=r[p],M=(o[l+v]+2*o[h+v]+o[d+v]-o[l+g]-2*o[h+g]-o[d+g])/8,f=(o[d+g]+2*o[d+p]+o[d+v]-o[l+g]-2*o[l+p]-o[l+v])/8,x=-M*n,w=-f*n,y=1/Math.sqrt(x*x+w*w+1);a[u]=(x*y*.5+.5)*255+.5|0,a[u+1]=(w*y*.5+.5)*255+.5|0,a[u+2]=(y*.5+.5)*255+.5|0,a[u+3]=255}}return a}function qt(o){const t=Math.round(o*255);return t<0?0:t>255?255:t}function ai(o,t){const e=ei(o),n=Math.floor(o/2),s=Math.max(3,Math.round(n*.03)),a=[{id:Qt.broadleaf,paint:l=>e0(l,{dark:!1,round:!1})},{id:Qt.broadleafDark,paint:l=>e0(l,{dark:!0,round:!1})},{id:Qt.conifer,paint:l=>si(l,t*31+3)},{id:Qt.shrub,paint:l=>e0(l,{dark:!1,round:!0})}],i=new Float32Array(a.length*3);for(const{id:l,paint:h}of a){const d=l%2*n,p=Math.floor(l/2)*n;h({B:e,ox:d,oy:p,S:n,m:s,seed:t});let m=0,u=0,g=0,v=0;for(let M=0;M<n;M++){const f=M>=s&&M<n-s;for(let x=0;x<n;x++){const w=(p+M)*o+d+x;!f||x<s||x>=n-s?(e.a[w]=0,e.h[w]=.5):e.a[w]>.5&&(m+=e.r[w],u+=e.g[w],g+=e.b[w],v++)}}v>0&&(i[l*3]=m/v,i[l*3+1]=u/v,i[l*3+2]=g/v)}const r=new Uint8Array(o*o*4);for(let l=0;l<o;l++)for(let h=0;h<o;h++){const d=l*o+h,p=d*4,m=Math.min(1,Math.floor(h/n))+Math.min(1,Math.floor(l/n))*2,u=e.a[d];u<.004?(r[p]=qt(i[m*3]),r[p+1]=qt(i[m*3+1]),r[p+2]=qt(i[m*3+2]),r[p+3]=0):(r[p]=qt(e.r[d]),r[p+1]=qt(e.g[d]),r[p+2]=qt(e.b[d]),r[p+3]=qt(u))}const c=Jn(e.h,e.a,o,7*(o/1024),!1);return{albedo:{size:o,data:r},normal:{size:o,data:c}}}function o0(o,t,e){const n=new Float32Array(o*t),s=new Float32Array(o*t),a=new Float32Array(o*t);for(let i=0;i<t;i++)for(let r=0;r<o;r++){const c=i*o+r;n[c]=.15+de(r,i,e)*.7,s[c]=.15+de(r,i,e+17)*.7,a[c]=de(r,i,e+31)}return{gx:o,gy:t,fx:n,fy:s,id:a}}function $0(o,t,e,n){const{gx:s,gy:a}=e,i=o*s,r=t*a,c=Math.floor(i),l=Math.floor(r);let h=9,d=9,p=0;for(let m=-1;m<=1;m++){const u=l+m,g=uo(u,a);for(let v=-1;v<=1;v++){const M=c+v,f=g*s+uo(M,s),x=i-(M+e.fx[f]),w=r-(u+e.fy[f]),y=x*x+w*w;y<h?(d=h,h=y,p=e.id[f]):y<d&&(d=y)}}n[0]=Math.sqrt(h),n[1]=Math.sqrt(d),n[2]=p}function ii(o,t,e){const{gx:n}=t,s=o*n,a=Math.floor(s);let i=9,r=9,c=0;for(let l=-1;l<=1;l++){const h=a+l,d=uo(h,n),p=Math.abs(s-(h+t.fx[d]));p<i?(r=i,i=p,c=t.id[d]):p<r&&(r=p)}e[0]=i,e[1]=r,e[2]=c}function ri(o,t,e){const n=o,s=new Uint8Array(n*n*4),a=new Float32Array(n*n),i=[0,0,0],r=t*7+(e==="conifer"?101:3),c=e==="broadleaf"?o0(10,1,r+9):o0(11,3,r+9),l=o0(22,8,r+12);for(let d=0;d<n;d++){const p=(d+.5)/n;for(let m=0;m<n;m++){const u=(m+.5)/n,g=d*n+m;let v,M,f,x;const w=_t(u*4,p*4,4,4,r+1);if(e==="broadleaf"){const k=_t(u*2,p*5,2,5,r+3)-.5,S=_t(u*5,p*11,5,11,r+4)-.5,b=u+.028*k+.01*S;ii(b,c,i);const A=i[1]-i[0],T=Wt(.3,.6,_t(u*10,p*4,10,4,r+5)),P=1-Wt(0,.13,A);$0(b+.31,p+.07*k,l,i);const R=i[1]-i[0],_=(1-Wt(0,.09,R))*.5*Wt(.3,.7,_t(u*6,p*9,6,9,r+6)),D=Math.min(1,Math.max(P*(.4+.6*T),_)),F=_t(u*120,p*8,120,8,r+7),E=_t(u*70,p*40,70,40,r+11),N=.9+.2*_t(u*10,p*3,10,3,r+8);x=(1-D*.9)*(.85+.15*F)+.05*E;const L=N*(.82+.4*w)*(.86+.28*F)*(.94+.1*E)*(1-.82*D);v=.4*L,M=.35*L,f=.3*L;const U=Wt(.64,.78,_t(u*7,p*7,7,7,r+12))*(1-D)*.2;v+=(.5*L-v)*U,M+=(.54*L-M)*U,f+=(.4*L-f)*U}else{const k=.03*(_t(u*5,p*3,5,3,r+3)-.5)+.012*(_t(u*14,p*8,14,8,r+4)-.5),S=.06*(_t(u*4,p*5,4,5,r+5)-.5);$0(u+k,p+S,c,i);const b=i[1]-i[0],A=.6+.8*_t(u*7,p*6,7,6,r+6),T=Wt(0,.16*A,b),P=1-Math.min(1,i[0]*1.1),R=_t(u*60,p*5,60,5,r+10),_=_t(u*90,p*30,90,30,r+11);x=T*(.5+.35*P)*(.88+.16*R)+.05*_;const F=(.75+.5*i[2])*(.85+.3*w)*(.8+.4*R)*(.9+.2*_)*(.3+.7*T)*(.88+.2*P);v=.37*F,M=.28*F,f=.22*F;const E=Wt(.5,.85,i[2])*.4;v+=(.4*F-v)*E,M+=(.34*F-M)*E,f+=(.3*F-f)*E}const y=g*4;s[y]=qt(v),s[y+1]=qt(M),s[y+2]=qt(f),s[y+3]=255,a[g]=x}}const h=Jn(a,null,n,(e==="broadleaf"?5:6)*(n/512),!0);return{albedo:{size:n,data:s},normal:{size:n,data:h}}}const V1=5,st={rockA:.16,rockB:.42,hiA:14,hiB:38,dryA:.58,dryB:.78,dryGain:.5,hiGain:.22,dirtA:.54,dirtB:.74,dirtGain:.9,gravelA:.62,gravelB:.76,hBias:.2};function oo(o,t,e){const n=Math.min(1,Math.max(0,(e-o)/(t-o)));return n*n*(3-2*n)}function H1(o){const t=oo(st.rockA,st.rockB,1-o.normalY),e=oo(st.hiA,st.hiB,o.height),n=Math.min(1,oo(st.dryA,st.dryB,o.nDry)*st.dryGain+e*st.hiGain),s=oo(st.dirtA,st.dirtB,o.nDirt)*st.dirtGain,a=oo(st.gravelA,st.gravelB,o.nGravel),i=1-t,r=i*s,c=i*(1-s),l=c*a,h=c*(1-a),d=h*n,p=h*(1-n),m=o.layerHeights??[.5,.5,.5,.5,.5],u=[p,d,r,l,t];let g=0;const v=u.map((f,x)=>{const w=f*(m[x]+st.hBias),y=w*w;return g+=y,y}),M=1/Math.max(g,1e-6);return[v[0]*M,v[1]*M,v[2]*M,v[3]*M,v[4]*M]}function zt(o){const t=String(o);return/[.e]/.test(t)?t:`${t}.0`}function $1(){return`
void layerWeights(float normalY, float height, float nDry, float nDirt, float nGravel, float lh[5], out float w[5]) {
  float rock = smoothstep(${zt(st.rockA)}, ${zt(st.rockB)}, 1.0 - normalY);
  float hi = smoothstep(${zt(st.hiA)}, ${zt(st.hiB)}, height);
  float dry = min(1.0, smoothstep(${zt(st.dryA)}, ${zt(st.dryB)}, nDry) * ${zt(st.dryGain)} + hi * ${zt(st.hiGain)});
  float dirt = smoothstep(${zt(st.dirtA)}, ${zt(st.dirtB)}, nDirt) * ${zt(st.dirtGain)};
  float gravel = smoothstep(${zt(st.gravelA)}, ${zt(st.gravelB)}, nGravel);
  float flat_ = 1.0 - rock;
  float r1 = flat_ * (1.0 - dirt);
  float r2 = r1 * (1.0 - gravel);
  w[0] = r2 * (1.0 - dry);
  w[1] = r2 * dry;
  w[2] = flat_ * dirt;
  w[3] = r1 * gravel;
  w[4] = rock;
  float sum = 0.0;
  for (int k = 0; k < 5; k++) {
    float v = w[k] * (lh[k] + ${zt(st.hBias)});
    w[k] = v * v;
    sum += w[k];
  }
  float inv = 1.0 / max(sum, 1e-6);
  for (int k = 0; k < 5; k++) w[k] *= inv;
}
`}function Mo(o,t){const e=Math.sin(o*127.1+t*311.7)*43758.5453123;return e-Math.floor(e)}function ci(o,t){const e=Math.floor(o),n=Math.floor(t),s=o-e,a=t-n,i=s*s*(3-2*s),r=a*a*(3-2*a);return Mo(e,n)*(1-i)*(1-r)+Mo(e+1,n)*i*(1-r)+Mo(e,n+1)*(1-i)*r+Mo(e+1,n+1)*i*r}function yo(o,t,e){let n=.5,s=1,a=0,i=0;for(let r=0;r<e;r++)a+=n*ci(o*s,t*s),i+=n,n*=.5,s*=2;return a/i}function j1(o,t){return{nDry:yo(o*.012+13,t*.012+71,3),nDirt:yo(o*.009+31,t*.009+17,4)*.68+yo(o*.045,t*.045,3)*.32,nGravel:yo(o*.028+150,t*.028+20,4)}}function Y1(){return`
float tlHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float tlNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(tlHash(i), tlHash(i + vec2(1.0, 0.0)), f.x), mix(tlHash(i + vec2(0.0, 1.0)), tlHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float tlFbm(vec2 p, int oct) {
  float a = 0.5, f = 1.0, s = 0.0, n = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= oct) break;
    s += a * tlNoise(p * f); n += a; a *= 0.5; f *= 2.0;
  }
  return s / n;
}
vec3 terrainNoises(vec2 p) {
#ifdef TL_LOW
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 2);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 3) * 0.68 + tlFbm(p * 0.045, 2) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 3);
#else
  float nDry = tlFbm(p * 0.012 + vec2(13.0, 71.0), 3);
  float nDirt = tlFbm(p * 0.009 + vec2(31.0, 17.0), 4) * 0.68 + tlFbm(p * 0.045, 3) * 0.32;
  float nGravel = tlFbm(p * 0.028 + vec2(150.0, 20.0), 4);
#endif
  return vec3(nDry, nDirt, nGravel);
}
`}const Ut=o=>[(o>>16&255)/255,(o>>8&255)/255,(o&255)/255],no=o=>{const t=e=>Math.round(Math.min(1,Math.max(0,e))*255);return t(o[0])<<16|t(o[1])<<8|t(o[2])},Fe=(o,t,e)=>[o[0]+(t[0]-o[0])*e,o[1]+(t[1]-o[1])*e,o[2]+(t[2]-o[2])*e],Ce=o=>o[0]*.299+o[1]*.587+o[2]*.114;function K1(o){const t=Ut(o.grass),e=Ut(o.dirt),n=Ut(o.rock),s=Fe(t,[Ce(t),Ce(t),Ce(t)],.1),i=Fe(s,[.66,.6,.33],.62),r=Fe(e,[Ce(e),Ce(e),Ce(e)],.08),c=Fe(Fe(n,e,.38),[1,1,1],.1),l=n;return{grass:no(s),dryGrass:no(i),dirt:no(r),gravel:no(c),rock:no(l)}}function li(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ui(o){const t=o*o;return{S:o,mask:o-1,R:new Float32Array(t),G:new Float32Array(t),B:new Float32Array(t),H:new Float32Array(t)}}function ie(o,t,e,n,s,a=.5){const i=new Float32Array(o*o);let r=1,c=0;const l=new Int32Array(o),h=new Int32Array(o),d=new Float32Array(o);for(let m=0;m<s;m++){const u=e<<m,g=n<<m;if(u>o/2||g>o/2)break;const v=new Float32Array(u*g);for(let M=0;M<v.length;M++)v[M]=t();for(let M=0;M<o;M++){const f=M*u/o,x=Math.floor(f),w=f-x;l[M]=x%u,h[M]=(x+1)%u,d[M]=w*w*(3-2*w)}for(let M=0;M<o;M++){const f=M*g/o,x=Math.floor(f),w=f-x,y=w*w*(3-2*w),k=x%g*u,S=(x+1)%g*u,b=M*o;for(let A=0;A<o;A++){const T=v[k+l[A]],P=v[k+h[A]],R=v[S+l[A]],_=v[S+h[A]],D=d[A],F=T+(P-T)*D;i[b+A]=i[b+A]+r*(F+(R+(_-R)*D-F)*y)}}c+=r,r*=a}const p=1/c;for(let m=0;m<i.length;m++)i[m]*=p;return i}function Bo(o,t){for(let e=0;e<o.length;e++){const n=(o[e]-.5)*t+.5;o[e]=n<0?0:n>1?1:n}}function j0(o,t,e,n,s,a,i,r){const c=(e&o.mask)*o.S+(t&o.mask);o.R[c]+=(n-o.R[c])*i,o.G[c]+=(s-o.G[c])*i,o.B[c]+=(a-o.B[c])*i,r>o.H[c]&&(o.H[c]=r)}function n0(o,t,e){const n=o.S;for(let s=0;s<e.count;s++){let a=t()*n,i=t()*n,r=t()*Math.PI*2;const c=e.lenMin+t()*(e.lenMax-e.lenMin),l=e.wMin+t()*(e.wMax-e.wMin),h=(t()-.5)*e.curve,d=e.bright[0]+t()*(e.bright[1]-e.bright[0]),p=e.alt&&t()<e.alt.p?e.alt.color:e.base,m=(t()-.5)*e.hueJitter,u=Math.max(3,Math.round(c/.8)),g=.8+t()*.2;for(let v=0;v<u;v++){const M=v/(u-1),f=Math.cos(r),x=Math.sin(r),w=Math.max(.9,l*(1-M*.8)),y=e.baseDark+(e.tipLight-e.baseDark)*M,k=p[0]*d*y*(1+m+e.tipYellow*M),S=p[1]*d*y*(1+e.tipYellow*M*.3),b=p[2]*d*y*(1-m-e.tipYellow*M*1.2),A=(.38+.62*Math.pow(M,.55))*g,T=w*.5,P=Math.round(a),R=Math.round(i);if(w<1.5)j0(o,P,R,k,S,b,.9,A);else for(let _=-T;_<=T+.01;_+=1){const D=Math.abs(_)>T-.5?.65:.95;j0(o,Math.round(a-x*_),Math.round(i+f*_),k,S,b,D,A)}a+=f*.8,i+=x*.8,r+=h*.05}}}function Go(o,t){const e=Math.cos(t.ang),n=Math.sin(t.ang),s=Math.ceil(Math.max(t.rx,t.ry)*1.7)+1,a=Math.round(t.cx),i=Math.round(t.cy),r=-.6,c=-.8;for(let l=-s;l<=s;l++)for(let h=-s;h<=s;h++){const d=h+(a-t.cx),p=l+(i-t.cy),m=(d*e+p*n)/t.rx,u=(-d*n+p*e)/t.ry,g=m*m+u*u;if(g>2.9)continue;const v=(i+l&o.mask)*o.S+(a+h&o.mask);if(g<1){const M=Math.sqrt(1-g),f=(d*r+p*c)/(Math.max(t.rx,t.ry)*1),x=.74+.3*M-.28*f*(1-M*.6),w=g>.8?.8:1;o.R[v]+=(t.color[0]*x-o.R[v])*w,o.G[v]+=(t.color[1]*x-o.G[v])*w,o.B[v]+=(t.color[2]*x-o.B[v])*w;const y=M*t.hScale;y>o.H[v]&&(o.H[v]=y)}else if(t.shadow>0){const M=(d*-r+p*-c)/(Math.sqrt(d*d+p*p)+1e-4),f=1-(Math.sqrt(g)-1)/.7;if(f>0&&M>-.2){const x=1-t.shadow*f*Math.min(1,M+.3);o.R[v]*=x,o.G[v]*=x,o.B[v]*=x}}}}function p0(o,t,e,n){const s=t*t,a=new Float32Array(s),i=new Float32Array(s),r=new Float32Array(s),c=new Float32Array(s),l=new Float32Array(s),h=new Float32Array(s);for(let u=0;u<s;u++){a[u]=.5+(e()-.5)*.85,i[u]=.5+(e()-.5)*.85;const g=e()*Math.PI;r[u]=Math.cos(g),c[u]=Math.sin(g);const v=n?.75+e()*.7:1,M=n?.8+e()*.45:1;l[u]=1/(M*v),h[u]=1/(M/v)}const d=new Float32Array(o*o),p=new Float32Array(o*o),m=new Int32Array(o*o);for(let u=0;u<o;u++){const g=u*t/o,v=Math.floor(g);for(let M=0;M<o;M++){const f=M*t/o,x=Math.floor(f);let w=1e9,y=1e9,k=0;for(let b=-1;b<=1;b++){const A=v+b,T=(A%t+t)%t;for(let P=-1;P<=1;P++){const R=x+P,_=(R%t+t)%t,D=T*t+_,F=f-(R+a[D]),E=g-(A+i[D]),N=F*r[D]+E*c[D],L=-F*c[D]+E*r[D],U=N*N*l[D]*l[D]+L*L*h[D]*h[D];U<w?(y=w,w=U,k=D):U<y&&(y=U)}}const S=u*o+M;d[S]=Math.sqrt(w),p[S]=Math.sqrt(y),m[S]=k}}return{d1:d,d2:p,id:m}}const ye=(o,t,e)=>{const n=Math.min(1,Math.max(0,(e-o)/(t-o)));return n*n*(3-2*n)};function Y0(o,t,e,n){const s=o.S,a=s/512,i=Ut(e.grass),r=Ut(e.dryGrass),c=Ut(e.dirt),l=ie(s,t,4,4,5),h=ie(s,t,16,16,3);if(Bo(l,1.8),n){for(let d=0;d<s*s;d++){const p=ye(.5,.72,l[d]),m=h[d];o.R[d]=(r[0]*.62+(c[0]*.8-r[0]*.62)*p*.55)*(.78+.4*m),o.G[d]=(r[1]*.62+(c[1]*.8-r[1]*.62)*p*.55)*(.78+.4*m),o.B[d]=(r[2]*.62+(c[2]*.8-r[2]*.62)*p*.55)*(.78+.4*m),o.H[d]=.1+.18*m}n0(o,t,{count:Math.round(11e3*a*a),lenMin:24*a+4,lenMax:58*a+4,wMin:1.3,wMax:2.1,curve:3.4,base:r,baseDark:.62,tipLight:1.08,tipYellow:.08,bright:[.7,1.3],alt:{p:.12,color:[c[0]*1.1,c[1]*1.05,c[2]]},hueJitter:.1}),n0(o,t,{count:Math.round(1200*a*a),lenMin:10*a+3,lenMax:22*a+3,wMin:1.4,wMax:2,curve:1.4,base:Ut(e.grass),baseDark:.6,tipLight:1.05,tipYellow:.1,bright:[.7,1],hueJitter:.06})}else{const d=[i[0]*.5,i[1]*.5,i[2]*.45];for(let u=0;u<s*s;u++){const g=l[u]*.7+h[u]*.3;o.R[u]=d[0]*(.7+.6*g),o.G[u]=d[1]*(.7+.6*g),o.B[u]=d[2]*(.7+.6*g),o.H[u]=.12+.2*h[u]}n0(o,t,{count:Math.round(26e3*a*a),lenMin:12*a+3,lenMax:30*a+3,wMin:1.5,wMax:2.5,curve:1.2,base:i,baseDark:.58,tipLight:1.12,tipYellow:.16,bright:[.75,1.25],alt:{p:.05,color:r},hueJitter:.08});const p=[[.93,.92,.84],[.93,.78,.22],[.9,.9,.92]],m=Math.round(9*a*a)+3;for(let u=0;u<m;u++){const g=t()*s,v=t()*s,M=p[Math.floor(t()*p.length)],f=(1.3+t()*.8)*Math.max(.8,a);for(let x=0;x<5;x++){const w=x/5*Math.PI*2+t();Go(o,{cx:g+Math.cos(w)*f,cy:v+Math.sin(w)*f,rx:f*.7,ry:f*.7,ang:0,color:M,hScale:.9,shadow:0})}Go(o,{cx:g,cy:v,rx:f*.55,ry:f*.55,ang:0,color:[.95,.72,.15],hScale:.95,shadow:0})}}}function hi(o,t,e){const n=o.S,s=n/512,a=Ut(e.dirt),i=Ut(e.rock),r=ie(n,t,4,4,5),c=ie(n,t,32,32,3);Bo(r,1.8);for(let p=0;p<n*n;p++){const m=.94+t()*.12,u=(.76+.46*r[p])*(.9+.2*c[p])*m,g=r[p]>.55?1.04:.98;o.R[p]=a[0]*u*g,o.G[p]=a[1]*u,o.B[p]=a[2]*u/g,o.H[p]=.28+.2*c[p]+.1*r[p]}const l=Math.round(110*s*s);for(let p=0;p<l;p++){const m=(5+t()*8)*s+1.5,u=.9+t()*.25;Go(o,{cx:t()*n,cy:t()*n,rx:m*(.8+t()*.5),ry:m*(.8+t()*.5),ang:t()*3.14,color:[a[0]*u,a[1]*u,a[2]*u],hScale:.55+t()*.15,shadow:.2})}const h=Math.round(520*s*s);for(let p=0;p<h;p++){const m=(1.5+Math.pow(t(),2)*5)*Math.max(.7,s),u=t()*.65,g=.72+t()*.55;Go(o,{cx:t()*n,cy:t()*n,rx:m*(.85+t()*.5),ry:m*(.7+t()*.4),ang:t()*3.14,color:[(i[0]+(a[0]-i[0])*u)*g,(i[1]+(a[1]-i[1])*u)*g,(i[2]+(a[2]-i[2])*u)*g],hScale:.8+t()*.2,shadow:.38})}const d=Math.round(16*s)+4;for(let p=0;p<d;p++){let m=t()*n,u=t()*n,g=t()*Math.PI*2;const v=Math.round((70+t()*150)*s)+20;for(let M=0;M<v;M++){g+=(t()-.5)*.7,m+=Math.cos(g),u+=Math.sin(g);const f=Math.round(m),x=Math.round(u),w=(x&o.mask)*n+(f&o.mask);if(o.R[w]*=.5,o.G[w]*=.5,o.B[w]*=.5,o.H[w]=Math.min(o.H[w],.04),M%3===0){const y=(x&o.mask)*n+(f+1&o.mask);o.R[y]*=.8,o.G[y]*=.8,o.B[y]*=.8,o.H[y]=Math.min(o.H[y],.18)}}}}function fi(o,t,e){const n=o.S,s=n/512,a=Ut(e.gravel),i=Ut(e.dirt),r=Math.round(24*s+2)|0,c=Math.max(8,r),l=p0(n,c,t,!0),h=new Float32Array(c*c),d=new Float32Array(c*c),p=new Float32Array(c*c);for(let g=0;g<h.length;g++)h[g]=.62+t()*.75,d[g]=t(),p[g]=.6+t()*.4;const m=[i[0]*.38,i[1]*.36,i[2]*.33],u=ie(n,t,24,24,2);for(let g=0;g<n*n;g++){const v=l.id[g],M=l.d1[g],f=ye(0,.1,l.d2[g]-M),x=Math.max(0,1-M*.85),w=d[v],y=h[v]*(.86+.28*u[g])*(.78+.3*x)*(.95+t()*.1),k=a[0]*y*(.94+.14*w),S=a[1]*y*(.97+.04*w),b=a[2]*y*(1.04-.14*w),A=f*f;o.R[g]=m[0]+(k-m[0])*A,o.G[g]=m[1]+(S-m[1])*A,o.B[g]=m[2]+(b-m[2])*A,o.H[g]=.04+.96*Math.pow(x,.7)*f*p[v]}}function di(o,t,e){const n=o.S,s=n/512,a=Ut(e.rock),i=Fe(Ut(e.grass),[.1,.12,.06],.35),r=ie(n,t,2,12,5),c=ie(n,t,6,6,4),l=ie(n,t,32,32,3),h=ie(n,t,3,3,4);Bo(r,1.6),Bo(h,1.8);const d=p0(n,Math.max(4,Math.round(9*Math.max(.7,s))),t,!1),p=p0(n,Math.max(8,Math.round(15*Math.max(.7,s*1))),t,!1);for(let m=0;m<n*n;m++){const u=r[m]*.5+c[m]*.32+l[m]*.18,g=(l[m]-.5)*.09,v=1-ye(0,.035,d.d2[m]-d.d1[m]+g),M=(1-ye(0,.05,p.d2[m]-p.d1[m]+g))*.55*ye(.35,.7,c[m]),f=Math.min(1,v+M),x=u*(1-.8*f),w=.74+.5*r[m],y=c[m];let k=a[0]*w*(.96+.1*y),S=a[1]*w,b=a[2]*w*(1.04-.1*y);const A=.62+.55*x,T=1-.38*f;k*=A*T,S*=A*T,b*=A*T;const P=ye(.55,.78,h[m])*ye(.6,.2,u)*.55;P>0&&(k+=(i[0]*(.7+.5*l[m])-k)*P,S+=(i[1]*(.7+.5*l[m])-S)*P,b+=(i[2]*(.7+.5*l[m])-b)*P);const R=.94+t()*.12;o.R[m]=k*R,o.G[m]=S*R,o.B[m]=b*R,o.H[m]=x}}const mi={0:1.8,1:1.5,2:2.4,3:3.4,4:3},pi={0:.9,1:.94,2:.97,3:.84,4:.9};function xi(o,t){const e=o.S,n=new Uint8Array(e*e*4),s=new Uint8Array(e*e*4),a=h=>h<=0?0:h>=1?255:h*255+.5|0,i=o.H,r=o.mask,c=mi[t],l=pi[t];for(let h=0;h<e;h++){const d=(h-1&r)*e,p=h*e,m=(h+1&r)*e;for(let u=0;u<e;u++){const g=u-1&r,v=u+1&r,M=i[d+v]+2*i[p+v]+i[m+v]-i[d+g]-2*i[p+g]-i[m+g],f=i[m+g]+2*i[m+u]+i[m+v]-i[d+g]-2*i[d+u]-i[d+v],x=-M*c/8,w=-f*c/8,y=1/Math.sqrt(x*x+w*w+1),k=(p+u)*4,S=p+u;n[k]=a(o.R[S]),n[k+1]=a(o.G[S]),n[k+2]=a(o.B[S]),n[k+3]=a(i[S]),s[k]=a(x*y*.5+.5),s[k+1]=a(w*y*.5+.5),s[k+2]=a(y*.5+.5),s[k+3]=a(l+(.5-i[S])*.12)}}return{size:e,albedo:n,normal:s}}function gi(o,t,e,n){if(t<64||(t&t-1)!==0)throw new Error("size must be a power of two >= 64");const s=li(e*7919+o*104729+1),a=ui(t);switch(o){case 0:Y0(a,s,n,!1);break;case 1:Y0(a,s,n,!0);break;case 2:hi(a,s,n);break;case 3:fi(a,s,n);break;default:di(a,s,n)}return xi(a,o)}const vi=256,wi=2207,k0=1.1,Mi={grass:9079172,dryGrass:9079172,dirt:7300698,gravel:9276293,rock:9079172};let jt,be;function K0(o,t,e){const n=new Ve(o,t,t,fo,mo);return n.colorSpace=e?Ho:po,n.wrapS=n.wrapT=re,n.magFilter=Ue,n.minFilter=Vo,n.generateMipmaps=!0,n.anisotropy=4,n.needsUpdate=!0,n}function ts(){if(jt)return jt;const o=gi(4,vi,wi,Mi);return jt={albedo:K0(o.albedo,o.size,!0),normal:K0(o.normal,o.size,!1)},jt}const X0=`
varying vec3 vRkPos;
varying vec3 vRkNrm;
varying vec3 vRkWorldN;
varying mat3 vRkM;
`,yi=`
uniform sampler2D rkAlbedo;
uniform sampler2D rkNormal;

float rkHash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float rkNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(rkHash(i), rkHash(i + vec3(1, 0, 0)), f.x), mix(rkHash(i + vec3(0, 1, 0)), rkHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(rkHash(i + vec3(0, 0, 1)), rkHash(i + vec3(1, 0, 1)), f.x), mix(rkHash(i + vec3(0, 1, 1)), rkHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}
`,bi=`
vRkPos = transformed;
`,ki=`
{
  mat4 rkModel = modelMatrix;
  #ifdef USE_BATCHING
    rkModel = modelMatrix * batchingMatrix;
  #endif
  vRkM = mat3(rkModel);
  vRkNrm = normalize(objectNormal);
  vRkWorldN = normalize(vRkM * objectNormal);
}
`,Si=`
vec3 rkN = normalize(vRkNrm);
vec3 rkW = pow(abs(rkN), vec3(5.0));
rkW /= (rkW.x + rkW.y + rkW.z);
vec3 rkP = vRkPos * ${k0.toFixed(3)};
vec4 rkAx = texture2D(rkAlbedo, rkP.zy);
vec4 rkAy = texture2D(rkAlbedo, rkP.xz + 0.37);
vec4 rkAz = texture2D(rkAlbedo, rkP.xy + 0.71);
vec4 rkA = rkAx * rkW.x + rkAy * rkW.y + rkAz * rkW.z;
float rkStrata = 0.93 + 0.1 * sin(vRkPos.y * 17.0 + rkNoise(vRkPos * 2.3) * 4.5);
vec3 rkAlb = rkA.rgb * rkStrata;
// 苔藓：世界法线朝上 × 噪声（在凹处略多）
float rkUp = smoothstep(0.55, 0.9, vRkWorldN.y);
float rkMn = rkNoise(vRkPos * 3.1 + 5.0) * 0.6 + rkNoise(vRkPos * 9.0) * 0.4;
float rkMoss = rkUp * smoothstep(0.32, 0.62, rkMn + (0.5 - rkA.a) * 0.35);
// 侧面低处：薄薄一层地衣斑
float rkLichen = smoothstep(0.58, 0.72, rkNoise(vRkPos * 6.5 + 11.0)) * (1.0 - rkUp) * 0.28;
vec3 rkMossCol = mix(vec3(0.20, 0.27, 0.12), vec3(0.31, 0.38, 0.17), rkNoise(vRkPos * 13.0)) * (0.65 + 0.7 * rkA.a);
rkAlb = mix(rkAlb, rkMossCol, clamp(rkMoss * 0.9, 0.0, 0.92));
rkAlb = mix(rkAlb, vec3(0.50, 0.52, 0.36), rkLichen);
// 接地：接触阴影 + 湿润
float rkGround = 1.0 - smoothstep(0.0, 0.2, vRkPos.y);
rkAlb *= mix(1.0, 0.5, rkGround);
diffuseColor.rgb *= rkAlb;
`,Ai=`
{
  vec3 rkNo = normalize(vRkNrm);
  vec3 rkWn = pow(abs(rkNo), vec3(5.0));
  rkWn /= (rkWn.x + rkWn.y + rkWn.z);
  vec3 rkQ = vRkPos * ${k0.toFixed(3)};
  vec3 tx = texture2D(rkNormal, rkQ.zy).xyz * 2.0 - 1.0;
  vec3 ty = texture2D(rkNormal, rkQ.xz + 0.37).xyz * 2.0 - 1.0;
  vec3 tz = texture2D(rkNormal, rkQ.xy + 0.71).xyz * 2.0 - 1.0;
  tx = vec3(tx.xy + rkNo.zy, abs(tx.z) * rkNo.x);
  ty = vec3(ty.xy + rkNo.xz, abs(ty.z) * rkNo.y);
  tz = vec3(tz.xy + rkNo.xy, abs(tz.z) * rkNo.z);
  vec3 rkBn = normalize(tx.zyx * rkWn.x + ty.xzy * rkWn.y + tz.xyz * rkWn.z);
  rkBn = normalize(mix(rkNo, rkBn, 0.9));
  vec3 rkWorld = normalize(vRkM * rkBn);
  normal = normalize((viewMatrix * vec4(rkWorld, 0.0)).xyz);
}
`,Ti=`
{
  vec3 rkNr = normalize(vRkNrm);
  vec3 rkWr = pow(abs(rkNr), vec3(5.0));
  rkWr /= (rkWr.x + rkWr.y + rkWr.z);
  vec3 rkR = vRkPos * ${k0.toFixed(3)};
  float rkRough = texture2D(rkNormal, rkR.zy).a * rkWr.x + texture2D(rkNormal, rkR.xz + 0.37).a * rkWr.y + texture2D(rkNormal, rkR.xy + 0.71).a * rkWr.z;
  roughnessFactor = mix(rkRough, 0.97, rkMoss * 0.8);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.72, rkGround);
}
`;function Pi(){if(be)return be;const o=ts(),t=new it({color:16777215,vertexColors:!0,roughness:.92,metalness:0});return t.userData.shared=!0,t.onBeforeCompile=e=>{e.uniforms.rkAlbedo={value:o.albedo},e.uniforms.rkNormal={value:o.normal},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
${X0}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${bi}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
${ki}`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
${X0}${yi}`).replace("#include <color_fragment>",`#include <color_fragment>
${Si}`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
${Ti}`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${Ai}`)},t.customProgramCacheKey=()=>"rock-triplanar-v1",be=t,t}let se;function Ri(){if(se)return se;const o=ts();return se=new it({color:16777215,map:o.albedo,normalMap:o.normal,normalScale:new wt(.7,.7),vertexColors:!0,roughness:.9,metalness:0}),se.userData.shared=!0,se}function _i(){be==null||be.dispose(),be=void 0,se==null||se.dispose(),se=void 0,jt==null||jt.albedo.dispose(),jt==null||jt.normal.dispose(),jt=void 0}const Di={value:0},Ci={value:1},Z0={dir:{value:new C(.4,.8,-.45).normalize()},color:{value:new O(1,.95,.85)}};let Se="high";function X1(o){!Ae&&Object.keys(Ne).length===0&&(Se=o)}const zi=.45,Fi=`
uniform float windTime;
uniform float windStrength;
attribute vec2 aSway;
`,Ei=`
{
  #ifdef USE_BATCHING
    mat4 windM = modelMatrix * batchingMatrix;
  #else
    mat4 windM = modelMatrix;
  #endif
  vec3 windOrigin = windM[3].xyz;
  float windPh = dot(windOrigin.xz, vec2(0.23, 0.17));
  float windGust = 0.5 + 0.5 * sin(windTime * 0.8 + windPh * 0.6) + 0.35 * sin(windTime * 1.7 + windPh * 1.3 + 1.3);
  // 世界风向（+x、+z 方向）换算到物体空间（忽略非均匀缩放）
  vec3 windObjDir = normalize(transpose(mat3(windM)) * vec3(0.82, 0.0, 0.57));
  transformed += windObjDir * (windGust * aSway.x * windStrength);
  float windFt = windTime * 5.2 + windPh * 2.1;
  transformed += vec3(
    sin(windFt + position.x * 9.0 + position.y * 3.0),
    0.5 * sin(windFt * 1.31 + position.y * 8.0 + position.z * 2.0),
    sin(windFt * 0.87 + position.z * 9.0 + position.x * 3.0)
  ) * (aSway.y * (0.55 + 0.45 * windGust) * (0.7 + 0.3 * windStrength));
}
`;function S0(o){o.uniforms.windTime=Di,o.uniforms.windStrength=Ci,o.vertexShader=o.vertexShader.replace("#include <common>",`#include <common>
${Fi}`).replace("#include <begin_vertex>",`#include <begin_vertex>
${Ei}`)}const Ni=`
uniform vec3 foliageSunDir;
uniform vec3 foliageSunColor;
`,Ii=`
{
  vec3 tlSun = normalize((viewMatrix * vec4(foliageSunDir, 0.0)).xyz);
  vec3 tlView = normalize(vViewPosition);
  float tlBack = pow(max(dot(-tlView, tlSun), 0.0), 4.0);
  totalEmissiveRadiance += diffuseColor.rgb * foliageSunColor * (tlBack * 0.35);
}
`;function Wo(o,t,e,n){const s=new Ve(o.data,o.size,o.size,fo,mo);return s.colorSpace=t?Ho:po,s.wrapS=s.wrapT=e?re:d0,s.magFilter=Ue,s.minFilter=Vo,s.generateMipmaps=!0,s.anisotropy=n,s.needsUpdate=!0,s}const Ui=`
#ifdef USE_MAP
  vec2 fTexSz = vec2(textureSize(map, 0));
  vec2 fDx = dFdx(vMapUv * fTexSz);
  vec2 fDy = dFdy(vMapUv * fTexSz);
  float fMip = max(0.0, 0.5 * log2(max(dot(fDx, fDx), dot(fDy, fDy))));
  diffuseColor.a *= 1.0 + fMip * 0.3;
#endif`;function es(o){o.fragmentShader=o.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
${Ui}`)}const Bi=4177,Gi=913;let Ae;const Ne={},Oo=new Map;function os(o,t){const e=new Ws({depthPacking:Os}),n=new Ls;for(const s of[e,n])s.map=o.map,s.alphaTest=o.alphaTest,s.onBeforeCompile=a=>{S0(a),es(a)},s.customProgramCacheKey=()=>`wind-shadow-${t}-v2`;Oo.set(o,{depth:e,distance:n})}function ns(){if(Ae)return Ae;const t=ai(Se==="high"?1024:512,Bi),e=new it({map:Wo(t.albedo,!0,!1,Se==="high"?4:2),normalMap:Wo(t.normal,!1,!1,Se==="high"?4:2),normalScale:new wt(.8,.8),alphaTest:zi,vertexColors:!0,side:ft,roughness:.82,metalness:0});return e.onBeforeCompile=n=>{S0(n),es(n),n.uniforms.foliageSunDir=Z0.dir,n.uniforms.foliageSunColor=Z0.color,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
${Ni}`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
${Ii}`)},e.customProgramCacheKey=()=>"foliage-wind-v2",e.userData.shared=!0,Ae=e,os(e,"foliage"),e}function A0(o){const t=Ne[o];if(t)return t;const n=ri(Se==="high"?512:256,Gi,o),s=new it({map:Wo(n.albedo,!0,!0,Se==="high"?4:2),normalMap:Wo(n.normal,!1,!0,Se==="high"?4:2),normalScale:new wt(1,1),vertexColors:!0,roughness:.96,metalness:0});return s.onBeforeCompile=a=>S0(a),s.customProgramCacheKey=()=>"bark-wind-v1",s.userData.shared=!0,Ne[o]=s,os(s,`bark-${o}`),s}function Lo(o,t){const e=Oo.get(t);e&&(o.customDepthMaterial=e.depth,o.customDistanceMaterial=e.distance)}function Z1(){var t,e;const o=[];Ae&&o.push(Ae);for(const n of Object.values(Ne))n&&o.push(n);for(const n of o){(t=n.map)==null||t.dispose(),(e=n.normalMap)==null||e.dispose(),n.dispose();const s=Oo.get(n);s==null||s.depth.dispose(),s==null||s.distance.dispose(),Oo.delete(n)}_i(),Ae=void 0,delete Ne.broadleaf,delete Ne.conifer}function Wi(o){const t=new Et;let e=0,n=0;const s=o.some(p=>p.attributes.color);for(const p of o)e+=p.attributes.position.count,n+=p.index?p.index.count:p.attributes.position.count;const a=new Float32Array(e*3),i=new Float32Array(e*3),r=new Float32Array(e*2),c=s?new Float32Array(e*3):null,l=new Uint32Array(n);let h=0,d=0;for(const p of o){const m=p.attributes.position,u=p.attributes.normal,g=p.attributes.uv;a.set(m.array,h*3),u&&i.set(u.array,h*3),g&&r.set(g.array,h*2),c&&(p.attributes.color?c.set(p.attributes.color.array,h*3):c.fill(1,h*3,(h+m.count)*3));const v=p.index;if(v)for(let M=0;M<v.count;M++)l[d++]=v.getX(M)+h;else for(let M=0;M<m.count;M++)l[d++]=M+h;h+=m.count}return t.setAttribute("position",new ct(a,3)),t.setAttribute("normal",new ct(i,3)),t.setAttribute("uv",new ct(r,2)),c&&t.setAttribute("color",new ct(c,3)),t.setIndex(new ct(l,1)),t}const Oi=.5;function q1(o=18){const t=Vt(90210),e=[];for(let n=0;n<o;n++){const s=t(),a=Math.sqrt(s)*.45,i=t()*Math.PI*2,r=Math.cos(i)*a,c=Math.sin(i)*a,l=.16+t()*.34,h=.05+t()*.04,d=.06+a*.7+t()*.12,p=3,m=[],u=[],g=[],v=Math.cos(i),M=Math.sin(i),f=t()*Math.PI,x=Math.cos(f),w=Math.sin(f);for(let A=0;A<=p;A++){const T=A/p,P=T*l,R=h*(1-T*.92)*.5,_=d*T*T,D=r+v*_,F=c+M*_;m.push(D-x*R,P,F-w*R),m.push(D+x*R,P,F+w*R),u.push(0,T,1,T)}for(let A=0;A<p;A++){const T=A*2,P=A*2+1,R=A*2+2,_=A*2+3;g.push(T,R,P,P,R,_)}const y=new Et;y.setAttribute("position",new pt(m,3)),y.setAttribute("uv",new pt(u,2)),y.setIndex(g),y.computeVertexNormals();const k=.78+t()*.3,S=t()>.82?1:0,b=new Float32Array(m.length);for(let A=0;A<m.length/3;A++){const T=Z.clamp(m[A*3+1]/Oi,0,1),P=[.07+T*.27,.15+T*.34,.045+T*.1],R=[.2+T*.34,.17+T*.26,.07+T*.1];for(let _=0;_<3;_++)b[A*3+_]=(P[_]*(1-S)+R[_]*S)*k}y.setAttribute("color",new ct(b,3)),e.push(y)}return Wi(e)}const q0=new Map;function ss(o=.88,t="leaf"){const e=`${t}:${o}`;let n=q0.get(e);return n||(n=new it({color:16777215,vertexColors:!0,roughness:o,metalness:.02}),q0.set(e,n)),n}function ao(o,t,e,n){return Math.sin(o*2.3+n)*Math.cos(t*2.1+n*1.3)*.5+Math.sin(e*2.7-n*.7+o*1.1)*.35+Math.sin((o+t+e)*4.1+n)*.15}const Q0=new Map;function Li(o,t,e){const n=`${o}:${t}:${e}`,s=Q0.get(n);if(s)return s;const a=Ie(new Ln(1,t),1e-4),i=a.attributes.position,r=new C;for(let c=0;c<i.count;c++){r.fromBufferAttribute(i,c);const l=ao(r.x,r.y,r.z,o);r.multiplyScalar(1+l*e),i.setXYZ(c,r.x,r.y,r.z)}return a.computeVertexNormals(),a.deleteAttribute("uv"),Q0.set(n,a),a}function yt(o,t,e,n=()=>1,s=!1){const a=o.clone();s||a.deleteAttribute("uv"),a.attributes.normal||a.computeVertexNormals();const i=a.attributes.position,r=a.attributes.normal,c=new Float32Array(i.count*3);for(let l=0;l<i.count;l++){const h=n(i.getY(l),r.getY(l));c[l*3]=e.r*h,c[l*3+1]=e.g*h,c[l*3+2]=e.b*h}return a.setAttribute("color",new ct(c,3)),a.applyMatrix4(t),a.index?a:Ie(a,1e-4)}const Vi=new gt,J0=new He,tn=new jo,en=new C,on=new C;function Ct(o,t,e,n=1,s=n,a=n,i=0,r=0,c=0){return tn.set(i,r,c),J0.setFromEuler(tn),en.set(o,t,e),on.set(n,s,a),Vi.clone().compose(en,J0,on)}function T0(o,t,e,n=!0){if(t.length===0)return;const s=Lt(t,!1);if(!s)return;const a=new K(s,e);a.castShadow=n,a.receiveShadow=!0,Lo(a,e),o.add(a)}function P0(o,t,e,n,s,a=!1,i=16,r=18){const c=[];for(let u=0;u<=i;u++){const g=u/i,v=t*.6*Math.exp(-g*13);c.push(new wt(Z.lerp(t,e,Math.pow(g,.85))+v,-.08*o+g*o*1.08))}const l=new Hs(c,r),h=l.attributes.position,d=new Float32Array(h.count*3);for(let u=0;u<h.count;u++){const g=h.getX(u),v=h.getZ(u),M=h.getY(u),f=Math.atan2(v,g),x=Math.sin(f*7+M*.9/Math.max(.2,o*.15))*.5+Math.sin(f*13-M*1.7/Math.max(.2,o*.15))*.3+ao(g*3,M*2.2,v*3,3)*.6,w=Math.max(0,Math.sin(f*5+.7))*Math.exp(-Math.max(0,M)/(o*.12)),y=1+x*.055+w*.28;h.setX(u,g*y+s*Math.pow(Math.max(0,M)/o,2)*o),h.setZ(u,v*y);const k=.72+.28*Z.clamp(.5+x*.6,0,1),S=.7+.3*Math.min(1,Math.max(0,M)/(o*.3)),b=k*S;d[u*3]=n.r*b,d[u*3+1]=n.g*b,d[u*3+2]=n.b*b}if(l.setAttribute("color",new ct(d,3)),a){const u=l.attributes.uv,g=Math.PI*2*((t+e)/2+t*.1);for(let v=0;v<u.count;v++)u.setY(v,u.getY(v)*o*1.08/g)}else l.deleteAttribute("uv");l.computeVertexNormals();const p=l.attributes.normal,m=i+1;for(let u=0;u<m;u++){const g=u,v=r*m+u,M=p.getX(g)+p.getX(v),f=p.getY(g)+p.getY(v),x=p.getZ(g)+p.getZ(v),w=Math.hypot(M,f,x)||1;p.setXYZ(g,M/w,f/w,x/w),p.setXYZ(v,M/w,f/w,x/w)}return l}const Hi=.03,ho=.05,ae=new C(0,1,0);class Xo{constructor(){B(this,"pos",[]);B(this,"nor",[]);B(this,"uvs",[]);B(this,"col",[]);B(this,"sw",[]);B(this,"idx",[]);B(this,"n",new C)}get cardCount(){return this.pos.length/12}add(t,e,n,s,a,i,r,c,l,h,d,p=!1){this.n.crossVectors(e,n).normalize();const m=this.n.dot(l)<0?-1:1;m<0&&this.n.negate();const u=this.n.clone().multiplyScalar(1-d).addScaledVector(h,d).normalize(),[g,v,M,f]=ti(i),x=this.pos.length/3;for(let w=0;w<4;w++){const y=w===1||w===2?1:0,k=w>=2?1:0,S=(y-.5)*s*m,b=(k-.5)*a;this.pos.push(t.x+e.x*S+n.x*b,t.y+e.y*S+n.y*b,t.z+e.z*S+n.z*b),this.nor.push(u.x,u.y,u.z);const A=p?1-y:y;this.uvs.push(g+(M-g)*A,v+(f-v)*k);const T=.88+.12*k;this.col.push(r[0]*T,r[1]*T,r[2]*T),this.sw.push(0,c*(.3+.7*k))}this.idx.push(x,x+1,x+2,x,x+2,x+3)}build(){const t=new Et;return t.setAttribute("position",new pt(this.pos,3)),t.setAttribute("normal",new pt(this.nor,3)),t.setAttribute("uv",new pt(this.uvs,2)),t.setAttribute("color",new pt(this.col,3)),t.setAttribute("aSway",new pt(this.sw,2)),t.setIndex(this.pos.length/3>65535?new Vs(this.idx,1):new On(this.idx,1)),t}}function nn(o,t){const e=o.attributes.position;let n=o.attributes.aSway;n||(n=new ct(new Float32Array(e.count*2),2),o.setAttribute("aSway",n));const s=Hi*t;for(let a=0;a<e.count;a++){const i=Z.clamp(e.getY(a)/t,0,1);n.setX(a,s*i*i)}n.needsUpdate=!0}function $i(o){let t=.001;for(const e of o){const n=e.attributes.position;for(let s=0;s<n.count;s++)n.getY(s)>t&&(t=n.getY(s))}return t}function R0(o,t,e,n){const s=t.length>0?Lt(t,!1):null,a=$i([...s?[s]:[],...e?[e]:[]]);if(s){nn(s,a);const i=new K(s,n);i.castShadow=!0,i.receiveShadow=!0,Lo(i,n),o.add(i)}if(e){nn(e,a);const i=ns(),r=new K(e,i);r.castShadow=!0,r.receiveShadow=!0,Lo(r,i),o.add(r)}}function io(o,t,e,n,s,a,i){const r=t.clone().sub(o),c=r.length(),l=new Rt(n,e,c,s,1,!0);l.translate(0,c/2,0);const h=l.attributes.uv,d=i(),p=i(),m=c/(Math.PI*(e+n));for(let v=0;v<h.count;v++)h.setXY(v,h.getX(v)+d,h.getY(v)*m+p);const u=l.attributes.position,g=new Float32Array(u.count*3);for(let v=0;v<u.count;v++){const M=a*(.78+.22*Math.min(1,u.getY(v)/c));g[v*3]=M,g[v*3+1]=M,g[v*3+2]=M}return l.setAttribute("color",new ct(g,3)),l.applyMatrix4(new gt().compose(o,new He().setFromUnitVectors(ae,r.normalize()),new C(1,1,1))),l}const as=new O(1,.96,.9);function Te(o,t){return t.set(o()+o()+o()-1.5,o()+o()+o()-1.5,o()+o()+o()-1.5),t.lengthSq()<1e-6&&t.set(0,1,0),t.normalize()}function ji(o,t,e,n,s,a){const i=new Xo,r=Te(e,new C),c=new C().crossVectors(r,Math.abs(r.y)>.9?new C(1,0,0):ae).normalize(),l=new C().crossVectors(r,c).normalize(),h=e()*Math.PI*2,d=c.clone().multiplyScalar(Math.cos(h)).addScaledVector(l,Math.sin(h)),p=l.clone().multiplyScalar(Math.cos(h)).addScaledVector(c,-Math.sin(h)),m=.62+.4*Z.clamp(.5+n*.6,0,1),u=.94+e()*.12;return i.add(o,d,p,t,t,Qt.shrub,[m*u,m,m*(1.1-(u-.94))],t*ho,r,r,.4,e()>.5),i.build()}function is(o){const t=new xt,e=Vt(o.seed),n=o.u,s=[],a=(w,y,k,S,b=1)=>{s.push(io(w,y,k,S,o.radial,b,e))},i=13*n;s.push(P0(i,1.9*n,1.15*n,as,(e()-.5)*.02,!0,o.trunkRows,o.trunkRadial));for(let w=0;w<o.roots;w++){const y=w/o.roots*Math.PI*2+e()*.4,k=(3.4+e()*2.2)*n;a(new C(Math.cos(y)*n,2.2*n,Math.sin(y)*n),new C(Math.cos(y)*k,-.25*n,Math.sin(y)*k),.7*n,.18*n,.95)}const r=[];for(let w=0;w<o.limbs;w++){const y=w/o.limbs*Math.PI*2+e()*.4,k=i*(.62+e()*.3),S=(7.5+e()*3.5)*n,b=(5+e()*4)*n;let A=new C(Math.cos(y)*.5*n,k,Math.sin(y)*.5*n);for(let T=1;T<=o.segs;T++){const P=T/o.segs,R=new C(Math.cos(y)*S*P,k+b*Math.pow(P,.8)+Math.sin(P*3+w)*.4*n,Math.sin(y)*S*P),_=Math.max(.1*n,.62*n*(1-(T-1)/o.segs*.85)),D=Math.max(.07*n,.62*n*(1-T/o.segs*.85));if(a(A,R,_,D),T>=o.forkFrom)for(const F of[-1,1]){const E=y+F*(.5+e()*.5),N=R.clone().add(new C(Math.cos(E)*(2.2+e()*1.6)*n,(1.6+e()*2.2)*n,Math.sin(E)*(2.2+e()*1.6)*n));a(R,N,D*.8,.05*n),r.push({p:N,r:(1.9+e()*1)*n});for(let L=0;L<o.twigs;L++){const U=E+(L===0?-1:1)*(.6+e()*.7)*(e()>.5?1:-1),V=N.clone().add(new C(Math.cos(U)*(1.3+e()*1.2)*n,(.5+e()*1.6)*n,Math.sin(U)*(1.3+e()*1.2)*n));a(N,V,.05*n,.025*n),r.push({p:V,r:(1.4+e()*.8)*n})}}T===2&&r.push({p:R.clone().add(new C(0,1.2*n,0)),r:(2.2+e()*1)*n}),A=R}r.push({p:A.clone().add(new C(0,.8*n,0)),r:(2.5+e()*1)*n})}r.push({p:new C(0,i+4.5*n,0),r:3.4*n});const c=new C;for(const w of r)c.add(w.p);c.multiplyScalar(1/r.length);let l=.001;for(const w of r)l=Math.max(l,w.p.distanceTo(c)+w.r);let h=0;for(const w of r)h+=w.r*w.r;const d=new Xo,p=new C,m=new C,u=new C,g=new C,v=new C,M=new C,f=new C,x=new C;for(const w of r){const y=Math.max(2,Math.round(o.cards*w.r*w.r/h));g.copy(w.p).sub(c).normalize();for(let k=0;k<y;k++){Te(e,p).multiplyScalar(.8).addScaledVector(g,.55).normalize(),m.copy(w.p).addScaledVector(p,w.r*(.25+e()*.85)),u.copy(m).sub(c);const S=Z.clamp(u.length()/l,0,1);u.normalize(),v.copy(u).multiplyScalar(.7).addScaledVector(ae,.45).add(Te(e,x).multiplyScalar(.55)).normalize(),M.copy(u).addScaledVector(v,-u.dot(v)),M.lengthSq()<.02&&Te(e,M),M.normalize();const b=(e()-.5)*1.8;x.crossVectors(v,M),M.multiplyScalar(Math.cos(b)).addScaledVector(x,Math.sin(b)).normalize(),f.crossVectors(M,v).normalize();const T=S<.55&&e()<.75?Qt.broadleafDark:Qt.broadleaf,P=Z.lerp(.34,1.02,Z.smoothstep(S,.15,1))*(.82+.18*Z.clamp(.5+u.y*.8,0,1))*(.9+.2*e()),R=.96+e()*.1,_=(o.cardSize[0]+e()*(o.cardSize[1]-o.cardSize[0]))*n;d.add(m,f,M,_,_,T,[P*R,P,P*(1.08-(R-.96))],_*ho,u,u,.55,e()>.5)}}return R0(t,s,d.build(),A0("broadleaf")),t}function Q1(o=1,t="high"){const e=t==="low";return is({u:.2*o,limbs:4,segs:3,forkFrom:3,roots:3,cards:e?440:1900,cardSize:e?[2.2,3.6]:[1.3,2.3],twigs:e?0:2,radial:e?4:6,trunkRows:e?8:16,trunkRadial:e?8:18,seed:Math.floor(o*1e4)+77})}function J1(){return is({u:1,limbs:8,segs:4,forkFrom:2,roots:8,cards:9e3,cardSize:[1.5,2.9],twigs:2,radial:7,trunkRows:16,trunkRadial:18,seed:4411})}function tc(o=1,t="high"){const e=new xt,n=Vt(Math.floor(o*7919)+13),s=o,a=t==="low",i=4.3*s,r=[];r.push(P0(i*.97,.15*s,.022*s,as,(n()-.5)*.03,!0,a?8:16,a?6:12));const c=a?5:9,l=a?2:4,h=new Xo,d=new C,p=new C,m=new C,u=new C,g=new C,v=new C,M=new C,f=new C,x=new C,w=new He,y=a?1.4:1;for(let S=0;S<c;S++){const b=S/(c-1),A=(.9+b*3.05)*s,T=(1.1-.9*b)*s*(.92+n()*.16),P=a?4:Math.round(7-b*2.5),R=n()*Math.PI*2,_=.4-.1*b;for(let D=0;D<P;D++){const F=R+D/P*Math.PI*2+(n()-.5)*.5,E=T*(.85+n()*.3);g.set(Math.cos(F),0,Math.sin(F)),d.set(0,A+(n()-.5)*.12*s,0);const N=(W,j)=>j.set(g.x*E*W,d.y+E*(.12*W-_*W*W),g.z*E*W),L=a?2:3;p.copy(d);for(let W=1;W<=L;W++){N(W/L,m);const j=Math.max(.006*s,.045*s*(1-.65*b)*(1-(W-1)/L*.8)),H=Math.max(.004*s,.045*s*(1-.65*b)*(1-W/L*.8));r.push(io(p,m,j,H,a?3:4,.85,n)),p.copy(m)}const U=Z.clamp(E*.55,.38*s,.8*s)*y,V=Z.clamp(Math.round(E/(U*.42)),a?2:3,a?3:7);for(let W=0;W<V;W++){const j=.2+W/Math.max(1,V-1)*.8;N(j,x),N(Math.min(1.02,j+.05),u).sub(x).normalize(),x.addScaledVector(u,U*.35);const H=Z.lerp(.5,1.02,Z.smoothstep(j,.1,.8));for(let tt=0;tt<l;tt++){const ht=l===4?(tt-1.5)*.5:(tt-.5)*.9;M.copy(u),v.crossVectors(M,ae).normalize(),w.setFromAxisAngle(M,ht+(n()-.5)*.25),v.applyQuaternion(w),f.crossVectors(v,M).normalize();const dt=(n()-.5)*.35;w.setFromAxisAngle(f,dt);const q=M.clone().applyQuaternion(w),et=v.clone().applyQuaternion(w),rt=l===4&&tt===0?.82:1,nt=H*(.7+.3*b)*rt*(.9+.2*n()),bt=U*(.9+n()*.2);h.add(x,et,q,bt,bt,Qt.conifer,[nt,nt,nt*1.04],bt*ho,ae,g.clone().multiplyScalar(.5).addScaledVector(ae,.5).normalize(),.3,n()>.5)}}}}const k=a?2:3;for(let S=0;S<k;S++){const b=S/k*Math.PI+n()*.3;v.set(Math.cos(b),0,Math.sin(b)),x.set(0,i*.9+.12*s,0);const A=.62*s*y;h.add(x,v,ae,A,A,Qt.conifer,[1,1,1.04],A*ho*.6,f.crossVectors(v,ae),f.clone(),0,n()>.5)}return R0(e,r,h.build(),A0("conifer")),e}function Yi(o=1,t="high"){const e=new xt,n=Vt(Math.floor(o*31337)+5),s=t==="low",a=o,i=[],r=s?4:5+Math.floor(n()*5);for(let y=0;y<r;y++){const k=y/r*Math.PI*2+n()*.8,S=(.35+n()*.4)*a,b=(.4+n()*.4)*a,A=new C(Math.cos(k)*S*.35,b*.5,Math.sin(k)*S*.35),T=new C(Math.cos(k)*S,b,Math.sin(k)*S),P=new C(Math.cos(k)*.03*a,0,Math.sin(k)*.03*a);s?i.push(io(P,T,.02*a,.008*a,3,.8,n)):(i.push(io(P,A,.022*a,.014*a,3,.8,n)),i.push(io(A,T,.014*a,.006*a,3,.8,n)))}const c=new Xo,l=s?150:520,h=s?[.36,.56]:[.26,.44],d=new C(0,.38*a,0),p=new C,m=new C,u=new C,g=new C,v=new C,M=new C,f=new C;let x=0,w=0;for(;x<l&&w++<l*6;){Te(n,p);const y=(.4+.6*Math.sqrt(n()))*.72*a;if(m.set(p.x*y,d.y+p.y*y*.85,p.z*y),m.y<.06*a)continue;const k=Z.clamp((m.y-.06*a)/(.3*a),0,1);if(n()>.25+.75*k)continue;u.copy(m).sub(d).normalize(),g.copy(u).multiplyScalar(.75).addScaledVector(ae,.35).add(Te(n,f).multiplyScalar(.5)).normalize(),v.copy(u).addScaledVector(g,-u.dot(g)),v.lengthSq()<.02&&Te(n,v),v.normalize();const S=(n()-.5)*1.6;f.crossVectors(g,v),v.multiplyScalar(Math.cos(S)).addScaledVector(f,Math.sin(S)).normalize(),M.crossVectors(v,g).normalize();const b=Z.clamp(m.distanceTo(d)/(.72*a),0,1),A=Z.lerp(.45,1.02,Z.smoothstep(b,.2,1))*(.62+.38*k)*(.9+.2*n()),T=.95+n()*.1,P=(h[0]+n()*(h[1]-h[0]))*a;c.add(m,M,v,P,P,Qt.shrub,[A*T,A,A*(1.07-(T-.95))],P*ho,u,u,.5,n()>.5),x++}if(R0(e,i,c.build(),A0("broadleaf")),!s&&n()>.6){const y=[],k=new mt(.035*o,6,5),S=new O([14240600,6966233,15909198][Math.floor(n()*3)]);for(let b=0;b<9;b++){const A=n()*Math.PI*2,T=(.25+n()*.35)*o;y.push(yt(k,Ct(Math.cos(A)*T,(.35+n()*.3)*o,Math.sin(A)*T),S))}T0(e,y,ss(.5,"berry"),!1)}return e}let s0;function _0(){return s0||(s0=new it({color:16777215,vertexColors:!0,roughness:.78,metalness:0,side:ft})),s0}function ro(o,t,e,n,s){return new gt().makeTranslation(o,t,e).multiply(new gt().makeRotationY(n)).multiply(new gt().makeRotationX(s))}function ec(o=1){const t=new xt,e=Vt(Math.floor(o*6151)+29),n=[15913547,15695784,16185072,12160240,15897419,15226959],s=new O(4880954),a=[],i=3+Math.floor(e()*3);for(let r=0;r<i;r++){const c=(.28+e()*.3)*o,l=new O(n[Math.floor(e()*n.length)]),h=e()*Math.PI*2,d=e()*.24*o,p=Math.cos(h)*d,m=Math.sin(h)*d,u=new Rt(.007*o,.012*o,c,5,1);u.translate(0,c/2,0),a.push(yt(u,Ct(p,0,m),s.clone().multiplyScalar(.85+e()*.3)));for(let v=0;v<2;v++){const M=new St(.11*o,.034*o,2,1);M.translate(.055*o,0,0),M.rotateX(-Math.PI/2),a.push(yt(M,ro(p,c*(.22+v*.22),m,v*Math.PI+e()*2,.35),s.clone().multiplyScalar(1.1+e()*.2)))}const g=6;for(let v=0;v<g;v++){const M=new $o(1,8);M.scale(.034*o,.062*o,1),M.translate(0,.064*o,0),M.rotateX(-Math.PI/2),a.push(yt(M,ro(p,c,m,v/g*Math.PI*2,-.5),l.clone().multiplyScalar(.92+e()*.16),f=>1))}a.push(yt(new mt(.022*o,7,5),Ct(p,c+.01*o,m),new O(14262813)))}return T0(t,a,_0(),!1),t}function Ki(o,t,e,n,s,a){const r=[],c=[],l=[],h=new O;for(let p=0;p<=4;p++){const m=p/4,u=t*(1-m*.9)/2,g=e*m*m,v=n*m*m;if(r.push(g-u,m*o,v,g+u,m*o,v),h.copy(s).lerp(a,m),c.push(h.r,h.g,h.b,h.r,h.g,h.b),p>0){const M=(p-1)*2;l.push(M,M+2,M+1,M+1,M+2,M+3)}}const d=new Et;return d.setAttribute("position",new pt(r,3)),d.setAttribute("color",new pt(c,3)),d.setIndex(l),d.computeVertexNormals(),d}function oc(o=1){const t=new xt,e=Vt(Math.floor(o*4111)+3),n=[],s=new O(10203735),a=new O(4153392);for(let i=0;i<9;i++){const r=(.7+e()*1)*o,c=e()*Math.PI*2,l=Math.sqrt(e())*.28*o,h=Ki(r,(.05+e()*.035)*o,(e()-.5)*.55*o,(e()-.5)*.55*o,a.clone().multiplyScalar(.85+e()*.3),s.clone().multiplyScalar(.85+e()*.3));if(h.applyMatrix4(Ct(Math.cos(c)*l,0,Math.sin(c)*l,1,1,1,0,e()*Math.PI*2,0)),n.push(h),e()>.68){const d=r*(.8+e()*.15),p=new Rt(.006*o,.01*o,d,4,1);p.translate(0,d/2,0),n.push(yt(p,Ct(Math.cos(c)*l,0,Math.sin(c)*l),a.clone().multiplyScalar(1.2)));const m=new Rt(.022*o,.022*o,.14*o,7,1);m.translate(0,.07*o,0),n.push(yt(m,Ct(Math.cos(c)*l,d*.96,Math.sin(c)*l),new O(5913122)))}}return T0(t,n,_0(),!1),t}function nc(o=1){const t=Vt(Math.floor(o*2027)+11),e=(1.8+t()*1.4)*o,n=(.17+t()*.06)*o,s=new O(5652526),a=[],i=P0(e,n*1.05,n*.85,s,0);i.rotateZ(-Math.PI/2),i.translate(-e/2,n*.82,0),a.push(i);const r=new $o(n*.85,14);a.push(yt(r,Ct(e/2+.002,n*.82,0,1,1,1,0,Math.PI/2,0),new O(12096874)));const c=new Gn(n*.35,n*.4,14);a.push(yt(c,Ct(e/2+.004,n*.82,0,1,1,1,0,Math.PI/2,0),new O(9070660)));for(let p=0;p<2;p++){const m=new Rt(n*.12,n*.2,n*1.1,6,1);m.translate(0,n*.55,0),a.push(yt(m,Ct((t()-.5)*e*.6,n*1.3,(t()>.5?1:-1)*n*.5,1,1,1,(t()-.5)*.7,0,(t()-.5)*.8),s.clone().multiplyScalar(.9)))}const l=new O(5075768);for(let p=0;p<4;p++){const m=n*(.35+t()*.3);a.push(yt(Li(Math.floor(t()*3)+1,1,.3),Ct((t()-.5)*e*.8,n*1.62,(t()-.5)*n*.8,m*1.3,m*.45,m),l.clone().multiplyScalar(.8+t()*.4),(u,g)=>.75+.25*Z.clamp(.5+.5*g,0,1)))}const h=Lt(a,!1),d=new K(h,_0());return d.rotation.y=t()*Math.PI,d.castShadow=!0,d.receiveShadow=!0,d}const sn=new Map;function Xi(o){let t=sn.get(o);if(!t){const e=new Ln(1,o);e.deleteAttribute("normal"),e.deleteAttribute("uv"),t=Ie(e,1e-4),e.dispose(),sn.set(o,t)}return t}function an(o,t){const e=Xi(t.detail).clone(),n=e.attributes.position,s=[];for(let m=0;m<t.cuts;m++){const u=new C(o()-.5,o()*1.1-.3,o()-.5).normalize();s.push({n:u,d:.6+o()*.22})}const a=new C((o()-.5)*.55,1,(o()-.5)*.55).normalize(),i=3.2+o()*2.2,r=o()*4,c=new C,l=-.56;for(let m=0;m<n.count;m++){c.fromBufferAttribute(n,m),c.multiplyScalar(1+ao(c.x*1.4,c.y*1.4,c.z*1.4,t.seed)*.2);for(const w of s){const y=c.dot(w.n);y>w.d&&c.addScaledVector(w.n,w.d-y)}const g=c.dot(a)*i+r,v=g-Math.floor(g),x=1+(Math.floor(g)+Z.smoothstep(v,.62,1)-g)/i*.55*t.strata;c.x*=x,c.z*=x,c.multiplyScalar(1+ao(c.x*7,c.y*7,c.z*7,t.seed+5)*.035),c.y<l&&(c.y=l),n.setXYZ(m,c.x*t.rx,(c.y-l)*t.ry,c.z*t.rz)}e.computeVertexNormals();const h=e.attributes.normal,d=new Float32Array(n.count*3),p=new Float32Array(n.count*2);for(let m=0;m<n.count;m++){const u=.9+.2*(.5+ao(n.getX(m)*5,n.getY(m)*5,n.getZ(m)*5,t.seed+9));d[m*3]=t.tone.r*u,d[m*3+1]=t.tone.g*u,d[m*3+2]=t.tone.b*u;const g=Math.abs(h.getX(m)),v=Math.abs(h.getY(m)),M=Math.abs(h.getZ(m));v>=g&&v>=M?(p[m*2]=n.getX(m),p[m*2+1]=n.getZ(m)):g>=M?(p[m*2]=n.getZ(m),p[m*2+1]=n.getY(m)):(p[m*2]=n.getX(m),p[m*2+1]=n.getY(m))}return e.setAttribute("color",new ct(d,3)),e.setAttribute("uv",new ct(p,2)),e}function sc(o=1){const t=Vt(Math.floor(o*9973)+17),e=[],n=new O().setHSL(.09+(t()-.5)*.08,.04+t()*.05,.86+(t()-.5)*.12),s=1+Math.floor(t()*2.4);for(let c=0;c<s;c++){const l=(c===0?.55:.2+t()*.22)*o,h=t()*Math.PI*2,d=c===0?0:(.55+t()*.3)*o,p=an(t,{detail:c===0?6:4,seed:11+c*5+Math.floor(t()*40),rx:l*(1.05+t()*.25),ry:l*(.82+t()*.3),rz:l*(.9+t()*.25),cuts:4+Math.floor(t()*4),strata:.6+t()*.5,tone:n.clone().offsetHSL(0,0,(t()-.5)*.07)}),m=new gt().compose(new C(Math.cos(h)*d,0,Math.sin(h)*d),new He().setFromEuler(new jo(c===0?0:(t()-.5)*.2,t()*6.28,c===0?0:(t()-.5)*.2)),new C(1,1,1));p.applyMatrix4(m),e.push(p)}const a=2+Math.floor(t()*3);for(let c=0;c<a;c++){const l=(.05+t()*.06)*o,h=t()*Math.PI*2,d=(.6+t()*.5)*o,p=an(t,{detail:2,seed:40+c,rx:l*1.2,ry:l*.8,rz:l,cuts:3,strata:.2,tone:n.clone().offsetHSL(0,0,(t()-.5)*.1)});p.rotateY(t()*6.28),p.translate(Math.cos(h)*d,0,Math.sin(h)*d),e.push(p)}const i=Lt(e,!1);for(const c of e)c.dispose();const r=new K(i,Pi());return r.castShadow=!0,r.receiveShadow=!0,r}function ac(o){const t=new xt,e=new O(9210756),n=[],s=(h,d,p=e,m=1,u=1,g=1)=>{n.push(yt(h,Ct(0,d,0,m,u,g),p,(v,M)=>.78+.22*Z.clamp(.5+.5*M,0,1)))};s(new pe(.46,.14,.46,1,.03),.07),s(new Rt(.075,.1,.62,10),.45),s(new pe(.34,.08,.34,1,.025),.8);for(const[h,d]of[[-.13,-.13],[.13,-.13],[-.13,.13],[.13,.13]])n.push(yt(new Eo(.045,.34,.045),Ct(h,1.02,d),e.clone().multiplyScalar(.9)));s(new pe(.4,.07,.4,1,.025),1.22);const a=new $e(.34,.24,4,1);n.push(yt(a,Ct(0,1.38,0,1,1,1,0,Math.PI/4,0),e.clone().multiplyScalar(.85))),s(new mt(.05,10,8),1.55);const i=new K(Lt(n,!1),ss(.9,"lantern"));i.castShadow=!0,i.receiveShadow=!0;const r=Ja(o,.9),c=new K(new Eo(.2,.3,.2),r);c.position.y=1.02;const l=new Wn(o,.8,6);return l.position.y=1.05,t.add(i,c,l),t}function ic(){const o=[],t=new Rt(.004,.006,.26,4,1);t.translate(0,.13,0),o.push(yt(t,Ct(0,0,0),new O(.2,.34,.12)));for(let n=0;n<6;n++){const s=new $o(1,7);s.scale(.022,.044,1),s.translate(0,.046,0),s.rotateX(-Math.PI/2),o.push(yt(s,ro(0,.27,0,n/6*Math.PI*2,-.45),new O(1,1,1)))}o.push(yt(new mt(.014,6,5),Ct(0,.275,0),new O(1,.82,.25)));const e=new St(.07,.022,2,1);return e.translate(.035,0,0),e.rotateX(-Math.PI/2),o.push(yt(e,ro(0,.07,0,.6,.4),new O(.22,.4,.14))),o.push(yt(e,ro(0,.1,0,3.5,.4),new O(.22,.4,.14))),Lt(o,!1)}function rs(o,t,e=26){const n=Vt(o),s=[];for(let a=0;a<e;a++){const i=new C(n()-.5,n()*.7-.1,n()-.5).normalize();s.push(ji(i.multiplyScalar(t*(.35+n()*.65)),t*(.7+n()*.5),n,i.y))}return s}function rc(o,t,e){const n=rs(o,t,e),s=Lt(n,!1);for(const a of n)a.dispose();return s}function cc(o=1,t="high"){const e=Yi(o,t);e.updateMatrixWorld(!0);const n=[];return e.traverse(s=>{const a=s;if(!a.isMesh)return;const i=a.geometry.clone();i.applyMatrix4(a.matrixWorld),n.push({geometry:i,material:a.material}),a.geometry.dispose()}),n}const Pe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class De{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Zi=new $s(-1,1,1,-1,0,1);class qi extends Et{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}}const Qi=new qi;class Zo{constructor(t){this._mesh=new K(Qi,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Zi)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class cs extends De{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof It?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ne.clone(t.uniforms),this.material=new It({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Zo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class rn extends De{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),a=t.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let i,r;this.inverse?(i=0,r=1):(i=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),a.buffers.stencil.setFunc(s.ALWAYS,i,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(s.EQUAL,1,4294967295),a.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),a.buffers.stencil.setLocked(!0)}}class Ji extends De{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class tr{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new wt);this._width=n.width,this._height=n.height,e=new ke(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:me}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cs(Pe),this.copyPass.material.blending=ee,this.timer=new js}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,a=this.passes.length;s<a;s++){const i=this.passes[s];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),i.needsSwap){if(n){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}rn!==void 0&&(i instanceof rn?n=!0:i instanceof Ji&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new wt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class er extends De{constructor(t,e,n=null,s=null,a=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new O}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let a,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(a=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),t.autoClear=s}}const or={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new O(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ge extends De{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new wt(t.x,t.y):new wt(256,256),this.clearColor=new O(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new ke(a,i,{type:me}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new ke(a,i,{type:me});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new ke(a,i,{type:me});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),a=Math.round(a/2),i=Math.round(i/2)}const r=or;this.highPassUniforms=ne.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new It({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new wt(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ne.clone(Pe.uniforms),this.blendMaterial=new It({uniforms:this.copyUniforms,vertexShader:Pe.vertexShader,fragmentShader:Pe.fragmentShader,premultipliedAlpha:!0,blending:Ys,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new O,this._oldClearAlpha=1,this._basic=new w0,this._fsQuad=new Zo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(n,s),this.renderTargetsVertical[a].setSize(n,s),this.separableBlurMaterials[a].uniforms.invSize.value=new wt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const i=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ge.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ge.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=i}_getSeparableBlurMaterial(t){const e=[],n=t/3;for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(n*n))/n);return new It({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new wt(.5,.5)},direction:{value:new wt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new It({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Ge.BlurDirectionX=new wt(1,0);Ge.BlurDirectionY=new wt(0,1);const bo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class nr extends De{constructor(){super(),this.isOutputPass=!0,this.uniforms=ne.clone(bo.uniforms),this.material=new Ks({name:bo.name,uniforms:this.uniforms,vertexShader:bo.vertexShader,fragmentShader:bo.fragmentShader}),this._fsQuad=new Zo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Xs.getTransfer(this._outputColorSpace)===Zs&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===qs?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qs?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Js?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ta?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===oa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===na&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const ko={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new wt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new gt},cameraProjectionMatrixInverse:{value:new gt},cameraWorldMatrix:{value:new gt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new C(-1,-1,-1)},sceneBoxMax:{value:new C(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},So={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},a0={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function sr(o=5){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=ar(t),n=e.length,s=new Uint8Array(n*4);for(let i=0;i<n;++i){const r=e[i],c=2*Math.PI*r/n,l=new C(Math.cos(c),Math.sin(c),0).normalize();s[i*4]=(l.x*.5+.5)*255,s[i*4+1]=(l.y*.5+.5)*255,s[i*4+2]=127,s[i*4+3]=255}const a=new Ve(s,t,t);return a.wrapS=re,a.wrapT=re,a.needsUpdate=!0,a}function ar(o){const t=Math.floor(o)%2===0?Math.floor(o)+1:Math.floor(o),e=t*t,n=Array(e).fill(0);let s=Math.floor(t/2),a=t-1;for(let i=1;i<=e;){if(s===-1&&a===t?(a=t-2,s=0):(a===t&&(a=0),s<0&&(s=t-1)),n[s*t+a]!==0){a-=2,s++;continue}else n[s*t+a]=i++;a++,s--}return n}const Ao={defines:{SAMPLES:16,SAMPLE_VECTORS:ls(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new wt},cameraProjectionMatrixInverse:{value:new gt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function ls(o,t,e){const n=ir(o,t,e);let s="vec3[SAMPLES](";for(let a=0;a<o;a++){const i=n[a];s+=`vec3(${i.x}, ${i.y}, ${i.z})${a<o-1?",":")"}`}return s}function ir(o,t,e){const n=[];for(let s=0;s<o;s++){const a=2*Math.PI*t*s/o,i=Math.pow(s/(o-1),e);n.push(new C(Math.cos(a),Math.sin(a),i))}return n}class rr{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(t,e){let n,s,a;const i=.5*(Math.sqrt(3)-1),r=(t+e)*i,c=Math.floor(t+r),l=Math.floor(e+r),h=(3-Math.sqrt(3))/6,d=(c+l)*h,p=c-d,m=l-d,u=t-p,g=e-m;let v,M;u>g?(v=1,M=0):(v=0,M=1);const f=u-v+h,x=g-M+h,w=u-1+2*h,y=g-1+2*h,k=c&255,S=l&255,b=this.perm[k+this.perm[S]]%12,A=this.perm[k+v+this.perm[S+M]]%12,T=this.perm[k+1+this.perm[S+1]]%12;let P=.5-u*u-g*g;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[b],u,g));let R=.5-f*f-x*x;R<0?s=0:(R*=R,s=R*R*this._dot(this.grad3[A],f,x));let _=.5-w*w-y*y;return _<0?a=0:(_*=_,a=_*_*this._dot(this.grad3[T],w,y)),70*(n+s+a)}noise3d(t,e,n){let s,a,i,r;const l=(t+e+n)*.3333333333333333,h=Math.floor(t+l),d=Math.floor(e+l),p=Math.floor(n+l),m=1/6,u=(h+d+p)*m,g=h-u,v=d-u,M=p-u,f=t-g,x=e-v,w=n-M;let y,k,S,b,A,T;f>=x?x>=w?(y=1,k=0,S=0,b=1,A=1,T=0):f>=w?(y=1,k=0,S=0,b=1,A=0,T=1):(y=0,k=0,S=1,b=1,A=0,T=1):x<w?(y=0,k=0,S=1,b=0,A=1,T=1):f<w?(y=0,k=1,S=0,b=0,A=1,T=1):(y=0,k=1,S=0,b=1,A=1,T=0);const P=f-y+m,R=x-k+m,_=w-S+m,D=f-b+2*m,F=x-A+2*m,E=w-T+2*m,N=f-1+3*m,L=x-1+3*m,U=w-1+3*m,V=h&255,W=d&255,j=p&255,H=this.perm[V+this.perm[W+this.perm[j]]]%12,tt=this.perm[V+y+this.perm[W+k+this.perm[j+S]]]%12,ht=this.perm[V+b+this.perm[W+A+this.perm[j+T]]]%12,dt=this.perm[V+1+this.perm[W+1+this.perm[j+1]]]%12;let q=.6-f*f-x*x-w*w;q<0?s=0:(q*=q,s=q*q*this._dot3(this.grad3[H],f,x,w));let et=.6-P*P-R*R-_*_;et<0?a=0:(et*=et,a=et*et*this._dot3(this.grad3[tt],P,R,_));let rt=.6-D*D-F*F-E*E;rt<0?i=0:(rt*=rt,i=rt*rt*this._dot3(this.grad3[ht],D,F,E));let nt=.6-N*N-L*L-U*U;return nt<0?r=0:(nt*=nt,r=nt*nt*this._dot3(this.grad3[dt],N,L,U)),32*(s+a+i+r)}noise4d(t,e,n,s){const a=this.grad4,i=this.simplex,r=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let h,d,p,m,u;const g=(t+e+n+s)*c,v=Math.floor(t+g),M=Math.floor(e+g),f=Math.floor(n+g),x=Math.floor(s+g),w=(v+M+f+x)*l,y=v-w,k=M-w,S=f-w,b=x-w,A=t-y,T=e-k,P=n-S,R=s-b,_=A>T?32:0,D=A>P?16:0,F=T>P?8:0,E=A>R?4:0,N=T>R?2:0,L=P>R?1:0,U=_+D+F+E+N+L,V=i[U][0]>=3?1:0,W=i[U][1]>=3?1:0,j=i[U][2]>=3?1:0,H=i[U][3]>=3?1:0,tt=i[U][0]>=2?1:0,ht=i[U][1]>=2?1:0,dt=i[U][2]>=2?1:0,q=i[U][3]>=2?1:0,et=i[U][0]>=1?1:0,rt=i[U][1]>=1?1:0,nt=i[U][2]>=1?1:0,bt=i[U][3]>=1?1:0,kt=A-V+l,z=T-W+l,G=P-j+l,$=R-H+l,Y=A-tt+2*l,vt=T-ht+2*l,Tt=P-dt+2*l,Mt=R-q+2*l,Q=A-et+3*l,At=T-rt+3*l,Zt=P-nt+3*l,ce=R-bt+3*l,ge=A-1+4*l,Qo=T-1+4*l,Jo=P-1+4*l,t0=R-1+4*l,je=v&255,Ye=M&255,Ke=f&255,Xe=x&255,Cs=r[je+r[Ye+r[Ke+r[Xe]]]]%32,zs=r[je+V+r[Ye+W+r[Ke+j+r[Xe+H]]]]%32,Fs=r[je+tt+r[Ye+ht+r[Ke+dt+r[Xe+q]]]]%32,Es=r[je+et+r[Ye+rt+r[Ke+nt+r[Xe+bt]]]]%32,Ns=r[je+1+r[Ye+1+r[Ke+1+r[Xe+1]]]]%32;let Ze=.6-A*A-T*T-P*P-R*R;Ze<0?h=0:(Ze*=Ze,h=Ze*Ze*this._dot4(a[Cs],A,T,P,R));let qe=.6-kt*kt-z*z-G*G-$*$;qe<0?d=0:(qe*=qe,d=qe*qe*this._dot4(a[zs],kt,z,G,$));let Qe=.6-Y*Y-vt*vt-Tt*Tt-Mt*Mt;Qe<0?p=0:(Qe*=Qe,p=Qe*Qe*this._dot4(a[Fs],Y,vt,Tt,Mt));let Je=.6-Q*Q-At*At-Zt*Zt-ce*ce;Je<0?m=0:(Je*=Je,m=Je*Je*this._dot4(a[Es],Q,At,Zt,ce));let to=.6-ge*ge-Qo*Qo-Jo*Jo-t0*t0;return to<0?u=0:(to*=to,u=to*to*this._dot4(a[Ns],ge,Qo,Jo,t0)),27*(h+d+p+m+u)}_dot(t,e,n){return t[0]*e+t[1]*n}_dot3(t,e,n,s){return t[0]*e+t[1]*n+t[2]*s}_dot4(t,e,n,s,a){return t[0]*e+t[1]*n+t[2]*s+t[3]*a}}class Yt extends De{constructor(t,e,n=512,s=512,a,i,r){super(),this.width=n,this.height=s,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=sr(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new ke(this.width,this.height,{type:me}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new It({defines:Object.assign({},ko.defines),uniforms:ne.clone(ko.uniforms),vertexShader:ko.vertexShader,fragmentShader:ko.fragmentShader,blending:ee,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new sa,this.normalMaterial.blending=ee,this.pdMaterial=new It({defines:Object.assign({},Ao.defines),uniforms:ne.clone(Ao.uniforms),vertexShader:Ao.vertexShader,fragmentShader:Ao.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new It({defines:Object.assign({},So.defines),uniforms:ne.clone(So.uniforms),vertexShader:So.vertexShader,fragmentShader:So.fragmentShader,blending:ee}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new It({uniforms:ne.clone(Pe.uniforms),vertexShader:Pe.vertexShader,fragmentShader:Pe.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:I0,blendDst:vo,blendEquation:go,blendSrcAlpha:N0,blendDstAlpha:vo,blendEquationAlpha:go}),this.blendMaterial=new It({uniforms:ne.clone(a0.uniforms),vertexShader:a0.vertexShader,fragmentShader:a0.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:aa,blendSrc:I0,blendDst:vo,blendEquation:go,blendSrcAlpha:N0,blendDstAlpha:vo,blendEquationAlpha:go}),this._fsQuad=new Zo(null),this._originalClearColor=new O,this.setGBuffer(a?a.depthTexture:void 0,a?a.normalTexture:void 0),i!==void 0&&this.updateGtaoMaterial(i),r!==void 0&&this.updatePdMaterial(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new ia,this.depthTexture.format=ra,this.depthTexture.type=ca,this.normalRenderTarget=new ke(this.width,this.height,{minFilter:U0,magFilter:U0,type:me,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=ls(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,n){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Yt.OUTPUT.Off:break;case Yt.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=ee,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Yt.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=ee,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Yt.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=ee,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Yt.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case Yt.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ee,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Yt.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=ee,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(t,e,n,s,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(a||0),t.clear()),this._fsQuad.material=e,this._fsQuad.render(t),t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_renderOverride(t,e,n,s,a){t.getClearColor(this._originalClearColor);const i=t.getClearAlpha(),r=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,s=e.clearColor||s,a=e.clearAlpha||a,s!=null&&(t.setClearColor(s),t.setClearAlpha(a||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=r,t.setClearColor(this._originalClearColor),t.setClearAlpha(i)}_overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,e.push(n))})}_restoreVisibility(){const t=this._visibilityCache;for(let e=0;e<t.length;e++)t[e].visible=!0;t.length=0}_generateNoise(t=64){const e=new rr,n=t*t*4,s=new Uint8Array(n);for(let i=0;i<t;i++)for(let r=0;r<t;r++){const c=i,l=r;s[(i*t+r)*4]=(e.noise(c,l)*.5+.5)*255,s[(i*t+r)*4+1]=(e.noise(c+t,l)*.5+.5)*255,s[(i*t+r)*4+2]=(e.noise(c,l+t)*.5+.5)*255,s[(i*t+r)*4+3]=(e.noise(c+t,l+t)*.5+.5)*255}const a=new Ve(s,t,t,fo,mo);return a.wrapS=re,a.wrapT=re,a.needsUpdate=!0,a}}Yt.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const D0=["fogMul","sunMul","tintAmt","exposure","contrast","saturation","lift","bloom","aberration","scanline","vignette"],C0=["skyTop","skyMid","skyBot","fog","sun","hemiSky","hemiGround","ambient","shadowTint","highlightTint","dustA","dustB"],le={fogMul:1,sunMul:1,tintAmt:.14,exposure:1,contrast:1.06,saturation:1.04,lift:.012,bloom:1,aberration:.0016,scanline:.035,vignette:.2},i0={unit01:{...le,id:"unit01",label:"数字 · 冰蓝",skyTop:2781104,skyMid:8372708,skyBot:14676984,fog:12575722,sun:15661311,hemiSky:12576501,hemiGround:3493978,ambient:11061718,shadowTint:3123396,highlightTint:15267583,dustA:8382719,dustB:13235199,aberration:.0019,scanline:.05},unit02:{...le,id:"unit02",label:"传记 · 档案银",skyTop:5929108,skyMid:12174544,skyBot:15392739,fog:13882844,sun:16183796,hemiSky:13818340,hemiGround:5196370,ambient:12106436,shadowTint:7245744,highlightTint:16183026,tintAmt:.12,saturation:.94,contrast:1.08,dustA:13620962,dustB:15319244,scanline:.028},unit03:{...le,id:"unit03",label:"旅行 · 黎明青",skyTop:3112851,skyMid:9227720,skyBot:15981014,fog:12573910,sun:16773614,hemiSky:11984088,hemiGround:4149062,ambient:10930372,shadowTint:2794392,highlightTint:16773360,tintAmt:.15,saturation:1.08,dustA:9429974,dustB:16752527},unit04:{...le,id:"unit04",label:"工艺 · 石墨",skyTop:4871779,skyMid:10134443,skyBot:14276306,fog:12172480,sun:15986150,hemiSky:13159634,hemiGround:3881532,ambient:11053485,shadowTint:6256264,highlightTint:15920874,tintAmt:.1,saturation:.92,contrast:1.1,dustA:14275789,dustB:11846360,bloom:1.1,scanline:.03},unit05:{...le,id:"unit05",label:"航天 · 深靛",skyTop:922176,skyMid:3817359,skyBot:9078472,fog:4869772,sun:14672639,hemiSky:9411032,hemiGround:1841728,ambient:7173048,shadowTint:4870096,highlightTint:15131903,tintAmt:.18,exposure:1.04,fogMul:1.1,dustA:12167423,dustB:14933247,bloom:1.2,aberration:.0021},unit06:{...le,id:"unit06",label:"经济 · 港湾板岩",skyTop:3429742,skyMid:8362664,skyBot:13621976,fog:11123904,sun:15660274,hemiSky:11059396,hemiGround:3162175,ambient:9414314,shadowTint:2923142,highlightTint:15398130,tintAmt:.15,dustA:5235624,dustB:11060428},memory2090:{...le,id:"memory2090",label:"2090 · 深蓝夜",skyTop:660008,skyMid:1851488,skyBot:2109512,fog:791588,sun:13623551,hemiSky:6260424,hemiGround:1382431,ambient:4876950,shadowTint:2781104,highlightTint:15003647,tintAmt:.16,exposure:1.02,sunMul:.9,dustA:8369407,dustB:12901631,scanline:.04},neutral:{...le,id:"neutral",label:"回溯 · 冷白",skyTop:4159416,skyMid:10274020,skyBot:15003378,fog:13031650,sun:16054527,hemiSky:12901104,hemiGround:4214876,ambient:11584210,shadowTint:3903416,highlightTint:15397887,dustA:9425128,dustB:13821682}};function lc(o){return o?i0[o]??i0.neutral:i0.neutral}function cr(o,t={r:0,g:0,b:0}){return t.r=(o>>16&255)/255,t.g=(o>>8&255)/255,t.b=(o&255)/255,t}function x0(){const o={};for(const t of D0)o[t]=0;for(const t of C0)o[t]={r:0,g:0,b:0};return o}function To(o,t=x0()){for(const e of D0)t[e]=o[e];for(const e of C0)cr(o[e],t[e]);return t}function cn(o,t,e,n){for(const s of D0)n[s]=o[s]+(t[s]-o[s])*e;for(const s of C0){const a=o[s],i=t[s],r=n[s];r.r=a.r+(i.r-a.r)*e,r.g=a.g+(i.g-a.g)*e,r.b=a.b+(i.b-a.b)*e}return n}const lr=o=>{const t=o<0?0:o>1?1:o;return t*t*(3-2*t)};class uc{constructor(t){B(this,"current");B(this,"from",x0());B(this,"to",x0());B(this,"elapsed",1);B(this,"duration",1);B(this,"_target");B(this,"version",0);this._target=t,this.current=To(t),To(t,this.from),To(t,this.to)}get target(){return this._target}get settled(){return this.elapsed>=this.duration-1e-6}setTarget(t,e=2){t===this._target&&this.settled||(this._target=t,cn(this.current,this.current,0,this.from),To(t,this.to),this.duration=Math.max(0,e),this.elapsed=0,this.version++,this.duration===0&&this.update(0))}update(t){if(this.settled&&this.duration>0)return this.current;this.elapsed=Math.min(this.duration,this.elapsed+t);const e=this.duration<=0?1:lr(this.elapsed/this.duration);return cn(this.from,this.to,e,this.current),this.current}}function ln(o,t){const e=Math.max(.05,o.r*.2126+o.g*.7152+o.b*.0722);return t[0]=o.r/e,t[1]=o.g/e,t[2]=o.b/e,t}const ur={high:{pixelRatio:2,grassRadius:40,grassCell:1.1,shadowMap:2048,bloom:!0,bloomScale:.6},med:{pixelRatio:1.5,grassRadius:34,grassCell:1.5,shadowMap:1536,bloom:!0,bloomScale:.45},low:{pixelRatio:1,grassRadius:26,grassCell:1.9,shadowMap:1024,bloom:!1,bloomScale:.5}};function hc(){var a;if(typeof window>"u")return"med";const o=((a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)").matches)??!1,t=Math.min(window.innerWidth,window.innerHeight)<540,e=navigator.hardwareConcurrency??4,n=navigator.deviceMemory??4,s=o||t;return s&&(e<=4||n<=3)?"low":s||e<=4||n<=4?"med":"high"}function fc(o,t,e,n,s={}){const a=ur[n];if(!(!a.bloom&&!s.forceComposer))try{const i=o.getSize(new wt),r=i.x,c=i.y,l=Math.min(window.devicePixelRatio,a.pixelRatio),h=new ke(Math.max(1,Math.floor(r*l)),Math.max(1,Math.floor(c*l)),{type:me,samples:n==="high"?4:2}),d=new tr(o,h);if(d.addPass(new er(t,e)),n==="high"&&s.ao!==!1){const u=new Yt(t,e,r,c);u.output=Yt.OUTPUT.Default,u.blendIntensity=.85,u.updateGtaoMaterial({radius:1.1,distanceExponent:1.4,thickness:2,scale:1.1,samples:12,distanceFallOff:1,screenSpaceRadius:!1}),u.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:8}),d.addPass(u)}let p;if(a.bloom){const u=a.bloomScale;p=new Ge(new wt(r*u,c*u),.62,.5,.78);const g=p.setSize.bind(p);p.setSize=(v,M)=>g(Math.max(1,Math.floor(v*u)),Math.max(1,Math.floor(M*u))),d.addPass(p)}d.addPass(new nr);const m=new cs({uniforms:{tDiffuse:{value:null},uContrast:{value:1.06},uSat:{value:1.04},uLift:{value:.012},uShadow:{value:new C(.7,1.15,1.3)},uHighlight:{value:new C(.96,1,1.05)},uTintAmt:{value:.14},uAberration:{value:.0016},uScan:{value:.035},uVig:{value:.2},uRes:{value:new wt(1280,720)},uTime:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
          uniform sampler2D tDiffuse;
          uniform float uContrast, uSat, uLift, uTintAmt, uAberration, uScan, uVig, uTime;
          uniform vec3 uShadow, uHighlight;
          uniform vec2 uRes;
          varying vec2 vUv;
          void main() {
            vec2 q = vUv - 0.5;
            float rr = length(q * vec2(1.0, 1.12));
            // 只在画面边缘（暗角区域）生效的权重：中心为 0
            float edge = smoothstep(0.34, 0.92, rr);
            vec2 dir = normalize(q + 1e-5);
            float ab = uAberration * edge * (0.4 + rr);
            vec3 c;
            c.r = texture2D(tDiffuse, vUv + dir * ab).r;
            c.g = texture2D(tDiffuse, vUv).g;
            c.b = texture2D(tDiffuse, vUv - dir * ab).b;
            float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
            c = mix(vec3(l), c, uSat);
            c = mix(c, c * c * (3.0 - 2.0 * c), clamp((uContrast - 1.0) * 4.0 + 0.2, 0.0, 0.6));
            // 暗部偏冷（微青）、亮部中性偏冷的白；乘子已按亮度归一化，只改色相不改亮度
            c *= mix(vec3(1.0), mix(uShadow, uHighlight, smoothstep(0.04, 0.7, l)), uTintAmt);
            c = c * (1.0 - uLift) + uLift;
            // 全息扫描线：仅边缘，随时间极缓慢流动的亮带
            float scan = 0.5 + 0.5 * sin(vUv.y * uRes.y * 1.15 + uTime * 0.6);
            float band = smoothstep(0.0, 1.0, 0.5 + 0.5 * sin(vUv.y * 5.0 - uTime * 0.35));
            c *= 1.0 - uScan * edge * (scan * 0.6 + band * 0.4);
            c += vec3(0.0, 0.012, 0.018) * uScan * edge * band * 4.0;
            float vig = smoothstep(0.98, 0.3, rr);
            c *= mix(1.0 - uVig * 0.7, 1.0, vig);
            gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
          }
        `});return d.addPass(m),d.setPixelRatio(Math.min(window.devicePixelRatio,a.pixelRatio)),d.setSize(r,c),{composer:d,bloomPass:p,gradePass:m}}catch{return}}function dc(o,t){try{const e=new Bs(o),n=new la,s=new It({side:ua,depthWrite:!1,uniforms:{topColor:{value:new O(t.skyTop)},midColor:{value:new O(t.skyMid)},bottomColor:{value:new O(t.skyBot)},sunColor:{value:new O(t.sunColor)},sunDir:{value:(t.sunDir??new C(.5,.72,.36)).clone().normalize()}},vertexShader:`
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 topColor, midColor, bottomColor, sunColor, sunDir;
          varying vec3 vDir;
          void main() {
            vec3 d = normalize(vDir);
            vec3 col = mix(bottomColor, midColor, smoothstep(-0.2, 0.35, d.y));
            col = mix(col, topColor, smoothstep(0.2, 0.95, d.y));
            float sd = max(dot(d, normalize(sunDir)), 0.0);
            col += sunColor * pow(sd, 26.0) * 2.6;
            col += sunColor * pow(sd, 3.0) * 0.26;
            gl_FragColor = vec4(col, 1.0);
          }
        `});n.add(new K(new mt(10,32,24),s));const a=e.fromScene(n,.02);return n.traverse(i=>{const r=i;r.isMesh&&(r.geometry.dispose(),r.material.dispose())}),e.dispose(),a}catch{return}}const Po=[1,1,1],Ro=[1,1,1];function mc(o,t,e,n,s){const a=o.uniforms;a.uContrast.value=t.contrast,a.uSat.value=t.saturation,a.uLift.value=t.lift,a.uTintAmt.value=t.tintAmt,a.uAberration.value=t.aberration,a.uScan.value=t.scanline,a.uVig.value=t.vignette,a.uTime.value=e,a.uRes.value.set(n,s),ln(t.shadowTint,Po),ln(t.highlightTint,Ro),a.uShadow.value.set(Po[0],Po[1],Po[2]),a.uHighlight.value.set(Ro[0],Ro[1],Ro[2])}const hr=new gt,un=new He,hn=new jo,fn=new C(1,1,1),dn=new C;function us(o,t,e,n=.04){return n<.0075?new Eo(o,t,e):new pe(o,t,e,1,Math.min(n,o/2.01,t/2.01,e/2.01))}function We(o,t,e,n=16){return new Rt(o,t,e,n,1)}function pc(o,t,e,n=8){const s=new xe;for(let i=0;i<n;i++){const r=(i+.5)/n*Math.PI*2,c=Math.cos(r)*o,l=Math.sin(r)*o;i===0?s.moveTo(c,l):s.lineTo(c,l)}s.closePath();const a=new _e(s,{depth:Math.max(.001,t-e*2),bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:1});return a.rotateX(-Math.PI/2),a.translate(0,e,0),a}function xc(o,t,e,n,s){const a=new xe;a.moveTo(Math.cos(e)*o,Math.sin(e)*o),a.lineTo(Math.cos(e)*t,Math.sin(e)*t),a.absarc(0,0,t,e,n,!1),a.lineTo(Math.cos(n)*o,Math.sin(n)*o),a.absarc(0,0,o,n,e,!0);const i=new _e(a,{depth:s,bevelEnabled:!1,curveSegments:3});return i.rotateX(-Math.PI/2),i}function fr(o,t,e,n=6){const s=new C(...o),a=new C(...t).sub(s),i=new Rt(e,e,a.length(),n,1),r=new He().setFromUnitVectors(new C(0,1,0),a.clone().normalize());return i.applyMatrix4(new gt().compose(s.clone().addScaledVector(a,.5),r,new C(1,1,1))),i}function gc(o,t,e,n=.04){const s=new xe;s.absarc(0,0,o,0,Math.PI,!1),s.lineTo(-t,0),s.absarc(0,0,t,Math.PI,0,!0),s.closePath();const a=new _e(s,{depth:Math.max(.001,e-n*2),bevelEnabled:!0,bevelThickness:n,bevelSize:n*.8,bevelSegments:1,curveSegments:18});return a.translate(0,0,-(e-n*2)/2),a}function mn(o,t,e){const n=new xe;n.moveTo(-o/2,0),n.lineTo(o/2,0),n.lineTo(0,t),n.closePath();const s=new _e(n,{depth:e,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});return s.translate(0,0,-e/2),s}class hs{constructor(){B(this,"buckets",new Map)}add(t,e,n={}){const s=t.clone();e.map||s.deleteAttribute("uv"),s.deleteAttribute(Be),hn.set(n.rx??0,n.ry??0,n.rz??0),un.setFromEuler(hn),dn.set(n.x??0,n.y??0,n.z??0),fn.set(n.sx??1,n.sy??1,n.sz??1),s.applyMatrix4(hr.compose(dn,un,fn));const a=s.index?s:Ie(s,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}addMatrix(t,e,n){const s=t.clone();e.map||s.deleteAttribute("uv"),s.deleteAttribute(Be),s.applyMatrix4(n);const a=s.index?s:Ie(s,1e-4),i=this.buckets.get(e)??[];i.push(a),this.buckets.set(e,i)}build(t,e="detail",n={}){const s=[];let a=0;for(const[i,r]of this.buckets){const c=Lt(r,!1);if(!c)continue;c.computeBoundingSphere(),Kn(i)&&No(c);const l=new K(c,i);l.name=`${e}-${a++}`,l.castShadow=!0,l.receiveShadow=!0,Lo(l,i),Object.assign(l.userData,n),t.add(l),s.push(l)}return this.buckets.clear(),s}}function dr(o){var s;o.updateMatrixWorld(!0);const t=new gt().copy(o.matrixWorld).invert(),e=new Map,n=[];o.traverse(a=>{a.isMesh&&n.push(a)});for(const a of n){const i=a.geometry.clone();i.deleteAttribute("uv"),i.deleteAttribute(Be),i.applyMatrix4(new gt().multiplyMatrices(t,a.matrixWorld));const r=i.index?i:Ie(i,1e-4),c=e.get(a.material)??[];c.push(r),e.set(a.material,c)}for(const a of n)(s=a.parent)==null||s.remove(a);for(const a of[...o.children])a.type==="Group"&&o.remove(a);for(const[a,i]of e){const r=Lt(i,!1);if(!r)continue;const c=new K(r,a);c.castShadow=!0,c.receiveShadow=!0,c.userData.isLandscapeStage=!0,o.add(c)}}function vc(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function mr(){const o=(e,n,s=.02,a={})=>{const i=new it({color:e,roughness:n,metalness:s,...a});return i.fog=!1,i},t={stone:o(12170150,.9),stoneDark:o(9078397,.92),stoneWarm:o(13221286,.9),paveA:o(10132116,.95),paveB:o(8751752,.95),slate:o(4870744,.86,.06),wood:o(9071178,.82,.02),woodDark:o(5915440,.85,.02),brass:o(11962940,.36,.8),steel:o(9345444,.4,.8),copper:o(5216908,.52,.55),leaf:o(4157253,.95),leafLight:o(6263120,.95),soil:o(4864812,1),lampGlass:o(15923199,.3,0,{emissive:13625087,emissiveIntensity:.9}),paper:o(15524815,.95),darkSteel:o(3093819,.5,.7),rock:o(8093056,.95),terracottaRoof:o(11887946,.82),glass:(()=>{const e=new Re({color:7315376,roughness:.04,metalness:0,transparent:!0,opacity:.34,clearcoat:1,envMapIntensity:1.6,depthWrite:!1});return e.fog=!1,e})()};return Dt(t.stone,"masonry"),Dt(t.stoneDark,"masonry"),Dt(t.stoneWarm,"masonry"),Dt(t.rock,"masonry"),Dt(t.paveA,"paving"),Dt(t.paveB,"paving"),Dt(t.wood,"wood"),Dt(t.woodDark,"wood"),Dt(t.terracottaRoof,"tiles"),Dt(t.slate,"tiles"),Dt(t.brass,"metal"),Dt(t.steel,"metal"),Dt(t.copper,"metal"),Dt(t.darkSteel,"metal"),t}class pr extends K{constructor(t,e,n=!1,s=!1,a=1e4){const i=new Et;super(i,e),this.isMarchingCubes=!0;const r=this,c=new Float32Array(36),l=new Float32Array(36),h=new Float32Array(36);this.enableUvs=n,this.enableColors=s,this.init=function(f){this.resolution=f,this.isolation=80,this.size=f,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const x=a*3;this.positionArray=new Float32Array(x*3);const w=new ct(this.positionArray,3);w.setUsage(wo),i.setAttribute("position",w),this.normalArray=new Float32Array(x*3);const y=new ct(this.normalArray,3);if(y.setUsage(wo),i.setAttribute("normal",y),this.enableUvs){this.uvArray=new Float32Array(x*2);const k=new ct(this.uvArray,2);k.setUsage(wo),i.setAttribute("uv",k)}if(this.enableColors){this.colorArray=new Float32Array(x*3);const k=new ct(this.colorArray,3);k.setUsage(wo),i.setAttribute("color",k)}i.boundingSphere=new Vn(new C,1)};function d(f,x,w){return f+(x-f)*w}function p(f,x,w,y,k,S,b,A,T,P){const R=(w-b)/(A-b),_=r.normal_cache;c[x+0]=y+R*r.delta,c[x+1]=k,c[x+2]=S,l[x+0]=d(_[f+0],_[f+3],R),l[x+1]=d(_[f+1],_[f+4],R),l[x+2]=d(_[f+2],_[f+5],R),h[x+0]=d(r.palette[T*3+0],r.palette[P*3+0],R),h[x+1]=d(r.palette[T*3+1],r.palette[P*3+1],R),h[x+2]=d(r.palette[T*3+2],r.palette[P*3+2],R)}function m(f,x,w,y,k,S,b,A,T,P){const R=(w-b)/(A-b),_=r.normal_cache;c[x+0]=y,c[x+1]=k+R*r.delta,c[x+2]=S;const D=f+r.yd*3;l[x+0]=d(_[f+0],_[D+0],R),l[x+1]=d(_[f+1],_[D+1],R),l[x+2]=d(_[f+2],_[D+2],R),h[x+0]=d(r.palette[T*3+0],r.palette[P*3+0],R),h[x+1]=d(r.palette[T*3+1],r.palette[P*3+1],R),h[x+2]=d(r.palette[T*3+2],r.palette[P*3+2],R)}function u(f,x,w,y,k,S,b,A,T,P){const R=(w-b)/(A-b),_=r.normal_cache;c[x+0]=y,c[x+1]=k,c[x+2]=S+R*r.delta;const D=f+r.zd*3;l[x+0]=d(_[f+0],_[D+0],R),l[x+1]=d(_[f+1],_[D+1],R),l[x+2]=d(_[f+2],_[D+2],R),h[x+0]=d(r.palette[T*3+0],r.palette[P*3+0],R),h[x+1]=d(r.palette[T*3+1],r.palette[P*3+1],R),h[x+2]=d(r.palette[T*3+2],r.palette[P*3+2],R)}function g(f){const x=f*3;r.normal_cache[x]===0&&(r.normal_cache[x+0]=r.field[f-1]-r.field[f+1],r.normal_cache[x+1]=r.field[f-r.yd]-r.field[f+r.yd],r.normal_cache[x+2]=r.field[f-r.zd]-r.field[f+r.zd])}function v(f,x,w,y,k){const S=y+1,b=y+r.yd,A=y+r.zd,T=S+r.yd,P=S+r.zd,R=y+r.yd+r.zd,_=S+r.yd+r.zd;let D=0;const F=r.field[y],E=r.field[S],N=r.field[b],L=r.field[T],U=r.field[A],V=r.field[P],W=r.field[R],j=r.field[_];F<k&&(D|=1),E<k&&(D|=2),N<k&&(D|=8),L<k&&(D|=4),U<k&&(D|=16),V<k&&(D|=32),W<k&&(D|=128),j<k&&(D|=64);const H=xr[D];if(H===0)return 0;const tt=r.delta,ht=f+tt,dt=x+tt,q=w+tt;H&1&&(g(y),g(S),p(y*3,0,k,f,x,w,F,E,y,S)),H&2&&(g(S),g(T),m(S*3,3,k,ht,x,w,E,L,S,T)),H&4&&(g(b),g(T),p(b*3,6,k,f,dt,w,N,L,b,T)),H&8&&(g(y),g(b),m(y*3,9,k,f,x,w,F,N,y,b)),H&16&&(g(A),g(P),p(A*3,12,k,f,x,q,U,V,A,P)),H&32&&(g(P),g(_),m(P*3,15,k,ht,x,q,V,j,P,_)),H&64&&(g(R),g(_),p(R*3,18,k,f,dt,q,W,j,R,_)),H&128&&(g(A),g(R),m(A*3,21,k,f,x,q,U,W,A,R)),H&256&&(g(y),g(A),u(y*3,24,k,f,x,w,F,U,y,A)),H&512&&(g(S),g(P),u(S*3,27,k,ht,x,w,E,V,S,P)),H&1024&&(g(T),g(_),u(T*3,30,k,ht,dt,w,L,j,T,_)),H&2048&&(g(b),g(R),u(b*3,33,k,f,dt,w,N,W,b,R)),D<<=4;let et,rt,nt,bt=0,kt=0;for(;_o[D+kt]!=-1;)et=D+kt,rt=et+1,nt=et+2,M(c,l,h,3*_o[et],3*_o[rt],3*_o[nt]),kt+=3,bt++;return bt}function M(f,x,w,y,k,S){const b=r.count*3;if(r.positionArray[b+0]=f[y],r.positionArray[b+1]=f[y+1],r.positionArray[b+2]=f[y+2],r.positionArray[b+3]=f[k],r.positionArray[b+4]=f[k+1],r.positionArray[b+5]=f[k+2],r.positionArray[b+6]=f[S],r.positionArray[b+7]=f[S+1],r.positionArray[b+8]=f[S+2],r.material.flatShading===!0){const A=(x[y+0]+x[k+0]+x[S+0])/3,T=(x[y+1]+x[k+1]+x[S+1])/3,P=(x[y+2]+x[k+2]+x[S+2])/3;r.normalArray[b+0]=A,r.normalArray[b+1]=T,r.normalArray[b+2]=P,r.normalArray[b+3]=A,r.normalArray[b+4]=T,r.normalArray[b+5]=P,r.normalArray[b+6]=A,r.normalArray[b+7]=T,r.normalArray[b+8]=P}else r.normalArray[b+0]=x[y+0],r.normalArray[b+1]=x[y+1],r.normalArray[b+2]=x[y+2],r.normalArray[b+3]=x[k+0],r.normalArray[b+4]=x[k+1],r.normalArray[b+5]=x[k+2],r.normalArray[b+6]=x[S+0],r.normalArray[b+7]=x[S+1],r.normalArray[b+8]=x[S+2];if(r.enableUvs){const A=r.count*2;r.uvArray[A+0]=f[y+0],r.uvArray[A+1]=f[y+2],r.uvArray[A+2]=f[k+0],r.uvArray[A+3]=f[k+2],r.uvArray[A+4]=f[S+0],r.uvArray[A+5]=f[S+2]}r.enableColors&&(r.colorArray[b+0]=w[y+0],r.colorArray[b+1]=w[y+1],r.colorArray[b+2]=w[y+2],r.colorArray[b+3]=w[k+0],r.colorArray[b+4]=w[k+1],r.colorArray[b+5]=w[k+2],r.colorArray[b+6]=w[S+0],r.colorArray[b+7]=w[S+1],r.colorArray[b+8]=w[S+2]),r.count+=3}this.addBall=function(f,x,w,y,k,S){const b=Math.sign(y);y=Math.abs(y);const A=S!=null;let T=new O(f,x,w);if(A)try{T=S instanceof O?S:Array.isArray(S)?new O(Math.min(Math.abs(S[0]),1),Math.min(Math.abs(S[1]),1),Math.min(Math.abs(S[2]),1)):new O(S)}catch{T=new O(f,x,w)}const P=this.size*Math.sqrt(y/k),R=w*this.size,_=x*this.size,D=f*this.size;let F=Math.floor(R-P);F<1&&(F=1);let E=Math.floor(R+P);E>this.size-1&&(E=this.size-1);let N=Math.floor(_-P);N<1&&(N=1);let L=Math.floor(_+P);L>this.size-1&&(L=this.size-1);let U=Math.floor(D-P);U<1&&(U=1);let V=Math.floor(D+P);V>this.size-1&&(V=this.size-1);let W,j,H,tt,ht,dt,q,et,rt,nt,bt;for(H=F;H<E;H++)for(ht=this.size2*H,et=H/this.size-w,rt=et*et,j=N;j<L;j++)for(tt=ht+this.size*j,q=j/this.size-x,nt=q*q,W=U;W<V;W++)if(dt=W/this.size-f,bt=y/(1e-6+dt*dt+nt+rt)-k,bt>0){this.field[tt+W]+=bt*b;const kt=Math.sqrt((W-D)*(W-D)+(j-_)*(j-_)+(H-R)*(H-R))/P,z=1-kt*kt*kt*(kt*(kt*6-15)+10);this.palette[(tt+W)*3+0]+=T.r*z,this.palette[(tt+W)*3+1]+=T.g*z,this.palette[(tt+W)*3+2]+=T.b*z}},this.addPlaneX=function(f,x){const w=this.size,y=this.yd,k=this.zd,S=this.field;let b,A,T,P,R,_,D,F=w*Math.sqrt(f/x);for(F>w&&(F=w),b=0;b<F;b++)if(_=b/w,P=_*_,R=f/(1e-4+P)-x,R>0)for(A=0;A<w;A++)for(D=b+A*y,T=0;T<w;T++)S[k*T+D]+=R},this.addPlaneY=function(f,x){const w=this.size,y=this.yd,k=this.zd,S=this.field;let b,A,T,P,R,_,D,F,E=w*Math.sqrt(f/x);for(E>w&&(E=w),A=0;A<E;A++)if(_=A/w,P=_*_,R=f/(1e-4+P)-x,R>0)for(D=A*y,b=0;b<w;b++)for(F=D+b,T=0;T<w;T++)S[k*T+F]+=R},this.addPlaneZ=function(f,x){const w=this.size,y=this.yd,k=this.zd,S=this.field;let b,A,T,P,R,_,D,F,E=w*Math.sqrt(f/x);for(E>w&&(E=w),T=0;T<E;T++)if(_=T/w,P=_*_,R=f/(1e-4+P)-x,R>0)for(D=k*T,A=0;A<w;A++)for(F=D+A*y,b=0;b<w;b++)S[F+b]+=R},this.setCell=function(f,x,w,y){const k=this.size2*w+this.size*x+f;this.field[k]=y},this.getCell=function(f,x,w){const y=this.size2*w+this.size*x+f;return this.field[y]},this.blur=function(f=1){const x=this.field,w=x.slice(),y=this.size,k=this.size2;for(let S=0;S<y;S++)for(let b=0;b<y;b++)for(let A=0;A<y;A++){const T=k*A+y*b+S;let P=w[T],R=1;for(let _=-1;_<=1;_+=2){const D=_+S;if(!(D<0||D>=y))for(let F=-1;F<=1;F+=2){const E=F+b;if(!(E<0||E>=y))for(let N=-1;N<=1;N+=2){const L=N+A;if(L<0||L>=y)continue;const U=k*L+y*E+D,V=w[U];R++,P+=f*(V-P)/R}}}x[T]=P}},this.reset=function(){for(let f=0;f<this.size3;f++)this.normal_cache[f*3]=0,this.field[f]=0,this.palette[f*3]=this.palette[f*3+1]=this.palette[f*3+2]=0},this.update=function(){this.count=0;const f=this.size-2;for(let x=1;x<f;x++){const w=this.size2*x,y=(x-this.halfsize)/this.halfsize;for(let k=1;k<f;k++){const S=w+this.size*k,b=(k-this.halfsize)/this.halfsize;for(let A=1;A<f;A++){const T=(A-this.halfsize)/this.halfsize,P=S+A;v(T,b,y,P,this.isolation)}}}this.geometry.setDrawRange(0,this.count),i.getAttribute("position").needsUpdate=!0,i.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(i.getAttribute("uv").needsUpdate=!0),this.enableColors&&(i.getAttribute("color").needsUpdate=!0),this.count/3>a&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(t)}}const xr=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),_o=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]),oe=(o,t,e,n,s,a,i)=>Math.sqrt((o-n)*(o-n)+(t-s)*(t-s)+(e-a)*(e-a))-i;function ot(o,t,e,n,s,a,i,r,c){const l=o-n,h=t-s,d=e-a,p=Math.sqrt((l/i)**2+(h/r)**2+(d/c)**2),m=Math.sqrt((l/(i*i))**2+(h/(r*r))**2+(d/(c*c))**2);return m<1e-9?-Math.min(i,r,c):p*(p-1)/m}function at(o,t,e,n,s,a,i,r,c,l,h){const d=o-n,p=t-s,m=e-a,u=i-n,g=r-s,v=c-a,M=Math.min(1,Math.max(0,(d*u+p*g+m*v)/(u*u+g*g+v*v))),f=d-u*M,x=p-g*M,w=m-v*M;return Math.sqrt(f*f+x*x+w*w)-(l+(h-l)*M)}function Oe(o,t,e,n,s,a,i,r){const c=Math.sqrt((o-n)*(o-n)+(e-a)*(e-a))-i,l=t-s;return Math.sqrt(c*c+l*l)-r}function Kt(o,t,e,n,s,a,i,r,c,l=0){const h=Math.abs(o-n)-i+l,d=Math.abs(t-s)-r+l,p=Math.abs(e-a)-c+l,m=Math.max(h,0),u=Math.max(d,0),g=Math.max(p,0);return Math.sqrt(m*m+u*u+g*g)+Math.min(Math.max(h,d,p),0)-l}function I(o,t,e){const n=Math.max(e-Math.abs(o-t),0)/e;return Math.min(o,t)-n*n*e*.25}function Ft(o,t,e){const n=Math.max(e-Math.abs(o-t),0)/e;return Math.max(o,t)+n*n*e*.25}function Ht(o,t,e,n,s={}){const a=new pr(n,new w0,!1,!1,s.maxTris??9e4);a.isolation=0;const i=a.field,r=n/2,c=s.boundR!==void 0?s.boundR*s.boundR:1/0;let l=0;for(let u=0;u<n;u++){const g=t[2]+(u-r)/r*e;for(let v=0;v<n;v++){const M=t[1]+(v-r)/r*e;for(let f=0;f<n;f++){const x=t[0]+(f-r)/r*e,w=x-t[0],y=M-t[1],k=g-t[2];w*w+y*y+k*k>c?i[l++]=-1:i[l++]=-o(x,M,g)/e}}}a.update();const h=a.count,d=new Float32Array(h*3),p=new Float32Array(h*3);for(let u=0;u<h*3;u+=3){d[u]=t[0]+a.positionArray[u]*e,d[u+1]=t[1]+a.positionArray[u+1]*e,d[u+2]=t[2]+a.positionArray[u+2]*e;const g=a.normalArray[u],v=a.normalArray[u+1],M=a.normalArray[u+2],f=Math.sqrt(g*g+v*v+M*M)||1;p[u]=g/f,p[u+1]=v/f,p[u+2]=M/f}a.geometry.dispose();const m=new Et;return m.setAttribute("position",new ct(d,3)),m.setAttribute("normal",new ct(p,3)),m}function co(o){const t=o.attributes.position.array,e=o.attributes.normal.array,n=t.length/3,s=new Float32Array(t.length),a=new Float32Array(e.length);for(let r=0;r<n;r+=3)for(let c=0;c<3;c++){const l=(r+c)*3,h=(r+(c===1?2:c===2?1:0))*3;s[h]=-t[l],s[h+1]=t[l+1],s[h+2]=t[l+2],a[h]=-e[l],a[h+1]=e[l+1],a[h+2]=e[l+2]}const i=new Et;return i.setAttribute("position",new ct(s,3)),i.setAttribute("normal",new ct(a,3)),i}function gr(o){const t=o.attributes.position,e=new Float32Array(t.count*3),n=(s,a)=>Math.max(0,1-s/a)**1.5;for(let s=0;s<t.count;s++){const a=Math.abs(t.getX(s)),i=t.getY(s),r=t.getZ(s);let c=1,l=1,h=1;const d=(p,m,u,g)=>{c+=(m-c)*p,l+=(u-l)*p,h+=(g-h)*p};if(r>.06){const p=n(Math.sqrt((a/.024)**2+((i-.132)/.0105)**2),1);d(p*.52,.98,.77,.75),d(n(Math.hypot(a-.047,i-.158,r-.065),.034)*.24,1,.88,.86),d(n(Math.hypot(a-.034,(i-.2)*1.25,r-.075),.03)*.16,.91,.84,.82),d(n(Math.hypot(a-.034,i-.18,r-.075),.014)*.045,.97,.91,.91),d(n(Math.hypot(a-.0066,i-.15,r-.099),.009)*.35,.68,.53,.51),d(n(Math.hypot(a,i-.158,r-.108),.012)*.18,1,.88,.86)}e[s*3]=c,e[s*3+1]=l,e[s*3+2]=h}return o.setAttribute("color",new ct(e,3)),o}function fs(o=1){return gr(Ht((e,n,s)=>{const a=Math.abs(e);let i=ot(a,n,s,0,.217,-.018,.074,.09,.098);return i=I(i,ot(a,n,s,0,.187,.02,.06,.076,.068),.052),i=I(i,at(a,n,s,.042,.15,-.014,0,.116,.059,.0115,.0105),.038),i=I(i,oe(a,n,s,0,.113,.06,.019),.03),i=I(i,oe(a,n,s,.048,.178,.043,.0145),.04),i=I(i,ot(a,n,s,.04,.16,.045,.012,.014,.011),.04),i=I(i,at(a,n,s,0,.212,.078,.046,.207,.069,.0115,.0105),.02),i=I(i,at(a,n,s,0,.207,.081,0,.168,.092,.0065,.008),.018),i=I(i,oe(a,n,s,0,.16,.094,.009),.014),i=I(i,oe(a,n,s,.0095,.156,.091,.0065),.01),i=I(i,at(a,n,s,0,.095,-.016,0,0,-.004,.037,.044),.04),i=I(i,oe(a,n,s,0,.07,.04,.0045),.012),i=I(i,ot(a,n,s,.0775,.191,-.012,.0085,.034,.022),.012),i=I(i,at(a,n,s,0,.1372,.0792,.019,.1338,.0725,.0055,.0045),.009),i=I(i,oe(a,n,s,.0042,.1376,.0805,.0036),.005),i=I(i,at(a,n,s,0,.1222,.0765,.016,.1242,.0705,.006,.005),.009),i=Ft(i,-ot(a,n,s,.034,.2,.083,.021,.016,.02),.012),i=Ft(i,-oe(a,n,s,.0066,.149,.097,.0042),.003),i=Ft(i,-ot(a,n,s,0,.13,.082,.019,7e-4,.011),.002),i=Ft(i,-at(a,n,s,.003,.148,.095,.003,.141,.09,9e-4,9e-4),.002),i=Ft(i,-at(a,n,s,.022,.15,.078,.028,.128,.07,.0012,.001),.005),i=I(i,oe(a,n,s,.05,.15,-.012,.012),.04),i=I(i,at(a,n,s,.044,.118,-.032,.02,0,.016,.014,.014),.04),i=Ft(i,-ot(a,n,s,.085,.19,-.008,.008,.02,.011),.006),i=I(i,ot(a,n,s,.034,.2135,.0745,.0165,.0065,.0115),.006),i=I(i,ot(a,n,s,.034,.1865,.0745,.0155,.004,.01),.005),i},[0,.16,.02],.2,Math.max(24,Math.round(84*o)),{boundR:.26}))}function ds(o=1){const t=(n,s,a,i,r,c,l)=>{let h=1e9,d=0,p=-.082,m=i,u=0;const g=[r*.5,r*.32,r*.24],v=[c,c*.88,c*.78];for(let M=0;M<3;M++){u+=l*(M===0?.55:1);const f=d-Math.sin(u)*g[M],x=p-Math.cos(u)*g[M];h=Math.min(h,at(n,s,a,d,p,m,f,x,m,v[M],v[Math.min(M+1,2)]*.96)),d=f,p=x}return h};return Ht((n,s,a)=>{let i=Kt(n,s,a,0,-.044,0,.014,.036,.036,.011);i=I(i,at(n,s,a,0,.012,0,0,-.02,0,.021,.026),.02),i=I(i,ot(n,s,a,-.004,-.032,.03,.014,.024,.013),.015);const r=.52;return i=I(i,t(n,s,a,.027,.074,.0088,r),.006),i=I(i,t(n,s,a,.009,.082,.0091,r+.03),.006),i=I(i,t(n,s,a,-.009,.076,.0086,r+.06),.006),i=I(i,t(n,s,a,-.026,.06,.0078,r+.1),.006),i=I(i,at(n,s,a,-.004,-.04,.034,-.012,-.066,.046,.0108,.0092),.01),i=I(i,at(n,s,a,-.012,-.066,.046,-.02,-.086,.05,.0092,.0078),.008),i},[-.02,-.07,.005],.1,Math.max(24,Math.round(64*o)),{boundR:.13})}function vr(o,t){return o===1?t:co(t)}function z0(o,t,e){const n=Math.abs(o);let s=ot(n,t,e,0,1.33,0,.143,.17,.096);s=I(s,ot(n,t,e,.055,1.31,.028,.073,.061,.071),.055),s=I(s,ot(n,t,e,0,1.14,0,.126,.17,.09),.075),s=I(s,ot(n,t,e,0,.97,-.004,.145,.13,.104),.075),s=I(s,at(n,t,e,.018,1.475,-.01,.145,1.355,-.002,.035,.04),.068),s=I(s,ot(n,t,e,.145,1.35,0,.042,.056,.055),.052),s=I(s,at(n,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),s=I(s,Oe(n,t,e,0,1.525,0,.074,.026),.02),s=I(s,Kt(n,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),s=Ft(s,.88-t,.03),s=Ft(s,-at(n,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return s+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),s}function ms(o=1){return Ht(z0,[0,1.22,-.005],.5,Math.max(24,Math.round(92*o)),{boundR:.55,maxTris:16e4})}function wr(){const o=(e,n,s)=>Math.abs(z0(e,n,s)-.0075)-.0075;return Ht((e,n,s)=>{const a=Math.abs(e),i=Kt(a,n,s,.04,1.335,.058,.04,.006,.11,.003),r=Math.abs(n-1.045)-.017,c=Math.min(i,r);return Math.max(o(e,n,s),c)},[0,1.25,-.005],.4,100,{boundR:.46,maxTris:12e4})}function Mr(){const o=(e,n,s)=>Math.abs(z0(e,n,s)-.006)-.006;return Ht((e,n,s)=>Math.max(o(e,n,s),Kt(e,n,s,0,1.2,.12,.0055,.265,.1,.002)),[0,1.2,.08],.3,80,{boundR:.34,maxTris:4e4})}function ps(o=1){return Ht((e,n,s)=>{let a=at(e,n,s,0,0,0,0,-.28,0,.052,.044);a=I(a,oe(e,n,s,0,.005,0,.052),.024),a=I(a,ot(e,n,s,.004,-.045,0,.052,.072,.053),.035),a=I(a,ot(e,n,s,0,-.13,.011,.048,.09,.046),.03);const i=Math.atan2(s,e);return a+=(Math.sin(i*6+n*17)*.5+Math.sin(i*3-n*9)*.3)*.0028,a},[0,-.14,0],.23,Math.max(24,Math.round(60*o)),{boundR:.3})}function xs(o=1){return Ht((e,n,s)=>{let a=at(e,n,s,0,0,0,0,-.255,0,.046,.039);a=I(a,ot(e,n,s,0,-.07,.004,.05,.095,.046),.03),a=I(a,Oe(e,n,s,0,-.246,0,.039,.0092),.01);const i=Math.atan2(s,e);return a+=(Math.sin(i*5+n*21)*.5+Math.sin(i*9-n*11)*.3)*.0026*(n>-.2?1:.4),a},[0,-.13,0],.21,Math.max(24,Math.round(56*o)),{boundR:.24})}function gs(o=1){return Ht((e,n,s)=>{let a=at(e,n,s,0,0,0,0,-.42,0,.108,.074);a=I(a,ot(e,n,s,0,-.16,.02,.1,.17,.095),.05),a=I(a,ot(e,n,s,0,-.1,-.035,.092,.12,.085),.05);const i=Math.atan2(s,e);return a+=(Math.sin(i*6+n*15)*.5+Math.sin(i*3-n*8+2.1)*.35)*.0034,a+=Math.max(0,Math.sin(n*70+1.1))*.0018*(n<-.3?1:0),a},[0,-.2,0],.28,Math.max(24,Math.round(60*o)),{boundR:.34})}function vs(o=1){return Ht((e,n,s)=>{let a=at(e,n,s,0,0,0,0,-.26,0,.074,.058);a=I(a,ot(e,n,s,0,-.1,-.03,.06,.12,.06),.04),a=I(a,Oe(e,n,s,0,-.232,0,.063,.014),.012),a=I(a,Oe(e,n,s,0,-.215,0,.066,.012),.01);const i=Math.atan2(s,e);return a+=(Math.sin(i*5+n*19)*.5+Math.sin(i*8-n*9)*.3)*.0028,a},[0,-.13,0],.22,Math.max(24,Math.round(56*o)),{boundR:.26})}function ws(o=1){return Ht((e,n,s)=>{const a=Math.abs(e);let i=at(a,n,s,0,-.17,0,0,-.39,.012,.06,.058);i=I(i,ot(a,n,s,0,-.432,-.04,.046,.042,.048),.03),i=I(i,ot(a,n,s,0,-.436,.03,.05,.04,.085),.03),i=I(i,ot(a,n,s,0,-.446,.12,.051,.034,.062),.03),i=I(i,Oe(a,n,s,0,-.285,0,.059,.011),.01);const r=Kt(a,n-Math.max(0,s-.11)*.18,s,0,-.468,.062,.06,.02,.148,.014);return i=I(i,r,.008),i+=Math.max(0,Math.sin(s*120))*.0012*(n<-.482?1:0),i},[0,-.36,.04],.24,Math.max(24,Math.round(80*o)),{boundR:.28})}function g0(o=1,t="short"){const e=t==="long",n=h=>Math.min(1,Math.max(0,h)),s=[[-.052,.261,.064,-.058,.239,.084],[-.036,.265,.07,-.045,.234,.091],[-.019,.267,.073,-.023,.239,.094],[0,.267,.075,.007,.231,.095],[.02,.266,.071,.03,.238,.092],[.039,.263,.067,.05,.241,.086],[.053,.258,.062,.06,.244,.08]],r=Ht((h,d,p)=>{const m=Math.abs(h);let u=ot(m,d,p,0,.221,-.018,.0855,.099,.106);u=I(u,ot(m,d,p,0,.205,-.055,.078,.088,.07),.02),e&&(u=I(u,at(m,d,p,0,.17,-.078,0,-.04,-.09,.072,.06),.05));const g=.262-.05*(m/.08)*(m/.08),v=n((p+.01)/.03);u=Ft(u,(g-d)*v-(1-v)*.5,.014),u=Ft(u,-ot(m,d,p,.079,.191,-.012,.022,.044,.034),.01),u=Ft(u,(e?-.07:.158)-d,.014);for(const f of s)u=I(u,at(h,d,p,f[0],f[1],f[2],f[3],f[4],f[5],.006,.0028),.005);const M=Math.atan2(h,p);return u+=.0012*Math.sin(M*80+Math.sin(d*45)*2.2),u},e?[0,.1,-.04]:[0,.19,-.015],e?.24:.15,Math.max(24,Math.round(80*o)),{boundR:e?.3:.2}),c=r.attributes.position,l=new Float32Array(c.count*3);for(let h=0;h<c.count;h++){const d=c.getX(h),p=c.getY(h),m=c.getZ(h),u=Math.atan2(d,m),g=Math.sin(u*70+Math.sin(p*45)*2.2)*.5+.5,v=Math.sin(u*9+p*22)*.5+.5,M=.55+g*.45+v*.25+Math.max(0,p-.28)*2.2;l[h*3]=.075*M,l[h*3+1]=.05*M,l[h*3+2]=.034*M}return r.setAttribute("color",new ct(l,3)),r}function yr(o=1){return Ht((e,n,s)=>{const a=Math.abs(e);let i=Kt(a,n,s,0,1.3,-.165,.122,.182,.072,.05);return i=I(i,Kt(a,n,s,0,1.46,-.168,.116,.036,.08,.03),.012),i=I(i,Kt(a,n,s,0,1.425,-.092,.118,.012,.012,.006),.008),i=I(i,Kt(a,n,s,0,1.19,-.235,.095,.07,.024,.02),.012),i=I(i,at(a,n,s,.14,1.14,-.165,.14,1.27,-.165,.03,.028),.01),i=I(i,at(a,n,s,-.11,1.1,-.18,.11,1.1,-.18,.034,.034),.01),i+=.0016*Math.exp(-(((a-.07)/.003)**2))*(n>1.1?1:0),i=Ft(i,-Kt(a,n,s,0,1.2,-.285,.003,.07,.01,.001),.001),i},[0,1.25,-.17],.3,Math.max(24,Math.round(88*o)),{boundR:.4,maxTris:9e4})}const br=`
varying vec3 vAvLoc;
varying mat3 vAvNM;
float avH(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float avN(vec3 x) {
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(avH(i), avH(i + vec3(1, 0, 0)), f.x), mix(avH(i + vec3(0, 1, 0)), avH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(avH(i + vec3(0, 0, 1)), avH(i + vec3(1, 0, 1)), f.x), mix(avH(i + vec3(0, 1, 1)), avH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,kr={fabric:{fine:260,mid:48,weave:1,bump:4e-4,tone:.06,rough:.1},leather:{fine:210,mid:34,weave:0,bump:.0012,tone:.1,rough:.16},skin:{fine:330,mid:70,weave:0,bump:22e-5,tone:.025,rough:.06},metal:{fine:420,mid:22,weave:0,bump:6e-4,tone:.1,rough:.12}};function $t(o,t){const e=kr[t];return o.onBeforeCompile=n=>{n.vertexShader=`varying vec3 vAvLoc;
varying mat3 vAvNM;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vAvLoc = position;
 vAvNM = normalMatrix;`);const s=t==="metal"?`avN(vec3(p.x * ${e.fine.toFixed(1)}, p.y * 6.0, p.z * ${e.fine.toFixed(1)})) * 0.5 + avN(p * ${e.mid.toFixed(1)}) * 0.5`:`avN(p * ${e.mid.toFixed(1)}) * 0.55 + avN(p * ${e.fine.toFixed(1)}) * 0.45${e.weave?" + (sin(p.x * 520.0) * sin(p.y * 520.0) + sin(p.y * 520.0 + 1.0) * sin(p.z * 520.0)) * 0.12":""}`;n.fragmentShader=br+`float avHeight(vec3 p) { return ${s}; }
`+n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float avT = avN(vAvLoc * ${e.mid.toFixed(1)} * 0.6);
         diffuseColor.rgb *= 1.0 + (avT - 0.5) * ${(e.tone*2).toFixed(3)};`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
         roughnessFactor = clamp(roughnessFactor + (avT - 0.5) * ${(e.rough*2).toFixed(3)}, 0.05, 1.0);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
         {
           float avFade = 1.0 - smoothstep(0.004, 0.03, length(fwidth(vAvLoc)));
           if (avFade > 0.01) {
             const float aE = 0.0008;
             vec3 p0 = vAvLoc;
             float h0 = avHeight(p0);
             vec3 g = vec3(avHeight(p0 + vec3(aE, 0.0, 0.0)) - h0, avHeight(p0 + vec3(0.0, aE, 0.0)) - h0, avHeight(p0 + vec3(0.0, 0.0, aE)) - h0) / aE;
             vec3 gv = vAvNM * g;
             gv -= normal * dot(gv, normal);
             normal = normalize(normal - gv * ${e.bump.toFixed(4)} * avFade);
           }
         }`).replace("#include <opaque_fragment>",`${t==="skin"?`{
           // 皮肤次表面散射近似：掠射角处偏暖红的透光边缘
           float avF = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.6);
           outgoingLight += vec3(0.3, 0.09, 0.05) * avF * 0.1;
         }`:""}
         #include <opaque_fragment>`)},o.customProgramCacheKey=()=>`avatar-${t}-${o.vertexColors?"vc":"plain"}`,o.needsUpdate=!0,o}function Sr(){const o=(e,n,s=.02,a={})=>new it({color:e,roughness:n,metalness:s,...a});return{jacket:$t(o(4147772,.84,0,{side:ft}),"fabric"),inner:$t(o(15526626,.9,0,{side:ft}),"fabric"),trousers:$t(o(3425628,.88),"fabric"),skin:$t(o(14858392,.55,0,{emissive:3806728,emissiveIntensity:.05}),"skin"),skinFace:$t(o(14858392,.5,0,{emissive:3806728,emissiveIntensity:.05,vertexColors:!0}),"skin"),leather:$t(o(7030320,.62,.04),"leather"),leatherDark:$t(o(4139549,.66,.04),"leather"),boot:$t(o(7031344,.6,.05),"leather"),sole:o(1775637,.9),hair:new it({color:16777215,vertexColors:!0,roughness:.42,metalness:.15,side:ft}),brow:o(3811356,.7),trim:o(13214282,.4,.75,{emissive:5913096,emissiveIntensity:.18}),scarf:$t(o(10238510,.9,0,{side:ft}),"fabric"),brass:$t(o(11962940,.34,.85),"metal"),armor:Object.assign(new Re({color:1845043,roughness:.38,metalness:.6,clearcoat:.7,clearcoatRoughness:.25}),{}),eyeWhite:new Re({color:15986410,roughness:.22,clearcoat:.9,clearcoatRoughness:.08}),lip:o(10113096,.46),tunicVc:$t(o(16777215,.84,0,{vertexColors:!0,side:ft}),"fabric"),paper:o(16769696,.5,0,{emissive:16753978,emissiveIntensity:1,transparent:!0,opacity:.92})}}class xo{constructor(){B(this,"b",new hs)}add(t,e,n={}){this.b.add(t,e,n)}box(t,e,n,s,a={},i=.01){this.b.add(new pe(e,n,s,2,Math.min(i,e/2.05,n/2.05,s/2.05)),t,a)}cyl(t,e,n,s,a={},i=16){this.b.add(new Rt(e,n,s,i,1),t,a)}ball(t,e,n={},s=14){this.b.add(new mt(e,s,Math.max(8,s-4)),t,n)}torus(t,e,n,s={},a=Math.PI*2,i=22){this.b.add(new Pt(e,n,8,i,a),t,s)}build(t,e){this.b.build(t,e,{})}}function Le(o,t,e){const n=new xt;return n.position.set(o,t,e),n}function Ar(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d"),n=Vt(77);e.fillStyle="#2a1a10",e.fillRect(0,0,256,256);const s=256/2,a=e.createRadialGradient(s,s,256*.08,s,s,256*.5);a.addColorStop(0,"#5a3a1f"),a.addColorStop(.55,"#8a5a2c"),a.addColorStop(.88,"#3a2412"),a.addColorStop(1,"#150c06"),e.fillStyle=a,e.beginPath(),e.arc(s,s,256*.5,0,Math.PI*2),e.fill();for(let r=0;r<220;r++){const c=n()*Math.PI*2,l=256*(.1+n()*.08),h=256*(.28+n()*.2);e.strokeStyle=`rgba(${n()>.5?"190,140,80":"60,36,18"},${.12+n()*.25})`,e.lineWidth=1+n()*1.4,e.beginPath(),e.moveTo(s+Math.cos(c)*l,s+Math.sin(c)*l),e.lineTo(s+Math.cos(c+(n()-.5)*.12)*h,s+Math.sin(c+(n()-.5)*.12)*h),e.stroke()}e.fillStyle="#060403",e.beginPath(),e.arc(s,s,256*.115,0,Math.PI*2),e.fill();const i=new Bn(t);return i.colorSpace=Ho,i}let pn;function xn(o,t){const e=new K(new mt(.0115,20,14),o.eyeWhite);e.position.set(t*.034,.2,.062),e.scale.set(1,.94,1),pn??(pn=Ar());const n=new xt;n.position.z=.0112;const s=new K(new $o(.0072,28),new it({map:pn,roughness:.28,metalness:0}));s.position.set(0,0,.002);const a=new K(new mt(.0072,18,12,0,Math.PI*2,0,Math.PI*.5),new Re({color:16777215,roughness:.02,metalness:0,transparent:!0,opacity:.16,clearcoat:1,clearcoatRoughness:.02}));a.rotation.x=Math.PI/2,a.position.set(0,0,5e-4);const i=(h,d)=>new mt(.0139,22,10,0,Math.PI*2,h,d-h),r=new K(i(0,Math.PI*.45),o.skin),c=new K(i(Math.PI*.86,Math.PI),o.skin),l=new K(new Pt(.0132,6e-4,4,18,Math.PI*.85),o.brow);return l.rotation.set(0,0,Math.PI*.075),l.position.set(0,0,0),l.scale.set(1,1,.5),l.rotation.x=-.38,l.position.set(0,.004,.0058),n.add(s,a),e.add(n,r,c,l),{eye:e,gaze:n}}function Tr(o,t){const e=Le(0,1.5,0),n=new K(fs(),o.skinFace);n.castShadow=!0,e.add(n);const s=xn(o,1),a=xn(o,-1),i=[];for(const p of[-1,1]){const m=new Yo([new C(p*.016,-.001,0),new C(p*.034,.004,.003),new C(p*.052,.002,0),new C(p*.062,-.005,-.006)]),u=new Ko(m,10,.0032,6,!1);u.scale(1,.7,.55),i.push(u)}const r=.2165,c=new K(Lt(i.map(p=>{const m=p.toNonIndexed();return m.deleteAttribute("uv"),m})),o.brow);c.position.set(0,r,.0925),c.rotation.x=-.1;const l=.132,h=new K(new m0(.0026,.03,3,8),o.lip);h.rotation.z=Math.PI/2,h.scale.set(1,1,.6),h.position.set(0,l,.0875);const d=new K(g0(),o.hair);return d.castShadow=!0,e.add(s.eye,a.eye,c,h,d),t.eyeL=s.eye,t.eyeR=a.eye,t.gazeL=s.gaze,t.gazeR=a.gaze,t.brow=c,t.mouth=h,{head:e,browY:r,mouthY:l}}let lt={};function gn(o,t){const e=new xt;lt.upper??(lt.upper=ps()),lt.lower??(lt.lower=xs()),lt.hand??(lt.hand=ds());const n=l=>t===1?l:co(l),s=new K(n(lt.upper),o.jacket);s.castShadow=!0,e.add(s);const a=Le(0,-.28,0);a.rotation.x=-.22,e.add(a),e.userData.elbow=a;const i=new K(n(lt.lower),o.jacket);i.castShadow=!0,a.add(i);const r=Le(0,-.27,0);r.rotation.z=t*.04;const c=new K(vr(t,lt.hand),o.skin);if(c.castShadow=!0,r.add(c),t===1){const l=new xo;l.box(o.leatherDark,.026,.155,.115,{x:-.044,y:-.108,z:.02,rz:-.06},.006),l.box(o.inner,.016,.146,.104,{x:-.034,y:-.108,z:.02,rz:-.06},.003),l.box(o.brass,.03,.15,.008,{x:-.044,y:-.108,z:-.036,rz:-.06},.003),l.build(r,"notebook")}return a.add(r),e}function vn(o,t){const e=new xt;lt.thigh??(lt.thigh=gs()),lt.shin??(lt.shin=vs()),lt.boot??(lt.boot=ws());const n=new K(lt.thigh.clone(),o.trousers);n.castShadow=!0,e.add(n);const s=Le(0,-.42,0);e.add(s);const a=new K(lt.shin.clone(),o.trousers);a.castShadow=!0,s.add(a);const i=Le(0,-.43,0);s.add(i);const r=lt.boot.clone();r.translate(0,.43,0);const c=new K(r,o.boot);c.castShadow=!0,i.add(c);const l=new xo;for(let h=0;h<5;h++)l.box(o.inner,.056,.005,.005,{y:.032-h*.002,z:.052+h*.016,rx:-.4},.002),l.ball(o.brass,.0036,{x:.03,y:.035-h*.002,z:.052+h*.016},6),l.ball(o.brass,.0036,{x:-.03,y:.035-h*.002,z:.052+h*.016},6);return l.build(i,"laces"),{hip:e,knee:s,ankle:i}}function Pr(o){const t=new K(ms(),o.jacket);return t.castShadow=!0,t}function Rr(o){const t=new xo;t.box(o.trousers,.35,.2,.21,{y:.97},.06),t.box(o.brass,.034,.028,.012,{y:1.04,z:.14},.004),t.torus(o.jacket,.085,.024,{y:1.51,rx:Math.PI/2,sx:1.06},Math.PI*2,26),t.torus(o.inner,.078,.014,{y:1.532,rx:Math.PI/2},Math.PI*2,26);for(const e of[-1,1])t.ball(o.brass,.0048,{x:e*.085,y:1.262,z:.112},6);return t.torus(o.scarf,.074,.032,{y:1.54,rx:Math.PI/2},Math.PI*2,26),t.torus(o.scarf,.082,.026,{y:1.51,rx:Math.PI/2-.12},Math.PI*2,26),t.ball(o.scarf,.044,{x:-.056,y:1.5,z:.075,sy:1.1,sz:.9},12),t}function _r(o){const t=Le(.07,1.48,-.08),e=new St(.15,.52,3,10);e.translate(0,-.26,0);const n=e.attributes.position;for(let i=0;i<n.count;i++){const r=n.getX(i),c=n.getY(i);n.setZ(i,Math.sin(r*60+c*8)*.008*(1+-c*1.5)- -c*.03)}e.computeVertexNormals();const s=new K(e,o.scarf);s.castShadow=!0;const a=new xo;for(let i=0;i<8;i++)a.cyl(o.scarf,.0016,.0016,.035,{x:-.066+i*.019,y:-.54,z:-.018},4);return a.build(t,"scarf-fringe"),t.add(s),t.rotation.x=.16,t}function Dr(o){const t=new xt,e=new xo;e.cyl(o.paper,.046,.04,.1,{y:0},6),e.cyl(o.brass,.06,.05,.016,{y:.058},6),e.add(new $e(.066,.05,6),o.brass,{y:.09}),e.cyl(o.brass,.05,.05,.014,{y:-.057},6);for(let s=0;s<6;s++){const a=s/6*Math.PI*2;e.cyl(o.brass,.0022,.0022,.1,{x:Math.cos(a)*.045,y:0,z:Math.sin(a)*.045},4)}e.torus(o.brass,.034,.0035,{y:.108},Math.PI,12),e.ball(o.brass,.008,{y:.122},8),e.build(t,"lantern");const n=new Wn(16757575,1.2,10);return t.add(n),t}function wc(){const o=new xt;o.name="Explorer";const t=Sr(),e=new xt;e.position.y=.98;const n=new xt;n.position.y=-.98,e.add(n),o.add(e),n.add(Pr(t));const s=new K(wr(),t.leatherDark);s.castShadow=!0;const a=new K(Mr(),t.brass),i=new K(yr(),t.leather);i.castShadow=!0,n.add(s,a,i),Rr(t).build(n,"torso");const r={},{head:c,browY:l,mouthY:h}=Tr(t,r);c.position.y-=.98,e.add(c);const d=_r(t);d.position.y-=.98,e.add(d);const p=vn(t);p.hip.position.set(.09,.91,0);const m=vn(t);m.hip.position.set(-.09,.91,0),o.add(p.hip,m.hip);const u=gn(t,1);u.position.set(.166,1.405-.98,0);const g=gn(t,-1);g.position.set(-.166,1.405-.98,0),u.rotation.z=.035,g.rotation.z=-.035,e.add(u,g);const v=Dr(t);v.name="ExplorerLantern",v.position.set(0,-.69,.1),g.add(v);const M=new K(new Gn(.5,.64,36),new w0({color:9684477,transparent:!0,opacity:.22,side:ft}));M.rotation.x=-Math.PI/2,M.position.y=.03,M.userData.isFootRing=!0,o.add(M);const f={leftLeg:p,rightLeg:m,spine:e,leftArm:u,rightArm:g,head:c,cape:d,eyeL:r.eyeL,eyeR:r.eyeR,gazeL:r.gazeL,gazeR:r.gazeR,brow:r.brow,mouth:r.mouth,faceRest:{browY:l,mouthY:h},mats:{jacket:t.jacket,trim:t.trim,cape:t.scarf}};return o.userData.rig=f,Un(o,{body:f.spine,bodyRestY:.98,head:f.head,leftArm:f.leftArm,rightArm:f.rightArm,leftElbow:f.leftArm.userData.elbow,rightElbow:f.rightArm.userData.elbow,leftHip:f.leftLeg.hip,rightHip:f.rightLeg.hip,leftKnee:f.leftLeg.knee,rightKnee:f.rightLeg.knee,leftAnkle:f.leftLeg.ankle,rightAnkle:f.rightLeg.ankle,blinkLeft:()=>1-f.eyeL.scale.y,blinkRight:()=>1-f.eyeR.scale.y,mouthOpen:()=>Math.max(0,f.mouth.scale.y-1)*.15,smile:()=>Math.max(0,f.mouth.scale.x-1)*.6,gazeX:()=>f.gazeL.position.x*80,gazeY:()=>f.gazeL.position.y*80}),o}function Ms(o){return[{off:-o-.55,lift:-.04,tone:.55},{off:-o-.18,lift:.1,tone:.78},{off:-o,lift:.17,tone:.95},{off:-o*.7,lift:.09,tone:1},{off:0,lift:.13,tone:1.06},{off:o*.7,lift:.09,tone:1},{off:o,lift:.17,tone:.95},{off:o+.18,lift:.1,tone:.78},{off:o+.55,lift:-.04,tone:.55}]}function Cr(o,t){const e=Ms(t);if(o<=e[0].off)return e[0].lift;for(let n=1;n<e.length;n++)if(o<=e[n].off){const s=e[n-1],a=e[n],i=(o-s.off)/(a.off-s.off||1);return s.lift+(a.lift-s.lift)*i}return e[e.length-1].lift}function Mc(o,t){const e=new xt;e.name="road";const n=t.width/2,s=new O(t.base),a=Ms(n),i=a.length,r=[],c=[],l=[],h=new C,d=new C,p=new O,m=new O(5208632);for(let M=0;M<=t.steps;M++){const f=M/t.steps;o.getPoint(f,h),o.getTangent(f,d);const x=-d.z,w=d.x,y=Math.hypot(x,w)||1;for(let k=0;k<i;k++){const{off:S,lift:b,tone:A}=a[k],T=h.x+x/y*S,P=h.z+w/y*S;r.push(T,t.groundY(T,P)+b,P);const R=.88+.24*B0(T*1.7,P*1.7,2);p.copy(s).multiplyScalar(A*R);const _=1-.14*Math.exp(-Math.pow((Math.abs(S)-n*.5)/(n*.18),2));if(p.multiplyScalar(_),Math.abs(S)>n){const D=.4+.5*B0(T*.9+40,P*.9+12,2);p.lerp(m,Math.min(.95,D*((Math.abs(S)-n)/.55+.35)))}c.push(p.r,p.g,p.b)}if(M>0){const k=M*i,S=(M-1)*i;for(let b=0;b<i-1;b++)l.push(S+b,k+b,S+b+1,S+b+1,k+b,k+b+1)}}const u=new Et;u.setAttribute("position",new pt(r,3)),u.setAttribute("color",new pt(c,3)),u.setIndex(l),u.computeVertexNormals();const g=new it({color:16777215,vertexColors:!0,roughness:.96,metalness:.02,side:ft});Za(g);const v=new K(u,g);if(v.receiveShadow=!0,e.add(v),t.inlay){const M=[],f=[];for(let k=0;k<=t.steps;k++){const S=k/t.steps;o.getPoint(S,h),o.getTangent(S,d);const b=-d.z,A=d.x,T=Math.hypot(b,A)||1;for(const P of[-.09,.09]){const R=h.x+b/T*P,_=h.z+A/T*P;M.push(R,t.groundY(R,_)+.17,_)}if(k>0){const P=k*2,R=(k-1)*2;f.push(R,P,R+1,R+1,P,P+1)}}const x=new Et;x.setAttribute("position",new pt(M,3)),x.setIndex(f),x.computeVertexNormals();const w=new it({color:t.inlay.color,emissive:t.inlay.emissive,emissiveIntensity:t.inlay.intensity,roughness:.4,side:ft}),y=new K(x,w);y.userData.noShadow=!0,e.add(y)}return e}const r0=[.02,.04],zr=.1;function ys(o){let t=0;for(let e=0;e<o.length;e++){const[n,s]=o[e],[a,i]=o[(e+1)%o.length];t+=n*i-a*s}return t*.5}function bs(o,t,e,n){const s=[];for(let a=0;a<o.length;a++){const i=o[a],r=o[(a+1)%o.length],c=t*i[0]+e*i[1]-n,l=t*r[0]+e*r[1]-n;if(c<=0&&s.push(i),c<0&&l>0||c>0&&l<0){const h=c/(c-l);s.push([i[0]+(r[0]-i[0])*h,i[1]+(r[1]-i[1])*h])}}return s}function Fr(o,t){let e=o;const n=o.length;for(let s=0;s<n&&e.length>=3;s++){const a=o[s],i=o[(s+1)%n],r=i[0]-a[0],c=i[1]-a[1],l=Math.hypot(r,c);if(l<1e-6)continue;const h=c/l,d=-r/l;e=bs(e,h,d,h*a[0]+d*a[1]-t)}return e}function wn(o,t=1e-5){const e=[];for(const n of o){const s=e[e.length-1];(!s||Math.hypot(n[0]-s[0],n[1]-s[1])>t)&&e.push(n)}for(;e.length>1&&Math.hypot(e[0][0]-e[e.length-1][0],e[0][1]-e[e.length-1][1])<=t;)e.pop();return e}function Er(o){const t=o.slice();for(;t.length>8;){let e=0,n=1/0;for(let s=0;s<t.length;s++){const a=t[(s+t.length-1)%t.length],i=t[s],r=t[(s+1)%t.length],c=Math.abs((i[0]-a[0])*(r[1]-a[1])-(r[0]-a[0])*(i[1]-a[1]));c<n&&(n=c,e=s)}t.splice(e,1)}for(;t.length<5;){let e=0,n=-1;for(let l=0;l<t.length;l++){const h=t[l],d=t[(l+1)%t.length],p=Math.hypot(d[0]-h[0],d[1]-h[1]);p>n&&(n=p,e=l)}const s=t[e],a=t[(e+1)%t.length],i=a[0]-s[0],r=a[1]-s[1],c=Math.hypot(i,r)||1;t.splice(e+1,0,[(s[0]+a[0])/2+r/c*.003,(s[1]+a[1])/2-i/c*.003])}return t}function Nr(o){const t=[o[0].x],e=[o[0].z],n=[0];for(let c=1;c<o.length;c++){const l=Math.hypot(o[c].x-o[c-1].x,o[c].z-o[c-1].z);l<1e-6||(t.push(o[c].x),e.push(o[c].z),n.push(n[n.length-1]+l))}const s=n[n.length-1],a=t.length,i=[],r=[];for(let c=0;c<a;c++){const l=Math.max(0,c-1),h=Math.min(a-1,c+1),d=t[h]-t[l],p=e[h]-e[l],m=Math.hypot(d,p)||1;i.push(d/m),r.push(p/m)}return{length:s,at(c){const l=Math.min(s,Math.max(0,c));let h=0,d=a-1;for(;d-h>1;){const M=h+d>>1;n[M]<=l?h=M:d=M}const p=Math.max(1e-9,n[d]-n[h]),m=(l-n[h])/p;let u=i[h]+(i[d]-i[h])*m,g=r[h]+(r[d]-r[h])*m;const v=Math.hypot(u,g)||1;return u/=v,g/=v,{x:t[h]+(t[d]-t[h])*m,z:e[h]+(e[d]-e[h])*m,tx:u,tz:g}}}}function Mn(o,t,e){const n=o.at(t);return[n.x-n.tz*e,n.z+n.tx*e]}function Ir(o,t,e,n=0,s=o){const a=Vt(Math.floor(e)*2654435+91),i=Math.max(2,Math.round(t/.82)),r=t/i,c=r*1.3,l=t/2,h=Math.floor(n/c)-1,d=Math.ceil(s/c)+1,p=[];for(let u=h;u<=d;u++)for(let g=0;g<i;g++)p.push({s:(u+.5+.5*(g&1))*c+(a()-.5)*.6*c,t:-l+(g+.5)*r+(a()-.5)*.6*r});const m=[];for(let u=0;u<p.length;u++){const g=p[u],v=-l+a()*.1,M=l-a()*.1,f=a()<.04,x=r0[0]+a()*(r0[1]-r0[0]),w=a();if(g.s<n-c||g.s>s+c)continue;let y=[[Math.max(n,g.s-2*c),v],[Math.min(s,g.s+2*c),v],[Math.min(s,g.s+2*c),M],[Math.max(n,g.s-2*c),M]];if(y[0][0]>=y[1][0])continue;const k=Math.max(0,u-4*i),S=Math.min(p.length,u+4*i+1);for(let P=k;P<S&&y.length>=3;P++){if(P===u)continue;const R=p[P];if(Math.abs(R.s-g.s)>2.6*c||Math.abs(R.t-g.t)>2.6*r)continue;const _=R.s-g.s,D=R.t-g.t,F=(R.s+g.s)/2,E=(R.t+g.t)/2;y=bs(y,_,D,_*F+D*E)}if(y.length<3||f||(y=wn(y),y.length<3)||(y=wn(Fr(y,x)),y.length<3)||ys(y)<zr)continue;y=Er(y);let A=0,T=0;for(const P of y)A+=P[0],T+=P[1];m.push({poly:y,cs:A/y.length,ct:T/y.length,tone:w})}return m}function yc(o,t=6){if(o.length<3)return o.map(n=>({x:n.x,z:n.z}));const e=[{x:o[0].x,z:o[0].z}];for(let n=1;n<o.length-1;n++){const s=o[n-1],a=o[n],i=o[n+1],r=Math.hypot(a.x-s.x,a.z-s.z)||1,c=Math.hypot(i.x-a.x,i.z-a.z)||1,l=Math.min(t,r*.45),h=Math.min(t,c*.45);e.push({x:a.x+(s.x-a.x)/r*l,z:a.z+(s.z-a.z)/r*l},{x:a.x,z:a.z},{x:a.x+(i.x-a.x)/c*h,z:a.z+(i.z-a.z)/c*h})}return e.push({x:o[o.length-1].x,z:o[o.length-1].z}),e}const Ur=[13094096,13619146,14208703,12897224],Br=[8095636,7502984,6910847,7700618],Gr=new O(5202741),Gt=.7;function yn(o,t,e,n,s,a,i,r){const c=t.length;let l=0,h=0;for(const A of t)l+=A[0],h+=A[1];l/=c,h/=c;const d=[];for(let A=0;A<c;A++){const[T,P]=t[A];d.push(n(T,P)+s(e[A])+(ha(T*2.1+3,P*2.1)-.5)*.02)}const p=d.reduce((A,T)=>A+T,0)/c,m=new O(a[Math.min(a.length-1,Math.floor(i.tone*a.length))]),u=new O(a[Math.min(a.length-1,Math.floor(i.tone*a.length)+1)%a.length]);m.lerp(u,i.tone*a.length%1),m.multiplyScalar(.84+r()*.26);const g=new O,v=(A,T,P,R,_,D,F)=>(g.copy(m).multiplyScalar(F).lerp(Gr,D),o.pos.push(A,T,P),o.col.push(g.r,g.g,g.b),o.uv.push(R,_),o.pos.length/3-1),M=t.map(([A,T])=>{const P=A-l,R=T-h,_=Math.hypot(P,R)||1,D=Math.min(i.bevel,_*.35)/_;return[A-P*D,T-R*D]}),f=v(l,p+.008,h,l*Gt,h*Gt,0,1.04),x=[];for(let A=0;A<c;A++){const T=.93+r()*.07;x.push(v(M[A][0],d[A],M[A][1],M[A][0]*Gt,M[A][1]*Gt,i.mossy*.25*r(),T))}for(let A=0;A<c;A++)o.idx.push(f,x[(A+1)%c],x[A]);const w=[],y=[];for(let A=0;A<c;A++)w.push(v(M[A][0],d[A],M[A][1],M[A][0]*Gt,M[A][1]*Gt,i.mossy*.25,.94)),y.push(v(t[A][0],d[A]-i.drop-r()*.006,t[A][1],t[A][0]*Gt,t[A][1]*Gt,i.mossy*.55*(.5+r()),.8));const k=[],S=[];let b=0;for(let A=0;A<c;A++){const[T,P]=t[A],R=t[(A+c-1)%c];b+=Math.hypot(T-R[0],P-R[1]);const _=d[A]-i.drop,D=Math.min(_-i.thickness+i.drop,n(T,P)-.06);k.push(v(T,_,P,b*Gt,_*Gt,i.mossy*.7,.72)),S.push(v(T,D,P,b*Gt,D*Gt,i.mossy*.9,.45))}for(let A=0;A<c;A++){const T=(A+1)%c;o.idx.push(w[A],w[T],y[A],w[T],y[T],y[A]),o.idx.push(k[A],k[T],S[A],k[T],S[T],S[A])}}function Wr(o,t,e,n){const s=5+Math.floor(n()*2),a=n()*6.28,i=.85+n()*.5,r=[];for(let c=0;c<s;c++){const l=a+c/s*Math.PI*2+(n()-.5)*.4,h=e*(.75+n()*.5);r.push([o+Math.cos(l)*h*i,t+Math.sin(l)*h])}return r}function Or(o,t){const e=new xt;e.name="flagstone-path";const n={pos:[],col:[],uv:[],idx:[]},s=t.width/2,a=t.lift??(h=>Cr(h,s)+.05),i=t.palette==="unit"?Br:Ur,r=t.quality==="high"?1.2:t.quality==="med"?.7:.3;if(o.forEach((h,d)=>{if(h.length<2)return;const p=Nr(h),m=t.startInset??0,u=p.length-(t.endInset??0);if(u-m<1)return;const g=t.seed+d*977,v=Vt(g*31+7);for(const f of Ir(p.length,t.width,g,m,u)){const x=f.poly.map(([y,k])=>Mn(p,y,k)),w=f.poly.map(([,y])=>y);ys(x)<0&&(x.reverse(),w.reverse()),yn(n,x,w,t.groundY,a,i,{thickness:.08+v()*.04,bevel:.022+v()*.012,drop:.02+v()*.01,tone:f.tone,mossy:v()<.4?.3+v()*.7:v()*.25},v)}const M=Math.floor((u-m)*r);for(let f=0;f<M;f++){const x=f&1?1:-1,w=m+v()*(u-m),y=x*(s-.15+Math.pow(v(),1.6)*.75),[k,S]=Mn(p,w,y),b=.045+v()*v()*.12,A=Wr(k,S,b,v);yn(n,A,A.map(()=>y),t.groundY,T=>Math.max(.012,a(T)-.04),i,{thickness:.05,bevel:Math.min(.015,b*.3),drop:.012,tone:v(),mossy:v()*.6},v)}}),n.idx.length===0)return e;const c=new Et;c.setAttribute("position",new pt(n.pos,3)),c.setAttribute("color",new pt(n.col,3)),c.setAttribute("uv",new pt(n.uv,2)),c.setIndex(new ct(n.pos.length/3>65535?new Uint32Array(n.idx):new Uint16Array(n.idx),1)),c.computeVertexNormals(),c.computeBoundingSphere();const l=new K(c,Ri());return l.name="flagstones",l.receiveShadow=!0,l.castShadow=!1,e.add(l),e}function bc(o,t){const e=o.getLength(),n=o.getSpacedPoints(Math.max(4,Math.ceil(e/.5))).map(s=>({x:s.x,z:s.z}));return Or([n],t)}function Do(o,t,e){let n=Math.imul(o|0,374761393)^Math.imul(t|0,668265263)^Math.imul((e|0)+1,1442695041);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967295}const bn=o=>o*o*o*(o*(o*6-15)+10);function v0(o,t,e,n){const s=o*e,a=t*e,i=Math.floor(s),r=Math.floor(a),c=bn(s-i),l=bn(a-r),h=(i%e+e)%e,d=(r%e+e)%e,p=(h+1)%e,m=(d+1)%e,u=Do(h,d,n),g=Do(p,d,n),v=Do(h,m,n),M=Do(p,m,n);return u+(g-u)*c+(v-u)*l+(u-g-v+M)*c*l}function Lr(o,t,e){let n=0,s=1,a=4;for(let i=0;i<5;i++){const r=v0(o,t,a,e*17+i*101),c=1-Math.abs(2*r-1);n+=(r*.45+c*.55)*s,s*=.55,a*=2}return n}function Vr(o,t){const e=new Float32Array(o*o);let n=1/0,s=-1/0;for(let l=0;l<o;l++)for(let h=0;h<o;h++){const d=Lr(h/o,l/o,t);e[l*o+h]=d,d<n&&(n=d),d>s&&(s=d)}const a=new Uint8Array(o*o*4),i=o/256*1.6,r=s-n||1,c=l=>(l+o)%o;for(let l=0;l<o;l++)for(let h=0;h<o;h++){const d=(e[l*o+c(h+1)]-e[l*o+c(h-1)])*.5*i*2.2,p=(e[c(l+1)*o+h]-e[c(l-1)*o+h])*.5*i*2.2,m=Math.hypot(d,p,1),u=(l*o+h)*4;a[u]=Math.round((-d/m*.5+.5)*255),a[u+1]=Math.round((-p/m*.5+.5)*255),a[u+2]=Math.round((1/m*.5+.5)*255),a[u+3]=Math.round((e[l*o+h]-n)/r*255)}return{size:o,data:a}}function Hr(o,t){const e=new Uint8Array(o*o*4);for(let n=0;n<o;n++)for(let s=0;s<o;s++){const a=s/o,i=n/o;let r=0,c=.5,l=6;for(let u=0;u<4;u++){const g=v0(a,i,l,t*31+u*53);r+=(1-Math.abs(2*g-1))*c,c*=.5,l*=2}const h=v0(a,i,5,t*7+3),d=Math.min(1,Math.max(0,Math.pow(r/.9375,1.6)*(.55+h*.7))),p=(n*o+s)*4,m=Math.round(d*255);e[p]=m,e[p+1]=m,e[p+2]=m,e[p+3]=255}return{size:o,data:e}}const so={rate:[.55,.35,.3],alphaMin:.12,alphaMax:.97,alphaRate:.9},c0={time:{value:0},sunDir:{value:new C(.3,.6,-.5).normalize()},sunColor:{value:new O(1,.95,.85)}},ks=6268306,Ss=801342,kn=new Map,Sn=new Map;function As(o,t,e){const n=new Ve(o,t,t,fo,mo);return n.wrapS=re,n.wrapT=re,n.magFilter=Ue,n.minFilter=Vo,n.generateMipmaps=!0,n.anisotropy=e,n.colorSpace=po,n.needsUpdate=!0,n}function $r(o){let t=kn.get(o);return t||(t=As(Vr(o,11).data,o,4),kn.set(o,t)),t}function jr(o){let t=Sn.get(o);return t||(t=As(Hr(o,23).data,o,2),Sn.set(o,t)),t}const Yr=`
  uniform float uWTime;
  uniform vec3 uWSunDir;
  uniform vec3 uWSunColor;
  uniform sampler2D uWNormal;
  uniform vec3 uWShallow;
  uniform vec3 uWDeep;
  uniform vec4 uWRamp; // 无水深纹理时：网格局部 z0, z1, 近处水深, 远处水深
  #ifdef W_DEPTH_TEX
    uniform sampler2D uWDepthTex;
    uniform vec4 uWBox; // minX, minZ, 1/sizeX, 1/sizeZ
  #endif
  #ifdef W_FOAM_TEX
    uniform sampler2D uWFoam;
  #endif
  varying vec3 vWPos;
  varying float vWLocalZ;
`,Kr=`
  vec3 wToCam = cameraPosition - vWPos;
  float wDist = length(wToCam);
  vec3 wV = wToCam / max(wDist, 1e-4);
  float wT = uWTime;
  vec2 wP = vWPos.xz;
  // 细节随距离淡出，避免远处闪烁
  float wFa = 1.0 - smoothstep(30.0, 170.0, wDist);
  float wFb = 1.0 - smoothstep(60.0, 250.0, wDist);
  vec4 wNa = texture2D(uWNormal, wP * 0.21 + vec2(0.030, 0.011) * wT);
  vec2 wSa = (wNa.xy - 0.5) * 2.0 / max(wNa.z * 2.0 - 1.0, 0.25);
  // 第二层：旋转 37°、不同尺度和方向，并被第一层轻微扭曲，打散平铺感
  vec2 wPB = vec2(0.8 * wP.x + 0.6 * wP.y, -0.6 * wP.x + 0.8 * wP.y);
  vec4 wNb = texture2D(uWNormal, wPB * 0.083 + vec2(-0.012, 0.019) * wT + wSa * 0.012);
  vec2 wSb = (wNb.xy - 0.5) * 2.0 / max(wNb.z * 2.0 - 1.0, 0.25);
  vec2 wSlope = wSa * 0.5 * wFa + wSb * 0.7 * wFb;
  #ifdef W_FAR
    // 远处低频大波：同一张图的另一个（很低的）频率，同时调制细节振幅，进一步隐藏平铺
    vec4 wNf = texture2D(uWNormal, wP * 0.0113 + vec2(0.004, -0.003) * wT);
    vec2 wSf = (wNf.xy - 0.5) * 2.0 / max(wNf.z * 2.0 - 1.0, 0.25);
    wSlope = wSlope * (0.7 + 0.6 * wNf.a) + wSf * 0.55;
  #endif
  wSlope *= 0.55;
  vec3 wN = normalize(vec3(-wSlope.x, 1.0, -wSlope.y));
  normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);

  // 水深
  #ifdef W_DEPTH_TEX
    float wDepth = max(-texture2D(uWDepthTex, (vWPos.xz - uWBox.xy) * uWBox.zw).r, 0.0);
  #else
    float wDepth = mix(uWRamp.z, uWRamp.w, smoothstep(uWRamp.x, uWRamp.y, vWLocalZ));
  #endif

  // 吸收（Beer-Lambert）：视线越斜，水中路径越长
  float wNdV = clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
  float wPath = wDepth / max(wNdV, 0.3);
  vec3 wCol = mix(uWShallow, uWDeep, 1.0 - exp(-wPath * vec3(${so.rate.map(o=>o.toFixed(2)).join(", ")})));
  float wAlpha = ${so.alphaMin.toFixed(2)} + (${so.alphaMax.toFixed(2)} - ${so.alphaMin.toFixed(2)}) * (1.0 - exp(-wPath * ${so.alphaRate.toFixed(2)}));
  // Schlick 菲涅尔（F0 = 0.02）：俯视透明、平视几乎全反射
  float wFres = 0.02 + 0.98 * pow(1.0 - wNdV, 5.0);
  wAlpha = mix(wAlpha, 1.0, clamp(wFres * 1.6, 0.0, 1.0));

  // 岸边泡沫：浅水处，噪声阈值 + 随时间涌动
  float wFoam = 0.0;
  #ifdef W_DEPTH_TEX
    #ifdef W_FOAM_TEX
      float wFl = texture2D(uWFoam, wP * 0.27 + vec2(0.017, -0.012) * wT + wSa * 0.03).r;
    #else
      float wFl = wNa.a;
    #endif
    float wSwash = 0.5 + 0.5 * sin(wT * 0.8 + wFl * 6.2832 + wP.x * 0.15);
    float wThr = 0.22 + 0.16 * wSwash;
    float wBand = 1.0 - smoothstep(wThr * 0.15, wThr, wDepth);
    wFoam = wBand * smoothstep(0.30, 0.62, wFl + wBand * 0.4);
    wFoam = max(wFoam, (1.0 - smoothstep(0.0, 0.06, wDepth)) * 0.65 * (0.5 + wFl));
    wFoam *= wFa * 0.5 + 0.5;
  #endif
  wCol = mix(wCol, vec3(0.86, 0.92, 0.90), wFoam);
  diffuseColor.rgb = wCol;
  diffuseColor.a = mix(wAlpha, 0.95, wFoam);
  roughnessFactor = mix(0.14, 0.8, wFoam) + smoothstep(80.0, 300.0, wDist) * 0.2;

  // 太阳亮点：Blinn，法线碎裂 → 一片闪烁的碎光
  vec3 wR = reflect(-wV, wN);
  float wGlint = pow(max(dot(wR, uWSunDir), 0.0), 520.0);
  totalEmissiveRadiance += uWSunColor * wGlint * 0.9 * (1.0 - wFoam);
`,Xr=`
  #if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
    #if defined( W_LOWENV ) && defined( ENVMAP_TYPE_CUBE_UV )
      {
        // low：只取一个 mip 的一次采样
        vec3 wRv = inverseTransformDirection( reflect( - geometryViewDir, geometryNormal ), viewMatrix );
        float wMip = floor( clamp( roughnessToMip( max( material.roughness, 0.0525 ) ), cubeUV_m0, CUBEUV_MAX_MIP ) );
        radiance += bilinearCubeUV( envMap, envMapRotation * wRv, wMip ) * envMapIntensity * ( 1.0 - wFoam * 0.85 );
      }
    #else
      radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness ) * ( 1.0 - wFoam * 0.85 );
    #endif
  #endif
`;function Ts(o){const t=new Re({color:16777215,roughness:.14,metalness:0,ior:1.333,transparent:!0,depthWrite:!0,envMapIntensity:1});t.fog=o.fog;const e=$r(o.quality==="low"?128:256),n=o.quality==="low"||!o.depthTex?void 0:jr(256),s=new O(o.shallow),a=new O(o.deep),i=o.ramp??new lo(0,1,.8,.8),r=[o.depthTex?"#define W_DEPTH_TEX":"",n?"#define W_FOAM_TEX":"",o.quality!=="low"?"#define W_FAR":"",o.quality==="low"?"#define W_LOWENV":""].join(`
`);t.onBeforeCompile=l=>{l.uniforms.uWTime=c0.time,l.uniforms.uWSunDir=c0.sunDir,l.uniforms.uWSunColor=c0.sunColor,l.uniforms.uWNormal={value:e},l.uniforms.uWShallow={value:s},l.uniforms.uWDeep={value:a},l.uniforms.uWRamp={value:i},o.depthTex&&(l.uniforms.uWDepthTex={value:o.depthTex},l.uniforms.uWBox={value:o.box??new lo(0,0,1,1)}),n&&(l.uniforms.uWFoam={value:n}),l.vertexShader=`varying vec3 vWPos;
varying float vWLocalZ;
`+l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
       vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
       vWLocalZ = transformed.z;`),l.fragmentShader=r+`
`+Yr+l.fragmentShader.replace("#include <normal_fragment_maps>",Kr).replace("#include <lights_fragment_maps>",Xr).replace("#include <fog_fragment>",`#ifdef USE_FOG
           // 与地形同一套雾公式：远处水面融入雾色
           float tf = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
           tf = max(tf, smoothstep(150.0, 340.0, vFogDepth) * 0.92);
           gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, tf);
         #endif`)};const c=`water-v1-${o.quality}-${o.depthTex?"d":"f"}-${n?"f":"n"}`;return t.customProgramCacheKey=()=>c,t}function kc(o){const{outline:t,x:e,y:n,z:s,groundY:a,quality:i}=o,r=new fa(new xe(t),1);r.rotateX(-Math.PI/2);let c=1/0,l=-1/0,h=1/0,d=-1/0;for(const w of t)c=Math.min(c,e+w.x),l=Math.max(l,e+w.x),h=Math.min(h,s-w.y),d=Math.max(d,s-w.y);const p=1.5;c-=p,h-=p,l+=p,d+=p;const m=l-c,u=d-h,g=i==="low"?32:64,v=new Uint16Array(g*g);for(let w=0;w<g;w++){const y=h+(w+.5)/g*u;for(let k=0;k<g;k++){const S=c+(k+.5)/g*m,b=Z.clamp(a(S,y)-n,-16,16);v[w*g+k]=da.toHalfFloat(b)}}const M=new Ve(v,g,g,ma,me);M.magFilter=Ue,M.minFilter=Ue,M.wrapS=d0,M.wrapT=d0,M.generateMipmaps=!1,M.colorSpace=po,M.needsUpdate=!0;const f=Ts({quality:i,shallow:o.shallowColor??ks,deep:o.deepColor??Ss,fog:!0,depthTex:M,box:new lo(c,h,1/m,1/u)}),x=new K(r,f);return x.position.set(e,n,s),x.userData.isWater=!0,x.castShadow=!1,x.receiveShadow=!1,{mesh:x,dispose(){r.dispose(),f.dispose(),M.dispose()}}}function Zr(o={}){const t=o.depth??.6,e=o.ramp;return Ts({quality:o.quality??"med",shallow:o.shallowColor??ks,deep:o.deepColor??Ss,fog:o.fog??!1,ramp:e?new lo(e.z0,e.z1,e.near,e.far):new lo(0,1,t,t)})}class Sc{constructor(t){B(this,"ratio");B(this,"avgMs",16.7);B(this,"max");B(this,"min");B(this,"step");B(this,"high");B(this,"low");B(this,"hold");B(this,"slow",0);B(this,"fast",0);B(this,"cooldown",0);B(this,"clock",0);B(this,"lastRaiseAt",-1/0);B(this,"ceiling",1/0);B(this,"ceilingUntil",0);this.max=t.max,this.min=Math.min(t.min??.75,t.max),this.step=t.step??.25,this.high=t.high??18,this.low=t.low??12,this.hold=t.hold??2,this.ratio=Math.min(t.max,Math.max(this.min,t.initial??t.max))}setMax(t){this.max=t,this.ratio>t&&(this.ratio=t)}push(t,e){if(!(t>0)||t>300||!(e>0)||e>.5)return null;if(this.clock+=e,this.avgMs+=(t-this.avgMs)*(1-Math.exp(-e/.35)),this.cooldown>0)return this.cooldown-=e,this.slow=this.fast=0,null;if(this.avgMs>this.high?(this.slow+=e,this.fast=0):this.avgMs<this.low?(this.fast+=e,this.slow=0):this.slow=this.fast=0,this.slow>=this.hold&&this.ratio>this.min+1e-6){const s=Math.max(this.min,this.ratio-this.step);return this.clock-this.lastRaiseAt<12&&(this.ceiling=s,this.ceilingUntil=this.clock+30),this.apply(s)}const n=this.clock<this.ceilingUntil?Math.min(this.max,this.ceiling):this.max;return this.fast>=this.hold&&this.ratio<n-1e-6?(this.lastRaiseAt=this.clock,this.apply(Math.min(n,this.ratio+this.step))):null}apply(t){return this.ratio=t,this.slow=this.fast=0,this.cooldown=this.hold,t}}function Ac(){return!1}function Tc(o,t,e){const n=document.createElement("div");n.setAttribute("data-perf-overlay",""),n.style.cssText="position:absolute;left:8px;bottom:8px;z-index:9999;padding:6px 8px;border-radius:6px;background:rgba(6,14,24,.72);color:#9fe8ff;font:11px/1.45 ui-monospace,monospace;pointer-events:none;white-space:pre",t.appendChild(n),o.info.autoReset=!1;let s=0,a=0,i=0;return{update(r){if(a++,i+=r,s+=r,s>=250){const c=i/a,l=o.info.render;n.textContent=`${(1e3/Math.max(.1,c)).toFixed(0)} fps  ${c.toFixed(1)} ms
calls ${Math.round(l.calls)}  tris ${Math.round(l.triangles)}
ratio ${o.getPixelRatio().toFixed(2)}${e?`  avg ${e.avgMs.toFixed(1)} ms`:""}`,s=0,a=0,i=0}o.info.reset()},dispose(){o.info.autoReset=!0,n.remove()}}}const qr=["clear","overcast","lightRain","heavyRain","drizzleMist","snow","windGusts","dusk","night"];function Pc(o){return typeof o=="string"&&qr.includes(o)}const Qr=["cloud","sunMul","hemiMul","envMul","exposureMul","fogMul","skyGrey","skyDark","sunTintR","sunTintG","sunTintB","skyTintR","skyTintG","skyTintB","skyTintAmt","rain","snow","mist","wind","gust","wetTarget"],te=o=>({cloud:.12,sunMul:1,hemiMul:1,envMul:1,exposureMul:1,fogMul:1,skyGrey:0,skyDark:1,sunTintR:1,sunTintG:1,sunTintB:1,skyTintR:.5,skyTintG:.5,skyTintB:.5,skyTintAmt:0,rain:0,snow:0,mist:0,wind:.25,gust:.15,wetTarget:0,...o}),l0={clear:te({}),overcast:te({cloud:.85,sunMul:.35,hemiMul:.95,envMul:.85,fogMul:1.25,skyGrey:.55,skyDark:.82,sunTintR:.94,sunTintG:.97,sunTintB:1,wind:.35,gust:.25}),lightRain:te({cloud:.92,sunMul:.22,hemiMul:.85,envMul:.8,exposureMul:1.02,fogMul:1.5,skyGrey:.66,skyDark:.72,sunTintR:.9,sunTintG:.95,sunTintB:1,rain:.45,wind:.4,gust:.3,wetTarget:.7}),heavyRain:te({cloud:1,sunMul:.1,hemiMul:.7,envMul:.65,exposureMul:1.06,fogMul:2.1,skyGrey:.8,skyDark:.55,sunTintR:.86,sunTintG:.92,sunTintB:1,rain:1,wind:.7,gust:.6,wetTarget:1}),drizzleMist:te({cloud:.8,sunMul:.28,hemiMul:.9,envMul:.85,fogMul:2.8,skyGrey:.6,skyDark:.85,sunTintR:.94,sunTintG:.98,sunTintB:1,rain:.16,mist:1,wind:.12,gust:.08,wetTarget:.5}),snow:te({cloud:.9,sunMul:.3,hemiMul:1,envMul:1,exposureMul:1.05,fogMul:1.8,skyGrey:.5,skyDark:.9,sunTintR:.95,sunTintG:.98,sunTintB:1.05,snow:.8,wind:.3,gust:.2,wetTarget:.2}),windGusts:te({cloud:.45,sunMul:.8,skyGrey:.15,wind:.85,gust:1}),dusk:te({cloud:.4,sunMul:.55,hemiMul:.72,envMul:.7,exposureMul:.97,fogMul:1.2,skyDark:.78,sunTintR:1,sunTintG:.72,sunTintB:.82,skyTintR:.78,skyTintG:.5,skyTintB:.68,skyTintAmt:.38,wind:.2,gust:.1}),night:te({cloud:.3,sunMul:.08,hemiMul:.38,envMul:.32,exposureMul:1.15,fogMul:1.3,skyDark:.14,sunTintR:.55,sunTintG:.7,sunTintB:1.15,skyTintR:.05,skyTintG:.1,skyTintB:.24,skyTintAmt:.86,wind:.18,gust:.1})},Jr={high:1.5,med:1,low:.5},t1=2e3,e1=1200,o1=160;function n1(o){const t=Jr[o];return{drops:Math.floor(t1*t),flakes:Math.floor(e1*t),splashes:Math.floor(o1*t)}}const An=(o,t)=>1-Math.exp(-Math.max(0,o)*t);class Rc{constructor(t="clear"){B(this,"kind");B(this,"target");B(this,"params");B(this,"wet",0);B(this,"rate",1);B(this,"transitioning",!1);B(this,"version",0);this.kind=this.target=t,this.params={...l0[t]},this.wet=this.params.wetTarget}set(t,e=4){if(!(t===this.target&&!(e<=0&&this.transitioning))){if(this.target=t,this.kind=t,this.version++,e<=0){Object.assign(this.params,l0[t]),this.wet=this.params.wetTarget,this.transitioning=!1,this.rate=1;return}this.rate=4/e,this.transitioning=!0}}update(t){if(t<=0)return;const e=l0[this.target],n=this.params,s=An(t,this.rate);let a=0;for(const r of Qr){let c=e[r];(r==="snow"&&c>0&&n.rain>.02||r==="rain"&&c>0&&n.snow>.02)&&(c=0);const l=(r==="rain"||r==="snow")&&c<n[r]?Math.min(1,s*1.6):s;n[r]+=(c-n[r])*l,a=Math.max(a,Math.abs(e[r]-n[r]))}this.transitioning&&a<.004&&(Object.assign(n,e),this.transitioning=!1);const i=An(t,n.wetTarget>this.wet?.25:.05);this.wet+=(n.wetTarget-this.wet)*i}windNow(t){const e=Math.max(0,Math.sin(t*.31)*Math.sin(t*.83+1.7));return this.params.wind+this.params.gust*e*e*1.6}get precipitating(){return this.params.rain>.01||this.params.snow>.01}}function _c(o){return .75+Math.min(1.4,o)*1.1}function Dc(o,t,e,n=1){const s=1-(1-t.skyDark)*n;let a=o.r*s,i=o.g*s,r=o.b*s;const c=a*.2126+i*.7152+r*.0722,l=t.skyGrey*n;a+=(c-a)*l,i+=(c-i)*l,r+=(c-r)*l;const h=t.skyTintAmt*n,d=Math.max(.05,t.skyTintR*.2126+t.skyTintG*.7152+t.skyTintB*.0722),p=Math.max(c,.02)/d;return e.r=a+(Math.min(1,t.skyTintR*p)-a)*h,e.g=i+(Math.min(1,t.skyTintG*p)-i)*h,e.b=r+(Math.min(1,t.skyTintB*p)-r)*h,e}const Cc={unit01:"clear",unit02:"overcast",unit03:"drizzleMist",unit04:"windGusts",unit05:"night",unit06:"lightRain"},s1=new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),a1=new Float32Array([0,0,1,0,1,1,0,1]),i1=[0,1,2,0,2,3];function u0(o,t){const e=new pa;e.setAttribute("position",new ct(s1,3)),e.setAttribute("uv",new ct(a1,2)),e.setIndex(i1);const n=new Float32Array(o*4);let s=t>>>0;const a=()=>{s=s+1831565813>>>0;let i=s;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296};for(let i=0;i<o;i++)n[i*4]=a(),n[i*4+1]=a(),n[i*4+2]=a(),n[i*4+3]=(i+a())/Math.max(1,o);return e.setAttribute("aRnd",new xa(n,4)),e.instanceCount=o,e.boundingSphere=new Vn(new C,1e6),e.boundingBox=new ga(new C(-1e6,-1e6,-1e6),new C(1e6,1e6,1e6)),e}const Tn=`
attribute vec4 aRnd;
uniform vec3 uBoxMin;
uniform vec3 uVol;
uniform vec3 uOff;      // 累积位移（风 + 下落）
uniform vec3 uVel;      // 当前速度方向参考（只用于条纹朝向）
uniform float uIntensity;
uniform float uGroundY;
uniform float uMode;    // 1 雨线 0 雪片
uniform float uLen;
uniform float uWidth;
uniform float uPx;      // 每米距离对应的像素世界尺寸
uniform float uT;
varying vec2 vUv;
varying float vA;
void main() {
  float vis = step(aRnd.w, uIntensity);
  float sv = 0.85 + 0.3 * fract(aRnd.w * 37.0);
  vec3 p = aRnd.xyz * uVol + uOff * sv;
  if (uMode < 0.5) {
    p.x += sin(uT * 0.9 + aRnd.x * 40.0) * 0.35;
    p.z += cos(uT * 0.7 + aRnd.z * 31.0) * 0.35;
  }
  p = uBoxMin + mod(p - uBoxMin, uVol);
  vec3 toCam = cameraPosition - p;
  float dist = length(toCam);
  float below = step(uGroundY, p.y);
  vec3 wp;
  float widthW = max(uWidth, dist * uPx * 1.1);
  float aComp = clamp(uWidth / widthW, 0.15, 1.0);
  if (uMode > 0.5) {
    vec3 axis = normalize(uVel);
    vec3 side = normalize(cross(axis, toCam / max(dist, 1e-3)));
    wp = p + axis * position.y * uLen * sv + side * position.x * widthW;
  } else {
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    float sz = max(uWidth * (0.7 + 0.6 * fract(aRnd.w * 91.0)), dist * uPx * 1.4);
    wp = p + right * position.x * sz + up * position.y * sz;
    aComp = clamp(uWidth / sz, 0.2, 1.0);
  }
  vUv = uv;
  float nearFade = smoothstep(0.5, 1.6, dist);
  float farFade = 1.0 - smoothstep(0.55, 1.0, dist / (0.5 * min(uVol.x, uVol.z)));
  vA = vis * below * nearFade * farFade * aComp;
  gl_Position = (vis * below > 0.5) ? projectionMatrix * viewMatrix * vec4(wp, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}
`,r1=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
void main() {
  float x = abs(vUv.x - 0.5) * 2.0;
  float a = (1.0 - x * x) * smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
  a *= vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,c1=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float a = (1.0 - smoothstep(0.35, 1.0, r)) * vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,l1=`
attribute vec4 aRnd;
uniform vec3 uCamXZ;
uniform float uRadius;
uniform float uGroundY;
uniform float uIntensity;
uniform float uT;
varying vec2 vUv;
varying float vA;
varying float vAge;
void main() {
  float period = 0.55 + 0.5 * fract(aRnd.w * 53.0);
  float ph = fract(uT / period + aRnd.y * 7.0);
  vec2 off = (aRnd.xz - 0.5) * 2.0 * uRadius;
  // 先把相位对应的整数周期换成新的落点，让每一圈涟漪出现在不同位置
  float cycle = floor(uT / period + aRnd.y * 7.0);
  off = (fract(aRnd.xz * 3.7 + cycle * vec2(0.618, 0.382)) - 0.5) * 2.0 * uRadius;
  vec2 wp2 = uCamXZ.xz + off;
  float vis = step(aRnd.w, uIntensity);
  float size = (0.08 + 0.2 * ph) * (0.8 + 0.5 * fract(aRnd.w * 17.0));
  vec3 wp = vec3(wp2.x + position.x * size * 2.0, uGroundY + 0.012, wp2.y + position.y * size * 2.0);
  vUv = uv;
  vAge = ph;
  float d = length(off) / uRadius;
  vA = vis * (1.0 - ph) * (1.0 - ph) * (1.0 - smoothstep(0.6, 1.0, d));
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  gl_Position = vis > 0.5 ? projectionMatrix * mv : vec4(2.0, 2.0, 2.0, 1.0);
}
`,u1=`
uniform vec3 uColor;
uniform float uOpacity;
varying vec2 vUv;
varying float vA;
varying float vAge;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float ring = smoothstep(0.22, 0.0, abs(r - 0.78)) + 0.4 * smoothstep(0.18, 0.0, abs(r - 0.42)) * (1.0 - vAge);
  float a = ring * vA * uOpacity;
  if (a < 0.004) discard;
  gl_FragColor = vec4(uColor, a);
}
`,h1=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,f1=`
uniform float uT;
uniform float uWet;     // 玻璃上的水量 0..1
uniform float uSnow;
uniform vec2 uSize;
uniform vec3 uTint;     // 窗外灰色天光
uniform float uOpacity;
varying vec2 vUv;
float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
// 一层下滑的水痕：按列分布，头部是一粒水珠，身后拖着渐隐的细痕
float streakLayer(vec2 p, float scale, float seed, float t) {
  vec2 g = vec2(p.x * scale, p.y * scale * 0.42);
  float col = floor(g.x);
  float r = h11(col + seed);
  float x = fract(g.x) - 0.5;
  x += (h11(col * 1.7 + seed) - 0.5) * 0.55;
  float speed = 0.04 + r * 0.1;
  float y = fract(g.y * 0.5 + t * speed + r * 9.0);
  float head = 0.12;
  float dy = y - head;
  float bead = smoothstep(0.075, 0.0, length(vec2(x * 1.15, dy * 2.6)));
  float trail = smoothstep(0.045, 0.0, abs(x)) * smoothstep(0.0, 0.85, dy) * (1.0 - smoothstep(0.85, 1.0, dy)) * step(0.0, dy) * 0.5;
  return (bead + trail) * step(0.35, h11(col * 3.1 + seed * 2.0));
}
// 附着不动的小水珠
float beads(vec2 p, float scale) {
  vec2 g = p * scale;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;
  float h = h21(id);
  vec2 c = (vec2(h21(id + 3.1), h21(id + 7.7)) - 0.5) * 0.5;
  float d = length(f - c);
  return smoothstep(0.17 * h, 0.0, d) * step(0.45, h);
}
void main() {
  vec2 p = vUv * uSize;
  float s = streakLayer(p, 5.0, 1.0, uT) + streakLayer(p + 3.3, 9.0, 4.0, uT * 1.2) * 0.8 + streakLayer(p + 7.1, 14.0, 9.0, uT * 0.8) * 0.6;
  float b = beads(p, 24.0) * 0.7 + beads(p + 2.0, 42.0) * 0.5;
  float water = clamp((s * 0.9 + b) * uWet, 0.0, 1.0);
  // 雪天：窗边结一圈柔霜
  float frost = uSnow * (smoothstep(0.35, 0.0, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y))) * 0.5 + b * 0.3);
  float haze = (0.5 * uWet + 0.4 * uSnow) * 0.22;
  float a = (water * 0.55 + frost * 0.5 + haze) * uOpacity;
  vec3 col = mix(uTint * 0.9, vec3(0.88, 0.94, 1.0), water * 0.7 + frost);
  if (a < 0.004) discard;
  gl_FragColor = vec4(col, a);
}
`,d1=`
varying vec3 vW;
varying vec2 vUv;
void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = uv; gl_Position = projectionMatrix * viewMatrix * w; }
`,m1=`
uniform float uWet;
uniform vec3 uSky;
varying vec3 vW;
varying vec2 vUv;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
void main() {
  float n = n2(vW.xz * 0.45) * 0.65 + n2(vW.xz * 1.3) * 0.35;
  float mask = smoothstep(0.58 - uWet * 0.18, 0.7 - uWet * 0.18, n) * smoothstep(0.25, 0.7, uWet);
  vec3 vd = normalize(cameraPosition - vW);
  float fres = pow(1.0 - clamp(vd.y, 0.0, 1.0), 3.0);
  float edge = 1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5));
  float a = mask * edge * (0.25 + 0.6 * fres);
  if (a < 0.004) discard;
  gl_FragColor = vec4(uSky * (0.6 + 0.5 * fres), a);
}
`,ze=new C;class zc{constructor(t){B(this,"object",new xt);B(this,"rain");B(this,"snow");B(this,"ripples");B(this,"glass");B(this,"puddle");B(this,"rainU");B(this,"snowU");B(this,"rippleU");B(this,"glassU");B(this,"puddleU");B(this,"disposables",[]);B(this,"off",new C);B(this,"snowOff",new C);B(this,"vel",new C(0,-9,0));B(this,"vol");B(this,"boxMin",new C);B(this,"t",0);B(this,"groundY");B(this,"opts");this.opts=t,this.groundY=t.groundY??0;const e=t.radius??12;this.vol=new C(e*2,14,e*2),this.object.name="weather-fx";const n=n1(t.quality),s=()=>({uBoxMin:{value:this.boxMin},uVol:{value:this.vol},uOff:{value:this.off},uVel:{value:this.vel},uIntensity:{value:0},uGroundY:{value:this.groundY},uMode:{value:1},uLen:{value:.55},uWidth:{value:.012},uPx:{value:.0015},uT:{value:0},uColor:{value:new O(.62,.74,.86)},uOpacity:{value:.5}});this.rainU=s(),this.snowU=s(),this.snowU.uMode.value=0,this.snowU.uOff.value=this.snowOff,this.snowU.uWidth.value=.028,this.snowU.uColor.value=new O(.9,.95,1),this.snowU.uOpacity.value=.85,this.rippleU={uCamXZ:{value:new C},uRadius:{value:9},uGroundY:{value:this.groundY},uIntensity:{value:0},uT:{value:0},uColor:{value:new O(.7,.8,.9)},uOpacity:{value:.5}},this.glassU={uT:{value:0},uWet:{value:0},uSnow:{value:0},uSize:{value:new wt(1,1)},uTint:{value:new O(.6,.66,.72)},uOpacity:{value:1}},this.puddleU={uWet:{value:0},uSky:{value:new O(.55,.65,.78)}};const a=(r,c,l,h={})=>{const d=new It({vertexShader:r,fragmentShader:c,uniforms:l,transparent:!0,depthWrite:!1,fog:!1,side:ft,...h});return this.disposables.push(d),d},i=(r,c,l,h)=>{this.disposables.push(r);const d=new K(r,c);return d.frustumCulled=!1,d.renderOrder=l,d.name=h,d.raycast=()=>{},d.visible=!1,this.object.add(d),d};if(t.mode==="outdoor"){if(this.rain=i(u0(n.drops,101),a(Tn,r1,this.rainU),12,"weather-rain"),this.snow=i(u0(n.flakes,202),a(Tn,c1,this.snowU),12,"weather-snow"),this.ripples=i(u0(n.splashes,303),a(l1,u1,this.rippleU),11,"weather-ripples"),t.flatGround){const r=new St(60,60);r.rotateX(-Math.PI/2),this.puddle=i(r,a(d1,m1,this.puddleU,{polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),10,"weather-puddle")}}else if(t.mode==="window"&&t.window){const r=t.window,c=new St(r.width,r.height);this.glassU.uSize.value.set(r.width,r.height),this.glass=i(c,a(h1,f1,this.glassU),13,"weather-glass"),this.glass.position.set(r.x,r.y,r.z)}}setGround(t){this.groundY=t}get mode(){return this.opts.mode}update(t,e,n,s,a,i,r){this.t+=t;const c=e.params,l=this.opts.mode;if(l==="window"){if(!this.glass)return;const x=Math.min(1,c.rain*1.1+c.mist*.55),w=x>.01||c.snow>.01;this.glass.visible=w,w&&(this.glassU.uT.value=this.t,this.glassU.uWet.value=x,this.glassU.uSnow.value=c.snow,this.glassU.uTint.value.setRGB(.5+.2*s,.56+.2*s,.64+.2*s));return}if(l!=="outdoor")return;const h=.82*r*4.5,d=.57*r*4.5;this.vel.set(h,-9,d),this.off.x+=h*t,this.off.y+=-9*t,this.off.z+=d*t,this.snowOff.x+=h*.5*t,this.snowOff.y+=-1.3*t,this.snowOff.z+=d*.5*t,this.off.x%=this.vol.x*64,this.off.y%=this.vol.y*64,this.off.z%=this.vol.z*64,this.snowOff.x%=this.vol.x*64,this.snowOff.y%=this.vol.y*64,this.snowOff.z%=this.vol.z*64,n.getWorldDirection(ze),ze.y=0,ze.lengthSq()>1e-4&&ze.normalize();const p=n.position.x+ze.x*this.vol.x*.18,m=n.position.z+ze.z*this.vol.z*.18,u=n.position.y;this.boxMin.set(p-this.vol.x*.5,u-this.vol.y*.55,m-this.vol.z*.5);const g=2*Math.tan(Z.degToRad(i)/2)/Math.max(1,a),v=.25+.75*s,M=c.rain>.005;if(this.rain){this.rain.visible=M;const x=this.rainU;x.uT.value=this.t,x.uIntensity.value=c.rain,x.uGroundY.value=this.groundY,x.uPx.value=g,x.uOpacity.value=.42*v,x.uLen.value=.5+.2*c.rain}const f=c.snow>.005;if(this.snow){this.snow.visible=f;const x=this.snowU;x.uT.value=this.t,x.uIntensity.value=c.snow,x.uGroundY.value=this.groundY,x.uPx.value=g,x.uOpacity.value=.85*(.4+.6*v)}if(this.ripples){this.ripples.visible=M;const x=this.rippleU;x.uIntensity.value=c.rain,x.uT.value=this.t,x.uGroundY.value=this.groundY,x.uCamXZ.value.set(n.position.x,0,n.position.z),x.uOpacity.value=.5*v}if(this.puddle){const x=e.wet;this.puddle.visible=x>.2,this.puddle.visible&&(this.puddle.position.set(Math.round(n.position.x/4)*4,this.groundY+.012,Math.round(n.position.z/4)*4),this.puddleU.uWet.value=x,this.puddleU.uSky.value.setRGB(.4+.35*s,.48+.35*s,.6+.3*s))}}dispose(){for(const t of this.disposables)t.dispose();this.disposables.length=0,this.object.removeFromParent()}}class Fc{constructor(){B(this,"roots",new Set);B(this,"applied",-1)}add(t){t&&!this.roots.has(t)&&(this.roots.add(t),this.applied=-1)}clear(){this.roots.clear(),this.applied=-1}invalidate(){this.applied=-1}apply(t){if(Math.abs(t-this.applied)<.01&&this.applied>=0)return;this.applied=t;const e=1-.34*t;for(const n of this.roots)n.traverse(s=>{const a=s;if(!a.isMesh)return;const i=Array.isArray(a.material)?a.material:[a.material];for(const r of i){const c=r;if(!c.isMeshStandardMaterial||!c.color)continue;let l=c.userData.wetBase;l||(l={r:c.color.r,g:c.color.g,b:c.color.b,rough:c.roughness},c.userData.wetBase=l),c.color.setRGB(l.r*e,l.g*e,l.b*(1-.3*t)),c.roughness=Math.max(.1,l.rough*(1-.5*t))}})}}const p1={low:{pathSegments:10,radialSegments:4,lineRadius:.0014,buttonSegments:6},high:{pathSegments:22,radialSegments:5,lineRadius:.0011,buttonSegments:8}};function Pn(o,t,e){const n=Math.abs(o);let s=ot(n,t,e,0,1.33,0,.143,.17,.096);s=I(s,ot(n,t,e,.055,1.31,.028,.073,.061,.071),.055),s=I(s,ot(n,t,e,0,1.14,0,.126,.17,.09),.075),s=I(s,ot(n,t,e,0,.97,-.004,.145,.13,.104),.075),s=I(s,at(n,t,e,.018,1.492,-.01,.147,1.417,-.002,.043,.047),.085),s=I(s,ot(n,t,e,.151,1.405,0,.048,.064,.061),.058),s=I(s,at(n,t,e,0,1.46,-.02,0,1.535,-.02,.061,.046),.065),s=I(s,Oe(n,t,e,0,1.525,0,.074,.026),.02),s=I(s,Kt(n,t,e,.085,1.27,.094,.04,.03,.014,.006),.006),s=Ft(s,.88-t,.03),s=Ft(s,-at(n,t,e,0,1.43,-.006,0,1.62,-.006,.058,.058),.014);const a=Math.atan2(e,o);return s+=(Math.sin(a*7+t*13)*.5+Math.sin(a*12-t*8+1.7)*.3)*(t<1.15?.0055:.0028),s}function F0(o,t){let e=0,n=.32;if(Pn(o,t,e)>0)return .066;for(let s=0;s<18;s++){const a=(e+n)/2;Pn(o,t,a)<=0?e=a:n=a}return(e+n)/2+.004}function zo(o,t){const e=Z.clamp(Math.abs(t)/(o==="upperArm"?.28:.255),0,1);return o==="upperArm"?[Z.lerp(.058,.046,e),Z.lerp(.06,.046,e)]:[Z.lerp(.039,.05,1-e),Z.lerp(.038,.046,1-e)]}function x1(o,t,e){const[n,s]=zo(o,e),a=Math.max(.12,1-(t/n)**2);return s*Math.sqrt(a)+.0035}function Fo(o,t,e,n){const s=`${t}:${e}:${n}`;let a=o.get(s);return a||(a={anchor:t,side:e,material:n,parts:[]},o.set(s,a)),a}function Jt(o,t,e,n=e.lineRadius,s=!1){if(t.length<3)return;const a=new Yo(t,s,"centripetal");o.parts.push(new Ko(a,e.pathSegments,n,e.radialSegments,s))}function Ee(o){return o.map(([t,e])=>new C(t,e,F0(t,e)))}function g1(o,t){const e=[],n=t.pathSegments;for(let s=0;s<=n;s++){const a=Z.lerp(-Math.PI/2,Math.PI/2,s/n),i=.057*Math.sin(a),r=1.495-.043*Math.cos(a);e.push(new C(i,r,Math.max(F0(i,r),.086)))}Jt(o,e,t,t.lineRadius*1.25)}function Co(o,t,e,n,s,a,i=!1,r){const c=t-n/2,l=t+n/2,h=e-s/2,d=e+s/2,p=[[c+.006,h],[l-.006,h],[l,h+.006],[l,d-.006],[l-.006,d],[c+.006,d],[c,d-.006],[c,h+.006]],m=g=>g.map(v=>v.setZ(r??v.z)),u=m(Ee(p));Jt(o,u,a,a.lineRadius*1.1,!0),i&&Jt(o,m(Ee([[c+.006,d-.012],[t,d-.012],[l-.006,d-.012]])),a,a.lineRadius*1.15)}function v1(o,t,e){const n=Fo(e,"torso",0,"cloth");if(g1(n,t),o==="tee"){for(const r of[-1,1])Jt(n,Ee([[r*.056,1.48],[r*.082,1.455],[r*.111,1.425],[r*.127,1.395]]),t,t.lineRadius);Co(n,-.077,1.265,.045,.061,t,!0,.111);return}if(o==="hoodie"){const r=Fo(e,"torso",0,"trim");for(const c of[-1,1])Jt(r,Ee([[c*.012,1.465],[c*.016,1.405],[c*.021,1.335]]),t,t.lineRadius*1.4);Co(n,0,1,.178,.066,t,!1,.141);return}const s=Fo(e,"torso",0,"trim");Jt(n,Ee([[0,1.49],[0,1.38],[0,1.25],[0,1.11],[0,.99]]),t,t.lineRadius*1.8);for(const r of[-1,1])Jt(n,Ee([[r*.026,1.49],[r*.05,1.43],[r*.081,1.35],[r*.102,1.26]]),t,t.lineRadius*1.3),Co(n,r*.09,1.045,.052,.06,t,!0);Co(n,.078,1.267,.047,.052,t,!0,.111);const i=t.pathSegments>10?4:3;for(let r=0;r<i;r++){const c=Z.lerp(1.405,1.055,r/(i-1)),l=new Rt(.0034,.0034,.0016,t.buttonSegments,1);l.rotateX(Math.PI/2),l.translate(0,c,F0(0,c)),s.parts.push(l)}}function w1(o,t,e,n){const s=[];for(let a=0;a<n;a++){const i=a/n*Math.PI*2;s.push(new C(Math.cos(i)*o,e,Math.sin(i)*t))}return s}function Rn(o,t,e,n,s){const a=Fo(n,o,s,"cloth"),i=o==="upperArm"?-.265:-.226,[r,c]=zo(o,i);Jt(a,w1(r*1.04,c*1.04,i,e.pathSegments),e,e.lineRadius*1.35,!0);const l=o==="forearm"&&e.pathSegments>10?3:1;for(let h=0;h<l;h++){const d=o==="forearm"?-.025-h*.036:-.12,[p]=zo(o,d),m=p*.72,u=[],g=e.pathSegments;for(let v=0;v<=g;v++){const M=v/g*2-1,f=M*m,x=d+.006*M+Math.sin((M+1)*Math.PI)*(h%2?-.0025:.0025);u.push(new C(f,x,x1(o,f,x)+.001))}Jt(a,u,e,e.lineRadius*(o==="forearm"?1.2:1))}if(o==="upperArm"&&t!=="tee"&&e.pathSegments>10){const h=[];for(let d=0;d<=e.pathSegments;d++){const p=Z.lerp(-.025,-.23,d/e.pathSegments),[m,u]=zo(o,p);h.push(new C(s*m*1.01,p,u*.18+.002))}Jt(a,h,e,e.lineRadius*.9)}}function M1(o){const t=p1[o.detail],e=new Map;v1(o.style,t,e);for(const s of[-1,1])Rn("upperArm",o.style,t,e,s),Rn("forearm",o.style,t,e,s);const n={torso:0,upperArm:1,forearm:2};return[...e.values()].sort((s,a)=>n[s.anchor]-n[a.anchor]||s.side-a.side||s.material.localeCompare(a.material)).map(s=>{const a=Lt(s.parts,!1);if(!a)throw new Error(`Could not merge garment details for ${s.anchor}:${s.side}:${s.material}`);return s.parts.forEach(i=>i.dispose()),a.computeBoundingBox(),a.computeBoundingSphere(),a.userData.garmentDetail={anchor:s.anchor,side:s.side,material:s.material},{anchor:s.anchor,side:s.side,material:s.material,geometry:a}})}let h0;const ve=.4;function y1(){if(!h0){const o=ps(ve),t=xs(ve),e=ds(ve);h0={head:fs(.58),hair:{short:g0(.5,"short"),long:g0(.5,"long")},jacket:ms(ve),upper:o,upperR:co(o),lower:t,lowerR:co(t),hand:e,handR:co(e),thigh:gs(ve),shin:vs(ve),boot:ws(ve)}}return h0}const Ps=(()=>{let o;return()=>(o??(o={eyeWhite:new it({color:15854822,roughness:.25}),iris:new it({color:4861984,roughness:.3}),lip:new it({color:10113096,roughness:.5}),shoe:new it({color:4863526,roughness:.65}),phone:new it({color:2107181,roughness:.35,metalness:.3}),screen:new it({color:8049872,emissive:2071200,emissiveIntensity:.55,roughness:.3})}),o)})();function X(o,t){const e=new K(o,t);return e.castShadow=!0,e.receiveShadow=!0,e.userData.isLandscapeStage=!0,e}function we(o,t,e,n,s){return X(new pe(o,t,e,1,Math.min(n,o/2.01,t/2.01,e/2.01)),s)}function Nt(o){return o?new va:new xt}const Rs={stand:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-.04,elbow:-.15}},phone:{left:{shoulder:-.7,elbow:-1.35,side:-.06},right:{shoulder:-.7,elbow:-1.35,side:.06}},listen:{left:{shoulder:-.55,elbow:-.95},right:{shoulder:-.5,elbow:-.95}},talk:{left:{shoulder:-.5,elbow:-.95},right:{shoulder:-1.15,elbow:-.75,side:.1}},write:{left:{shoulder:-.55,elbow:-.9},right:{shoulder:-.85,elbow:-1.2,side:.05}},read:{left:{shoulder:-.38,elbow:-1,side:-.12},right:{shoulder:-.38,elbow:-1,side:.12}},walk:{left:{shoulder:.45,elbow:-.25},right:{shoulder:-.45,elbow:-.5}},point:{left:{shoulder:.04,elbow:-.15},right:{shoulder:-1.45,elbow:-.1,side:.12}},lap:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.42,elbow:-.55,side:-.08}},reach1:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.55,elbow:-.62,side:-.08}},reach2:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.78,elbow:-.72,side:-.1}},reach3:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-.98,elbow:-.8,side:-.12}},reach4:{left:{shoulder:-.42,elbow:-.55,side:-.08},right:{shoulder:-1.12,elbow:-.86,side:-.12}}};function Ec(o){const t=Ps(),e=y1(),n=o.animated===!0,s=new xt;s.name="scene-person";const a=o.seated??!1,i=o.pose??(a?"listen":"stand"),r=new Set,c=(z,G,$={})=>{const Y=new it({color:z,roughness:G,metalness:.02,...$});return r.add(Y),Y},l=new O(o.skin??14858392),h=new O(o.shirt),d={h:0,s:0,l:0},p={h:0,s:0,l:0};h.getHSL(d),l.getHSL(p),Math.min(Math.abs(d.h-p.h),1-Math.abs(d.h-p.h))<.055&&d.s>.18&&Math.abs(d.l-p.l)<.24&&h.set(5205894).offsetHSL(0,0,(d.l-.5)*.2);const u=c(h.getHex(),.86,{side:ft}),g=c(o.trousers??3753562,.88),v=c(o.skin??14858392,.55,{emissive:3806728,emissiveIntensity:.05});v.name="person-skin";const M=new it({color:v.color.getHex(),roughness:.55,metalness:.02,vertexColors:!0,emissive:3806728,emissiveIntensity:.05});M.name="person-face";const f=new it({color:16777215,vertexColors:!0,roughness:.42,metalness:.08,side:ft});f.name="person-hair",r.add(M),r.add(f);const x=o.hair??2825494,w=c(new O(x).multiplyScalar(.8).getHex(),.7);w.name="person-face-detail";const y=a?.1:.91,k=Nt(n);k.position.y=y,k.rotation.x=o.lean??0,s.add(k);const S=Nt(n);S.position.y=-.91,k.add(S),S.add(X(e.jacket,u));const b=Nt(n);b.position.y=1.5,b.rotation.x=i==="phone"||i==="read"?.38:i==="write"?.3:o.lean?-o.lean*.6:0,S.add(b),b.add(X(e.head,M));const A=[],T=[],P=[];for(const z of[-1,1]){const G=Nt(n);G.position.set(z*.034,.2,.0685);const $=X(new mt(.0125,16,12),t.eyeWhite);G.add($);const Y=Nt(n);Y.position.z=.0118;const vt=X(new mt(.0072,12,10),t.iris);vt.scale.set(1,1,.35),Y.add(vt);const Tt=X(new mt(.0021,8,6),t.eyeWhite);Tt.position.set(-.0022,.0027,.0023),Y.add(Tt),G.add(Y);const Mt=X(new Pt(.0118,.0017,5,16,Math.PI),v);Mt.position.set(0,.001,.006),Mt.scale.y=.72,G.add(Mt),A.push(G),T.push(Y),b.add(G);const Q=Nt(n);Q.position.set(z*.037,.2165,.0885),Q.rotation.z=-z*.1;const At=new Yo([new C(-z*.015,-.001,0),new C(-z*.004,.003,.001),new C(z*.009,.002,0)]);Q.add(X(new Ko(At,8,.0027,5,!1),w)),b.add(Q),P.push(Q)}const R=Nt(n);R.position.set(0,.132,.0875);const _=c(5515817,.78);_.name="person-face-detail";const D=X(new mt(.0058,12,8),_);D.scale.set(1.7,.55,.4),R.add(D);const F=X(new m0(.0023,.025,3,8),t.lip);F.rotation.z=Math.PI/2,F.scale.set(1,1,.55),F.position.y=.001,R.add(F);const E=X(new m0(.0016,.019,3,8),v);E.rotation.z=Math.PI/2,E.position.set(0,-.0042,.001),R.add(E),b.add(R);const N=o.hairStyle??"short",L=(N==="long"?e.hair.long:e.hair.short).clone(),U=new O(x),V=(U.r+U.g+U.b)/3,W=L.attributes.color;for(let z=0;z<W.count;z++){const G=(W.getX(z)+W.getY(z)+W.getZ(z))/3/.05;W.setXYZ(z,U.r*G*(.35/Math.max(.05,V))*.6,U.g*G*(.35/Math.max(.05,V))*.6,U.b*G*(.35/Math.max(.05,V))*.6)}if(b.add(X(L,f)),N==="bun"){const z=X(new mt(.05,14,10),c(x,.7));z.scale.set(1,.9,1),z.position.set(0,.3,-.07),b.add(z)}if(o.helmet){const z=X(new mt(.145,24,16),c(15659764,.3,{metalness:.2}));z.scale.set(1,1.12,1.08),z.position.y=.2,b.add(z);const G=X(new mt(.12,20,12),c(1782855,.12,{metalness:.7}));G.scale.set(.95,.68,.55),G.position.set(0,.2,.108),b.add(G);const $=X(new Pt(.1,.018,8,20),c(13226196,.4,{metalness:.5}));$.rotation.x=Math.PI/2,$.position.y=.07,b.add($)}if(o.glasses){const z=c(1710618,.4,{metalness:.4});for(const $ of[-1,1]){const Y=X(new Pt(.0245,.0032,6,18),z);Y.position.set($*.034,.2,.092),b.add(Y)}const G=X(new Rt(.0028,.0028,.02,5),z);G.rotation.z=Math.PI/2,G.position.set(0,.204,.093),b.add(G)}const j=c(15657696,.9,{side:ft}),H=X(new Pt(.07,.012,8,24),j);if(H.rotation.x=Math.PI/2,H.position.y=1.535,H.scale.set(1.05,1,1),S.add(H),o.scarf!==void 0){const z=X(new Pt(.074,.032,8,20),c(o.scarf,.92));z.rotation.x=Math.PI/2,z.position.y=1.54,S.add(z)}if(o.backpack!==void 0){const z=we(.29,.4,.15,.06,c(o.backpack,.85));z.position.set(0,1.27+.2-.2,-.155),S.add(z)}const tt=(Math.imul(o.shirt^(o.hair??0)*31,2654435761)>>>16)+(o.hairStyle==="long"?3:0),ht=o.outfit??(o.helmet||o.scarf!==void 0?"tee":["tee","hoodie","coat","dress","tee","hoodie"][tt%6]),dt=(o.hairStyle??"short")==="long",q=ht==="dress"&&!dt&&o.hairStyle!=="bun"?"coat":ht;if(q==="hoodie"&&!o.helmet){const z=X(new Pt(.083,.03,10,24),u);z.rotation.x=Math.PI/2-.35,z.position.set(0,1.545,-.03),z.scale.set(1.05,1,1.15),S.add(z);const G=we(.2,.09,.02,.01,u);G.position.set(0,1,.128),S.add(G)}if(!a&&(q==="coat"||q==="dress")){const z=q==="coat"?.62:.46,G=X(new Rt(.19,q==="coat"?.235:.27,z,28,1,!0),u);if(G.scale.set(1.12,1,.9),G.position.y=1-z/2+.02,G.receiveShadow=!1,S.add(G),q==="coat"){const $=we(.016,.5,.02,.006,j);$.position.set(0,1.25,.121),S.add($)}}const et=o.hat??(tt%7===3&&!a?8010555:tt%7===5&&!a?3099231:void 0);if(et!==void 0&&!o.helmet){const z=c(et,.9),G=X(new mt(.098,20,12,0,Math.PI*2,0,Math.PI*.52),z);G.scale.set(.9,1.06,1.06),G.position.set(0,.215,-.014),b.add(G);const $=X(new Pt(.09,.012,8,20),z);$.rotation.x=Math.PI/2,$.scale.set(.92,1.08,1),$.position.set(0,.2,-.014),b.add($)}const rt=Rs[i],nt={},bt={};for(const z of[-1,1]){const G=z===1?rt.left:rt.right,$=Nt(n);$.position.set(z*.19,1.42,0),$.rotation.x=G.shoulder,$.rotation.z=(G.side??0)*z,S.add($),$.add(X(z===1?e.upper:e.upperR,u));const Y=Nt(n);Y.position.y=-.28,Y.rotation.x=G.elbow,$.add(Y),Y.add(X(z===1?e.lower:e.lowerR,u));const vt=X(new mt(.043,12,9),u);vt.scale.set(.95,.86,.95),Y.add(vt);const Tt=X(new Pt(.041,.008,6,16),j);Tt.rotation.x=Math.PI/2,Tt.position.y=-.252,Y.add(Tt);const Mt=Nt(n);if(Mt.position.y=-.27,Y.add(Mt),Mt.add(X(z===1?e.hand:e.handR,v)),n&&z===1){const Q=new xt;Q.name="actor-book-prop";const At=we(.2,.03,.27,.008,c(3104138,.8));At.position.set(-.12,-.12,.06),At.rotation.set(1.2,0,.1),Q.add(At),Q.userData.personDynamicAccessory=!0,Q.visible=i==="read",Mt.add(Q),bt.book=Q;const Zt=new xt;Zt.name="actor-phone-prop";const ce=we(.075,.016,.15,.006,t.phone);ce.position.set(-.05,-.1,.02),ce.rotation.set(-.4,0,.1),Zt.add(ce);const ge=X(new St(.062,.128),t.screen);ge.rotation.x=-Math.PI/2,ge.position.set(0,.0085,0),ce.add(ge),Zt.userData.personDynamicAccessory=!0,Zt.visible=i==="phone",Mt.add(Zt),bt.phone=Zt}else if(i==="read"&&z===1){const Q=we(.2,.03,.27,.008,c(3104138,.8));Q.position.set(-.12,-.12,.06),Q.rotation.set(1.2,0,.1),Mt.add(Q)}if(n&&z===-1){const Q=new xt;Q.name="actor-pen-prop";const At=X(new Rt(.008,.008,.15,6),c(1911629,.4));At.position.set(0,-.12,.03),At.rotation.x=-.9,Q.add(At),Q.userData.personDynamicAccessory=!0,Q.visible=i==="write",Mt.add(Q),bt.pen=Q}else if(i==="write"&&z===-1){const Q=X(new Rt(.008,.008,.15,6),c(1911629,.4));Q.position.set(0,-.12,.03),Q.rotation.x=-.9,Mt.add(Q)}if(!n&&i==="phone"&&z===1){const Q=we(.075,.016,.15,.006,t.phone);Q.position.set(-.05,-.1,.02),Q.rotation.set(-.4,0,.1),Mt.add(Q);const At=X(new St(.062,.128),t.screen);At.rotation.x=-Math.PI/2,At.position.set(0,.0085,0),Q.add(At)}z===1?nt.left={shoulder:$,elbow:Y,hand:Mt}:nt.right={shoulder:$,elbow:Y,hand:Mt}}const kt={};for(const z of[-1,1]){const G=Nt(n);G.position.set(z*.09,.91,0),G.rotation.x=a?-Math.PI/2+.03:i==="walk"?.42*-z:0,S.add(G),G.add(X(e.thigh,g));const $=Nt(n);$.position.y=-.42,$.rotation.x=a?Math.PI/2-.03:i==="walk"&&z===1?.55:.03,G.add($);const Y=X(new mt(.068,14,10),g);Y.scale.set(1,.86,.9),$.add(Y),$.add(X(e.shin,g));const vt=Nt(n);vt.position.y=-.26,$.add(vt);const Tt=e.boot.clone();Tt.translate(0,.26,0),vt.add(X(Tt,t.shoe)),z===1?kt.left={hip:G,knee:$,ankle:vt}:kt.right={hip:G,knee:$,ankle:vt}}if(n){const z=q==="hoodie"?"hoodie":q==="coat"||q==="dress"?"coat":"tee";for(const G of M1({style:z,detail:o.garmentDetail??"low"})){const $=G.anchor==="torso"?S:G.anchor==="upperArm"?G.side===1?nt.left.shoulder:nt.right.shoulder:G.side===1?nt.left.elbow:nt.right.elbow,Y=X(G.geometry,G.material==="cloth"?u:j);Y.name=`garment-${G.anchor}-${G.side}-${G.material}`,Y.userData.garmentGeometry=!0,$.add(Y)}}if(s.scale.setScalar(o.scale??1),n){const z={body:k,head:b,arms:nt,legs:kt,eyes:A,gazes:T,brows:P,mouth:R,props:bt,setExpression:()=>{},setPose:()=>{},update:()=>{}};b1(z,i,a,o.lean??0);const G=new Set([e.head,e.hair.short,e.hair.long,e.jacket,e.upper,e.upperR,e.lower,e.lowerR,e.hand,e.handR,e.thigh,e.shin,e.boot]);k1(s,G,r),s.userData.personRig=z,s.userData.ownedMaterials=r;const $=Un(s,{body:z.body,bodyRestY:.91,head:z.head,props:[...[z.props.book,z.props.phone].filter(Y=>!!Y).map(Y=>({object:Y,hand:"LeftHand"})),...z.props.pen?[{object:z.props.pen,hand:"RightHand"}]:[]],grip:()=>{var Y,vt,Tt;return(Y=z.props.book)!=null&&Y.visible||(vt=z.props.phone)!=null&&vt.visible||(Tt=z.props.pen)!=null&&Tt.visible?.6:0},leftArm:z.arms.left.shoulder,rightArm:z.arms.right.shoulder,leftElbow:z.arms.left.elbow,rightElbow:z.arms.right.elbow,leftHip:z.legs.left.hip,rightHip:z.legs.right.hip,leftKnee:z.legs.left.knee,rightKnee:z.legs.right.knee,leftAnkle:z.legs.left.ankle,rightAnkle:z.legs.right.ankle,blinkLeft:()=>1-z.eyes[1].scale.y,blinkRight:()=>1-z.eyes[0].scale.y,mouthOpen:()=>Math.max(0,z.mouth.scale.y-.08)*.65,smile:()=>Math.max(0,z.mouth.scale.x-1)*10,browLift:()=>Math.max(0,z.brows[0].position.y-.2165)*100,gazeX:()=>z.gazes[0].position.x*80,gazeY:()=>z.gazes[0].position.y*80},o.hairStyle==="long"||o.hairStyle==="bun"?"female":"male",{shirt:o.shirt,trousers:o.trousers,hair:o.hair,skin:o.skin,outfit:o.humanOutfit,aged:o.aged,glasses:o.glasses,seed:o.seed,look:o.humanLook});if($){const Y=z.update;z.update=(...vt)=>{Y(...vt),$()}}}else dr(s);return s}function _n(o,t,e,n){const s=Rs[t],a=s.left,i=s.right,r=[{node:o.body,path:"position",axis:"y",value:e?.1:.91},{node:o.body,path:"rotation",axis:"x",value:n+(t==="talk"?-.025:0)},{node:o.body,path:"rotation",axis:"z",value:t==="talk"?.012:0},{node:o.head,path:"rotation",axis:"x",value:t==="phone"||t==="read"?.34:t==="write"?.25:t==="lap"||t.startsWith("reach")?-.035:-n*.5},{node:o.head,path:"rotation",axis:"y",value:t==="point"?.08:0},{node:o.arms.left.shoulder,path:"rotation",axis:"x",value:a.shoulder},{node:o.arms.left.shoulder,path:"rotation",axis:"z",value:a.side??0},{node:o.arms.left.elbow,path:"rotation",axis:"x",value:a.elbow},{node:o.arms.left.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04},{node:o.arms.right.shoulder,path:"rotation",axis:"x",value:i.shoulder},{node:o.arms.right.shoulder,path:"rotation",axis:"z",value:-(i.side??0)},{node:o.arms.right.elbow,path:"rotation",axis:"x",value:i.elbow},{node:o.arms.right.hand,path:"rotation",axis:"x",value:t==="phone"||t==="read"?-.14:-.04}];for(const c of[o.legs.left,o.legs.right])r.push({node:c.hip,path:"rotation",axis:"x",value:e?-Math.PI/2+.03:0},{node:c.knee,path:"rotation",axis:"x",value:e?Math.PI/2-.03:.03},{node:c.ankle,path:"rotation",axis:"x",value:0});return r}function f0(o){return o.node[o.path][o.axis]}function Dn(o,t){o.node[o.path][o.axis]=t}function Cn(o){return o==="talk"?"talk":o==="listen"?"listen":o==="read"||o==="write"||o==="phone"?"think":o==="stand"?"softSmile":"neutral"}function zn(o){switch(o){case"listen":return[.0022,.018,.16,.15,0];case"think":return[8e-4,-.012,.1,0,7e-4];case"softSmile":return[0,0,.1,.38,0];case"talk":return[.0012,.006,.48,.08,0];default:return[0,0,.08,.02,0]}}function b1(o,t,e,n){let s=_n(o,t,e,n),a=s.map(d=>({...d,value:f0(d)})),i=null,r=Cn(t),c=zn(r),l=null,h=0;o.setExpression=(d,p=.24)=>{if(d===r)return;const m=zn(d);l=p>0?{from:c.slice(),to:m,elapsed:0,duration:p}:null,r=d,p<=0&&(c=m)},o.setPose=(d,p,m=.42)=>{s=_n(o,d,p,n);const u=s.map(v=>v.value),g=s.map((v,M)=>{const f=a[M];return f0(f||v)});i=m>0?{from:g,to:u,elapsed:0,duration:m}:null,a=s.map((v,M)=>({...v,value:m>0?g[M]:u[M]})),m<=0&&a.forEach((v,M)=>Dn(v,u[M])),o.setExpression(Cn(d),Math.min(.32,m)),o.props.book&&(o.props.book.visible=d==="read"),o.props.phone&&(o.props.phone.visible=d==="phone"),o.props.pen&&(o.props.pen.visible=d==="write")},o.update=(d,p,m,u,g)=>{if(i){i.elapsed+=d;const k=Math.min(1,i.elapsed/i.duration),S=k*k*(3-2*k);a=s.map((b,A)=>({...b,value:Z.lerp(i.from[A],i.to[A],S)})),k>=1&&(i=null)}for(const k of a)Dn(k,k.value);if(l){l.elapsed+=d;const k=Math.min(1,l.elapsed/l.duration),S=k*k*(3-2*k);c=l.from.map((b,A)=>Z.lerp(b,l.to[A],S)),k>=1&&(l=null)}const v=Math.sin(p*1.65+g)*.003;if(o.body.position.y+=m?Math.abs(Math.sin(u*2))*.007:v*.7,o.body.scale.y=1+v*.35,o.body.rotation.x+=m?.025:v*1.4,o.body.rotation.y=Math.sin(p*.47+g)*(m?.012:.008),o.body.rotation.z+=m?Math.sin(u)*.016:Math.sin(p*.72+g)*.009,o.head.rotation.y+=Math.sin(p*.38+g*1.7)*.027,o.head.rotation.z=Math.sin(p*.63+g)*.014,m){const k=Math.sin(u),S=Math.sin(u+Math.PI);o.legs.left.hip.rotation.x+=k*.36,o.legs.right.hip.rotation.x+=S*.36,o.legs.left.knee.rotation.x+=Math.max(0,Math.cos(u))*.62,o.legs.right.knee.rotation.x+=Math.max(0,Math.cos(u+Math.PI))*.62,o.legs.left.ankle.rotation.x=-o.legs.left.hip.rotation.x*.45-o.legs.left.knee.rotation.x*.7,o.legs.right.ankle.rotation.x=-o.legs.right.hip.rotation.x*.45-o.legs.right.knee.rotation.x*.7,o.arms.left.shoulder.rotation.x-=k*.19,o.arms.right.shoulder.rotation.x-=S*.19,o.arms.left.elbow.rotation.x+=.08+Math.max(0,k)*.12,o.arms.right.elbow.rotation.x+=.08+Math.max(0,S)*.12}else o.arms.left.shoulder.rotation.z+=Math.sin(p*.8+g)*.012,o.arms.right.shoulder.rotation.z-=Math.sin(p*.8+g)*.012;const M=Z.euclideanModulo(p+g*1.31,4.2);o.eyes.forEach((k,S)=>{const b=Z.euclideanModulo(M+S*.09,4.2),A=b<.13?Math.sin(b/.13*Math.PI):0;k.scale.y=1-A*.9;const T=o.gazes[S];if(T){const P=r==="listen"?Math.sin(p*.19+g*.8)*.0015:Math.sin(p*.31+g+S*.2)*.0022;T.position.x=P,T.position.y=Math.sin(p*.24+g*.7)*.0011-c[4]}});const[f,x,w,y]=c;o.brows.forEach((k,S)=>{const b=S===0?-1:1;k.position.y=.2165+f+Math.sin(p*.53+g+S*1.8)*(r==="listen"?4e-4:15e-5),k.rotation.z=-b*.1+b*x}),h+=r==="talk"?d*(5.5+Math.sin(p*1.9)*1.1):-h*Math.min(1,d*8),o.mouth.scale.x=1+y*.12-w*.08,o.mouth.scale.y=.08+w*(r==="talk"?.75+Math.sin(h)*.45:.32),o.mouth.rotation.z=y*.075+Math.sin(p*.55+g)*.004,o.mouth.position.y=.132+y*6e-4},o.setPose(t,e,0)}function k1(o,t,e){o.updateMatrixWorld(!0);const n=o.matrixWorld.clone().invert(),s=[],a=[];o.traverse(f=>{if(f.isBone&&a.push(f),f.isMesh){let x=f;for(;x&&x!==o&&!x.userData.personDynamicAccessory;)x=x.parent;x!=null&&x.userData.personDynamicAccessory||s.push(f)}});const i=new Map(a.map((f,x)=>[f,x])),r=new Map,c=new Set,l=Ps(),h=f=>f===l.eyeWhite?"eyeWhite":f===l.iris?"iris":f===l.lip?"faceDetail":f===l.phone?"phone":f===l.screen?"screen":f.name==="person-hair"?"hair":f.name==="person-face-detail"?"faceDetail":f.name==="person-skin"||f.name==="person-face"?"skin":"cloth",d=f=>{if(f==="phone")return l.phone;if(f==="screen")return l.screen;const x={color:16777215,vertexColors:!0,metalness:.02,side:ft};f==="skin"?Object.assign(x,{roughness:.55,emissive:3806728,emissiveIntensity:.05}):f==="hair"?Object.assign(x,{roughness:.42,metalness:.08}):f==="eyeWhite"?Object.assign(x,{roughness:.3,metalness:0}):f==="iris"?Object.assign(x,{roughness:.34,metalness:0}):f==="faceDetail"?Object.assign(x,{roughness:.72,metalness:0}):Object.assign(x,{roughness:.86});const w=new it(x);return w.name=`person-${f}`,e.add(w),w},p=new Map;for(const f of s){let x=f;for(;x&&!x.isBone;)x=x.parent;if(!x)throw new Error(`Animated character mesh "${f.name}" has no bone parent`);const w=i.get(x);if(w===void 0)throw new Error("Animated character bone is absent from its skeleton");let y=f.geometry.clone();if(y.index){const D=y.toNonIndexed();y.dispose(),y=D}y.applyMatrix4(new gt().multiplyMatrices(n,f.matrixWorld));const k=y.getAttribute("color");for(const D of Object.keys(y.attributes))["position","normal","color"].includes(D)||y.deleteAttribute(D);y.getAttribute("normal")||y.computeVertexNormals();const S=f.material,b=h(S),A=p.get(b)??d(b);p.set(b,A);const T=y.getAttribute("position").count;if(b!=="phone"&&b!=="screen"){const D=new Float32Array(T*3),F=S.color??new O(1,1,1);for(let E=0;E<T;E++){const N=S.vertexColors&&k&&E<k.count;D[E*3]=F.r*(N?k.getX(E):1),D[E*3+1]=F.g*(N?k.getY(E):1),D[E*3+2]=F.b*(N?k.getZ(E):1)}y.setAttribute("color",new pt(D,3))}else y.deleteAttribute("color"),b==="phone"&&y.deleteAttribute("uv");const P=new Uint16Array(T*4),R=new Float32Array(T*4);for(let D=0;D<T;D++)P[D*4]=w,R[D*4]=1;y.setAttribute("skinIndex",new On(P,4)),y.setAttribute("skinWeight",new pt(R,4));const _=r.get(b)??[];_.push(y),r.set(b,_),t.has(f.geometry)||c.add(f.geometry)}const m=new wa(a);m.calculateInverses();const u=new Set(s.map(f=>f.material).filter(f=>!Array.isArray(f)));for(const[f,x]of r){const w=Lt(x,!1);if(x.forEach(k=>k.dispose()),!w)throw new Error(`Could not merge animated character ${f} geometry`);const y=new Ma(w,p.get(f));y.name="person-skin",y.castShadow=!0,y.receiveShadow=!0,y.bind(m,o.matrixWorld.clone()),o.add(y)}s.forEach(f=>f.removeFromParent()),c.forEach(f=>f.dispose()),u.forEach(f=>{e.has(f)&&(f.dispose(),e.delete(f))});let g=0,v=0,M=0;o.traverse(f=>{var k;if(!f.isMesh)return;const x=f,w=x.geometry.getAttribute("position").count;M+=w,v+=(((k=x.geometry.index)==null?void 0:k.count)??w)/3;let y=f;for(;y&&y!==o&&!y.userData.personDynamicAccessory;)y=y.parent;y!=null&&y.userData.personDynamicAccessory&&(g+=1)}),o.userData.personGeometryStats={draws:r.size+g,triangles:v,vertices:M,joints:a.length}}function E0(o){const t=Z.clamp(o,0,1);return .025+.02*Math.sin(t*Math.PI)+.006*t}function S1(o,t=10){const e=new xe,n=a=>o*(.004+a*.201);e.moveTo(n(0),.014),e.lineTo(n(1),.014);for(let a=t;a>=0;a--){const i=a/t;e.lineTo(n(i),E0(i))}e.closePath();const s=new _e(e,{depth:.274,steps:1,bevelEnabled:!1,curveSegments:1});return s.translate(0,0,-.137),s}function A1(o){const t=[],e=[];for(let a=0;a<10;a++){const i=-.108+a*.022,r=a===0?.68:a===5||a===9?.58:.86+a%3*.025,c=a===0?.004:.0018,l=a===0?2:5+a%2,h=.023,d=(r-.13-h*(l-1))/l;for(let p=0;p<l;p++){const m=t.length/3,u=.13+p*(d+h);for(let g=0;g<=2;g++){const v=u+d*g/2,M=o*(.004+v*.201),f=E0(v)+.001;if(t.push(M,f,i,M,f,i+c),g===2)continue;const x=m+g*2,w=[x,x+1,x+2,x+1,x+3,x+2];e.push(...o===1?w:[x,x+2,x+1,x+1,x+2,x+3])}}}const s=new Et;return s.setAttribute("position",new pt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function T1(){const o=[],t=[],e=E0(.5771144278606964)+.0018;for(let s=0;s<=10;s++){const a=.065+s*.0115,i=Z.clamp((a-.137)/.043,0,1),r=e-i*i*.032;if(o.push(.114,r,a,.126,r,a),s<10){const c=s*2;t.push(c,c+2,c+1,c+1,c+2,c+3)}}const n=new Et;return n.setAttribute("position",new pt(o,3)),n.setIndex(t),n.computeVertexNormals(),n}function P1(o,t=.055){const e=new xe;e.absarc(0,0,o*1.05,0,Math.PI*2,!1);const n=new ya;n.absarc(0,0,o*.86,0,Math.PI*2,!0),e.holes.push(n);const s=new _e(e,{depth:t,bevelEnabled:!1,steps:1,curveSegments:16});return s.rotateX(-Math.PI/2),s}function R1(){const o=[0,0,0],t=8;for(let s=0;s<t;s++){const a=s/t*Math.PI*2,i=.55+Math.cos(a)*.55;o.push(Math.sin(a)*.32,i*i*.2,i)}const e=[];for(let s=0;s<t;s++)e.push(0,s+1,(s+1)%t+1);const n=new Et;return n.setAttribute("position",new pt(o,3)),n.setIndex(e),n.computeVertexNormals(),n}function Nc(o="high"){const t=(n,s=.85,a=.02,i={})=>{const r=new it({color:n,roughness:s,metalness:a,...i});return r.fog=!1,r},e=[10173754,3104138,4160079,13081146,6965898,14209208,8018490,2964038];return{detail:o,kit:new hs,m:mr(),p:{books:e.map(n=>t(n,.82)),fabricRed:t(11553344,.95,0,{side:ft}),fabricBlue:t(3891087,.95,0,{side:ft}),fabricGreen:t(5077589,.95,0,{side:ft}),fabricGrey:t(8225932,.95,0,{side:ft}),fabricCream:t(15261382,.95,0,{side:ft}),screenOn:t(8049872,.3,.1,{emissive:2071200,emissiveIntensity:.7}),screenOff:t(1317150,.2,.4),boardGreen:t(3099199,.9),boardWhite:t(15790056,.6),ceramic:t(15854818,.35),leather:t(5913128,.7,.05),plasticDark:t(2106923,.45,.2),printInk:t(4278605,.98,0),water:Zr({depth:.55,quality:o==="low"?"low":"high"}),canvasOlive:t(8359786,.95,0,{side:ft})}}}const Fn=new gt,En=new gt,_1=new gt,Nn=new jo;class _s{constructor(t,e=0,n=0,s=0,a=0,i=1,r=new gt){this.kit=t,this.x=e,this.y=n,this.z=s,this.ry=a,this.s=i,this.base=r,this.base=new gt().makeTranslation(e,n,s).multiply(new gt().makeRotationY(a)).multiply(new gt().makeScale(i,i,i))}child(t,e,n,s=0){const a=new _s(this.kit,0,0,0,0,1);return a.base=this.base.clone().multiply(Fn.makeTranslation(t,e,n)).multiply(En.makeRotationY(s)),a}put(t,e,n=0,s=0,a=0,i=0,r=0,c=0,l=1,h=1,d=1){Nn.set(i,r,c);const p=this.base.clone().multiply(Fn.makeTranslation(n,s,a)).multiply(En.makeRotationFromEuler(Nn)).multiply(_1.makeScale(l,h,d));this.kit.addMatrix(t,e,p)}box(t,e,n,s,a,i,r,c=.02,l=0,h=0,d=0){this.put(us(e,n,s,c),t,a,i+n/2,r,l,h,d)}cyl(t,e,n,s,a,i,r,c=20){this.put(We(e,n,s,c),t,a,i+s/2,r)}strut(t,e,n,s,a=6){this.put(fr(e,n,s,a),t)}ball(t,e,n,s,a,i=1,r=1,c=1){this.put(new mt(e,14,10),t,n,s,a,0,0,0,i,r,c)}}function Ic(o,t,e=1.8){const{m:n}=o;for(let s=0;s<4;s++)t.box(n.wood,e,.035,.085,0,.44,-.18+s*.1,.008);for(let s=0;s<3;s++)t.box(n.wood,e,.08,.03,0,.62+s*.12,-.27-s*.02,.008,-.12);for(const s of[-1,1]){const a=s*(e-.12)/2;for(const r of[-.23,.19])t.box(n.darkSteel,.1,.035,.13,a,0,r,.006),t.strut(n.darkSteel,[a,.035,r],[a,.435,r*.78],.026,8);t.strut(n.darkSteel,[a,.425,-.28],[a,.425,.23],.027,8),t.strut(n.darkSteel,[a,.4,-.27],[a,.96,-.35],.024,8);const i=new Yo([new C(a,.58,.2),new C(a,.65,.13),new C(a,.66,-.14),new C(a,.63,-.29)]);if(t.put(new Ko(i,o.detail==="high"?12:6,.024,6,!1),n.darkSteel),t.strut(n.darkSteel,[a,.45,.18],[a,.61,.18],.02,6),o.detail==="high"){for(let r=0;r<4;r++)t.cyl(n.steel,.008,.008,.004,a,.476,-.18+r*.1,6);for(let r=0;r<3;r++)t.put(We(.008,.008,.004,6),n.steel,a,.66+r*.12,-.248-r*.02,Math.PI/2)}}}function Uc(o,t,e=o.m.wood){const{m:n}=o;t.box(e,.42,.04,.42,0,.44,0,.01),t.box(e,.42,.34,.03,0,.5,-.2,.01,-.08);for(const s of[-1,1])for(const a of[-1,1])t.cyl(n.woodDark,.018,.022,.44,s*.18,0,a*.18,8);t.box(n.woodDark,.38,.02,.02,0,.18,.18,.005)}function Bc(o,t,e=.46){t.cyl(o.m.wood,.17,.17,.04,0,e-.04,0,20);for(let n=0;n<3;n++){const s=n/3*Math.PI*2;t.strut(o.m.woodDark,[Math.cos(s)*.13,e-.04,Math.sin(s)*.13],[Math.cos(s)*.2,0,Math.sin(s)*.2],.018,6)}}function Gc(o,t,e=1.4,n=.8,s=.75,a=o.m.wood){t.box(a,e,.045,n,0,s-.045,0,.012);for(const i of[-1,1])for(const r of[-1,1])t.box(o.m.woodDark,.06,s-.045,.06,i*(e/2-.08),0,r*(n/2-.08),.01);t.box(o.m.woodDark,e-.2,.05,.03,0,s-.13,n/2-.08,.008)}function Wc(o,t,e=.6,n=.74){t.cyl(o.m.wood,e,e,.04,0,n-.04,0,36),t.cyl(o.m.woodDark,.05,.07,n-.04,0,0,0,12),t.cyl(o.m.woodDark,.28,.3,.04,0,0,0,20)}function Oc(o,t,e=1.5,n=.75,s=.75){const{m:a}=o;t.box(a.wood,e,.04,n,0,s-.04,0,.012),t.box(a.woodDark,.04,s-.04,n-.06,-e/2+.05,0,0,.008),t.box(a.woodDark,.5,s-.04,n-.06,e/2-.3,0,0,.008);for(let i=0;i<3;i++)t.box(a.wood,.44,.17,.02,e/2-.3,.06+i*.21,n/2-.02,.006),t.box(a.brass,.1,.014,.014,e/2-.3,.14+i*.21,n/2+.005,.004)}function Lc(o,t,e=2.2,n=2.4,s=5,a=1){const{m:i,p:r}=o,c=qo(a);t.box(i.woodDark,.05,n,.34,-e/2+.025,0,0,.008),t.box(i.woodDark,.05,n,.34,e/2-.025,0,0,.008),t.box(i.woodDark,e,n,.02,0,0,-.16,.006),t.box(i.wood,e,.05,.36,0,n,0,.01);const l=(n-.1)/s;for(let h=0;h<=s;h++)t.box(i.wood,e-.08,.035,.32,0,.05+h*l,0,.008);for(let h=0;h<s;h++){let d=-e/2+.08;for(;d<e/2-.12;){const p=.03+c()*.035,m=l*(.55+c()*.38);c()>.07&&t.box(r.books[Math.floor(c()*r.books.length)],p,m,.22+c()*.05,d+p/2,.085+h*l,.01,.004,0,0,(c()-.5)*(c()>.9?.4:0)),d+=p+.004}}}function Vc(o,t,e=4,n=3){const s=qo(n);let a=0;for(let i=0;i<e;i++){const r=.03+s()*.03,c=o.p.books[Math.floor(s()*o.p.books.length)],l=Math.max(.1,.26-i*.012),h=t.child(0,a,0,(s()-.5)*.4);if(h.box(c,l,.003,.19,0,0,0,.001),h.box(o.m.paper,l-.01,r-.006,.18,.002,.003,0,.001),h.box(c,l,.003,.19,0,r-.003,0,.001),h.box(c,.006,r,.19,-l/2+.003,0,0,.001),o.detail==="high"){for(const d of[-.06,.06])h.box(o.m.brass,.001,r*.6,.006,-l/2-6e-4,r*.2,d,0);h.box(o.m.brass,l*.45,8e-4,.035,0,r+2e-4,0,0)}a+=r}}function Hc(o,t){for(const e of[-1,1])t.box(o.p.leather,.216,.009,.3,e*.108,.002,0,.003),t.put(S1(e,o.detail==="high"?10:4),o.m.paper),o.detail==="high"&&t.put(A1(e),o.p.printInk);t.strut(o.p.leather,[0,.015,-.15],[0,.015,.15],.008,8),o.detail==="high"&&t.put(T1(),o.p.fabricRed)}function $c(o,t,e=.62,n=.36,s=o.p.screenOn){t.cyl(o.p.plasticDark,.1,.13,.015,0,0,0,16),t.box(o.p.plasticDark,.04,.2,.03,0,.01,0,.006),t.box(o.p.plasticDark,e+.03,n+.03,.03,0,.2,0,.01),t.put(new St(e,n),s,0,.2+(n+.03)/2,.0166)}function jc(o,t,e=o.p.screenOn){t.box(o.m.steel,.34,.015,.23,0,0,0,.005),t.box(o.p.plasticDark,.292,.0015,.101,0,.0152,-.026,.001),t.box(o.p.plasticDark,.098,.001,.048,0,.0153,.073,.001),t.box(o.m.steel,.094,.001,.044,0,.0164,.073,.001),t.strut(o.m.darkSteel,[-.115,.018,-.103],[.115,.018,-.103],.008,8);const n=.3,s=Math.cos(n),a=Math.sin(n),i=(r,c,l,h,d)=>t.put(r,c,l,.018+h*s+d*a,-.103-h*a+d*s,-n);if(i(us(.34,.22,.009,.004),o.m.steel,0,.11,0),i(new St(.315,.193),o.p.plasticDark,0,.11,.005),i(new St(.295,.169),e,0,.11,.0056),o.detail==="high"){for(let r=0;r<4;r++)for(let c=0;c<10;c++)t.box(o.m.darkSteel,.023,.0018,.017,-.125+c*.0278,.0168,-.063+r*.023,5e-4);t.box(o.m.darkSteel,.11,.0018,.013,0,.0168,.026,5e-4);for(const r of[-.157,.157])for(let c=0;c<6;c++)t.box(o.p.plasticDark,.003,6e-4,.01,r,.0155,-.067+c*.016,0);i(new St(.258,.009),o.m.paper,0,.174,.0059);for(let r=0;r<4;r++)i(new St(.16-r*.018,.003),o.m.paper,-.024,.145-r*.02,.0059);i(new St(.003,.003),o.p.plasticDark,0,.212,.0058)}}function Yc(o,t,e=o.p.screenOn){t.box(o.p.plasticDark,.07,.008,.145,0,0,0,.004),t.put(new St(.062,.13),e,0,.0085,0,-Math.PI/2)}function Kc(o,t){t.box(o.m.woodDark,.6,1,.45,0,0,0,.015),t.box(o.m.wood,.7,.04,.55,0,1,0,.01,-.28),t.box(o.m.brass,.4,.012,.012,0,.98,.22,.003)}function Xc(o,t,e=2.4,n=1.2,s=o.p.boardGreen){t.box(o.m.woodDark,e+.12,n+.12,.05,0,0,0,.012),t.box(s,e,n,.02,0,.06,.03,.006),t.box(o.m.wood,e*.7,.04,.08,0,.04,.07,.008)}function Zc(o,t,e=.5,n=5){const s=qo(n);t.put(new Rt(e,e*1.04,.38,24,1,!0),o.m.stoneDark,0,.19,0),t.put(P1(e,.08),o.m.stone,0,.355,0),t.cyl(o.m.soil,e*.88,e*.88,.045,0,.31,0,24);const a=ns();for(const i of rs(n*13+5,e*.62,o.detail==="high"?96:30)){const r=i.attributes.color;for(let c=0;c<r.count;c++)r.setXYZ(c,r.getX(c)*.82,r.getY(c)*.82,r.getZ(c)*.82);t.put(i,a,0,.66,0)}for(let i=0;i<(o.detail==="high"?7:3);i++){const r=s()*Math.PI*2,c=Math.sqrt(s())*e*.6,l=Math.cos(r)*c,h=Math.sin(r)*c,d=.78+s()*.22,p=e*(.12+s()*.05);t.strut(o.m.leaf,[l*.85,.35,h*.85],[l,d,h],.008,5);const m=t.child(l,d,h,r),u=o.detail==="high"?6:4;for(let g=0;g<u;g++)m.put(R1(),i%2?o.p.fabricCream:o.p.fabricRed,0,0,0,0,g/u*Math.PI*2,0,p,p,p);m.put(new mt(p*.25,8,5),o.p.books[3],0,.008,0,0,0,0,1,.55,1)}}function qc(o,t,e=3.4){t.cyl(o.m.slate,.14,.18,.18,0,0,0,10),t.cyl(o.m.slate,.045,.065,e,0,.18,0,8),t.strut(o.m.slate,[0,e+.18,0],[.45,e+.3,0],.03,5),t.put(new $e(.26,.2,8),o.m.slate,.5,e+.34),t.cyl(o.m.lampGlass,.12,.18,.32,.5,e-.02,0,8)}function Qc(o,t,e,n=1,s=o.m.steel){const a=Math.max(2,Math.round(e/1));for(let i=0;i<=a;i++)t.cyl(s,.02,.025,n,i/a*e,0,0,8);t.box(s,e,.04,.04,e/2,n,0,.01),t.box(s,e,.025,.025,e/2,n*.5,0,.006)}function Jc(o,t,e=2,n=4,s=.17,a=.32){for(let i=0;i<n;i++)t.box(o.m.stoneWarm,e,s*(i+1),a,0,0,i*a,.015)}function tl(o,t,e=.6,n=.45,s=.5){t.box(o.m.wood,e,n,s,0,0,0,.012);for(let a=1;a<3;a++)t.box(o.m.woodDark,e+.004,.025,s+.004,0,n*a/3,0,.004);for(const a of[-1,1])t.box(o.m.woodDark,.04,n+.004,s+.004,a*(e/2-.03),0,0,.004)}function el(o,t,e=.28,n=.7){t.put(We(e*.92,e*.92,n,20),o.m.woodDark,0,n/2,0),t.put(We(e,e,n*.5,20),o.m.woodDark,0,n/2,0);for(const s of[.14,.4,.6])t.put(new Pt(e*.98,.012,5,24),o.m.darkSteel,0,s*(n/.74),0,Math.PI/2)}function ol(o,t,e=.5,n=.7,s=.25,a=o.p.fabricBlue){t.box(a,e,n,s,0,.05,0,.04),t.box(o.m.darkSteel,.03,n*.5,.03,0,n+.05,-s*.2,.005),t.box(o.m.darkSteel,e*.5,.025,.03,0,n+.28,-s*.2,.005);for(const i of[-1,1])t.cyl(o.p.plasticDark,.025,.025,.05,i*(e/2-.06),0,0,10)}function nl(o,t,e=.6,n=.45,s=o.p.fabricCream){t.box(o.m.woodDark,e+.06,n+.06,.03,0,0,0,.008),t.put(new St(e,n),s,0,n/2+.03,.017)}function sl(o,t,e=.2){t.cyl(o.m.brass,.1,.12,.03,0,0,0,16),t.cyl(o.m.brass,.015,.015,.2,0,.03,0,8),t.put(new mt(e,24,16),o.p.fabricBlue,0,.3+e*.5,0,.4),t.put(new Pt(e*1.08,.01,6,36,Math.PI*1.5),o.m.brass,0,.3+e*.5,0,.4,Math.PI/2)}function al(o,t){t.cyl(o.p.ceramic,.055,.055,.008,0,0,0,16),t.cyl(o.p.ceramic,.04,.03,.065,0,.008,0,16),t.put(new Pt(.02,.006,5,10,Math.PI),o.p.ceramic,.05,.04,0,0,0,-Math.PI/2)}function il(o,t,e=2.4,n=1,s=8,a=o.p.fabricRed,i=o.p.fabricCream){for(let r=0;r<s;r++)t.box(r%2?i:a,e/s,.015,n,-e/2+(r+.5)*(e/s),2.3,n/2,.004,.32);t.box(o.m.woodDark,e+.06,.05,.05,0,2.62,.02,.01);for(const r of[-1,1])t.cyl(o.m.woodDark,.025,.03,2.4,r*(e/2),0,n-.05,8)}function rl(o,t,e=1.4,n=o.m.terracottaRoof){for(const[s,a]of[[-1,-1],[1,-1],[-1,1],[1,1]])t.cyl(o.m.woodDark,.06,.07,2.4,s*e,0,a*e,10);t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,-e,.01),t.box(o.m.woodDark,e*2+.2,.1,.1,0,2.4,e,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,-e,2.4,0,.01),t.box(o.m.woodDark,.1,.1,e*2+.2,e,2.4,0,.01),t.put(new $e(e*1.7,1,4),n,0,3,0,0,Math.PI/4),t.ball(o.m.brass,.07,0,3.55,0)}const Ds=.045;function D1(o,t){const e=Math.min(1.65,t-.35),n=Math.min(.56,Math.max(.2,(o-1.25)/2)),s=Math.min(1.2,t-.8),a=Math.min(.64,t-s-.16),i=.025,r=.025,c=.05,l=Math.max(i,r,Ds),h=o/2-c-l-n/2;return[{kind:"door",x:0,y:.3,width:Math.min(.82,o-.08),height:e},{kind:"window",x:-h,y:s,width:n,height:a,sillOverhang:i,lintelOverhang:r},{kind:"window",x:h,y:s,width:n,height:a,curtain:!0,sillOverhang:i,lintelOverhang:r}]}function C1(o,t,e,n,s,a,i,r){const c=[...new Set([-e/2,e/2,...r.flatMap(l=>[l.x-l.width/2,l.x+l.width/2])])].sort((l,h)=>l-h);for(let l=0;l<c.length-1;l++){const h=c[l],d=c[l+1];if(d-h<.006)continue;const p=(h+d)/2,m=r.filter(g=>p>g.x-g.width/2&&p<g.x+g.width/2).sort((g,v)=>g.y-v.y);let u=a;for(const g of m){const v=Z.clamp(g.y,a,n),M=Z.clamp(g.y+g.height,a,n);v-u>.006&&o.box(t,d-h,v-u,i,p,u,s-i/2,0),u=Math.max(u,M)}n-u>.006&&o.box(t,d-h,n-u,i,p,u,s-i/2,0)}}function cl(o,t,e=2.4,n=2.6,s=2.2,a=o.m.terracottaRoof,i=o.m.paper){const{m:r}=o,c=.3,l=Math.max(.1,n-c),h=Math.min(.16,s*.12),d=s/2,p=D1(e,n),m=p[0],u=p.slice(1);t.box(r.stoneDark,e+.1,c,s+.1,0,0,0,.02),t.box(i,h,l,s,-e/2+h/2,c,0,0),t.box(i,h,l,s,e/2-h/2,c,0,0),t.box(i,e,l,h,0,c,-s/2+h/2,0),C1(t,i,e,n,d,c,h,p),t.put(mn(e+.5,.95+e*.12,s+.5),a,0,n,0),t.put(mn(e+.3,.8+e*.12,s+.3),r.woodDark,0,n-.04,0,0,0,0,1,.97,.99);const g=.06,v=d+.008,M=m.x-m.width/2,f=m.x+m.width/2,x=d-h/2+.01,w=Math.max(.2,m.height-.08),y=m.y+w;t.box(r.woodDark,g,w,h+.04,M+g/2,m.y,x,.008),t.box(r.woodDark,g,w,h+.04,f-g/2,m.y,x,.008),t.box(r.woodDark,m.width,.08,h+.04,m.x,y,x,.008);const k=Math.max(.48,m.width-g*2-.08),S=m.height-.11;if(t.box(r.wood,k,S,.055,m.x,m.y,v,.008),o.detail==="high"){for(const b of[m.y+.56,m.y+1.12])b<m.y+S-.04&&t.box(r.woodDark,k-.08,.025,.012,m.x,b,v+.034,.003);for(const b of[-.14,0,.14])t.box(r.woodDark,.012,S-.12,.012,m.x+b,m.y+.06,v+.034,.002);for(const b of[m.y+.16,m.y+m.height-.22])t.box(r.brass,.035,.075,.012,M+g/2,b,v+.038,.003)}t.box(r.stoneWarm,Math.max(.9,m.width+.38),.16,.45,0,0,d+.22,.02),t.box(r.brass,.05,.05,.04,m.x+Math.min(.24,k*.4),m.y+Math.min(.75,S*.49),v+.04,.008);for(const b of u){const A=t.child(b.x,b.y,d+.006);z1(o,A,b.width,b.height,{cols:o.detail==="high"?2:1,rows:o.detail==="high"?2:1,curtain:o.detail==="high"&&b.curtain,lit:!0,frame:r.woodDark,recess:h+.03,sillOverhang:b.sillOverhang,lintelOverhang:b.lintelOverhang});const T=h,P=d-T/2;for(const R of[-1,1])t.box(r.woodDark,.025,b.height,T,b.x+R*b.width/2,b.y,P,.003)}t.box(r.stoneDark,.32,1,.32,e/2-.45,n+.15,-s/4,.02)}function ll(o,t,e=2.4,n=1,s=1){t.put(We(e+.28,e+.34,.3,40),o.m.stoneDark,0,.15,0,0,0,0,n,1,s),t.put(We(e,e,.2,40),o.p.water,0,.27,0,0,0,0,n,1,s)}function ul(o,t,e=3.2,n=1,s=o.p.fabricCream,a=o.m.woodDark){const{m:i}=o,r=e*.3,c=e*.22,l=new xe;l.moveTo(-e/2,c),l.lineTo(-e*.36,0),l.lineTo(e*.3,0),l.quadraticCurveTo(e*.5,c*.25,e/2+.12,c*.92),l.lineTo(-e/2,c);const h=new _e(l,{depth:r,bevelEnabled:!0,bevelThickness:.03,bevelSize:.03,bevelSegments:1});h.translate(0,0,-r/2),t.put(h,a,0,.05,0),t.box(o.p.fabricRed,e*.98,.05,.04,0,c*.95,r/2+.02,.01),t.box(o.p.fabricRed,e*.98,.05,.04,0,c*.95,-r/2-.02,.01),t.box(i.wood,e*.9,.04,r*.92,0,c*.9,0,.01);for(let p=0;p<9;p++)for(const m of[-1,1])t.box(i.woodDark,.02,c*.22,.02,-e*.42+p*e*.1,c*.95,m*(r/2-.02),.004);t.box(i.woodDark,e*.22,c*.55,r*.7,-e*.3,c*.92,0,.02),t.box(i.slate,e*.1,.1,.02,-e*.3,c*1.25,r*.36,.005),t.box(i.woodDark,.02,c*.6,r*.12,-e/2-.02,c*.2,0,.004),t.strut(i.woodDark,[-e/2-.02,c*.75,0],[-e/2+.2,c*1,0],.012,5),t.strut(i.woodDark,[e/2-.1,c*.95,0],[e/2+.28,c*1.35,0],.02,6),t.put(new Pt(.05,.01,6,14,Math.PI),i.darkSteel,e*.36,c*.9,r/2+.05,0,0,Math.PI),t.strut(i.darkSteel,[e*.36,c*.9,r/2+.05],[e*.36,c*.9+.14,r/2+.05],.008,4),t.cyl(i.wood,.07,.07,.04,e*.2,c*.93,r*.25,12);const d=e*.5/Math.max(1,n);for(let p=0;p<n;p++){const m=e*.12-p*d*.9,u=e*(.95-p*.12),g=c*.92;t.cyl(i.woodDark,.022,.04,u,m,g,0,10);const v=g+u*.92,M=g+u*.3,f=e*.34;t.strut(i.woodDark,[m,v,-f/2],[m,v,f/2],.014,6),t.strut(i.woodDark,[m,M,-f/2*1.1],[m,M,f/2*1.1],.016,6);const x=new St(1,1,12,10),w=x.attributes.position,y=v-M;for(let k=0;k<w.count;k++){const S=w.getX(k)+.5,b=w.getY(k)+.5,A=f/2*(.78+.22*(1-b)),T=(S-.5)*2*A,P=M+b*y,R=Math.sin(S*Math.PI)*Math.sin(b*Math.PI*.9+.2)*.1*e*.3;w.setXYZ(k,R,P,T)}x.computeVertexNormals(),t.put(x,s,m,0,0);for(let k=1;k<5;k++)t.strut(i.woodDark,[m+.012,M+y*k/5,-f/2*.86],[m+.012,M+y*k/5,f/2*.86],.004,4);t.cyl(i.woodDark,.07,.06,.04,m,v+.02,0,10),t.strut(i.steel,[m,g+u,0],[e/2+.05,c*.9,0],.008,4),t.strut(i.steel,[m,g+u,0],[-e/2,c*1,0],.008,4);for(const k of[-1,1]){t.strut(i.steel,[m,v,0],[m,c*.95,k*(r/2+.03)],.006,4);for(let S=1;S<6;S++){const b=S/6;t.strut(i.steel,[m,v-(v-c*.95)*b,k*(r/2+.03)*b],[m+.001,v-(v-c*.95)*b,k*(r/2+.03)*b+0],.004,3)}}p===0&&t.box(o.p.fabricRed,.22,.14,.01,m+.11,g+u+.06,0,.003)}}function hl(o,t,e=4.4,n=3.4,s=2.6,a=o.p.canvasOlive){for(const i of[-1,1])for(const r of[-1,1])t.cyl(o.m.woodDark,.05,.06,s,i*(e/2-.1),0,r*(n/2-.1),10);for(const i of[-1,1])t.box(a,e+.4,.04,n*.62,0,s+.28,i*n*.27,.01,-i*.22);t.box(o.m.woodDark,e+.1,.06,.06,0,s+.5,0,.01),t.box(a,e+.3,.45,.03,0,s-.4,n/2+.02,.01)}function fl(o,t,e,n=2.6){t.cyl(o.m.woodDark,.06,.085,n,0,0,0,10),t.cyl(o.m.stoneDark,.2,.24,.18,0,0,0,12),e.forEach((s,a)=>{const i=n-.3-a*.34,r=s.len??.95,c=t.child(0,i,0,s.yaw);c.box(s.tone??o.m.wood,r,.24,.045,r/2-.05,0,0,.012),c.put(new $e(.16,.2,3),s.tone??o.m.wood,r+.04,.12,0,0,0,-Math.PI/2,1,1,.3),c.box(o.m.paper,r*.6,.05,.01,r/2-.05,.1,.03,.003)}),t.ball(o.m.brass,.07,0,n+.05,0)}function dl(o,t,e=o.p.fabricRed){const{m:n}=o;for(const s of[-.55,.55]){t.put(new Pt(.33,.018,8,28),n.darkSteel,s,.36,0);for(let a=0;a<6;a++){const i=a/6*Math.PI;t.strut(n.steel,[s+Math.cos(i)*.32,.36+Math.sin(i)*.32,0],[s-Math.cos(i)*.32,.36-Math.sin(i)*.32,0],.004,3)}t.cyl(n.steel,.03,.03,.05,s,.36,0,8)}t.strut(e,[-.55,.36,0],[-.1,.38,0],.016,6),t.strut(e,[-.1,.38,0],[.4,.74,0],.016,6),t.strut(e,[-.55,.36,0],[-.1,.75,0],.016,6),t.strut(e,[-.1,.75,0],[.4,.74,0],.016,6),t.strut(e,[.4,.74,0],[.55,.36,0],.016,6),t.box(o.p.leather,.22,.04,.1,-.12,.8,0,.015),t.strut(n.darkSteel,[.4,.74,0],[.38,.95,0],.012,5),t.box(n.darkSteel,.03,.03,.4,.38,.95,0,.008)}function ml(o,t,e=6,n=.72){const s=Math.floor(e/.42);for(let a=0;a<=s;a++)t.box(o.m.woodDark,.2,.1,n+.7,a/s*e,0,0,.02);for(const a of[-1,1])t.box(o.m.steel,e,.07,.07,e/2,.1,a*n/2,.012)}function pl(o,t,e=.55,n=o.p.fabricRed){t.cyl(o.m.darkSteel,.012,.012,1.5,0,0,0,6),t.put(new $e(e,.28,16,1,!0),n,0,1.58,0),t.ball(o.m.brass,.025,0,1.76,0)}function xl(o,t,e=2.4){for(const a of[-1,1])t.strut(o.m.wood,[a*.22,0,.3],[a*.22,e,.3-e*.2],.025,6);const s=Math.floor(e/.3);for(let a=1;a<=s;a++){const i=a*.3/e;t.box(o.m.woodDark,.44,.03,.08,0,i*e-.015,.3-i*e*.2,.008)}for(const a of[-1,1])t.cyl(o.p.plasticDark,.03,.03,.04,a*.22,0,.3,8)}function gl(o,t,e=2){const n=qo(e);t.box(o.m.wood,1.2,.05,.5,0,.35,0,.012),t.box(o.m.woodDark,1.2,.3,.04,0,.35,-.23,.01);for(const s of[-1,1])t.box(o.m.woodDark,.05,.8,.5,s*.58,.35,0,.01);t.box(o.m.woodDark,1.2,.04,.4,0,.7,0,.01,-.2);for(const s of[-1,1])for(const a of[-1,1])t.put(new Pt(.1,.03,8,14),o.m.darkSteel,s*.5,.12,a*.2,0,Math.PI/2);for(let s=0;s<2;s++){let a=-.52;for(;a<.5;){const i=.04+n()*.03;t.box(o.p.books[Math.floor(n()*o.p.books.length)],i,.18+n()*.1,.22,a+i/2,s===0?.4:.74,-.02,.004,0,0,s===1?-.2:0),a+=i+.004}}}function qo(o){let t=o>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const In=new WeakMap;function z1(o,t,e,n,s={}){const{m:a}=o,i=s.cols??2,r=s.rows??2,c=s.frame??a.woodDark;let l=In.get(o);l||(l={glow:new it({color:16769704,emissive:16757850,emissiveIntensity:.55,roughness:.7}),curtain:new it({color:14272680,roughness:.95,side:ft})},In.set(o,l));const h=Ds;s.lit!==!1&&t.box(l.glow,e-h,n-h,.01,0,h/2,-(s.recess??.02),.002),t.put(new St(e-h*1.4,n-h*1.4),a.glass,0,n/2,.02),t.box(c,e+h*2,h,.08,0,-h,0,.006),t.box(c,e+h*2,h,.08,0,n,0,.006),t.box(c,h,n+h*2,.08,-e/2-h/2,-h,0,.006),t.box(c,h,n+h*2,.08,e/2+h/2,-h,0,.006);for(let m=1;m<i;m++)t.box(c,.022,n,.05,-e/2+e*m/i,0,.03,.003);for(let m=1;m<r;m++)t.box(c,e,.022,.05,0,n*m/r,.03,.003);const d=Math.max(0,s.sillOverhang??.11),p=Math.max(0,s.lintelOverhang??.1);if(t.box(a.stoneWarm,e+d*2,.05,.16,0,-h-.05,.05,.01),t.box(a.stoneDark,e+p*2,.06,.1,0,n+h,.03,.01),s.curtain){for(const m of[-1,1]){const u=new St(e*.3,n*.92,5,1),g=u.attributes.position;for(let v=0;v<g.count;v++)g.setZ(v,Math.sin(g.getX(v)*40)*.012);u.computeVertexNormals(),t.put(u,l.curtain,m*e*.33,n*.5,.06)}t.box(a.brass,e+.08,.015,.015,0,n-.03,.07,.004)}}export{nl as $,qc as A,Gc as B,tl as C,Vc as D,Ic as E,_s as F,Wc as G,ol as H,Zc as I,rl as J,al as K,V1 as L,hs as M,Yc as N,Oc as O,Uc as P,jc as Q,Hc as R,Xc as S,il as T,el as U,sl as V,gc as W,ul as X,hl as Y,Jc as Z,Kc as _,Lo as a,Dt as a$,ll as a0,ml as a1,pl as a2,fl as a3,z1 as a4,dl as a5,Pi as a6,Bc as a7,mn as a8,xl as a9,K1 as aA,pi as aB,Y1 as aC,$1 as aD,q1 as aE,Oi as aF,ic as aG,Mc as aH,yc as aI,W1 as aJ,O1 as aK,L1 as aL,oc as aM,ec as aN,nc as aO,kc as aP,Dc as aQ,Z0 as aR,c0 as aS,mc as aT,Di as aU,U1 as aV,j1 as aW,Ci as aX,_c as aY,cs as aZ,Pc as a_,gl as aa,Lc as ab,$c as ac,pe as ad,Zr as ae,J1 as af,uc as ag,lc as ah,Rc as ai,Fc as aj,hc as ak,ur as al,X1 as am,I1 as an,Oa as ao,Sc as ap,Ac as aq,Tc as ar,zc as as,fc as at,Cc as au,cr as av,H1 as aw,Z1 as ax,wc as ay,dc as az,tc as b,bc as b0,i0 as b1,Q1 as c,Yi as d,sc as e,ac as f,Ja as g,B1 as h,mr as i,We as j,Or as k,fr as l,gi as m,xc as n,us as o,pc as p,ns as q,rc as r,G1 as s,cc as t,vc as u,ss as v,Nc as w,Ec as x,Qc as y,cl as z};
