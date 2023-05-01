// segment-to-amplitude.ts
import { Transform } from "jscodeshift";
import { AMPLITUDE_IMPORT_DECLARTION } from "./helpers";

export const parser = "tsx";

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.ImportDeclaration, {
      source: {
        value: "@segment/analytics-next",
      },
    })
    .replaceWith(() => AMPLITUDE_IMPORT_DECLARTION);

  // Find all Segment event tracking calls (analytics.track)
  root
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: { type: "Identifier", name: "analytics" },
        property: { type: "Identifier", name: "track" },
      },
    })
    .replaceWith(({ node }) =>
      j.callExpression(j.identifier("track"), node.arguments)
    );

  return root.toSource();
};

export default transform;
