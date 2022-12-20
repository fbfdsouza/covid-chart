import { renderHook } from "@testing-library/react-hooks";
import useCountries from "./useCountries";

jest.mock('../api/covidAPI.js')

test("should return an array of countries", async ()=> {
    const { result, waitForNextUpdate  } = renderHook(() => useCountries());
    await waitForNextUpdate();
    expect(result.current[0].Country).toBe('Brazil')
})