/* eslint-disable @typescript-eslint/no-explicit-any */
import { show } from "@/services/contractDocuments/show";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getContentDiff } from "@/helpers/getContentDiff";
import BlockEditor from "./BlockEditor/BlockEditor";

const CompareContractVersions = () => {
  const { contractVersionFromId, contractVersionToId } = useParams();
  const [contractDocumentFrom, setContractDocumentFrom] = useState<any>(null);
  const [contractDocumentTo, setContractDocumentTo] = useState<any>(null);

  const diff = useMemo(() => {
    if (contractDocumentFrom && contractDocumentTo) {
      return getContentDiff(contractDocumentFrom, contractDocumentTo);
    }
    return null;
  }, [contractDocumentFrom, contractDocumentTo]);

  useEffect(() => {
    if (contractVersionFromId) {
      show(contractVersionFromId).then((data) =>
        setContractDocumentFrom(JSON.parse(data).content),
      );
    }
  }, [contractVersionFromId]);

  useEffect(() => {
    if (contractVersionToId) {
      show(contractVersionToId).then((data) =>
        setContractDocumentTo(JSON.parse(data).content),
      );
    }
  }, [contractVersionToId]);

  console.log(diff);

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <h1>Compare Contract Versions</h1>
      {diff && <BlockEditor content={diff} />}
    </div>
  );
};

export default CompareContractVersions;
