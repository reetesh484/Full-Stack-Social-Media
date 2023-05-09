import React from "react";
import ReactLoading from "react-loading";
import { useTheme } from "@mui/material";

const Loader = () => {
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
  return (
    <>
      <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ReactLoading
          type={"bars"}
          color={primaryLight}
          height={100}
          width={100}
        />
      </div>
    </>
  );
};

export default Loader;
