import React from "react";
import { useEffect, useState } from "react";
import Form, { SimpleItem, GroupItem } from "devextreme-react/form";
import "devextreme-react/text-area";
import { useParams } from "react-router-dom";

const CreaturesById = () => {
  const matchParams = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${matchParams.id}`)
      .then((resp) => resp.json())
      .then((result) => setData(result))
      .catch((err) => err);
  }, [matchParams.id]);

  return (
    <Form formData={data}>
      <GroupItem cssClass="first-group" colCount={4}>
        <GroupItem colSpan={4}>
          <SimpleItem dataField="name" />
          <SimpleItem dataField="population" />
          <SimpleItem dataField="terrain" />
        </GroupItem>
      </GroupItem>
      <GroupItem cssClass="second-group" colCount={2}>
        <GroupItem>
          <SimpleItem dataField="climate" />
          <SimpleItem dataField="gravity" />
          <SimpleItem dataField="surface_water" />
        </GroupItem>
        <GroupItem>
          <SimpleItem dataField="diameter" />
          <SimpleItem dataField="rotation_period" />
          <SimpleItem dataField="orbital_period" />
        </GroupItem>
      </GroupItem>
    </Form>
  );
};

export default CreaturesById;
