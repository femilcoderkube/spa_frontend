import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { RecordPage } from "./RecordPage";

const RecordListWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Record List</PageTitle>
      <RecordPage />
    </>
  );
};

export default RecordListWrapper;
