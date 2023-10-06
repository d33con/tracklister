import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/pages";
import { RecoilRoot } from "recoil";

it("should have Latest Mixes text", async () => {
  render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );

  const myElem = screen.getByText("Latest Mixes");

  await waitFor(() => {
    expect(myElem).toBeInTheDocument();
  });
});

it("should render the Mixes component", async () => {
  render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );

  const myElem = screen.getByText("Latest Mixes");

  await waitFor(() => {
    expect(myElem).toBeInTheDocument();
  });
});
