function stripIndent(str) {
  const lines = str.split("\n");
  let minIndent = Infinity;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const indent = line.search(/\S/);

    if (indent !== -1 && indent < minIndent) {
      minIndent = indent;
    }
  }

  if (minIndent !== Infinity) {
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].slice(minIndent);
    }
  }

  return lines.join("\n");
}

const Editor = toastui.Editor;

function katexPlugin() {
  const toHTMLRenderers = {
    katex(node) {
      console.log("HI");

      let html = katex.renderToString(node.literal, {
        throwOnError: false,
      });

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true },
      ];
    },
  };

  return { toHTMLRenderers };
}

const viewer1TemplateEl = document.querySelector("#viewer-1-template");
const viewer1MarkdownSource = stripIndent(viewer1TemplateEl.innerHTML);

console.log("viewer1MarkdownSource : " + viewer1MarkdownSource);

const viewer1 = Editor.factory({
  el: document.querySelector("#viewer-1"),
  viewer: true,
  initialValue: viewer1MarkdownSource,
  plugins: [
    [toastui.Editor.plugin.codeSyntaxHighlight, { highlighter: Prism }],
    katexPlugin,
    [
      toastui.Editor.plugin.uml,
      { rendererURL: "http://www.plantuml.com/plantuml/svg/" },
    ],
  ],
});
