import { useEffect, useState } from "react";
import { getData } from "service/getData";
import ErrorRows from "./class3/errorRows";
import ErrorTemp from "./class3/errorTemp";

interface Data {
  id: number;
  profileImage: string;
  name: string;
}

const useViewModel = () => {
  const [data, setData] = useState<Data[]>([]);
  const [errorsRows, setErrorsRows] = useState<number[]>([0, 3]);

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

    const errTemp = new ErrorRows(errorsRows, index).findAndFilterErr();
    const errRows = new ErrorTemp(errTemp, index).getErrRowsCountMinus();
    setErrorsRows([...errRows]);
  };

  const onDuplicateData = (index: number) => {
    let cloneData = data;
    cloneData.splice(index + 1, 0, data[index]);
    setData([...cloneData]);

    const { errorsRowsTemp, countIndex } = new ErrorRows(
      errorsRows,
      index
    ).findAndDupErr();
    const errRows = new ErrorTemp(
      errorsRowsTemp,
      countIndex
    ).getErrRowsCountPlus();
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
