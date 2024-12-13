import { extractHeadingsFromHtml, HtmlHeading } from "../index";

describe("extractHeadingsFromHtml", () => {
  it("should extract headings with optional IDs and text", () => {
    const html = `
      <html>
          <body>
              <h1 id="header-1">First Heading</h1>
              <h2>Second Heading</h2>
              <h3 id="header-3"></h3>
              <h4></h4>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "First Heading", "header-1"),
      new HtmlHeading(2, "Second Heading", undefined),
      new HtmlHeading(3, "", "header-3"),
      new HtmlHeading(4, "", undefined),
    ]);
  });

  it("should handle HTML with no headings", () => {
    const html = "<html><body><p>No headings here</p></body></html>";
    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([]);
  });

  it("should ignore comments and handle empty headings", () => {
    const html = `
      <html>
          <body>
              <!-- Comment -->
              <h1></h1>
              <h2 id="empty"></h2>
              <h3>Valid Heading</h3>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, undefined, undefined),
      new HtmlHeading(2, "empty", undefined),
      new HtmlHeading(3, "Valid Heading", undefined),
    ]);
  });

  it("should handle nested headings", () => {
    const html = `
      <html>
          <body>
              <div>
                  <h1>Outer H1</h1>
                  <div>
                      <h2>Inner H2</h2>
                  </div>
              </div>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "Outer H1", undefined),
      new HtmlHeading(2, "Inner H2", undefined),
    ]);
  });

  it("should handle various ID scenarios", () => {
    const html = `
      <html>
          <body>
              <h1 id="main">Main Heading</h1>
              <h2 id="sub">Sub Heading</h2>
              <h3>Plain Heading</h3>
              <h4 id="">Empty ID</h4>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "Main Heading", "main"),
      new HtmlHeading(2, "Sub Heading", "sub"),
      new HtmlHeading(3, "Plain Heading", undefined),
      new HtmlHeading(4, "", ""),
    ]);
  });

  it("should handle malformed HTML", () => {
    const html = `
      <html>
          <h1>Broken HTML</h2>
          <h2>Still Works</h3>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "Broken HTML", undefined),
      new HtmlHeading(2, "Still Works", undefined),
    ]);
  });

  it("should correctly interpret HTML with attributes other than id", () => {
    const html = `
      <html>
          <body>
              <h1 class="highlight">Class but no id</h1>
              <h2 id="with-class" class="highlight">Both id and class</h2>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "Class but no id", undefined),
      new HtmlHeading(2, "Both id and class", "with-class"),
    ]);
  });

  it("should handle HTML with multiple headings at same level", () => {
    const html = `
      <html>
          <body>
              <h1>First H1</h1>
              <h1>Second H1</h1>
              <h2>First H2</h2>
              <h2>Second H2</h2>
          </body>
      </html>
      `;

    const result = extractHeadingsFromHtml(html);
    expect(result).toEqual([
      new HtmlHeading(1, "First H1", undefined),
      new HtmlHeading(1, "Second H1", undefined),
      new HtmlHeading(2, "First H2", undefined),
      new HtmlHeading(2, "Second H2", undefined),
    ]);
  });
});
