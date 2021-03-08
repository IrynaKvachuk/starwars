import { useState } from "react";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { useHistory } from "react-router-dom";
import createSwDataStore from "../../utils/customStore";

const CreaturesPage = () => {
  const history = useHistory();
  const pageSize = 10;
  const [index, setIndex] = useState(0);
  const dataSource = createSwDataStore(
    "https://swapi.dev/api/people/",
    setIndex,
    () => index,
    (entry) => entry.url.match(/\d+/),
    pageSize
  );

  return (
    <DataGrid
      onRowDblClick={(e) => {
        history.push(`/creatures/${e.key.id}`);
      }}
      dataSource={dataSource}
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

      <Pager allowedPageSizes={[pageSize]} />
      <Paging pageIndex={index} defaultPageSize={pageSize} />
    </DataGrid>
  );
};

export default CreaturesPage;
