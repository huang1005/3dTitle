define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-d1adddcb","./Transforms-ea828842","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-618451c9","./GeometryAttributes-4fcfcf40","./AttributeCompression-4a67d8a6","./GeometryPipeline-eb4a1424","./EncodedCartesian3-c2974565","./IndexDatatype-53503fee","./IntersectionTests-43aa431f","./Plane-0cab2b36","./VertexFormat-7572c785","./arrayRemoveDuplicates-ebc732b0","./BoundingRectangle-87e702d3","./EllipsoidTangentPlane-6135b6f5","./EllipsoidRhumbLine-8b165373","./PolygonPipeline-7bd8d933","./PolylineVolumeGeometryLibrary-449f1d22","./EllipsoidGeodesic-a4f6440a","./PolylinePipeline-7574302f"],function(c,e,i,u,G,t,n,A,R,D,r,I,a,O,o,l,g,s,p,d,y,S,m,h,f){"use strict";var v={};function B(e,t){c.defined(v[e])||(v[e]=!0,console.warn(c.defaultValue(t,e)))}function b(e){var t=(e=c.defaultValue(e,c.defaultValue.EMPTY_OBJECT)).polylinePositions,n=e.shapePositions;this._positions=t,this._shape=n,this._ellipsoid=u.Ellipsoid.clone(c.defaultValue(e.ellipsoid,u.Ellipsoid.WGS84)),this._cornerType=c.defaultValue(e.cornerType,m.CornerType.ROUNDED),this._vertexFormat=g.VertexFormat.clone(c.defaultValue(e.vertexFormat,g.VertexFormat.DEFAULT)),this._granularity=c.defaultValue(e.granularity,i.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";var r=1+t.length*u.Cartesian3.packedLength;r+=1+n.length*u.Cartesian2.packedLength,this.packedLength=r+u.Ellipsoid.packedLength+g.VertexFormat.packedLength+2}B.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",B.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",B.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",B.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",b.pack=function(e,t,n){var r;n=c.defaultValue(n,0);var i=e._positions,a=i.length;for(t[n++]=a,r=0;r<a;++r,n+=u.Cartesian3.packedLength)u.Cartesian3.pack(i[r],t,n);var o=e._shape,a=o.length;for(t[n++]=a,r=0;r<a;++r,n+=u.Cartesian2.packedLength)u.Cartesian2.pack(o[r],t,n);return u.Ellipsoid.pack(e._ellipsoid,t,n),n+=u.Ellipsoid.packedLength,g.VertexFormat.pack(e._vertexFormat,t,n),n+=g.VertexFormat.packedLength,t[n++]=e._cornerType,t[n]=e._granularity,t};var E=u.Ellipsoid.clone(u.Ellipsoid.UNIT_SPHERE),P=new g.VertexFormat,_={polylinePositions:void 0,shapePositions:void 0,ellipsoid:E,vertexFormat:P,cornerType:void 0,granularity:void 0};b.unpack=function(e,t,n){t=c.defaultValue(t,0);for(var r=e[t++],i=new Array(r),a=0;a<r;++a,t+=u.Cartesian3.packedLength)i[a]=u.Cartesian3.unpack(e,t);r=e[t++];var o=new Array(r);for(a=0;a<r;++a,t+=u.Cartesian2.packedLength)o[a]=u.Cartesian2.unpack(e,t);var l=u.Ellipsoid.unpack(e,t,E);t+=u.Ellipsoid.packedLength;var s=g.VertexFormat.unpack(e,t,P);t+=g.VertexFormat.packedLength;var p=e[t++],d=e[t];return c.defined(n)?(n._positions=i,n._shape=o,n._ellipsoid=u.Ellipsoid.clone(l,n._ellipsoid),n._vertexFormat=g.VertexFormat.clone(s,n._vertexFormat),n._cornerType=p,n._granularity=d,n):(_.polylinePositions=i,_.shapePositions=o,_.cornerType=p,_.granularity=d,new b(_))};var x=new p.BoundingRectangle;return b.createGeometry=function(e){var t=e._positions,n=s.arrayRemoveDuplicates(t,u.Cartesian3.equalsEpsilon),r=e._shape,r=m.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(r);if(!(n.length<2||r.length<3)){S.PolygonPipeline.computeWindingOrder2D(r)===S.WindingOrder.CLOCKWISE&&r.reverse();var i=p.BoundingRectangle.fromPoints(r,x);return function(e,t,n,r){var i=new D.GeometryAttributes;r.position&&(i.position=new R.GeometryAttribute({componentDatatype:A.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var a,o,l,s,p,d=t.length,c=e.length/3,u=(c-2*d)/(2*d),g=S.PolygonPipeline.triangulate(t),y=(u-1)*d*6+2*g.length,m=O.IndexDatatype.createTypedArray(c,y),h=2*d,f=0;for(C=0;C<u-1;C++){for(a=0;a<d-1;a++)p=(o=2*a+C*d*2)+h,s=(l=o+1)+h,m[f++]=l,m[f++]=o,m[f++]=s,m[f++]=s,m[f++]=o,m[f++]=p;s=(l=(o=2*d-2+C*d*2)+1)+h,p=o+h,m[f++]=l,m[f++]=o,m[f++]=s,m[f++]=s,m[f++]=o,m[f++]=p}if(r.st||r.tangent||r.bitangent){for(var v,b,E=new Float32Array(2*c),P=1/(u-1),_=1/n.height,x=n.height/2,k=0,C=0;C<u;C++){for(v=C*P,b=_*(t[0].y+x),E[k++]=v,E[k++]=b,a=1;a<d;a++)b=_*(t[a].y+x),E[k++]=v,E[k++]=b,E[k++]=v,E[k++]=b;b=_*(t[0].y+x),E[k++]=v,E[k++]=b}for(a=0;a<d;a++)v=0,b=_*(t[a].y+x),E[k++]=v,E[k++]=b;for(a=0;a<d;a++)v=(u-1)*P,b=_*(t[a].y+x),E[k++]=v,E[k++]=b;i.st=new R.GeometryAttribute({componentDatatype:A.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(E)})}var V=c-2*d;for(C=0;C<g.length;C+=3){var L=g[C]+V,w=g[C+1]+V,F=g[C+2]+V;m[f++]=L,m[f++]=w,m[f++]=F,m[f++]=F+d,m[f++]=w+d,m[f++]=L+d}var T=new R.Geometry({attributes:i,indices:m,boundingSphere:G.BoundingSphere.fromVertices(e),primitiveType:R.PrimitiveType.TRIANGLES});if(r.normal&&(T=I.GeometryPipeline.computeNormal(T)),r.tangent||r.bitangent){try{T=I.GeometryPipeline.computeTangentAndBitangent(T)}catch(e){B("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}r.tangent||(T.attributes.tangent=void 0),r.bitangent||(T.attributes.bitangent=void 0),r.st||(T.attributes.st=void 0)}return T}(m.PolylineVolumeGeometryLibrary.computePositions(n,r,i,e,!0),r,i,e._vertexFormat)}},function(e,t){return c.defined(t)&&(e=b.unpack(e,t)),e._ellipsoid=u.Ellipsoid.clone(e._ellipsoid),b.createGeometry(e)}});
