#![deny(clippy::all)]

use scraper::{Html, Selector};

#[macro_use]
extern crate napi_derive;

#[napi(constructor)]
pub struct HTMLHeading {
  pub level: u8,
  pub text: Option<String>,
  pub id: Option<String>,
}

#[napi]
fn extract_headings_from_html(html: String) -> Vec<HTMLHeading> {
  let document = Html::parse_document(&html);

  let heading_selectors = (1..=6)
    .map(|n| Selector::parse(&format!("h{}", n)).unwrap())
    .collect::<Vec<_>>();

  let mut headings = Vec::new();

  for (level, selector) in heading_selectors.into_iter().enumerate() {
    for element in document.select(&selector) {
      let text = element.text().next().map(String::from);
      let id = element.value().attr("id").map(String::from);
      let level = (level + 1) as u8;

      headings.push(HTMLHeading { level, text, id });
    }
  }

  headings
}
