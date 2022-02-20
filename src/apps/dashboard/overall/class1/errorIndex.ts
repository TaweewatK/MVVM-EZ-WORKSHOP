export default class ErrorIndex {
  private errorsRows: number[] = [];
  private indexCount: number;

  constructor(errorsRows: number[], index: number) {
    this.indexCount = index;
    this.errorsRows = errorsRows;
  }

  findErr = (errorsRows: number[], index: number) => {
    return errorsRows.find((item) => item === index);
  };

  errRowsCountPlus = () => {
    return this.errorsRows.map((item) => {
      if (item > this.indexCount) {
        return item + 1;
      }
      return item;
    });
  };

  errRowsCountMinus = () => {
    return this.errorsRows.map((item) => {
      if (item > this.indexCount) {
        if (item !== 0) {
          return item - 1;
        }
      }
      return item;
    });
  };

  filterErrorsRowsIndex = () => {
    return this.errorsRows.filter((item) => item !== this.indexCount);
  };
}
