(self.webpackChunkonboard_notify_react=self.webpackChunkonboard_notify_react||[]).push([[7950],{66017:function(r,n,e){"use strict";e.r(n),e.d(n,{getED25519Key:function(){return i}});var t=e(19961),a=e(99130),f=e.n(a),o=e(30261).Buffer,c=f().lowlevel;function i(r){var n;n="string"===typeof r?o.from(r,"hex"):r;var e=new Uint8Array(64),a=[c.gf(),c.gf(),c.gf(),c.gf()],f=new Uint8Array([].concat((0,t.Z)(new Uint8Array(n)),(0,t.Z)(new Uint8Array(32)))),i=new Uint8Array(32);c.crypto_hash(e,f,32),e[0]&=248,e[31]&=127,e[31]|=64,c.scalarbase(a,e),c.pack(i,a);for(var u=0;u<32;u+=1)f[u+32]=i[u];return{sk:o.from(f),pk:o.from(i)}}},78848:function(){}}]);
//# sourceMappingURL=7950.980a8b3f.chunk.js.map