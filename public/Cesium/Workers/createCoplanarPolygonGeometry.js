define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-d1adddcb","./Transforms-ea828842","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-618451c9","./GeometryAttributes-4fcfcf40","./AttributeCompression-4a67d8a6","./GeometryPipeline-eb4a1424","./EncodedCartesian3-c2974565","./IndexDatatype-53503fee","./IntersectionTests-43aa431f","./Plane-0cab2b36","./VertexFormat-7572c785","./GeometryInstance-4bb95a19","./arrayRemoveDuplicates-ebc732b0","./BoundingRectangle-87e702d3","./EllipsoidTangentPlane-6135b6f5","./OrientedBoundingBox-f904645d","./CoplanarPolygonGeometryLibrary-1d5ec88b","./ArcType-dc1c5aee","./EllipsoidRhumbLine-8b165373","./PolygonPipeline-7bd8d933","./PolygonGeometryLibrary-24398836"],function(s,e,V,R,I,t,a,M,H,B,n,w,r,O,o,i,p,A,F,l,c,y,G,m,u,z,L){"use strict";var S=new R.Cartesian3,E=new l.BoundingRectangle,N=new R.Cartesian2,Q=new R.Cartesian2,T=new R.Cartesian3,D=new R.Cartesian3,_=new R.Cartesian3,k=new R.Cartesian3,j=new R.Cartesian3,U=new R.Cartesian3,Y=new I.Quaternion,q=new I.Matrix3,J=new I.Matrix3,W=new R.Cartesian3;function d(e){var t=(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).polygonHierarchy,a=s.defaultValue(e.vertexFormat,p.VertexFormat.DEFAULT);this._vertexFormat=p.VertexFormat.clone(a),this._polygonHierarchy=t,this._stRotation=s.defaultValue(e.stRotation,0),this._ellipsoid=R.Ellipsoid.clone(s.defaultValue(e.ellipsoid,R.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=L.PolygonGeometryLibrary.computeHierarchyPackedLength(t)+p.VertexFormat.packedLength+R.Ellipsoid.packedLength+2}d.fromPositions=function(e){return new d({polygonHierarchy:{positions:(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid})},d.pack=function(e,t,a){return a=s.defaultValue(a,0),a=L.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,a),R.Ellipsoid.pack(e._ellipsoid,t,a),a+=R.Ellipsoid.packedLength,p.VertexFormat.pack(e._vertexFormat,t,a),a+=p.VertexFormat.packedLength,t[a++]=e._stRotation,t[a]=e.packedLength,t};var g=R.Ellipsoid.clone(R.Ellipsoid.UNIT_SPHERE),b=new p.VertexFormat,h={polygonHierarchy:{}};return d.unpack=function(e,t,a){t=s.defaultValue(t,0);var n=L.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;var r=R.Ellipsoid.unpack(e,t,g);t+=R.Ellipsoid.packedLength;var o=p.VertexFormat.unpack(e,t,b);t+=p.VertexFormat.packedLength;var i=e[t++],l=e[t];return s.defined(a)||(a=new d(h)),a._polygonHierarchy=n,a._ellipsoid=R.Ellipsoid.clone(r,a._ellipsoid),a._vertexFormat=p.VertexFormat.clone(o,a._vertexFormat),a._stRotation=i,a.packedLength=l,a},d.createGeometry=function(e){var t=e._vertexFormat,a=e._polygonHierarchy,n=e._stRotation,r=a.positions;if(!((r=F.arrayRemoveDuplicates(r,R.Cartesian3.equalsEpsilon,!0)).length<3)){var o=T,i=D,l=_,s=j,p=U;if(G.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(r,k,s,p)){var c,o=R.Cartesian3.cross(s,p,o);o=R.Cartesian3.normalize(o,o),R.Cartesian3.equalsEpsilon(k,R.Cartesian3.ZERO,V.CesiumMath.EPSILON6)||(c=e._ellipsoid.geodeticSurfaceNormal(k,W),R.Cartesian3.dot(o,c)<0&&(o=R.Cartesian3.negate(o,o),s=R.Cartesian3.negate(s,s)));var y=G.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(k,s,p),m=G.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(k,s,p);t.tangent&&(i=R.Cartesian3.clone(s,i)),t.bitangent&&(l=R.Cartesian3.clone(p,l));var u=L.PolygonGeometryLibrary.polygonsFromHierarchy(a,y,!1),d=u.hierarchy,g=u.polygons;if(0!==d.length){r=d[0].outerRing;for(var b=I.BoundingSphere.fromPoints(r),h=L.PolygonGeometryLibrary.computeBoundingRectangle(o,m,r,n,E),v=[],C=0;C<g.length;C++){var f=new A.GeometryInstance({geometry:function(e,t,a,n,r,o,i,l){var s=e.positions,p=z.PolygonPipeline.triangulate(e.positions2D,e.holes);p.length<3&&(p=[0,1,2]);var c=O.IndexDatatype.createTypedArray(s.length,p.length);c.set(p);var y,m,u=q;0!==n?(y=I.Quaternion.fromAxisAngle(o,n,Y),u=I.Matrix3.fromQuaternion(y,u),(t.tangent||t.bitangent)&&(y=I.Quaternion.fromAxisAngle(o,-n,Y),m=I.Matrix3.fromQuaternion(y,J),i=R.Cartesian3.normalize(I.Matrix3.multiplyByVector(m,i,i),i),t.bitangent&&(l=R.Cartesian3.normalize(R.Cartesian3.cross(o,i,l),l)))):u=I.Matrix3.clone(I.Matrix3.IDENTITY,u);var d=Q;t.st&&(d.x=a.x,d.y=a.y);for(var g=s.length,b=3*g,h=new Float64Array(b),v=t.normal?new Float32Array(b):void 0,C=t.tangent?new Float32Array(b):void 0,f=t.bitangent?new Float32Array(b):void 0,x=t.st?new Float32Array(2*g):void 0,P=0,w=0,A=0,F=0,G=0,L=0;L<g;L++){var E,T,D,_=s[L];h[P++]=_.x,h[P++]=_.y,h[P++]=_.z,t.st&&(E=r(I.Matrix3.multiplyByVector(u,_,S),N),R.Cartesian2.subtract(E,d,E),T=V.CesiumMath.clamp(E.x/a.width,0,1),D=V.CesiumMath.clamp(E.y/a.height,0,1),x[G++]=T,x[G++]=D),t.normal&&(v[w++]=o.x,v[w++]=o.y,v[w++]=o.z),t.tangent&&(C[F++]=i.x,C[F++]=i.y,C[F++]=i.z),t.bitangent&&(f[A++]=l.x,f[A++]=l.y,f[A++]=l.z)}var k=new B.GeometryAttributes;return t.position&&(k.position=new H.GeometryAttribute({componentDatatype:M.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h})),t.normal&&(k.normal=new H.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),t.tangent&&(k.tangent=new H.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:C})),t.bitangent&&(k.bitangent=new H.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),t.st&&(k.st=new H.GeometryAttribute({componentDatatype:M.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:x})),new H.Geometry({attributes:k,indices:c,primitiveType:H.PrimitiveType.TRIANGLES})}(g[C],t,h,n,m,o,i,l)});v.push(f)}var x=w.GeometryPipeline.combineInstances(v)[0];x.attributes.position.values=new Float64Array(x.attributes.position.values),x.indices=O.IndexDatatype.createTypedArray(x.attributes.position.values.length/3,x.indices);var P=x.attributes;return t.position||delete P.position,new H.Geometry({attributes:P,indices:x.indices,primitiveType:x.primitiveType,boundingSphere:b})}}}},function(e,t){return s.defined(t)&&(e=d.unpack(e,t)),d.createGeometry(e)}});
