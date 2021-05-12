import React from "react";
import Video from "../../Assets/Videos/videoGimnasio.mp4";
import Logo from "../../Assets/Images/CityGym_logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import classes from "./BackgroundVideo.module.css";

export default function BackgroundVideo() {
  return (
    <div className={classes.Container}>
      <video
        autoPlay="autoplay"
        loop="loop"
        muted
        className={classes.Video}
        src={Video}
      />
      <div className={classes.Content}>
        <Grid container spacing={0}>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <img src={Logo} height={100} />
          </Grid>
          <Grid item xl={12} lg={12} md={12} xs={12}>
            <Typography variant="h2" gutterBottom>
              Cronograma Semanal
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
