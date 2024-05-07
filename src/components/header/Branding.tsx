import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import router from "../Routes";

const Branding = () => {
  return (
    <>
      <MessageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        CHATTER
      </Typography>
    </>
  );
};

export default Branding;
