import { useState } from "react";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import { useHistory } from "react-router-dom";

const createSwDataStore = (url, setIndex, pageSize) => {
  let totalCount = 0;
  let currentPage = 0;

  const st = new CustomStore({
    totalCount: (e) => Promise.resolve(totalCount),
    load: (loadData) => {
      return fetch(
        url +
          (currentPage === 0
            ? ""
            : "?" + new URLSearchParams({ page: currentPage + 1 }))
      )
        .then((data) => data.json())
        .then((data) => {
          totalCount = data.count;
          let results = new Array(currentPage * pageSize).concat(
            data.results.map((entry) => {
              const id = entry.url.match(/\d+/);
              return { ...entry, id: id[0] };
            })
          );
          return results;
        });
    },
  });

  const dataSourceOptions = new DataSource({
    store: st,
    paginate: true,
    pageSize: pageSize,
  });
  dataSourceOptions.pageIndex = (newIndex) => {
    if (newIndex !== undefined) {
      currentPage = newIndex;
      setIndex(currentPage);
    }
    return currentPage;
  };
  dataSourceOptions.totalCount = (data) => {
    return totalCount;
  };
  return dataSourceOptions;
};

const CreaturesPage = () => {
  const history = useHistory();
  const pageSize = 10;
  const [index, setIndex] = useState(0);
  const dataSOurce = createSwDataStore(
    "https://swapi.dev/api/people/",
    setIndex,
    pageSize
  );
  return (
    <DataGrid
      onRowDblClick={(e) => {
        history.push(`/creatures/${e.key.id}`);
      }}
      dataSource={dataSOurce}
      selection={{ mode: "single" }}
    >
      <Column dataField="name" dataType="string" caption="name" />

      <Column dataField="height" dataType="number" />
      <Column dataField="mass" dataType="number" />
      <Column dataField="hair_color" dataType="string" />
      <Column dataField="skin_color" dataType="string" />
      <Column dataField="eye_color" dataType="string" />
      <Column dataField="birth_year" dataType="date" />
      <Column dataField="gender" dataType="string" />
      <Column dataField="homeworld" dataType="string" />

      <Pager allowedPageSizes={[pageSize]} showPageSizeSelector={true} />
      <Paging pageIndex={index} defaultPageSize={pageSize} />
    </DataGrid>
  );
};

export default CreaturesPage;
