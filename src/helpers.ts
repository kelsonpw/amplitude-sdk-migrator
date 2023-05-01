import j, { ImportDeclaration } from "jscodeshift";

export const AMPLITUDE_IMPORT_DECLARTION = j.importDeclaration(
  [
    j.importSpecifier(j.identifier("track")),
    j.importSpecifier(j.identifier("identify")),
    j.importSpecifier(j.identifier("groupIdentify")),
  ],
  j.literal("@amplitude/analytics-browser")
);
