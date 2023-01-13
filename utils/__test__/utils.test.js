import { orderByOptionLabel } from "../utils";


const unorderedLabels = [
    { label: "New Zealand", value: "New Zealand" },
    { label: "Brazil", value: "Brazil" },
    { label: "Japan", value: "Japan" }
]

it("Should order by label", ()=>{
    const orderedLabels = [...unorderedLabels.sort(orderByOptionLabel)]
    expect(orderedLabels[0].label).toBe('Brazil');
    expect(orderedLabels[1].label).toBe('Japan');
    expect(orderedLabels[2].label).toBe('New Zealand');
})