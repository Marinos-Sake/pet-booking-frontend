export const nf = new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" });
export const money = (v: unknown) => (Number.isNaN(Number(v)) ? "-" : nf.format(Number(v)));
