class Function {
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

  findAndFilterErr = () => {
    let errTemp = this.errorsRows;
    const findErrRows = this.findErr(errTemp, this.indexCount);
    if (findErrRows !== undefined) {
      errTemp = this.filterErrorsRowsIndex();
    }
    return errTemp;
  };

  findAndDupErr = () => {
    let errorsRowsTemp = this.errorsRows;
    let isContinue = true;
    let countIndex = this.indexCount;
    const findDupErr = this.findErr(errorsRowsTemp, countIndex);
    if (findDupErr !== undefined) {
      while (isContinue) {
        const findDupErr = this.findErr(errorsRowsTemp, countIndex);
        if (findDupErr !== undefined) {
          countIndex += 1;
        } else {
          errorsRowsTemp.push(countIndex);
          isContinue = false;
        }
      }
    }
    return {
      errorsRowsTemp,
      countIndex,
    };
  };

  getErrRowsCountMinus = () => {
    return this.errRowsCountMinus();
  };

  getErrRowsCountPlus = () => {
    return this.errRowsCountPlus();
  };
}

export default Function;
