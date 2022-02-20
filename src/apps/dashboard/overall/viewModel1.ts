import { useEffect, useState } from "react";
import { getData } from "service/getData";
import Logic from "./class1/logic";

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

    const errTemp = new Logic(errorsRows, index).findAndFilterErr();
    const errRows = new Logic(errTemp, index).getErrRowsCountMinus();
    setErrorsRows([...errRows]);
  };

  const onDuplicateData = (index: number) => {
    let cloneData = data;
    cloneData.splice(index + 1, 0, data[index]);
    setData([...cloneData]);

    const { errorsRowsTemp, countIndex } = new Logic(
      errorsRows,
      index
    ).findAndDupErr();
    const errRows = new Logic(errorsRowsTemp, countIndex).getErrRowsCountPlus();
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
