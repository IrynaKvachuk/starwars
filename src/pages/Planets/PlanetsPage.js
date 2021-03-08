import { useState } from "react";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { useHistory } from "react-router-dom";
import createSwDataStore from "../../utils/customStore";

const PlanetsPage = () => {
  const history = useHistory();
  const pageSize = 10;
  const [index, setIndex] = useState(0);
  const dataSource = createSwDataStore(
    "https://swapi.dev/api/planets/",
    setIndex,
    () => index,
    (entry) => entry.url.match(/\d+/),
    pageSize
  );
  
  return (
    <DataGrid
      onRowDblClick={(e) => {
        history.push(`/planets/${e.key.id}`);
      }}
      dataSource={dataSource}
      selection={{ mode: "single" }}
    >
      <Column dataField="name" dataType="string" caption="name" />

      <Column dataField="rotation_period" dataType="number" />
      <Column dataField="orbital_period" dataType="number" />
      <Column dataField="diameter" dataType="number" />
      <Column dataField="climate" dataType="string" />
      <Column dataField="gravity" dataType="string" />
      <Column dataField="terrain" dataType="date" />
      <Column dataField="surface_water" dataType="number" />
      <Column dataField="population" dataType="number" width="120px" />

      <Pager allowedPageSizes={[pageSize]} />
      <Paging pageIndex={index} defaultPageSize={pageSize} />
    </DataGrid>
  );
};

export default PlanetsPage;
