import { test, expect } from "@playwright/test";

test("contact uses functioning links and does not simulate form submission", async ({
  page,
}) => {
  await page.goto("/contact/");
  await expect(
    page.getByRole("link", { name: "01206 258770", exact: true }).first(),
  ).toHaveAttribute("href", "tel:+441206258770");
  await expect(
    page.getByRole("link", { name: "Samantha.Crockford@nhs.net", exact: true }),
  ).toHaveAttribute("href", "mailto:Samantha.Crockford@nhs.net");
  await expect(
    page.getByRole("link", { name: "Request an appointment" }),
  ).toHaveAttribute(
    "href",
    "https://www.topdoctors.co.uk/doctor/chrysostomos-dimitriou/",
  );
  await expect(page.locator("form")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "View location on Google Maps" }),
  ).toHaveCount(2);
  await page
    .getByText("Can I send my medical records through this website?")
    .click();
  await expect(
    page.getByText(/Ask the secretary for the appropriate secure route/),
  ).toBeVisible();
});
