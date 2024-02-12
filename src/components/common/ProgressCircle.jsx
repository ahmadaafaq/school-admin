/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Box, useTheme,useMediaQuery} from "@mui/material";
import PropTypes from "prop-types";

import { tokens } from "../../theme";

const ProgressCircle = ({ progress = null, size = "40", yellowColor }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;
    const isMobile = useMediaQuery("(max-width:480px)");

    return (
        <Box
            sx={{
                background: `radial-gradient(${yellowColor} 55%, transparent 56%),
            conic-gradient(${colors.primary[500]} ${angle}deg 0deg , transparent ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
                borderRadius: "50%",
                width: isMobile ? "30px" : `${size}px`,
                height: isMobile ? "30px" : `${size}px`
            }}
        />
    );
};

ProgressCircle.propTypes = {
    progress: PropTypes.string,
    size: PropTypes.number,
    yellowColor: PropTypes.string
};

export default ProgressCircle;
