class ErrorRows {
  private errorsRows: number[] = [];
  private indexCount: number;

  constructor(errorsRows: number[], index: number) {
    this.indexCount = index;
    this.errorsRows = errorsRows;
  }

  findErr = (errorsRows: number[], index: number) => {
    return errorsRows.find((item) => item === index);
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
}

export default ErrorRows;
