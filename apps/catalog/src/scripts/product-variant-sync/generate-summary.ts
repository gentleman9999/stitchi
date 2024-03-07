import { white, red, green, yellow } from "chalk";
import Table from "cli-table";

export default function generateSummary({
  erroredProductsCount,
  successfulProductsCount,
}: {
  successfulProductsCount: number;
  erroredProductsCount: number;
}) {
  const table = new Table({
    head: [white("Action"), white("Count"), white("Error")],
  });

  const totalProductsCount = successfulProductsCount + erroredProductsCount;

  table.push([
    white("Products updated"),
    successfulProductsCount < totalProductsCount
      ? yellow(successfulProductsCount)
      : green(successfulProductsCount),
    red(erroredProductsCount),
  ]);

  console.log(white("\n***********************************************"));
  console.log(white("                 SYNC SUMMARY"));
  console.log(white("***********************************************\n"));
  console.log(table.toString());
  console.log(white("\n***********************************************\n"));
}
