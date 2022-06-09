define(["exports","./when-54c2dc71","./Check-6c0211bc","./Cartesian2-d1adddcb","./Transforms-ea828842","./ComponentDatatype-6d99a1ee","./GeometryAttribute-618451c9","./GeometryAttributes-4fcfcf40","./GeometryPipeline-eb4a1424","./IndexDatatype-53503fee","./WebMercatorProjection-6cf85d4b"],function(e,v,t,c,P,k,C,w,b,A,f){"use strict";function m(e,t,r){e=v.defaultValue(e,0),t=v.defaultValue(t,0),r=v.defaultValue(r,0),this.value=new Float32Array([e,t,r])}function G(e,t){var r=e.attributes,n=r.position,i=n.values.length/n.componentsPerAttribute;r.batchId=new C.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:1,values:new Float32Array(i)});for(var o=r.batchId.values,a=0;a<i;++a)o[a]=t}function x(e){var t,r=e.instances,n=e.projection,i=e.elementIndexUintSupported,o=e.scene3DOnly,a=e.vertexCacheOptimize,s=e.compressVertices,d=e.modelMatrix,p=r.length;for(y=0;y<p;++y)if(v.defined(r[y].geometry)){r[y].geometry.primitiveType;break}if(!function(e,t,r){var n=!r,i=e.length;if(!n&&1<i)for(var o=e[0].modelMatrix,a=1;a<i;++a)if(!P.Matrix4.equals(o,e[a].modelMatrix)){n=!0;break}if(n)for(a=0;a<i;++a)v.defined(e[a].geometry)&&b.GeometryPipeline.transformToWorldCoordinates(e[a]);else P.Matrix4.multiplyTransformation(t,e[0].modelMatrix,t)}(r,d,o),!o)for(y=0;y<p;++y)v.defined(r[y].geometry)&&b.GeometryPipeline.splitLongitude(r[y]);if(!function(e){for(var t=e.length,r=0;r<t;++r){var n=e[r];v.defined(n.geometry)?G(n.geometry,r):v.defined(n.westHemisphereGeometry)&&v.defined(n.eastHemisphereGeometry)&&(G(n.westHemisphereGeometry,r),G(n.eastHemisphereGeometry,r))}}(r),a)for(y=0;y<p;++y){var u=r[y];v.defined(u.geometry)?(b.GeometryPipeline.reorderForPostVertexCache(u.geometry),b.GeometryPipeline.reorderForPreVertexCache(u.geometry)):v.defined(u.westHemisphereGeometry)&&v.defined(u.eastHemisphereGeometry)&&(b.GeometryPipeline.reorderForPostVertexCache(u.westHemisphereGeometry),b.GeometryPipeline.reorderForPreVertexCache(u.westHemisphereGeometry),b.GeometryPipeline.reorderForPostVertexCache(u.eastHemisphereGeometry),b.GeometryPipeline.reorderForPreVertexCache(u.eastHemisphereGeometry))}var c=b.GeometryPipeline.combineInstances(r);for(p=c.length,y=0;y<p;++y){var f,m,h,l=(t=c[y]).attributes;if(o)for(f in l)l.hasOwnProperty(f)&&l[f].componentDatatype===k.ComponentDatatype.DOUBLE&&b.GeometryPipeline.encodeAttribute(t,f,f+"3DHigh",f+"3DLow");else for(f in l){l.hasOwnProperty(f)&&l[f].componentDatatype===k.ComponentDatatype.DOUBLE&&(m=f+"3D",h=f+"2D",b.GeometryPipeline.projectTo2D(t,f,m,h,n),v.defined(t.boundingSphere)&&"position"===f&&(t.boundingSphereCV=P.BoundingSphere.fromVertices(t.attributes.position2D.values)),b.GeometryPipeline.encodeAttribute(t,m,m+"High",m+"Low"),b.GeometryPipeline.encodeAttribute(t,h,h+"High",h+"Low"))}s&&b.GeometryPipeline.compressVertices(t)}if(!i){for(var g=[],p=c.length,y=0;y<p;++y)t=c[y],g=g.concat(b.GeometryPipeline.fitToUnsignedShortIndices(t));c=g}return c}function S(e,t,r,n){var i,o,a,s,d=n.length-1;s=0<=d?(o=(i=n[d]).offset+i.count,r[a=i.index].indices.length):r[a=o=0].indices.length;for(var p=e.length,u=0;u<p;++u){var c,f=e[u][t];v.defined(f)&&(s<o+(c=f.indices.length)&&(o=0,s=r[++a].indices.length),n.push({index:a,offset:o,count:c}),o+=c)}}Object.defineProperties(m.prototype,{componentDatatype:{get:function(){return k.ComponentDatatype.FLOAT}},componentsPerAttribute:{get:function(){return 3}},normalize:{get:function(){return!1}}}),m.fromCartesian3=function(e){return new m(e.x,e.y,e.z)},m.toValue=function(e,t){return v.defined(t)||(t=new Float32Array([e.x,e.y,e.z])),t[0]=e.x,t[1]=e.y,t[2]=e.z,t};var h={};function i(e,t){for(var r=e.length,n=0;n<r;++n)!function(e,t){var r,n=e.attributes;for(var i in n){n.hasOwnProperty(i)&&(r=n[i],v.defined(r)&&v.defined(r.values)&&t.push(r.values.buffer))}v.defined(e.indices)&&t.push(e.indices.buffer)}(e[n],t)}function o(e){var t=e.length,r=1+(P.BoundingSphere.packedLength+1)*t,n=new Float32Array(r),i=0;n[i++]=t;for(var o=0;o<t;++o){var a=e[o];v.defined(a)?(n[i++]=1,P.BoundingSphere.pack(e[o],n,i)):n[i++]=0,i+=P.BoundingSphere.packedLength}return n}function r(e){for(var t=new Array(e[0]),r=0,n=1;n<e.length;)1===e[n++]&&(t[r]=P.BoundingSphere.unpack(e,n)),++r,n+=P.BoundingSphere.packedLength;return t}h.combineGeometry=function(e){var t,r,n,i,o,a,s,d=e.instances,p=d.length,u=!1;0<p&&(0<(t=x(e)).length&&(r=b.GeometryPipeline.createAttributeLocations(t[0]),e.createPickOffsets&&(S(o=d,"geometry",a=t,s=[]),S(o,"westHemisphereGeometry",a,s),S(o,"eastHemisphereGeometry",a,s),n=s)),v.defined(d[0].attributes)&&v.defined(d[0].attributes.offset)&&(i=new Array(p),u=!0));for(var c=new Array(p),f=new Array(p),m=0;m<p;++m){var h=d[m],l=h.geometry;v.defined(l)&&(c[m]=l.boundingSphere,f[m]=l.boundingSphereCV,u&&(i[m]=h.geometry.offsetAttribute));var g=h.eastHemisphereGeometry,y=h.westHemisphereGeometry;v.defined(g)&&v.defined(y)&&(v.defined(g.boundingSphere)&&v.defined(y.boundingSphere)&&(c[m]=P.BoundingSphere.union(g.boundingSphere,y.boundingSphere)),v.defined(g.boundingSphereCV)&&v.defined(y.boundingSphereCV)&&(f[m]=P.BoundingSphere.union(g.boundingSphereCV,y.boundingSphereCV)))}return{geometries:t,modelMatrix:e.modelMatrix,attributeLocations:r,pickOffsets:n,offsetInstanceExtend:i,boundingSpheres:c,boundingSpheresCV:f}},h.packCreateGeometryResults=function(e,t){var r=new Float64Array(function(e){for(var t=1,r=e.length,n=0;n<r;n++){var i=e[n];if(++t,v.defined(i)){var o=i.attributes;for(var a in t+=7+2*P.BoundingSphere.packedLength+(v.defined(i.indices)?i.indices.length:0),o){o.hasOwnProperty(a)&&v.defined(o[a])&&(t+=5+o[a].values.length)}}}return t}(e)),n=[],i={},o=e.length,a=0;r[a++]=o;for(var s=0;s<o;s++){var d=e[s],p=v.defined(d);if(r[a++]=p?1:0,p){r[a++]=d.primitiveType,r[a++]=d.geometryType,r[a++]=v.defaultValue(d.offsetAttribute,-1);var u=v.defined(d.boundingSphere)?1:0;(r[a++]=u)&&P.BoundingSphere.pack(d.boundingSphere,r,a),a+=P.BoundingSphere.packedLength;var c=v.defined(d.boundingSphereCV)?1:0;(r[a++]=c)&&P.BoundingSphere.pack(d.boundingSphereCV,r,a),a+=P.BoundingSphere.packedLength;var f=d.attributes,m=[];for(var h in f)f.hasOwnProperty(h)&&v.defined(f[h])&&(m.push(h),v.defined(i[h])||(i[h]=n.length,n.push(h)));r[a++]=m.length;for(var l=0;l<m.length;l++){var g=m[l],y=f[g];r[a++]=i[g],r[a++]=y.componentDatatype,r[a++]=y.componentsPerAttribute,r[a++]=y.normalize?1:0,r[a++]=y.values.length,r.set(y.values,a),a+=y.values.length}var b=v.defined(d.indices)?d.indices.length:0;0<(r[a++]=b)&&(r.set(d.indices,a),a+=b)}}return t.push(r.buffer),{stringTable:n,packedData:r}},h.unpackCreateGeometryResults=function(e){for(var t=e.stringTable,r=e.packedData,n=new Array(r[0]),i=0,o=1;o<r.length;){if(1===r[o++]){var a,s,d=r[o++],p=r[o++],u=r[o++];-1===u&&(u=void 0),1===r[o++]&&(a=P.BoundingSphere.unpack(r,o)),o+=P.BoundingSphere.packedLength,1===r[o++]&&(s=P.BoundingSphere.unpack(r,o)),o+=P.BoundingSphere.packedLength;var c=new w.GeometryAttributes,f=r[o++];for(S=0;S<f;S++){for(var m=t[r[o++]],h=r[o++],l=r[o++],g=0!==r[o++],y=r[o++],b=k.ComponentDatatype.createTypedArray(h,y),v=0;v<y;v++)b[v]=r[o++];c[m]=new C.GeometryAttribute({componentDatatype:h,componentsPerAttribute:l,normalize:g,values:b})}if(0<(y=r[o++]))for(var G=b.length/l,x=A.IndexDatatype.createTypedArray(G,y),S=0;S<y;S++)x[S]=r[o++];n[i++]=new C.Geometry({primitiveType:d,geometryType:p,boundingSphere:a,boundingSphereCV:s,indices:x,attributes:c,offsetAttribute:u})}else n[i++]=void 0}return n},h.packCombineGeometryParameters=function(e,t){for(var r=e.createGeometryResults,n=r.length,i=0;i<n;i++)t.push(r[i].packedData.buffer);return{createGeometryResults:e.createGeometryResults,packedInstances:function(e,t){var r=e.length,n=new Float64Array(1+19*r),i=0;n[i++]=r;for(var o=0;o<r;o++){var a,s=e[o];P.Matrix4.pack(s.modelMatrix,n,i),i+=P.Matrix4.packedLength,v.defined(s.attributes)&&v.defined(s.attributes.offset)&&(a=s.attributes.offset.value,n[i]=a[0],n[i+1]=a[1],n[i+2]=a[2]),i+=3}return t.push(n.buffer),n}(e.instances,t),ellipsoid:e.ellipsoid,isGeographic:e.projection instanceof P.GeographicProjection,elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:e.modelMatrix,createPickOffsets:e.createPickOffsets}},h.unpackCombineGeometryParameters=function(e){for(var t=function(e){for(var t=e,r=new Array(t[0]),n=0,i=1;i<t.length;){var o,a=P.Matrix4.unpack(t,i);i+=P.Matrix4.packedLength,v.defined(t[i])&&(o={offset:new m(t[i],t[i+1],t[i+2])}),i+=3,r[n++]={modelMatrix:a,attributes:o}}return r}(e.packedInstances),r=e.createGeometryResults,n=r.length,i=0,o=0;o<n;o++)for(var a=h.unpackCreateGeometryResults(r[o]),s=a.length,d=0;d<s;d++){var p=a[d];t[i].geometry=p,++i}var u=c.Ellipsoid.clone(e.ellipsoid);return{instances:t,ellipsoid:u,projection:e.isGeographic?new P.GeographicProjection(u):new f.WebMercatorProjection(u),elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:P.Matrix4.clone(e.modelMatrix),createPickOffsets:e.createPickOffsets}},h.packCombineGeometryResults=function(e,t){v.defined(e.geometries)&&i(e.geometries,t);var r=o(e.boundingSpheres),n=o(e.boundingSpheresCV);return t.push(r.buffer,n.buffer),{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:r,boundingSpheresCV:n}},h.unpackCombineGeometryResults=function(e){return{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:r(e.boundingSpheres),boundingSpheresCV:r(e.boundingSpheresCV)}},e.PrimitivePipeline=h});
