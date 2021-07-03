import * as React from "react";
import { render, fireEvent } from "@testing-library/react";

import Compose from "./Compose";

test("Create BLog", async () => {
  const { getByText, getByPlaceholderText } = render(<Compose />);

  const title = getByPlaceholderText(/title/i);
  const postAs = getByPlaceholderText(/as/i);
  const content = getByPlaceholderText("content");
  const button = getByText(/Post/i);

  fireEvent.change(title, { target: { value: "TestTitle" } });
  fireEvent.change(postAs, { target: { value: "Test name" } });
  fireEvent.change(content, { target: { value: "Test content" } });
  // fireEvent.click()
  fireEvent.click(button);

  // await getByText(/Posted/i);
});
