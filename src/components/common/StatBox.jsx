/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

import ProgressCircle from "./ProgressCircle";
import { tokens } from "../../theme";

const StatBox = ({ title, subtitle, icon, progress, increase, color }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery("(max-width:480px)");

    return (
        <Box width="100%" m={isMobile ? "0px" : "0 30px"}>
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant={isMobile ? "h6" : "h4"}
                        fontWeight="900"
                        sx={{ textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white' }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} color={color} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography fontWeight="900" variant={isMobile ? "h6" : "h5"} sx={{ textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white' }}>
                    {subtitle}
                </Typography>
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    fontStyle="italic"
                    fontWeight="900"
                    sx={{ textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white' }}
                >
                    {increase}
                </Typography>
            </Box>
        </Box>
    );
};

StatBox.propTypes = {
    title: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    subtitle: PropTypes.string,
    icon: PropTypes.object,
    increase: PropTypes.string,
    progress: PropTypes.string,
    yellowColor: PropTypes.string
};

export default StatBox;
