import ErrorIndex from "./errorIndex";

class Logic {
  private errorIndex: ErrorIndex;
  private errorsRows: number[] = [];
  private indexCount: number;

  constructor(errorsRows: number[], index: number) {
    this.indexCount = index;
    this.errorsRows = errorsRows;
    this.errorIndex = new ErrorIndex(errorsRows, index);
  }

  findAndFilterErr = () => {
    let errTemp = this.errorsRows;
    const findErrRows = this.errorIndex.findErr(errTemp, this.indexCount);
    if (findErrRows !== undefined) {
      errTemp = this.errorIndex.filterErrorsRowsIndex();
    }
    return errTemp;
  };

  findAndDupErr = () => {
    let errorsRowsTemp = this.errorsRows;
    let isContinue = true;
    let countIndex = this.indexCount;
    const findDupErr = this.errorIndex.findErr(errorsRowsTemp, countIndex);
    if (findDupErr !== undefined) {
      while (isContinue) {
        const findDupErr = this.errorIndex.findErr(errorsRowsTemp, countIndex);
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
    return this.errorIndex.errRowsCountMinus();
  };

  getErrRowsCountPlus = () => {
    return this.errorIndex.errRowsCountPlus();
  };
}

export default Logic;
