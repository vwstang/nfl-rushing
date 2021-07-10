import fs from "fs";
import hbs from "handlebars";

/**
 * Generates a JS script tag for page compilation with handlebars
 * @param {string} scriptName - file name of js script tag to generate
 * @returns {string} generated script tag
 */
export const scriptGenerator = (scriptName) =>
  `<script src="./${scriptName}.js"></script>`;

/**
 * Compiles an HTML template
 * @param {string} filepath - path to HTML file to be used as basis for compilation
 * @param {string} components - react components rendered to string
 * @param {string} scripts - script tags
 * @returns {string} HTML compiled by handlebars with given context
 */
const pageCompiler = async (filepath, components, scripts) => {
  const template = await fs.readFileSync(filepath, { encoding: "utf-8" });
  const withContext = { components, scripts };
  return hbs.compile(template)(withContext);
};

export default pageCompiler;
