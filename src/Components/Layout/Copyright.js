import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = ({ text, to, icon }) => {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://www.uade.edu.ar/">UADE</Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright;