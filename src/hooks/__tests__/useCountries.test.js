import { renderHook } from "@testing-library/react-hooks";
import useCountries from "../useCountries";

jest.mock("../../api/covidAPI.js", () => ({
    getCountries: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          Country: "Brazil",
          Slug: "brazil",
          ISO2: "BR",
        },
        {
            "Country": "Iceland",
            "Slug": "iceland",
            "ISO2": "IS"
        }
      ],
    })
  ),
}));

test("should return an array of countries", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCountries());
  await waitForNextUpdate({ timeout: 10000 });
  expect(result.current[0].Country).toBe("Brazil");
  expect(result.current[1].Country).toBe("Iceland");
});
