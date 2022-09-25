/**
 * Function which accepts a DOM node and removes all of its child nodes
 */

export const removeChildNodes = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

// Random Colors for Avatar Backgrounds
export const randomDarkColor = [
  "#570211",
  "#7E3110",
  "#004540",
  "#032C4D",
  "#360825"
]