/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Box, useTheme } from "@mui/material";

import { tokens } from "../../theme";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;

    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.blueAccent[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.primary[200]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default ProgressCircle;
