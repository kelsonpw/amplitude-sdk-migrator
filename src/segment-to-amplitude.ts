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
    .forEach((path) => {
      const memberExpression = path.node.callee;
      if (memberExpression.type === "MemberExpression") {
        // Replace the callee object name from 'analytics' to 'amplitude'
        if (memberExpression.object.type === "Identifier") {
          memberExpression.object.name = "amplitude";
        }
        // Change the callee property name from 'track' to 'logEvent'
        if (memberExpression.property.type === "Identifier") {
          memberExpression.property.name = "logEvent";
        }
      }
    });

  return root.toSource();
};

export default transform;
