# EXTRACT HEADINGS

A JavaScript library for extracting headings (H1-H6) from HTML strings, providing the level, text content, and ID of each heading.

## Installation

```bash
npm install extract-headings
```

## Usage

Here's how to use the extractHeadingsFromHtml function:

```javascript
import { extractHeadingsFromHtml, HtmlHeading } from "extract-headings";

const html = `
<html>
    <body>
        <h1 id="main-title">Welcome to My Site</h1>
        <h2>About Us</h2>
        <h3 id="services">Our Services</h3>
        <h4>Contact</h4>
    </body>
</html>
`;

const headings = extractHeadingsFromHtml(html);

console.log(headings);
// Output would be:
// [
//   HtmlHeading { level: 1, text: 'Welcome to My Site', id: 'main-title' },
//   HtmlHeading { level: 2, text: 'About Us', id: undefined },
//   HtmlHeading { level: 3, text: 'Our Services', id: 'services' },
//   HtmlHeading { level: 4, text: 'Contact', id: undefined }
// ]
```

## API

### Function: `extractHeadingsFromHtml(html: string): Array<HtmlHeading>`

Extracts all heading tags (`h1` to `h6`) from the given HTML string.

**Parameters**:

- `html` - A string containing HTML markup.

**Returns**: An array of `HtmlHeading` objects.

#### `HtmlHeading` Class:

**Properties**:

- `level: number` - The heading level (1-6).
- `text?: string` - The text content of the heading. Can be `undefined` if no text is present.
- `id?: string` - The ID attribute of the heading. Can be `undefined` if no ID is specified.

**Constructor**: `new HtmlHeading(level: number, text?: string, id?: string)`

## Features

- **Efficient parsing**: Utilizes an optimized HTML parser to quickly extract heading information.
- **Flexible**: Handles various HTML structures, including malformed HTML, nested headings, and headings without text or ID attributes.
- **TypeScript Support**: Provides type declarations for better development experience with TypeScript.

## Examples

### Extracting Headings from a Blog Post

```javascript
const blogPostHTML = `
<article>
    <h1>Latest Tech News</h1>
    <h2>New AI Developments</h2>
    <h3 id="section-1">Machine Learning Breakthroughs</h3>
    <h4>Applications in Medicine</h4>
</article>
`;

const headings = extractHeadingsFromHtml(blogPostHTML);
console.log(headings);
```

### Handling Headings Without IDs or Text

```javascript
const htmlWithoutIdOrText = `
<div>
    <h1></h1>
    <h2>No ID Here</h2>
</div>
`;

const headings = extractHeadingsFromHtml(htmlWithoutIdOrText);
console.log(headings);
// Should output:
// [
//   HtmlHeading { level: 1, text: '', id: undefined },
//   HtmlHeading { level: 2, text: 'No ID Here', id: undefined }
// ]
```

## LICENSE

MIT©[但为君故](https://dreams.plus)
