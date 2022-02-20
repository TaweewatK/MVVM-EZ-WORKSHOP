class ErrorTemp {
  private errorsRows: number[] = [];
  private indexCount: number;

  constructor(errorsRows: number[], index: number) {
    this.indexCount = index;
    this.errorsRows = errorsRows;
  }

  getErrRowsCountMinus = () => {
    return this.errRowsCountMinus();
  };

  getErrRowsCountPlus = () => {
    return this.errRowsCountPlus();
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
}

export default ErrorTemp;
