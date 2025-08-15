export function calcDiscount({price , priceAfterDiscount}) {
    const discount = (((price - priceAfterDiscount) / price) * 100).toFixed(0)

    return discount
}