import { white, red, green, yellow } from "chalk";
import Table from "cli-table";

export default function generateSummary({
  createdProductsCount,
  updatedProductsCount,
  erroredCreatedProductsCount,
  erroredUpdatedProductsCount,
  productsToCreateCount,
  productsToUpdateCount,
}: {
  erroredCreatedProductsCount: number;
  erroredUpdatedProductsCount: number;
  createdProductsCount: number;
  updatedProductsCount: number;
  productsToCreateCount: number;
  productsToUpdateCount: number;
}) {
  const table = new Table({
    head: [white("Action"), white("Count"), white("Error")],
  });

  const createdErrorMessage =
    erroredCreatedProductsCount > 0
      ? `${erroredCreatedProductsCount} errored`
      : "";

  const updatedErrorMessage =
    erroredUpdatedProductsCount > 0
      ? `${erroredUpdatedProductsCount} errored`
      : "";

  const createdProductsRatio = `${createdProductsCount}/${productsToCreateCount}`;
  const updatedProductsRatio = `${updatedProductsCount}/${productsToUpdateCount}`;

  table.push(
    [
      white("Products created"),
      createdProductsCount < productsToCreateCount
        ? yellow(createdProductsRatio)
        : green(createdProductsRatio),
      red(createdErrorMessage),
    ],
    [
      white("Products updated"),
      updatedProductsCount < productsToUpdateCount
        ? yellow(updatedProductsRatio)
        : green(updatedProductsRatio),
      red(updatedErrorMessage),
    ]
  );

  console.log(white("\n***********************************************"));
  console.log(white("                 SYNC SUMMARY"));
  console.log(white("***********************************************\n"));
  console.log(table.toString());
  console.log(white("\n***********************************************\n"));
}
