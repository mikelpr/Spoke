import findObject from "../utils/findObject";

export function getComponents(object) {
  return (
    object.userData.gltfExtensions &&
    object.userData.gltfExtensions.MOZ_hubs_components &&
    object.userData.gltfExtensions.MOZ_hubs_components
  );
}

export function getComponent(object, componentName) {
  const components = getComponents(object);
  return components && components[componentName];
}

export function getGLTFComponents(gltfDef) {
  return gltfDef.extensions && gltfDef.extensions.MOZ_hubs_components;
}

export function getGLTFComponent(gltfDef, componentName) {
  const components = getGLTFComponents(gltfDef);
  return components && components[componentName];
}

export function isKitPieceNode(nodeDef, kitPieceId) {
  const kitPiece = getGLTFComponent(nodeDef, "kit-piece");
  return kitPiece && kitPiece.id === kitPieceId;
}

export function getKitPieceComponent(object) {
  return getComponent(object, "kit-piece");
}

export function isPiece(object, pieceId) {
  const component = getKitPieceComponent(object);
  return component && component.id == pieceId;
}

export function findKitPiece(object, pieceId) {
  return findObject(object, child => isPiece(child, pieceId));
}

export function traverseGltfNode(gltf, nodeIndex, callback) {
  const nodeDef = gltf.nodes && gltf.nodes[nodeIndex];

  if (nodeDef) {
    callback(nodeDef, nodeIndex);

    if (Array.isArray(nodeDef.children)) {
      for (const childIndex of nodeDef.children) {
        traverseGltfNode(gltf, childIndex, callback);
      }
    }
  }
}
