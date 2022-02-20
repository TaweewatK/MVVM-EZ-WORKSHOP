import { useEffect, useState } from "react";
import { getData } from "service/getData";
import Function from "./class2/Function";

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

    const errTemp = new Function(errorsRows, index).findAndFilterErr();
    const errRows = new Function(errTemp, index).getErrRowsCountMinus();
    setErrorsRows([...errRows]);
  };

  const onDuplicateData = (index: number) => {
    let cloneData = data;
    cloneData.splice(index + 1, 0, data[index]);
    setData([...cloneData]);

    const { errorsRowsTemp, countIndex } = new Function(
      errorsRows,
      index
    ).findAndDupErr();
    const errRows = new Function(
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
