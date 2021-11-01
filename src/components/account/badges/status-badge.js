import React from "react";
import { Badge } from "@theme-ui/components";

const StatusLabel = ({ status }) => {
  return <Badge variant={status}>Paid</Badge>;
};

export default StatusLabel;
