import { Card, CardContent, CardProps, Stack, Typography } from "@mui/material";
import React from "react";

type KpiCardProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
} & CardProps;

const KpiCard: React.FC<KpiCardProps> = ({
  label,
  icon,
  children,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="1.25rem">{label}</Typography>
          {icon}
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
};

export default KpiCard;
