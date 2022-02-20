import { useEffect, useState } from "react";
import { getData } from "service/getData";

interface Data {
  id: number;
  profileImage: string;
  name: string;
}

const useViewModel = () => {
  const [data, setData] = useState<Data[]>([]);
  const [errorsRows, setErrorsRows] = useState<number[]>([0, 3]);

  const findErr = (indexCount: number) => {
    return errorsRows.find((item) => item === indexCount);
  };

  const errRowsCountPlus = (errorsRows: number[], index: number) => {
    return errorsRows.map((item) => {
      if (item > index) {
        return item + 1;
      }
      return item;
    });
  };

  const errRowsCountMinus = (errorsRows: number[], index: number) => {
    return errorsRows.map((item) => {
      if (item > index) {
        if (item !== 0) {
          return item - 1;
        }
      }
      return item;
    });
  };

  const findAndFilterErr = (errorsRows: number[], index: number) => {
    const findErrRows = findErr(index);
    let errTemp = errorsRows;
    if (findErrRows !== undefined) {
      errTemp = errorsRows.filter((item) => item !== index);
    }
    return errTemp;
  };

  const findAndDupErr = (errorsRows: number[], index: number) => {
    let errorsRowsTemp = errorsRows;
    let isContinue = true;
    let indexCount = index;
    const findDupErr = findErr(index);
    if (findDupErr !== undefined) {
      while (isContinue) {
        const findDupErr = findErr(indexCount);
        if (findDupErr !== undefined) {
          indexCount += 1;
        } else {
          errorsRowsTemp.push(indexCount);
          isContinue = false;
        }
      }
    }
    return {
      errorsRowsTemp,
      indexCount,
    };
  };

  useEffect(() => {
    getDataFn();
  }, []);

  const getDataFn = () => {
    getData()
      .then((result) => {
        setData(result);
      })
      .catch(() => {});
  };

  const onRemoveData = (index: number) => {
    const dataTemp = data.filter((_item, i) => i !== index);
    setData(dataTemp);

    const errTemp = findAndFilterErr(errorsRows, index);
    const errRows = errRowsCountMinus(errTemp, index);
    setErrorsRows([...errRows]);
  };

  const onDuplicateData = (index: number) => {
    let cloneData = data;
    cloneData.splice(index + 1, 0, data[index]);
    setData([...cloneData]);

    const { errorsRowsTemp, indexCount } = findAndDupErr(errorsRows, index);
    const errRows = errRowsCountPlus(errorsRowsTemp, indexCount);
    setErrorsRows([...errRows]);
  };

  return {
    data,
    onRemoveData,
    onDuplicateData,
    errorsRows,
  };
};

export default useViewModel;
