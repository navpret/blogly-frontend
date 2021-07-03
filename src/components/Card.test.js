import * as React from "react";
import { render } from "@testing-library/react";

import Card from "./Card";
import { BrowserRouter as Router } from "react-router-dom";

const sampleData = {
  imgSrc:
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
  title: "The trip to japan",
  content:
    "<h1>Intorduction</h1><p>My journey started in the midst of nowhere</p>",
  createdAt: "2021-06-18T08:55:30.588Z",
};

test("Card is rendered properly", () => {
  const { getByText, getByRole } = render(
    <Router>
      <Card post={sampleData} />
    </Router>
  );

  // Description text
  getByText("Sneak Peak");

  // Time text
  getByText(/ago/i); // All cards have ago text to display time published

  // Title Text
  const title = getByRole("title");
  expect(title).toBeTruthy();
});
